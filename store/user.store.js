const { query } = require('./utils.js');
const sql = require('./sql.js');

const authenticate = async ({ username, password }) => {
  console.log(`Authenticating user ${username}`);

  const results = await query(sql.loginQuery(username));

  if (results.length === 0 || password !== results[0].Password) {
    return { success: false };
  }

  const userInfo = await query(sql.userBasicInfoQuery(username, results[0].UserType));

  return {
    success: true,
    userInfo: {
      id: userInfo[0].Id,
      firstName: userInfo[0].FirstName,
      lastName: userInfo[0].LastName,
      userType: userInfo[0].UserType
    }
  };
};

module.exports = {
  authenticate
};
