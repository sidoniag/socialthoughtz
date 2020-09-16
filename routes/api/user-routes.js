const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// set up GET all and POST at /api/user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// set up GET one, PUT, and DELETE at /api/user/:id
router 
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// BONUS: Remove a user's associated thoughts when deleted.

///api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

module.exports = router;