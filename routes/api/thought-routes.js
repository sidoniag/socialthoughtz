const router = require('express').Router();
const {
    getAllThought,
    addThought,
    removeThought,
    addReaction,
    removeReaction,
    getThoughtById
} = require('../../controllers/thought-controller');

// set up GET all and POST at /api/thoughts
router
    .route('/api/thoughts')
    .get(getAllThought)
    .post(addThought);

// set up GET one, PUT, and DELETE at /api/thoughts/:id
router 
    .route('/api/thoughts/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// 
router
    .route('/api/thoughts/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReactionById);

// POST to create a reaction stored in a single thought's reactions array field
    
// DELETE to pull and remove a reaction by the reaction's reactionId value
     

module.exports = router;