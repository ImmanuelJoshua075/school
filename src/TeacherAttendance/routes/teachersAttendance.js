
module.exports = app => {
    const TeacherAttendance = require("../controller/teachersAttendance");
    
    app.get('/teacherattenance',TeacherAttendance.getall);

    app.post('/teacherattenance',TeacherAttendance.newuser);
  
    app.patch('/teacherattenance/update/:id',TeacherAttendance.update);
  
   app.delete('/teacherattenance/delete/:id',TeacherAttendance.delete);
  
  }