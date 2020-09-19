const router = require('express').Router();
const {
    addThought,
    removeThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller');

// set up GET all and POST at /api/thoughts
router
    .route('/api/thoughts')
    .post(addThought);

// set up GET one, PUT, and DELETE at /api/thoughts/:id
router 
    .route('/api/thoughts/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// 
router
    .route('/api/thoughts/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReactionById);

// POST to create a reaction stored in a single thought's reactions array field
    
// DELETE to pull and remove a reaction by the reaction's reactionId value
     

module.exports = router;