const { query } = require('../utils.js');

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

  const result = await query(checkAcademicStatusQuery());
  const { year, semester, registrationStatus } = result[0];

  let courseList = query(checkPendingCourseQuery(id, semester, year));
  courseList = courseList.map((course, i) => ({ ...course, key: i }));

  console.log('DONE!!');
  return courseList;
};

// prettier-ignore
const checkAcademicStatusQuery = () => 
    `SELECT * FROM AcademicPeriod WHERE status ='now' ;`;

// prettier-ignore
const checkPendingCourseQuery = (sid, semester, year) =>
    `SELECT courseId, courseName, shortName, sectionNumber, credit 
      FROM Enrollment NATURAL JOIN Course 
      WHERE sId = '${sid}' AND semester = ${semester} AND year = ${year} AND status = 'Pending'`;

module.exports = getCoursePendingListApi;
