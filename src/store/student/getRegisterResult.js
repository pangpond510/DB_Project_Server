const { query } = require('../utils.js');
const sql = require('../sql.js');

const getRegisterResultApi = (req, res) => {
  getRegisterResult({
    id: req.params.id
  }).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getRegisterResult = async ({ id }) => {
  console.log(`check register result of student ${id}`);

  // get semester and year
  semester = 2;
  year = 2017;

  const courseList = query(sql.checkRegisterResult(id, semester, year));
  return courseList;
};

module.exports = getRegisterResultApi;
