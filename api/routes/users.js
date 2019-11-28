const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

router.post('/sign-up', UsersController.sign_up_user);
router.post('/sign-in', UsersController.sign_in_user);
router.delete('/:userId', UsersController.delete_user);

module.exports = router;