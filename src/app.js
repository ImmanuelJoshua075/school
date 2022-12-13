const express = require("express");

//middleware
const bodyParser = require('body-parser');

const bcrypt=require('bcrypt');

//middleware
// const middleware=require('../middleware');

 const middleware=require('../middleware');


//db connection
const manager = require("../config/manager.js");


//modules called
const users = require('./users/routes/users');
const classes = require('./classes/routes/classes');
const students = require('./students/router/students');
const studentAttendance = require('./studentsAttendance/routes/studentsAttendance');
const teacherAttendanc = require('./TeacherAttendance/routes/teachersAttendance');


const { urlencoded } = require("body-parser");


const app = express();

app.use(middleware)

app.connect(manager);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// routes called

//user routes
require('./users/routes/users')(app);

//classes routes
require('./classes/routes/classes')(app);

//students routes
require('./students/router/students')(app);

//student attendance routes
require('./studentsAttendance/routes/studentsAttendance')(app);

//Teacher Attendance Route
require('./TeacherAttendance/routes/teachersAttendance')(app);

// require('../middleware/route')(app);

// app.use("/login",auth.rout);

app.listen(6800, () => {
  console.log(`Server Started at 6800`);
});
