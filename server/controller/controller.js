var Userdb = require('../model/model');

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({ message : "Content cannot be empty!"});
        return;
    }

    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a user."
            });
        });
}

exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id) 
         .then(data => {
             if(!data){
                 res.status(404).send({ message : "Not found user with id" + id})
             }else{
                res.send(data)
             }
         })
         .catch(err => {
             res.status(500).send({ message : "Error retrieving user with id " + id})
         })
    }else{
        Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({ message:err.message || "Error occurred while retrieving user information."})
    })
    }    
}

exports.update = (req, res) => {
    if(!req.body) {
        return res
         .status(400)
         .send({ message:"Data to update can not be empty!"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { userFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot update user with ${id}.`})
        }else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({ message : "Error updating user information."})
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
     .then(data => {
         if(!data) {
             res.status(404).send({ message : `Cannot delete with id ${id}`})
         }else{
             res.send({
                 message : "User was deleted successfully!"
             })
         }
     })
     .catch(err => {
         res.status(500).send({
            message : "Could not delete user with id=" + id
         });
     });
}