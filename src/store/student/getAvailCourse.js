const { query } = require('../utils.js');
const sql = require('../sql.js');

const getAvailCourseApi = (req, res) => {
  getAvailCourse(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getAvailCourse = async ({ year, semester }) => {
  process.stdout.write(`Checking available course in semester ${year}/${semester} . . . `);

  const courseList = await query(sql.availCourseQuery(year, semester));

  console.log('DONE!!');
  return courseList;
};

module.exports = getAvailCourseApi;
