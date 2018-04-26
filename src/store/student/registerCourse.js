const { query } = require('../utils.js');

const registerCourseApi = (req, res) => {
  registerCourse(req.body).then(result => {
    if (result.success) {
      res.send(result.result);
    } else {
      res.sendStatus(400);
    }
    res.end();
  });
};

const registerCourse = async ({ id, courseList }) => {
  process.stdout.write(`stduent ${id} tries to register courses . . `);

  const result = await query(checkAcademicStatusQuery());
  const { year, semester, registrationStatus } = result[0];
  if (registrationStatus !== 'register') {
    console.log('register FAIL!!');
    return { success: false };
  }

  // check already register or not (has pending coure)
  const checkPending = await query(checkPendingCourseQuery(id, semester, year));
  if (checkPending.length > 0) {
    console.log('register FAIL!!');
    return { success: false };
  }
  console.log('');

  let success = true;
  let detail = [];
  for (let i = 0; i < courseList.length; i++) {
    const { courseId, section } = courseList[i];
    const courseDetail = await query(courseDetailQuery(courseId));
    const { courseName, credit } = courseDetail[0];
    const sectionNumber = section;

    process.stdout.write(`   stduent ${id} registers for course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

    //check not studying or pass this course
    let status = '';
    const registerStatus = await query(canRegisterQuery(id, courseId));
    if (registerStatus.length > 0) {
      status = 'Error';
      success = false;
      console.log('FAIL!!');
    }

    try {
      if (success && status !== 'Error') {
        await query(registerCourseQuery(id, courseId, section, semester, year));
        status = 'Pending';
      }
      console.log('DONE!!');
    } catch (error) {
      status = 'Error';
      success = false;
      console.log('FAIL!!');
    }

    detail.push({ courseId, courseName, sectionNumber, credit, status, key: i });
  }

  if (success) {
    console.log('register DONE!!');
    return {
      success: true,
      result: { success, detail }
    };
  } else {
    for (let i = 0; i < detail.length; i++) {
      const { courseId, section, status } = detail[i];
      if (status === 'Pending') {
        await query(undoRegisterQuery(id, courseId, section, semester, year));
        detail[i].status = '';
      }
    }
    console.log('register FAIL!!');
    return {
      success: true,
      result: { success, detail }
    };
  }
};

// prettier-ignore
const checkAcademicStatusQuery = () => 
    `SELECT * FROM AcademicPeriod WHERE status ='now' ;`;

// prettier-ignore
const checkPendingCourseQuery = (sid, semester, year) => 
    `SELECT courseId, sectionNumber
      FROM Enrollment
      WHERE sId = '${sid}' AND semester = ${semester} AND year = ${year} AND status = 'Pending';`;

// prettier-ignore
const courseDetailQuery = (courseId) => 
    `SELECT * FROM Course WHERE courseId = '${courseId}';`;

// prettier-ignore
const canRegisterQuery = (sid, courseId) =>
    `SELECT * from Enrollment
      WHERE sId = '${sid}' AND courseId = '${courseId}' AND (status = 'Finish' OR status = 'Pending' OR status = 'Studying');`;

// prettier-ignore
const registerCourseQuery = (sid, courseId, section, semester, year) =>
    `INSERT INTO Enrollment (sId, courseId, sectionNumber, year, semester, status, enrollDate) 
      VALUES ('${sid}', '${courseId}', '${section}', ${year}, ${semester}, 'Pending', CURDATE());`;

// prettier-ignore
const undoRegisterQuery = (id, courseId, section, semester, year) =>
    `DELETE FROM Enrollment 
      WHERE courseId = '${courseId}' and sId = '${id}' and sectionNumber = '${section}' and year = ${year} and semester = ${semester} and status = 'Pending';`;

module.exports = registerCourseApi;
