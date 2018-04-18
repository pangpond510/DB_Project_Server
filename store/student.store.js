const { query, isUserType } = require('./utils.js');
const sql = require('./sql.js');

const getGrade = async ({ id }) => {
  console.log(`Checking grade of user ${id}`);
  if (!isUserType(id, 'Student')) return { success: false };

  const semesterInfo = await query(sql.yearSemesterQuery(id));
  let gradeInfo = {};
  let semesterList = [];
  let sumGradeX = 0;
  let sumCreditX = 0;
  for (const s in semesterInfo) {
    let term;
    if (semesterInfo[s].Semester === 'First') term = 1;
    else if (semesterInfo[s].Semester === 'Second') term = 2;
    const year = semesterInfo[s].Year;
    const semester = `${year}/${term}`;
    const courseInfo = await query(sql.courseQuery(id, semesterInfo[s].Year, semesterInfo[s].Semester));
    let courseList = [];
    let sumGrade = 0;
    let sumCredit = 0;
    for (const c in courseInfo) {
      const course = courseInfo[c];
      sumGrade = sumGrade + course.Grade * course.Credit;
      sumCredit = sumCredit + course.Credit;
      courseList.push({
        courseId: course.CourseId,
        courseName: course.CourseName,
        credit: course.Credit,
        grade: course.Grade
      });
    }
    sumGradeX = sumGradeX + sumGrade;
    sumCreditX = sumCreditX + sumCredit;
    gradeInfo[semester] = {
      courseList,
      stat: {
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
  return { success: true, gradeInfo };
};

const getInfo = async ({ id }) => {
  console.log(`Checking information of user ${id}`);
  if (!isUserType(id, 'Student')) return { success: false };

  const userInfo = await query(sql.userInfoQuery(id, 'Student'));
  return {
    success: true,
    userInfo: {
      id: userInfo[0].Id,
      ssn: userInfo[0].Ssn,
      firstName: userInfo[0].FirstName,
      lastName: userInfo[0].LastName,
      tel: userInfo[0].Tel,
      email: userInfo[0].Email,
      address: {
        houseNo: userInfo[0].HouseNumber,
        road: userInfo[0].Road,
        district: userInfo[0].District,
        subDistrict: userInfo[0].SubDistrict,
        province: userInfo[0].Province,
        zipCode: userInfo[0].ZipCode
      },
      faculty: userInfo[0].FacultyName
    }
  };
};

module.exports = {
  getGrade,
  getInfo
};
