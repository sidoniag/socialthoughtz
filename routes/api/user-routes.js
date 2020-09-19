const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// set up GET all and POST at /api/user
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// set up GET one, PUT, and DELETE at /api/user/:id
router 
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    // .delete(removeUser)

// BONUS: Remove a user's associated thoughts when deleted.

router
    .route('api/users/:userId/friends/:friendId')
    .post(createFriend)
    .delete(removeFriend);

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

module.exports = router;