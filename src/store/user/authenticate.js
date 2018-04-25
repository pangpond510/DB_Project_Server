const { query } = require('../utils.js');

const authenticateApi = (req, res) => {
  authenticate(req.body).then(result => {
    if (result.success) res.send(JSON.stringify(result.userInfo));
    else res.sendStatus(401);
    res.end();
  });
};

const authenticate = async ({ username, password }) => {
  process.stdout.write(`Authenticating user ${username} . . . `);

  const results = await query(loginQuery(username));
  if (results.length === 0 || password !== results[0].password) {
    console.log('FAIL!! (Username or password is not correct)');
    return { success: false };
  }

  const userInfo = await query(userBasicInfoQuery(username, results[0].userType));
  const academicStatus = await query(getAcademicStatusQuery());

  console.log('DONE!!');
  return {
    success: true,
    userInfo: {
      ...userInfo[0],
      academicStatus: academicStatus[0]
    }
  };
};

// prettier-ignore
const loginQuery = id => 
    `SELECT * FROM User WHERE id = '${id}';`;

// prettier-ignore
const userBasicInfoQuery = (id, userType) => 
    `SELECT id, firstName, lastName, userType FROM ${userType} NATURAL JOIN User WHERE id = '${id}';`;

// prettier-ignore
const getAcademicStatusQuery = () => 
    `SELECT * FROM AcademicStatus;`;

module.exports = authenticateApi;
