const router = require('express').Router();
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,

} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId/friends').get(getUser);

module.exports = router;