const { connection } = require('../constant.js');
const sql = require('./sql.js');

const query = sql => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

const isUserType = async (id, userType) => {
  const type = await query(sql.typeQuery(id));
  if (type[0].UserType === userType) return true;
  else return false;
  console.log(type[0].UserType);
};

module.exports = {
  query,
  isUserType
};
