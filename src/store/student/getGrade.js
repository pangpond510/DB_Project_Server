const { query } = require('../utils.js');

const getGradeApi = (req, res) => {
  getGrade(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getGrade = async ({ id }) => {
  process.stdout.write(`Checking grade of student ${id} . . . `);

  const semesterInfo = await query(yearSemesterQuery(id));

  let gradeInfo = {};
  let semesterList = [];
  let sumGradeX = 0;
  let sumCreditX = 0;
  for (let s = 0; s < semesterInfo.length; s++) {
    const { semester, year } = semesterInfo[s];

    const courseInfo = await query(courseQuery(id, year, semester));

    let courseList = [];
    let sumGrade = 0;
    let sumCredit = 0;
    for (let c = 0; c < courseInfo.length; c++) {
      const course = courseInfo[c];

      if (course.status === 'Finish') {
        sumGrade += course.grade * course.credit;
        sumCredit += course.credit;
      } else if (course.status === 'Withdraw') {
        course.grade = 'W';
      }

      courseList.push({
        key: c,
        ...course
      });
    }

    sumGradeX = sumGradeX + sumGrade;
    sumCreditX = sumCreditX + sumCredit;
    const gpa = sumCredit === 0 ? 0 : (sumGrade / sumCredit).toFixed(2);
    const gpax = sumCreditX === 0 ? 0 : (sumGradeX / sumCreditX).toFixed(2);

    gradeInfo[`${year}/${semester}`] = {
      courseList,
      stat: {
        gpa,
        ca: sumCredit,
        gpax,
        cax: sumCreditX
      }
    };

    semesterList.push(`${year}/${semester}`);
  }

  gradeInfo = {
    ...gradeInfo,
    semesterList
  };

  console.log('DONE!!');
  return gradeInfo;
};

// prettier-ignore
const yearSemesterQuery = (id) => 
    `SELECT DISTINCT year, semester 
      FROM Enrollment WHERE sId = '${id}' ORDER BY year, semester;`;

// prettier-ignore
const courseQuery = (id, year, semester) =>
    `SELECT courseId, courseName, shortName, credit, grade, status FROM Enrollment NATURAL JOIN Course 
      WHERE sId = '${id}' AND semester = '${semester}' AND year = '${year}' AND (status = 'Finish' OR status = 'Withdraw');`;

module.exports = getGradeApi;
