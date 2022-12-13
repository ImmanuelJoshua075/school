module.exports = app => {
  const classes= require("../controller/classes");

  app.get('/classes',classes.showall);

 app.post('/classes',classes.newclass);

 app.patch('/classes/update/:id',classes.update);
  
 app.delete('/classes/delete/:id',classes.delete);

}