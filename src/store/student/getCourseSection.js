const { query } = require('../utils.js');

const getCourseSectionApi = (req, res) => {
  getCourseSection(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getCourseSection = async ({ courseId, year, semester }) => {
  process.stdout.write(`Checking detail for course ${courseId} in semester ${year}/${semester} . . . `);

  const courseDetail = await query(courseDetailQuery(courseId));
  let sectionList = await query(sectionDetailQuery(courseId, year, semester));
  sectionList = sectionList.map((section, i) => ({ ...section, key: i }));

  console.log('DONE!!');
  return {
    ...courseDetail[0],
    semester: semester,
    year: year,
    sectionList: sectionList
  };
};

// prettier-ignore
const courseDetailQuery = courseId => 
    `SELECT * FROM Course WHERE CourseId = '${courseId}'`;

// prettier-ignore
const sectionDetailQuery = (courseId, year, semester) => 
    `SELECT sectionNumber, teacher, time, enrolled, maxEnrollment
      FROM Class NATURAL JOIN ClassSchedule NATURAL JOIN ClassTeacher NATURAL JOIN ClassStudying
      WHERE courseId = '${courseId}' AND year = ${year} AND semester = ${semester};`;
module.exports = getCourseSectionApi;
