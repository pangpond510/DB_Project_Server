const { query } = require('../utils.js');
const sql = require('../sql.js');

const shuffle = array => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const manageRegisterPeriodApi = (req, res) => {
  manageRegisterPeriod(req.body).then(result => {
    res.sendStatus(result.status);
    res.end();
  });
};

const manageRegisterPeriod = async ({ option }) => {
  process.stdout.write(`${option} register period . . . `);

  if (option === 'open') return await openRegisterPeroid();
  else if (option === 'close') return await closeRegisterPeroid();
};

const openRegisterPeroid = async () => {
  const result = await query(sql.checkAcademicStatus());
  const { year, semester, registerPeriod } = result[0];

  if (registerPeriod === 'none') {
    try {
      await query(sql.setAcademicStatus(year, semester, registerPeriod, year, semester, 'register'));
      console.log('DONE!!');
      return { status: 200 };
    } catch (error) {
      console.log('FAIL!!');
      return { status: 400 };
    }
  } else {
    console.log('FAIL!!');
    return { status: 400 };
  }
};

const closeRegisterPeroid = async () => {
  const result = await query(sql.checkAcademicStatus());
  const { year, semester, registerPeriod } = result[0];

  if (registerPeriod === 'register') {
    try {
      await query(sql.setAcademicStatus(year, semester, registerPeriod, year, semester, 'none'));
      conductRegistrationResult(year, semester);
      console.log('DONE!!');
      return { status: 200 };
    } catch (error) {
      console.log('FAIL!!');
      return { status: 400 };
    }
  } else {
    console.log('FAIL!!');
    return { status: 400 };
  }
};

const conductRegistrationResult = async (year, semester) => {
  const classList = await query(sql.checkPendingRegistrationClass(year, semester));

  classList.forEach(async (c, index) => {
    const studentList = await query(sql.checkStudentRegisterationCourseList(c.courseId, c.sectionNumber, year, semester));
    const result = await query(sql.checkClassDetail(c.courseId, c.sectionNumber, year, semester));
    const maxEnrollment = result[0].maxEnrollment;

    let luckyStudentList = Array.apply(null, { length: studentList.length }).map(Number.call, Number);
    luckyStudentList = shuffle(luckyStudentList);

    const luckyStudentNumber = studentList.length < maxEnrollment ? studentList.length : maxEnrollment;

    let acceptQuery = `UPDATE Enroll SET status = 'Studying' WHERE (`;
    let i = 0;
    while (i < luckyStudentNumber) {
      const s = studentList[luckyStudentList[i]];
      if (i + 1 === luckyStudentNumber) acceptQuery = acceptQuery + ` sId = '${s.sId}' `;
      else acceptQuery = acceptQuery + ` sId = '${s.sId}' OR `;
      i++;
    }
    acceptQuery =
      acceptQuery + `) AND courseId = '${c.courseId}' AND sectionNumber = '${c.sectionNumber}' AND year = ${year} AND semester = ${semester};`;

    query(acceptQuery);

    let denyQuery = `UPDATE Enroll SET status = 'Denied' WHERE (`;
    while (i < studentList.length) {
      const s = studentList[luckyStudentList[i]];
      if (i + 1 === studentList.length) denyQuery = denyQuery + ` sId = '${s.sId}' `;
      else denyQuery = denyQuery + ` sId = '${s.sId}' OR `;
      i++;
    }
    denyQuery =
      denyQuery + `) AND courseId = '${c.courseId}' AND sectionNumber = '${c.sectionNumber}' AND year = ${year} AND semester = ${semester};`;

    query(denyQuery);
  });
};

module.exports = manageRegisterPeriodApi;
