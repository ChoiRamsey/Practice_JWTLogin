const dataSource = require('./dataSource');

const createUser = async(username, hashedPassword, email) => {
  const result = await dataSource.query(`
    INSERT INTO users (
      username,
      password,
      email
    ) VALUES (?, ?, ?)
  `, [username, hashedPassword, email]
  );
  console.log(result, 'dao1')
  return result;
}

const userInfoCheck = async(username, email) => {
  const result = await dataSource.query(`
    SELECT
      id,
      username,
      password,
      email
    FROM users
    WHERE username = ? OR email = ?
  `, [username, email]
  );
  console.log(result, 'dao2')
  return result[0];
}

module.exports = {
  createUser,
  userInfoCheck
};