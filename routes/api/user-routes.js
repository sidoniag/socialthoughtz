const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// set up GET all and POST at /api/user
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// set up GET one, PUT, and DELETE at /api/user/:id
router 
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;