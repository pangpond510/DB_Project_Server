const { query } = require('./utils.js');
const sql = require('./sql.js');

const authenticate = async ({ username, password }) => {
  console.log(`Authenticating user ${username}`);

  const results = await query(sql.loginQuery(username));

  if (results.length === 0 || password !== results[0].password) {
    return { success: false };
  }

  const userInfo = await query(sql.userBasicInfoQuery(username, results[0].userType));

  return {
    success: true,
    userInfo: userInfo[0]
  };
};

module.exports = {
  authenticate
};
