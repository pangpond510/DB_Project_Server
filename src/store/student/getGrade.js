const { query } = require('../utils.js');
const sql = require('../sql.js');

const getGradeApi = (req, res) => {
  getGrade(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

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

module.exports = getGradeApi;
