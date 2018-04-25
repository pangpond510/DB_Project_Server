const { query } = require('../utils.js');

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
  const result = await query(checkAcademicStatusQuery());
  const { year, semester, registerPeriod } = result[0];

  if (registerPeriod === 'none') {
    try {
      await query(setAcademicStatusQuery(year, semester, registerPeriod, year, semester, 'register'));

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
  const result = await query(checkAcademicStatusQuery());
  const { year, semester, registerPeriod } = result[0];

  if (registerPeriod === 'register') {
    try {
      await query(setAcademicStatusQuery(year, semester, registerPeriod, year, semester, 'none'));
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
  const classList = await query(checkPendingClassQuery(year, semester));

  classList.forEach(async (c, index) => {
    const studentList = await query(checkStudentRegisterQuery(c.courseId, c.sectionNumber, year, semester));
    const result = await query(checkClassDetail(c.courseId, c.sectionNumber, year, semester));
    const maxEnrollment = result[0].maxEnrollment;

    let luckyStudentList = Array.apply(null, { length: studentList.length }).map(Number.call, Number);
    luckyStudentList = shuffle(luckyStudentList);

    const luckyStudentNumber = studentList.length < maxEnrollment ? studentList.length : maxEnrollment;

    let acceptQuery = `UPDATE Enroll SET status = 'Studying' WHERE (`;
    let i = 0;
    while (i < luckyStudentNumber) {
      const s = studentList[luckyStudentList[i]];
      if (i + 1 === luckyStudentNumber) acceptQuery += ` sId = '${s.sId}' `;
      else acceptQuery += ` sId = '${s.sId}' OR `;
      i++;
    }
    acceptQuery += `) AND courseId = '${c.courseId}' AND sectionNumber = '${c.sectionNumber}' AND year = ${year} AND semester = ${semester};`;

    query(acceptQuery);

    let denyQuery = `UPDATE Enroll SET status = 'Denied' WHERE (`;
    while (i < studentList.length) {
      const s = studentList[luckyStudentList[i]];
      if (i + 1 === studentList.length) denyQuery += ` sId = '${s.sId}' `;
      else denyQuery += ` sId = '${s.sId}' OR `;
      i++;
    }
    denyQuery += `) AND courseId = '${c.courseId}' AND sectionNumber = '${c.sectionNumber}' AND year = ${year} AND semester = ${semester};`;

    query(denyQuery);
  });
};

// prettier-ignore
const checkAcademicStatusQuery = () => 
    `SELECT * FROM AcademicStatus;`;

// prettier-ignore
const setAcademicStatusQuery = (oldYear, oldSemester, oldStatus, newYear, newSemester, newStatus) =>
    `UPDATE AcademicStatus
      SET year = ${newYear}, semester = ${newSemester}, registerPeriod = '${newStatus}' 
      WHERE year = ${oldYear} AND semester = ${oldSemester} AND registerPeriod = '${oldStatus}';`;

// prettier-ignore
const checkPendingClassQuery = (year, semester) =>
    `SELECT DISTINCT courseId, sectionNumber 
      FROM Enroll 
      WHERE status = 'Pending' AND year = ${year} AND semester = ${semester};`;

// prettier-ignore
const checkStudentRegisterQuery = (courseId, section, year, semester) =>
    `SELECT sId FROM Enroll 
      WHERE courseId = '${courseId}' AND sectionNumber = '${section}' AND year = ${year} AND semester = ${semester} AND status = 'Pending';`;

// prettier-ignore
const checkClassDetail = (courseId, section, year, semester) =>
    `SELECT * FROM Class
      WHERE courseId = '${courseId}' AND sectionNumber = '${section}' AND year = ${year} AND semester = ${semester};`;

module.exports = manageRegisterPeriodApi;
