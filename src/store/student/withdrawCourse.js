const { query } = require('../utils.js');

const withdrawCourseApi = (req, res) => {
  withdrawCourse(req.body).then(result => {
    if (result.success) {
      res.send(result.courseApproveList);
    } else {
      res.sendStatus(400);
    }
    res.end();
  });
};

const withdrawCourse = async ({ id, courseList }) => {
  process.stdout.write(`stduent ${id} tries to withdraw courses . . `);

  const result = await query(checkAcademicStatusQuery());
  const { year, semester, registrationStatus } = result[0];
  if (registrationStatus !== 'withdraw') {
    console.log('withdraw FAIL!!');
    return { success: false };
  }
  console.log('');

  for (let i = 0; i < courseList.length; i++) {
    const { courseId, section } = courseList[i];

    await withdraw(id, courseId, section, semester, year);
  }

  let courseApproveList = await query(checkApproveCourseQuery(id, semester, year));
  courseApproveList = courseApproveList.map((course, i) => ({
    ...course,
    key: i
  }));

  console.log('withdraw DONE!!');
  return { success: true, courseApproveList };
};

const dropCourse = async (id, courseId, section, semester, year) => {
  process.stdout.write(`   stduent ${id} withdraws course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  // check studying this course
  const status = await query(checkCourseStatus(id, courseId, section, semester, year));
  if (status.length === 0 || status[0].status !== 'Studying') {
    console.log('FAIL!!');
  }

  try {
    await query(withdrawCourseQuery(id, courseId, section, semester, year));
    console.log('DONE!!');
  } catch (error) {
    console.log(error);
    console.log('FAIL!!');
  }
};

// prettier-ignore
const checkAcademicStatusQuery = () => 
    `SELECT * FROM AcademicPeriod WHERE status ='now' ;`;

// prettier-ignore
const checkCourseStatus = (sid, courseId, section, semester, year) =>
    `SELECT status from Enrollment
      WHERE sId = '${sid}' AND courseId = '${courseId}' AND sectionNumber = '${section}' AND year = ${year} AND semester = ${semester};`;

// prettier-ignore
const withdrawCourseQuery = (sid, courseId, section, semester, year) =>
    `UPDATE Enrollment
      SET status = 'Withdraw'
      WHERE Sid='${sid}' AND courseId='${courseId}' AND sectionNumber='${section}' AND year=${year} AND semester=${semester} AND status='Studying';`;

// prettier-ignore
const checkApproveCourseQuery = (sid, semester, year) =>
    `SELECT courseId, courseName, shortName, sectionNumber, credit, status
      FROM Enrollment NATURAL JOIN Course 
      WHERE sId = '${sid}' AND semester = ${semester} AND year = ${year} AND status = 'Studying';`;

module.exports = withdrawCourseApi;
