// const jwt = require('jsonwebtoken');
// const { catchAsync } = require('./error');

const checkUserName = (username) => {
  const userNameRegex = /^[A-Za-z가-힣]{1}[A-Za-z가-힣0-9_-]{1,19}$/

  if (!userNameRegex.test(username)) {
    const error = new Error('NOT_AVAILABLE');
    error.statusCode = 400;

    throw error;
  };
};

const checkPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  if (!passwordRegex.test(password)) {
    const error = new Error('NOT_AVAILABLE');
    error.statusCode = 400;

    throw error;
  };
};

// const checkToken = catchAsync(async(req, res, next) => {
  
// })

module.exports = {
  checkUserName,
  checkPassword
}