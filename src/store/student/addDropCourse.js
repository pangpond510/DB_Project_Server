const { query } = require('../utils.js');

const addDropCourseApi = (req, res) => {
  addDropCourse(req.body).then(result => {
    if (result.success) {
      res.send(result.courseApproveList);
    } else {
      res.sendStatus(400);
    }
    res.end();
  });
};

const addDropCourse = async ({ id, courseList }) => {
  process.stdout.write(`stduent ${id} tries to add and/or drop courses . . `);

  const result = await query(checkAcademicStatusQuery());
  const { year, semester, registrationStatus } = result[0];
  if (registrationStatus !== 'add/drop' && registrationStatus !== 'withdraw') {
    console.log('add/drop FAIL!!');
    return { success: false };
  }
  console.log('');

  for (let i = 0; i < courseList.length; i++) {
    const { courseId, section, option } = courseList[i];

    if (option === 'add') {
      await addCourse(id, courseId, section, semester, year);
    } else if (option === 'drop') {
      await dropCourse(id, courseId, section, semester, year);
    } else if (option === 'withdraw') {
      await withdrawCourse(id, courseId, section, semester, year);
    }
  }

  let courseApproveList = await query(checkApproveCourseQuery(id, semester, year));
  courseApproveList = courseApproveList.map((course, i) => ({
    ...course,
    key: i
  }));

  console.log('add/drop DONE!!');
  return { success: true, courseApproveList };
};

const addCourse = async (id, courseId, section, semester, year) => {
  process.stdout.write(`   stduent ${id} adds course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  //check not studying or pass this course
  const status = await query(canRegisterQuery(id, courseId));
  if (status.length > 0) {
    console.log('FAIL!!');
  }

  // check enroll is not full
  const result = await query(checkEnrollCountQuery(courseId, section, semester, year));
  if (result[0] && result[0].count >= result[0].maxEnrollment) {
    console.log('FAIL!!');
  }

  try {
    await query(addCourseQuery(id, courseId, section, semester, year, 'Studying'));
    console.log('DONE!!');
  } catch (error) {
    console.log(error);
    console.log('FAIL!!');
  }
};

const dropCourse = async (id, courseId, section, semester, year) => {
  process.stdout.write(`   stduent ${id} drops course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  // check studying this course
  const status = await query(checkCourseStatus(id, courseId, section, semester, year));
  if (status.length === 0 || status[0].status !== 'Studying') {
    console.log('FAIL!!');
  }

  try {
    await query(dropCourseQuery(id, courseId, section, semester, year));
    console.log('DONE!!');
  } catch (error) {
    console.log(error);
    console.log('FAIL!!');
  }
};

const withdrawCourse = async (id, courseId, section, semester, year) => {
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
const canRegisterQuery = (sid, courseId) =>
    `SELECT * from Enrollment
      WHERE sId = '${sid}' AND courseId = '${courseId}' AND (status = 'Finish' OR status = 'Pending' OR status = 'Studying');`;

// prettier-ignore
const checkEnrollCountQuery = (courseId, section, semester, year) =>
    `SELECT courseId, sectionNumber, year, semester, count(sId) AS count, maxEnrollment
      FROM Enrollment NATURAL JOIN Class
      WHERE courseId='${courseId}' AND sectionNumber='${section}' AND year=${year} AND semester=${semester} AND status='Studying'
      GROUP BY courseId, sectionNumber, year, semester;`;

// prettier-ignore
const addCourseQuery = (sid, courseId, section, semester, year) =>
    `INSERT INTO Enrollment (sId, courseId, sectionNumber, year, semester, status, enrollDate) 
      VALUES ('${sid}', '${courseId}', '${section}', ${year}, ${semester}, 'Studying', CURDATE());`;

// prettier-ignore
const checkCourseStatus = (sid, courseId, section, semester, year) =>
    `SELECT status from Enrollment
      WHERE sId = '${sid}' AND courseId = '${courseId}' AND sectionNumber = '${section}' AND year = ${year} AND semester = ${semester};`;

// prettier-ignore
const dropCourseQuery = (sid, courseId, section, semester, year) =>
    `UPDATE Enrollment
      SET status = 'Drop'
      WHERE Sid='${sid}' AND courseId='${courseId}' AND sectionNumber='${section}' AND year=${year} AND semester=${semester} AND status='Studying';`;

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

module.exports = addDropCourseApi;
