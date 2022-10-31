const { userService } = require('../services');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async(req, res) => {
  const { username, password, email } = req.body;
  console.log({ username, password, email }, 'controller1')
  if ( !username || !password || !email ) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  };

  await userService.signUp(username, password, email);
  
  res.status(201).json({ message : "SIGN_UP_COMPLETE!" });
});

const signIn = catchAsync(async(req, res) => {
  const { username, password } = req.body;
  console.log({ username, password }, 'controller1');
  if ( !username || !password ) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  };

  const accessToken = await userService.signIn(username, password);
  console.log(accessToken, 'controller2')
  res.status(201).json({ message : "LOGIN_SUCCESS!", accessToken })
})

const redirectTest = catchAsync(async(req, res) => {
  res.redirect('/users/ping');
});

const pingpongTest = catchAsync(async(req, res) => {
  res.status(200).json({ message : "pong" });
});

module.exports = {
  signUp,
  signIn,
  pingpongTest,
  redirectTest
}