const express = require('express');
const { userController } = require('../controllers');
// const { checkToken } = require('../utils/validate');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
// router.get('/myinfo', checkToken.userController.getUserInfo);
router.get('/test', userController.redirectTest);
router.get('/ping', userController.pingpongTest);

module.exports = router;