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
  sectionList = sectionList.map((section, i) => ({ ...section, enrolled: `${section.enrolled}/${section.maxEnrollment}`, key: i }));

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
    `SELECT C.sectionNumber, teacher, enrolled, maxEnrollment, CS.time
      FROM Class C NATURAL JOIN ClassTeacher NATURAL JOIN ClassStudying
      LEFT JOIN ClassSchedule CS ON C.courseId = CS.courseId AND C.sectionNumber = CS.sectionNumber AND C.year = CS.year AND C.semester = CS.semester
      WHERE C.courseId = '${courseId}' AND C.year = ${year} AND C.semester = ${semester};`;
module.exports = getCourseSectionApi;
