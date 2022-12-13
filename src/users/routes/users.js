
module.exports = app => {
  const User = require("../controller/users")

    // var app = require("express").Router();

app.post('/user',User.newuser);

 app.post('/getuser',User.getone);

app.post('/login',User.login);

app.get('/get',User.getall);

app.post('/logout',User.logout);

//  app.patch('/update/:id',User.update);

app.delete('/delete/:id',User.delete);



}