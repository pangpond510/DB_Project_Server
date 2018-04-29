const { query } = require('../utils.js');

const addDropCourseApi = (req, res) => {
  addDropCourse(req.body).then(result => {
    if (result.success) {
      res.send(result.detail);
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
  if (registrationStatus !== 'add/drop') {
    console.log('register FAIL!!');
    return { success: false };
  }
  console.log('');

  let detail = [];
  for (let i = 0; i < courseList.length; i++) {
    const { courseId, section, option } = courseList[i];
    const courseDetail = await query(courseDetailQuery(courseId));
    const { courseName, credit } = courseDetail[0];

    let result;
    if (option === 'add') {
      result = await addCourse(id, courseId, courseName, section, semester, year, credit);
    } else if (option === 'drop') {
      result = await dropCourse(id, courseId, courseName, section, semester, year, credit);
    }
    result.key = i;
    detail.push(result);
  }

  console.log('add/drop DONE!!');
  return { success: true, detail };
};

const addCourse = async (id, courseId, courseName, section, semester, year, credit) => {
  process.stdout.write(`   stduent ${id} adds course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  //check not studying or pass this course
  const status = await query(canRegisterQuery(id, courseId));
  if (status.length > 0) {
    console.log('FAIL!!');
    return { courseId, courseName, section, credit, status: 'Error' };
  }

  // check enroll is not full
  const result = await query(checkEnrollCountQuery(courseId, section, semester, year));
  if (result[0] && result[0].count >= result[0].maxEnrollment) {
    console.log('FAIL!!');
    return { courseId, courseName, section, credit, status: 'Error' };
  }

  try {
    await query(sql.addCourseQuery(id, courseId, section, semester, year, 'Studying'));

    console.log('DONE!!');
    return { courseId, courseName, section, credit, status: 'Studying' };
  } catch (error) {
    console.log('FAIL!!');
    return { courseId, courseName, section, credit, status: 'Error' };
  }
};

const dropCourse = async (id, courseId, courseName, section, semester, year, credit) => {
  process.stdout.write(`   stduent ${id} drops course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  // check studying this course
  const status = await query(checkCourseStatus(id, courseId, section, semester, year));
  if (status.length === 0 || status[0].status !== 'Studying') {
    console.log('FAIL!!');
    return { courseId, courseName, section, credit, status: 'Error' };
  }

  try {
    await query(dropCourseQuery(id, courseId, section, semester, year));

    console.log('DONE!!');
    return { courseId, courseName, section, credit, status: 'Drop' };
  } catch (error) {
    console.log('FAIL!!');
    return { courseId, courseName, section, credit, status: 'Error' };
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
const courseDetailQuery = (courseId) => 
    `SELECT * FROM Course WHERE courseId = '${courseId}';`;

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
      WHERE Sid='${sid}' AND courseId='${courseId}' AND sectionNumber='${section}' AND year=${year} AND semester=${semester};`;

module.exports = addDropCourseApi;
