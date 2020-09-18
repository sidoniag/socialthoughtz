const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

// set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// set up GET one, PUT, and DELETE at /api/thoughts/:id
router 
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field
    
// DELETE to pull and remove a reaction by the reaction's reactionId value
     

module.exports = router;