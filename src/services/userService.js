const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validate = require('../utils/validate');
const { userDao } = require('../models');

const hashPassword = async(password) => {
  return await bcrypt.hash(password, 12);
};

const signUp = async(username, password, email) => {
  validate.checkUserName(username);
  validate.checkPassword(password);

  const userInfoCheck = await userDao.userInfoCheck(username, email);
  console.log(userInfoCheck, 'service1')
  if (userInfoCheck) {
    const error = new Error('DUPLICATED_INFORMATION');
    error.statusCode = 401;
    throw error;
  };

  const hashedPassword = await hashPassword(password);
  console.log(hashedPassword, 'service2')
  return await userDao.createUser(username, hashedPassword, email)
}

const signIn = async(username, password) => {
  const userInfo = await userDao.userInfoCheck(username);
  console.log(userInfo, 'service1')
  if ( !userInfo ) {
    const error = new Error('INVALID_INFORMATION');
    error.statusCode = 401;

    throw error;
  };
  console.log(userInfo.password, 'service2')
  const validatePassword = await bcrypt.compare(password, userInfo.password);
  console.log(validatePassword, 'service3')
  if ( !validatePassword ) {
    const error = new Error('INVALID_INFORMATION');
    error.statusCode = 401;

    throw error;
  };
  
  const accessToken = jwt.sign(
    {
      id : userInfo.id,
      user : userInfo.username
    }, process.env.JWT_SECRET,
    {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
  
  return accessToken;
}

module.exports = {
  signUp,
  signIn
};