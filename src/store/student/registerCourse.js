const { query } = require('../utils.js');
const sql = require('../sql.js');

const registerCourseApi = (req, res) => {
  if (req.body.option === 'register') {
    registerCourse(req.body.detail).then(result => {
      res.sendStatus(result.status);
      res.end();
    });
  } else if (req.body.option === 'add') {
    addCourse(req.body.detail).then(result => {
      res.sendStatus(result.status);
      res.end();
    });
  } else if (req.body.option === 'drop') {
    dropCourse(req.body.detail).then(result => {
      res.sendStatus(result.status);
      res.end();
    });
  } else if (req.body.option === 'withdraw') {
    withdrawCourse(req.body.detail).then(result => {
      res.sendStatus(result.status);
      res.end();
    });
  } else {
    res.sendStatus(400);
    res.end();
  }
};

const registerCourse = async ({ id, courseId, section, semester, year }) => {
  process.stdout.write(`stduent ${id} registers for course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  //check not studying or pass this course
  const status = await query(sql.checkCourseStatusHistory(id, courseId));
  for (let i = 0; i < status.length; i++) {
    const s = status[i];
    if (s.status === 'Studying' || s.status === 'Finish') {
      console.log('FAIL!!');
      return { status: 400 };
    }
  }

  // check peroid ช่วงลงทะเบียนปกติ

  try {
    await query(sql.addCourseQuery(id, courseId, section, semester, year, 'Pending'));
  } catch (error) {
    console.log('FAIL!!');
    return { status: 400 };
  }
  console.log('DONE!!');
  return { status: 200 };
};

const addCourse = async ({ id, courseId, section, semester, year }) => {
  process.stdout.write(`stduent ${id} adds for course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  // check enroll is not full
  const result = await query(sql.checkEnrollCountQuery(courseId, section, semester, year, 'Studying'));
  if (result[0] && result[0].count >= result[0].maxEnrollment) {
    console.log('FAIL!!');
    return { status: 400 };
  }

  //check not studying or pass this course
  const status = await query(sql.checkCourseStatusHistory(id, courseId));
  for (let i = 0; i < status.length; i++) {
    const s = status[i];
    if (s.status === 'Studying' || s.status === 'Finish') {
      console.log('FAIL!!');
      return { status: 400 };
    }
  }

  // check peroid ช่วงลดเพิ่ม

  try {
    await query(sql.addCourseQuery(id, courseId, section, semester, year, 'Studying'));
  } catch (error) {
    console.log('FAIL!!');
    return { status: 400 };
  }

  console.log('DONE!!');
  return { status: 200 };
};

const dropCourse = async ({ id, courseId, section, semester, year }) => {
  process.stdout.write(`stduent ${id} drops for course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  // check enroll 'Studying'
  const status = await query(sql.checkCourseStatus(id, courseId, section, semester, year));
  if (status.length == 0 || status[0].status !== 'Studying') {
    console.log('FAIL!!');
    return { status: 400 };
  }

  // check peroid ช่วงลดเพิ่ม

  try {
    await query(sql.dropCourseQuery(id, courseId, section, semester, year, 'Drop'));
  } catch (error) {
    console.log(error);
    console.log('FAIL!!');
    return { status: 400 };
  }

  console.log('DONE!!');
  return { status: 200 };
};

const withdrawCourse = async ({ id, courseId, section, semester, year }) => {
  process.stdout.write(`stduent ${id} withdraws for course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  // check enroll 'Studying'
  const status = await query(sql.checkCourseStatus(id, courseId, section, semester, year));
  if (status.length == 0 || status[0].status !== 'Studying') {
    console.log('FAIL!!');
    return { status: 400 };
  }

  // check peroid ช่วงถอน

  try {
    await query(sql.dropCourseQuery(id, courseId, section, semester, year, 'Withdraw'));
  } catch (error) {
    console.log('FAIL!!');
    return { status: 400 };
  }

  console.log('DONE!!');
  return { status: 200 };
};

module.exports = registerCourseApi;
