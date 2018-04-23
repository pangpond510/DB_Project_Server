const { query } = require('../utils.js');
const sql = require('../sql.js');

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

  // check peroid ช่วงลงทะเบียนปกติ
  year = 2017;
  semester = 2;

  // check already register or not (has pending coure)
  const checkPending = await query(sql.checkPendingCourse(id, semester, year));
  if (checkPending.length > 0) {
    console.log('register FAIL!!');
    return { success: false };
  }
  console.log('');

  let success = true;
  let detail = [];
  for (let index = 0; index < courseList.length; index++) {
    const { courseId, section } = courseList[index];

    process.stdout.write(`   stduent ${id} registers for course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

    //check not studying or pass this course
    const status = await query(sql.checkCourseCanRegister(id, courseId));
    if (status.length > 0) {
      console.log('FAIL!!');
      success = false;
      detail.push({
        courseId,
        section,
        status: 'Error'
      });
      continue;
    }

    try {
      await query(sql.addCourseQuery(id, courseId, section, semester, year, 'Pending'));
      detail.push({
        courseId,
        section,
        status: 'Pending'
      });
      console.log('DONE!!');
    } catch (error) {
      detail.push({
        courseId,
        section,
        status: 'Error'
      });
      console.log('FAIL!!');
      success = false;
    }
  }

  if (success) {
    console.log('register DONE!!');
    return {
      success: true,
      result: {
        success: true,
        detail
      }
    };
  } else {
    for (let index = 0; index < detail.length; index++) {
      const { courseId, section, status } = detail[index];
      if (status === 'Pending') {
        await query(sql.undoRegister(id, courseId, section, semester, year));
        detail[index].status = '';
      }
    }
    console.log('register FAIL!!');
    return {
      success: true,
      result: {
        success: false,
        detail
      }
    };
  }
};

module.exports = registerCourseApi;
