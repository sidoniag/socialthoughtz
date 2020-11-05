const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
          res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with this id!" }); 
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // create thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: "Thought created but no user found with that id!" });
        }
        res.json({ message: 'Thought created successfully!'});
      })
      .catch((err) => {
          console.log(err);
      res.status(500).json(err);
      });
  },

  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true , new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with that id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndRemove(
      { _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.userId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: "Thought created but no user found with that id!" });
        }
        res.json({ message: 'Thought deleted successfully!' });
      })
      .catch((err) => {
      console.log(err);
      res.status(500).json(err);
      });
  },

  // add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
  },

  // delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
          if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought found with that id!' });
          }
          res.json(dbThoughtData);
        })
      .catch((err) => {
      console.log(err);
      res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
