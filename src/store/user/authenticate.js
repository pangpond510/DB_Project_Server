const { query } = require('../utils.js');
const sql = require('../sql.js');

const authenticateApi = (req, res) => {
  authenticate(req.body).then(result => {
    if (result.success) res.send(JSON.stringify(result.userInfo));
    else res.sendStatus(401);
    res.end();
  });
};

const authenticate = async ({ username, password }) => {
  process.stdout.write(`Authenticating user ${username} . . . `);
  const results = await query(sql.loginQuery(username));
  if (results.length === 0 || password !== results[0].password) {
    console.log('FAIL!!');
    return { success: false };
  }
  const userInfo = await query(sql.userBasicInfoQuery(username, results[0].userType));

  console.log('DONE!!');
  return {
    success: true,
    userInfo: userInfo[0]
  };
};

module.exports = authenticateApi;
