const { User, Thought } = require('../models');

const userController = {
   // get all Users
   getAllUser(req, res) {
       User.find({})
       .populate({
           path: 'thoughts',
           select: '-__v'
       })
       .populate({
           path: 'friends',
           select: '-__v'
       })
       .select('-__v')
       .sort({ _id: -1 })
       .then(dbUserData => res.json(dbUserData))
       .catch(err => {
           console.log(err);
           res.status(500).json(err);
       });
   },

   // get one User by id
   getUserById({ params }, res) {
       User.findOne({ _id: params.id })
       .populate({
        path: 'thoughts',
        select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
            .then(dbUserData => {
                if(!dbUserData) {
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
       User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
            return Thought.deleteMany({ _id: {$in: dbUserData.thoughts }});
        })
        .then((returnedUserData) => {
            res.json(returnedUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userid },
            { $addToSet: { friends: params.friendId } },
            { new: true }
            )
         .then(dbUserData => {
             if (!dbUserData) {
                 res.status(404).json({ message: 'No user found with this id!'});
                 return;
             }
             res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
     },

     // delete friend
     deleteFriend({ params }, res) {
        User.findOneAndDelete(
            { _id: params.userId },
            { $pull: { friends: params.friendID } },
            { new: true }
            )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
}

module.exports = userController;