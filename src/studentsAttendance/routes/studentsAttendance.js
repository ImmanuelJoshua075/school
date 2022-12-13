
module.exports = app => {
    const StudentsAttendance = require("../controller/studentsAttendance")

    app.get('/studentattendance',StudentsAttendance.getall);
  
    app.post('/studentattendance',StudentsAttendance.newuser);

    app.patch('/StudentsAttendance/update/:id',StudentsAttendance.update);
  
    app.delete('/StudentsAttendance/delete/:id',StudentsAttendance.delete);
  }