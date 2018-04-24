const { query } = require('../utils.js');
const sql = require('../sql.js');

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

  const result = await query(sql.checkAcademicStatus());
  const { year, semester, registerPeriod } = result[0];
  if (registerPeriod !== 'add/drop') {
    console.log('register FAIL!!');
    return { success: false };
  }

  console.log('');

  let detail = [];
  for (let index = 0; index < courseList.length; index++) {
    const { courseId, section, option } = courseList[index];
    if (option === 'add') detail.push(await addCourse(id, courseId, section, semester, year));
    else if (option === 'drop') detail.push(await dropCourse(id, courseId, section, semester, year));
  }

  console.log('add/drop DONE!!');
  return { success: true, detail };
};

const addCourse = async (id, courseId, section, semester, year) => {
  process.stdout.write(`   stduent ${id} adds course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  //check not studying or pass this course
  const status = await query(sql.checkCourseCanRegister(id, courseId));
  if (status.length > 0) {
    console.log('FAIL!!');
    return {
      courseId,
      section,
      status: 'Error'
    };
  }

  // check enroll is not full
  const result = await query(sql.checkEnrollCountQuery(courseId, section, semester, year, 'Studying'));
  if (result[0] && result[0].count >= result[0].maxEnrollment) {
    console.log('FAIL!!');
    return {
      courseId,
      section,
      status: 'Error'
    };
  }

  try {
    await query(sql.addCourseQuery(id, courseId, section, semester, year, 'Studying'));
    console.log('DONE!!');
    return {
      courseId,
      section,
      status: 'Studying'
    };
  } catch (error) {
    console.log('FAIL!!');
    return {
      courseId,
      section,
      status: 'Error'
    };
  }
};

const dropCourse = async (id, courseId, section, semester, year) => {
  process.stdout.write(`   stduent ${id} drops course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  // check studying this course
  const status = await query(sql.checkCourseStatus(id, courseId, section, semester, year));
  if (status.length === 0 || status[0].status !== 'Studying') {
    console.log('FAIL!!');
    return {
      courseId,
      section,
      status: 'Error'
    };
  }

  try {
    await query(sql.dropCourseQuery(id, courseId, section, semester, year, 'Drop'));
    console.log('DONE!!');
    return {
      courseId,
      section,
      status: 'Drop'
    };
  } catch (error) {
    console.log('FAIL!!');
    return {
      courseId,
      section,
      status: 'Error'
    };
  }
};

module.exports = addDropCourseApi;
