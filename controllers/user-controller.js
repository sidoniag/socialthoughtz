const { User } = require('../models');

const userController = {
   // get all Users
   getAllUser(req, res) {
       User.find({})
       .then(dbUserData => res.json(dbUserData))
       .catch(err => {
           console.log(err);
           res.status(500).json(err);
       });
   },

   // get one User by id
   getUserById({ params }, res) {
       User.findOne({ _id: params.id })
       .then(dbUserData => {
           // if no User is found, send 404
           if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
           }
            res.json(dbUserData)
       })
       .catch(err => {
           console.log(err);
           res.status(400).json(err);
       });
   },

   // createUser
   createUser({ body }, res) {
       User.create(body)
       .then(dbUserData => res.json(dbUserData))
       .catch(err => res.status(400).json(err));
   },

   // update User by id
   updateUser({ params, body }, res) {
       User.findOneAndUpdate({ _id: params.id }, body, { new: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = userController;