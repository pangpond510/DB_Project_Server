const { query } = require('../utils.js');
const sql = require('../sql.js');

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

  classList.forEach(async (c, i) => {
    const studentList = await query(sql.checkStudentRegisterationCourseList(c.courseId, c.sectionNumber, year, semester));
    const result = await query(sql.checkClassDetail(c.courseId, c.sectionNumber, year, semester));
    const maxEnrollment = result[0].maxEnrollment;

    let acceptRegistrationQuery = `UPDATE Enroll SET status = 'Studying' WHERE (`;
    for (let i = 0; i < studentList.length; i++) {
      const s = studentList[i];
      if (i + 1 === studentList.length) acceptRegistrationQuery = acceptRegistrationQuery + ` sId = '${s.sId}' `;
      else acceptRegistrationQuery = acceptRegistrationQuery + ` sId = '${s.sId}' OR `;
    }
    acceptRegistrationQuery =
      acceptRegistrationQuery +
      `) AND courseId = '${c.courseId}' AND sectionNumber = '${c.sectionNumber}' AND year = ${year} AND semester = ${semester};`;

    await query(acceptRegistrationQuery);
  });
};

module.exports = manageRegisterPeriodApi;
