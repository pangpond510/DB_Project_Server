const { query } = require('../utils.js');
const sql = require('../sql.js');

const getCourseSectionApi = (req, res) => {
  getCourseSection(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getCourseSection = async ({ courseId, year, semester }) => {
  console.log(`Checking detail for course ${courseId} in semester ${year}/${semester}`);

  const courseList = await query(sql.courseSectionQuery(courseId, year, semester));
  return courseList;
};

module.exports = getCourseSectionApi;
