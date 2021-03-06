const { query } = require('../utils.js');

const getRegisterResultApi = (req, res) => {
  getRegisterResult({
    id: req.params.id
  }).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getRegisterResult = async ({ id }) => {
  console.log(`check approve course of student ${id} . . . `);

  const result = await query(checkAcademicStatusQuery());
  const { year, semester, registrationStatus } = result[0];

  let courseList = await query(checkApproveCourseQuery(id, semester, year));
  courseList = courseList.map((course, i) => ({ ...course, key: i }));

  console.log('DONE!!');
  return courseList;
};

// prettier-ignore
const checkAcademicStatusQuery = () => 
    `SELECT * FROM AcademicPeriod WHERE status ='now' ;`;

// prettier-ignore
const checkApproveCourseQuery = (sid, semester, year) =>
    `SELECT courseId, courseName, shortName, sectionNumber, credit, status
      FROM Enrollment NATURAL JOIN Course 
      WHERE sId = '${sid}' AND semester = ${semester} AND year = ${year} AND ( status = 'Studying' );`;

module.exports = getRegisterResultApi;
