const router = require('express').Router();
// Import userController functions for handling requests
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');
// GET all users and POST a new user
router.route('/').get(getUsers).post(createUser);
// GET a single user, PUT a user, and DELETE a user by ID
router
.route('/:userId')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

// POST a friend to a user by ID or DELETE a friend from a user by ID
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;