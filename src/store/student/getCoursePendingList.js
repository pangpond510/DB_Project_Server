const { query } = require('../utils.js');
const sql = require('../sql.js');

const getCoursePendingListApi = (req, res) => {
  getCoursePendingList({
    id: req.params.id
  }).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getCoursePendingList = async ({ id }) => {
  process.stdout.write(`get course pending list of student ${id} . . . `);

  // get semester and year
  semester = 2;
  year = 2017;

  const courseList = query(sql.checkPendingCourse(id, semester, year));

  console.log('DONE!!');
  return courseList;
};

module.exports = getCoursePendingListApi;
