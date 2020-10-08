const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thought-controller');

// set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// set up GET one, PUT, and DELETE at /api/thoughts/:id
router 
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// POST to create a reaction stored in a single thought's reactions array field
router
    .route('/:thoughtId/reactions')
    .post(addReaction);
    
// DELETE to pull and remove a reaction by the reaction's reactionId value
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);  

module.exports = router;