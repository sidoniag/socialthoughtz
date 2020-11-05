const { User, Thought } = require('../models');

const userController = {
   // get all Users
   getAllUser(req, res) {
       User.find()
       .select('-__v')
       .then((dbUserData) => {
           res.json(dbUserData);
       })
       .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
   },

   // get one User by id
   getUserById( req, res) {
       User.findOne({ _id: req.params.userId })
       .select('-__v')
       .populate('friends')
       .populate('thoughts')
        .then((dbUserData) => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData)
            })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

   // createUser
   createUser(req, res) {
       User.create(req.body)
       .then((dbUserData) => {
           res.json(dbUserData);
       })
       .catch((err) => {
           console.log(err);
           res.status(500).json({ message: 'failing here'});
       });
       },
   // update User by id
   updateUser(req, res) {
       User.findOneAndUpdate(
           { _id: req.params.userId }, 
           { $set: req.body,
            },
             { runValidators: true,
                new: true, 
             })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Update user info!'});
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },

    // delete User
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with that id!'});
            }
            return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        })
        .then(() => {
            res.json({ message: 'User deleted!' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
            )
         .then((dbUserData) => {
             if (!dbUserData) {
                 return res.status(404).json({ message: 'No user found with this id!'});
             }
             res.json(dbUserData);
         })
         .catch((err) => {
             console.log(err);
             res.status(500).json(err);
         });
     },

     // delete friend
     deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
            )
        .then((dbUserData) => {
            if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = userController;