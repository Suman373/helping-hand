const express = require('express');
const router = express.Router();
const passport = require("passport");

const {getUsers,getOneUser,updateUser,followUser,unfollowUser,
      deleteUser} = require('../controllers/userController');

// ------- USER ROUTES -------
// get all users
router.get('/',getUsers);
// get unique user
router.get('/:id', getOneUser);
// update user details
router.put('/:id', updateUser);
// follow user
router.post('/:userId/follow', followUser);
// unfollow user
router.post('/:userId/unfollow', unfollowUser);
// delete user
router.delete('/delete/:id', deleteUser);

module.exports = router;