const sql=require('../model/connection');
const Class=require('../model/classes');


exports.newclass= ((req, res) => {
   
  // Validate request
   if (!req.body.classteacher) {
    res.status(400).send({
      message: "Teacher id required!"
    });
    return;
  }

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  var classes= new Class({
   id: req.body.id,
   name: req.body.name,
   classteacher: req.body.classteacher,
   createdat: req.body.createdat || false
  });


  Class.create(classes, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the users."
      });
    else res.send(data);
  });
})

exports.showall = ((req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Class.get((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "some error occured while creating the users."
      });
    else res.send(data)
  });
});

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Class.updateById(
    req.params.id,
    new Class(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

//delete method
exports.delete = (req, res) => {
  Class.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

