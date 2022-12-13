const e = require('express');
const { USER } = require('../../../config/manager');
const sql = require('../model/connection');
// const crypto=require('crypto');
const bcrypt = require('bcrypt');
const { query } = require('express');


var User = function (user) {
  this.id = user.id;
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.phone = user.phone;
  this.phoneCode = user.phonecode;
  this.email = user.email;
  this.password = user.password;
  this.gender = user.gender;
  this.dob = user.dob;
  this.role = user.role;
  this.address1 = user.address1;
  this.address2 = user.address2;
  this.city = user.city;
  this.state = user.state;
  this.pincode = user.pincode;
  this.status = user.status || false
};

// var password = crypto.randomBytes(20).toString('hex');

User.create = (newuser, result) => {
  sql.query("INSERT INTO Users SET ?", newuser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("create the new user: ", { id: res.insertId, ...newuser });
    result(null, { id: res.insertId, ...newuser });
  });
};

User.getone = (token, res) => {

  sql.query(`select loginid from UserSession where token='${token}'`, (err, result) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      // console.log(token)
      // console.log(result);
      let id = (result.pop()).loginid;
      console.log(id);
      sql.query(`select * from Users where id='${id}'`, (err, result) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        else {
          // res.send(result);
          console.log(result);
        }
      });
    }
  })
}


User.login = async (data, res) => {

  let { password, email } = data;

  await sql.query(`SELECT password FROM Users WHERE email ='${email}'`, async (err, result) => {

    if (err) {
      res.send("Password is incorrect");
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {

      const token = generateToken();
      // password compare
      console.log(password);
      const Password = password.toString()
      const Databasepassword = (result.pop()).password;

      const datas = await bcrypt.compare(Password, Databasepassword)
      if (datas) {
        sql.query(`SELECT id FROM Users where email='${email}'`, async (err, result) => {
          if (err) {
            console.log("error: ", err);
            // result(err, null);
            return;
          } else {

            let loginid = (result.pop()).id;

            console.log(loginid)

            console.log(token);
            // console.log(data.id);
            sql.query(`INSERT INTO UserSession(loginid, token, status) VALUES ('${loginid}','${token}', 'active')`, (err, result) => {
              if (err) {
                console.log("error: ", err);
                // result(err, null);
                return;
              }
              // res.json(result)
              // res.send(result)
              console.log(result);
              return
            });
          }
        })
          ;
        // res.send("Login successfully");
        res.send(token)
      } else {
        res.send("Login failed")
      }
    }

  });
}
// })
// }
function generateToken() {
  const N = 30;
  return Array(N + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, N)

}

User.get = (result) => {
  let query = "SELECT * FROM Users";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};



User.remove = (id, result) => {
  sql.query("DELETE FROM Users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("delete User with id: ", id);
    result(null, res);
  });
};

User.logout = (token, result) => {

  console.log(token);

  sql.query(
    `UPDATE UserSession SET status = 'inactive' WHERE token = '${token}'`, (err, res) => {

      if (err) {
        console.log("error: ", err);
        // result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { message: "Logged out successfully" });
    }
  );
}
// })

// };


module.exports = User;
