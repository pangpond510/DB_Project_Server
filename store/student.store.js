const { query } = require('./utils.js');
const sql = require('./sql.js');

const getGrade = async ({ id }) => {
  console.log(`Checking grade of student ${id}`);

  const semesterInfo = await query(sql.yearSemesterQuery(id));
  let gradeInfo = {};
  let semesterList = [];
  let sumGradeX = 0;
  let sumCreditX = 0;
  for (const s in semesterInfo) {
    const semester = `${semesterInfo[s].year}/${semesterInfo[s].semester}`;
    const courseInfo = await query(sql.courseQuery(id, semesterInfo[s].year, semesterInfo[s].semester));
    let courseList = [];
    let sumGrade = 0;
    let sumCredit = 0;
    for (const c in courseInfo) {
      const course = courseInfo[c];
      sumGrade = sumGrade + course.grade * course.credit;
      sumCredit = sumCredit + course.credit;
      courseList.push({
        key: c,
        ...course
      });
    }
    sumGradeX = sumGradeX + sumGrade;
    sumCreditX = sumCreditX + sumCredit;
    gradeInfo[semester] = {
      courseList,
      stat: {
        key: s,
        gpa: (sumGrade / sumCredit).toFixed(2),
        ca: sumCredit,
        gpax: (sumGradeX / sumCreditX).toFixed(2),
        cax: sumCreditX
      }
    };
    semesterList.push(semester);
  }
  gradeInfo = {
    ...gradeInfo,
    semesterList
  };
  return gradeInfo;
};

const getInfo = async ({ id }) => {
  console.log(`Checking information of student ${id}`);

  const userInfo = await query(sql.userInfoQuery(id, 'Student'));
  return {
    id: userInfo[0].id,
    ssn: userInfo[0].ssn,
    firstName: userInfo[0].firstName,
    lastName: userInfo[0].lastName,
    tel: userInfo[0].tel,
    email: userInfo[0].email,
    address: {
      houseNo: userInfo[0].houseNumber,
      road: userInfo[0].road,
      district: userInfo[0].district,
      subDistrict: userInfo[0].subDistrict,
      province: userInfo[0].province,
      zipCode: userInfo[0].zipCode
    },
    faculty: userInfo[0].facultyName
  };
};

const getAvailCourse = async ({ year, semester }) => {
  console.log(`Checking available course in semester ${year}/${semester}`);

  const courseList = await query(sql.availCourseQuery(year, semester));
  return courseList;
};

const getCourseSection = async ({ courseId, year, semester }) => {
  console.log(`Checking detail for course ${courseId} in semester ${year}/${semester}`);

  const courseList = await query(sql.courseSectionQuery(courseId, year, semester));
  return courseList;
};

const registerCourse = async ({ id, courseId, section, semester, year }) => {
  process.stdout.write(`stduent ${id} registers for course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

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
    console.log('FAIL!! 1');
    return { status: 400 };
  }

  // check peroid ช่วงลดเพิ่ม

  try {
    await query(sql.addCourseQuery(id, courseId, section, semester, year, 'Studying'));
  } catch (error) {
    console.log('FAIL!! 2');
    return { status: 400 };
  }

  console.log('DONE!!');
  return { status: 200 };
};

const dropCourse = async ({ id, courseId, section, semester, year }) => {
  process.stdout.write(`stduent ${id} drops for course: ${courseId} section: ${section} semester: ${year}/${semester} . . . `);

  // check enroll 'Studying'
  const status = await query(sql.checkCourseStatus(id, courseId, section, semester, year));
  if (status[0].status !== 'Studying') {
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
  if (status[0].status !== 'Studying') {
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

const getCoursePendingList = async ({ id }) => {
  console.log(`get course pending list of student ${id}`);

  const courseList = query(sql.checkPendingCourse(id));
  return courseList;
};

const getRegisterResult = async ({ id }) => {
  console.log(`check register result of student ${id}`);

  // get semester and year
  semester = 2;
  year = 2017;

  const courseList = query(sql.checkRegisterResult(id, semester, year));
  return courseList;
};

module.exports = {
  getGrade,
  getInfo,
  getAvailCourse,
  getCourseSection,
  registerCourse,
  addCourse,
  dropCourse,
  withdrawCourse,
  getCoursePendingList,
  getRegisterResult
};
