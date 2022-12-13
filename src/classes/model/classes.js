
const sql=require('../model/connection');

var Class= function(Class) {
  this.id= Class.id;
  this.name= Class.name;
  this.classteacher= Class.classteacher,
  this.createdat=Class.createdat || false
};

Class.create = (newclass, result) => {
  sql.query("INSERT INTO Classes SET ?", newclass, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("create the new class: ", { id: res.insertId, ...newclass });
        result(null, { id: res.insertId, ...newclass });
      });
    };

    Class.get = ( result) => {
    let query = "SELECT * FROM Classes";
  
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


  Class.updateById = (id, Classes, result) => {
      sql.query(
        "UPDATE Classes SET id= ?,  name= ?,classteacher=?,createdat=? WHERE id= ?",
        [Classes.id, Classes.name,Classes.classteacher,Classes.createdat, id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated Job: ", { id: id, ...Classes });
          result(null, { id: id, ...Classes });
        }
      );
    };

    Class.remove = (id, result) => {
      sql.query("DELETE FROM Classes WHERE id = ?", id, (err, res) => {
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
  


module.exports=Class;
