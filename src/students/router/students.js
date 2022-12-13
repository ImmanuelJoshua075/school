
module.exports = app => {
     const students = require("../controller/students")

    app.post('/student',students.newuser);
 

    app.get('/student',students.getall);

    app.patch('/Students/update/:id',students.update);
  
    app.delete('/Students/delete/:id',students.delete);

   }