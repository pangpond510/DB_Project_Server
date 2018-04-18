const { query } = require('./utils.js');

const authenticate = async ({ username, password }) => {
  console.log(`Authenticating user ${username}`);
  const results = await query(
    `SELECT * 
        FROM User
        WHERE Id = '${username}';`
  );
  if (results.length === 0 || password !== results[0].Password) {
    return { success: false };
  }
  if (password === results[0].Password) {
    let userInfo;
    if (results[0].UserType === 'Student')
      userInfo = await query(
        `SELECT Id As Id, FirstName, LastName, UserType 
            FROM Student NATURAL JOIN User
            WHERE Id = '${results[0].Id}';`
      );
    else if (results[0].UserType === 'Teacher')
      userInfo = await query(
        `SELECT Id As Id, FirstName, LastName, UserType 
            FROM Teacher NATURAL JOIN User
            WHERE Id = '${results[0].Id}';`
      );
    else if (results[0].UserType === 'Officer')
      userInfo = await query(
        `SELECT Id As Id, FirstName, LastName, UserType 
            FROM Officer NATURAL JOIN User
            WHERE Id = '${results[0].Id}';`
      );
    else return { success: false };
    return {
      success: true,
      userInfo: {
        id: userInfo[0].Id,
        firstName: userInfo[0].FirstName,
        lastName: userInfo[0].LastName,
        userType: userInfo[0].UserType
      }
    };
  }
};

module.exports = {
  authenticate
};
