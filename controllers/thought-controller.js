const { Thought } = require('../models');

const thoughtController = {
   // get all thoughts
   getAllThoughts(req, res) {
       Thought.find({})
       .then(dbThoughtData => res.json(dbThoughtData))
       .catch(err => {
           console.log(err);
           res.status(500).json(err);
       });
   },

   // get one thought by id
   getThoughtById({ params }, res) {
       Thought.findOne({ _id: params.ide })
       .then(dbThoughtData => {
           // if no thought is found, send 404
           if (!dbThoughtData) {
               res.status(404).json({ message: 'No thought found with this id!' });
               return;
           }
            res.json(dbThoughtData)
       })
       .catch(err => {
           console.log(err);
           res.status(400).json(err);
       });
   },

   // createThought
   createThought({ body }, res) {
       Thought.create(body)
       .then(dbPizzaData => res.json(dbThoughtData))
       .catch(err => res.status(400).json(err));
   },

   // update thought by id
   updateThought({ params, body }, res) {
       Thought.findOneAndUpdate({ _id: params.id }, body, { new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;