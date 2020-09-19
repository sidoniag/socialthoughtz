const { Thought, User } = require('../models');

const thoughtController = {
   // add thought to user
   addThought({ params, body}, res) {
       console.log(body);
        Thought.create(body)
       .then(({ _id }) => {
           return User.findOneAndUpdate(
                { _id: params.userId },
                {$push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id!' });
                return;
            }
            res.json(dbUserData);
        })
       .catch(err => res.json(err));
    },

     // add reaction
     addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { replies: body }},
            { new: true}
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

    // remove thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then( deletedThought => {
            if (! deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!'});
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { comments: params.thoughtId } },
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

    // remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.commentId },
            { $pull: { replies: { replyId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};


module.exports = thoughtController;