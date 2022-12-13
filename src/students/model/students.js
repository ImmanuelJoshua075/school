const sql=require('./connection')

var Students= function(Students) {
    this.id=Students.id;
    this.firstname=Students.firstname;
    this.lastname=Students.lastname;
    this.classid=Students.classid;
    this.dob =Students.dob;
    this.fathername=Students.fathername;
    this.mothername=Students.mothername;
    this.address1=Students.address1;
    this.address2 =Students.address2;
    this.city=Students.city;
    this.state=Students.state;
    this.pincode=Students.pincode;
    this.createdat=Students.createdat ||false
};

Students.create = (newuser, result) => {
  sql.query("INSERT INTO Students SET ?", newuser, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("create the new user: ", { id: res.insertId, ...newuser });
        result(null, { id: res.insertId, ...newuser });
      });
    };
    
    Students.get = ( result) => {
      let query = "SELECT * FROM Students";
    
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
    
    Students.updateById = (id, Students, result) => {
      sql.query(
        "UPDATE Students SET id=?, firstname = ?, lastname = ?,  classid = ?,  dob = ?, fathername = ?, mothername = ?, address1 = ?, address2 = ?, city = ?, state = ?, pincode = ?, createdat = ? WHERE id = ?",
        [Students.id, Students.firstname, Students.lastname, Students.classid, Students.dob, Students.fathername, Students.mothername, Students.address1, Students.address2, Students.city, Students.state, Students.pincode, Students.createdat, id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found Job with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated Job: ", { id: id, ...Students });
          result(null, { id: id, ...Students });
        }
      );
    };
    
    Students.remove = (id, result) => {
      sql.query("DELETE FROM Students WHERE id = ?", id, (err, res) => {
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
   


module.exports=Students;