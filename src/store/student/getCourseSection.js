const { query } = require('../utils.js');
const sql = require('../sql.js');

const getCourseSectionApi = (req, res) => {
  getCourseSection(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getCourseSection = async ({ courseId, year, semester }) => {
  process.stdout.write(`Checking detail for course ${courseId} in semester ${year}/${semester} . . . `);

  const courseDetail = await query(sql.courseDetailQuery(courseId));
  const courseList = await query(sql.courseSectionQuery(courseId, year, semester));
  for (let index = 0; index < courseList.length; index++) {
    const course = courseList[index];
    const enroll = await query(sql.checkEnrollCountQuery(courseId, course.sectionNumber, semester, year, 'Studying'));
    courseList[index].enrollNumber = enroll.length === 0 ? 0 : enroll[0].count;
  }

  console.log('DONE!!');
  return {
    ...courseDetail[0],
    sectionList: courseList
  };
};

module.exports = getCourseSectionApi;
