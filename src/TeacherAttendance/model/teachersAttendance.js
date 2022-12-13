
const sql=require('../model/connection');
const teachersAttendance = require('../routes/teachersAttendance');

var TeachersAttendance= function(TeachersAttendance) {
  this.id= TeachersAttendance.id;
  this.userid= TeachersAttendance.userid;
  this.status=TeachersAttendance.status;
  this.date=TeachersAttendance.date;
  this.createdat=TeachersAttendance.createdat || false
};

TeachersAttendance.create = (newuser, result) => {
  sql.query("INSERT INTO TeacherAttendance SET ?", newuser, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("create the new user: ", { id: res.insertId, ...newuser });
        result(null, { id: res.insertId, ...newuser });
      });
    };


    TeachersAttendance.get = ( result) => {
      let query = "SELECT * FROM TeacherAttendance";
    
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

  
    TeachersAttendance.updateById = (id, TeachersAttendance, result) => {
      sql.query(
        "UPDATE TeacherAttendance SET id= ?,  userid= ?, status= ?,date=?,createdat=? WHERE id= ?",
        [TeachersAttendance.id, TeachersAttendance.userid,TeachersAttendance.status,TeachersAttendance.date,TeachersAttendance.createdat, id],
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
    
          console.log("updated TeachersAttendance: ", { id: id, ...TeachersAttendance });
          result(null, { id: id, ...TeachersAttendance });
        }
      );
    };

    TeachersAttendance.remove = (id, result) => {
      sql.query("DELETE FROM TeachersAttendance WHERE id = ?", id, (err, res) => {
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
  
  
    
   


module.exports=TeachersAttendance;
