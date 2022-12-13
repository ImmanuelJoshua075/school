const sql=require('../model/connection');
const studentsAttendance = require('../routes/studentsAttendance');

var StudentsAttendance= function(StudentsAttendance) {
  this.id=StudentsAttendance.id;
  this.classid=StudentsAttendance.classid;
  this.studentid=StudentsAttendance.studentid;
  this.status=StudentsAttendance.status;
  this.date= StudentsAttendance.date;
  this.createdat= StudentsAttendance.createdat ||false

}

StudentsAttendance.get = ( result) => {
  let query = "SELECT * FROM StudentAttendance";

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

StudentsAttendance.create = (newuser, result) => {
  sql.query("INSERT INTO StudentAttendance SET ?", newuser, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("create the new : ", { id: res.insertId, ...newuser });
        result(null, { id: res.insertId, ...newuser });
      });
    };

  StudentsAttendance.updateById = (id, StudentAttendance, result) => {
      sql.query(
        "UPDATE StudentAttendance SET id= ?,  classid= ?, studentid= ?,status=?,date=?,createdat=? WHERE id= ?",
        [StudentAttendance.id, StudentAttendance.classid,StudentAttendance.studentid,StudentAttendance.status,StudentAttendance.date,StudentAttendance.createdat, id],
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
    
          console.log("updated Job: ", { id: id, ...StudentAttendance });
          result(null, { id: id, ...StudentAttendance });
        }
      );
    };

    StudentsAttendance.remove = (id, result) => {
      sql.query("DELETE FROM StudentAttendance WHERE id = ?", id, (err, res) => {
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
  

  

    module.exports=StudentsAttendance;
