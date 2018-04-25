const { query } = require('../utils.js');

const getAvailCourseApi = (req, res) => {
  getAvailCourse(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getAvailCourse = async ({ year, semester }) => {
  process.stdout.write(`Checking available course in semester ${year}/${semester} . . . `);

  let courseList = await query(availCourseQuery(year, semester));
  courseList = courseList.map((course, i) => ({ ...course, key: i }));

  console.log('DONE!!');
  return courseList;
};

// prettier-ignore
const availCourseQuery = (year, semester) => 
    `SELECT DISTINCT courseId, courseName, shortName, credit, semester, year FROM Course NATURAL JOIN Class 
      WHERE semester = ${semester} AND year = ${year} 
      ORDER BY courseId;`;

module.exports = getAvailCourseApi;
