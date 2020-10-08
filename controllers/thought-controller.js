const { Thought, User } = require('../models');

const thoughtController = {
// get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
// get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id:params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

   // create thought
   createThought({ params, body}, res) {
        Thought.create(body)
       .then(({ _id }) => {
           return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id!' });
                return;
            }
            res.json(dbUserData);
        })
       .catch(err => res.json(err));
    },

       // update thought
   updateThought({ params, body}, res) {
    Thought.findOneAndUpdate( body,
            { _id: params.id },
            { new: true, runValidators: true})
        .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
        }
        res.json(dbUserData);
    })
   .catch(err => res.json(err));
},

    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true })
        .then( dbThoughtData => {
            if (! dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!'});
            }
            return User.findOneAndUpdate(
                { thoughts: req.params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );  
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

         // add reaction
         addReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
                { thoughts: params.thoughtId},
                { $push: { replies: body }},
                { new: true, runValidators: true}
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },

    // delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};


module.exports = thoughtController;