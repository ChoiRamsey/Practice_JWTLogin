const express = require('express');
const { userController } = require('../controllers');
// const { checkToken } = require('../utils/validate');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

module.exports = router;