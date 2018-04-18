const { connection } = require('./constant.js');

const query = sql => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = {
  authenticate: async ({ username, password }) => {
    console.log(`Authenticating user ${username}`);
    const results = await query(
      `SELECT * 
          FROM User
          WHERE Id = '${username}';`
    );
    if (results.length === 0 || password !== results[0].Password) {
      return { success: false };
    }
    if (password === results[0].Password) {
      let userInfo;
      if (results[0].UserType === 'Student')
        userInfo = await query(
          `SELECT Id As Id, FirstName, LastName, UserType 
              FROM Student NATURAL JOIN User
              WHERE Id = '${results[0].Id}';`
        );
      else if (results[0].UserType === 'Teacher')
        userInfo = await query(
          `SELECT Id As Id, FirstName, LastName, UserType 
              FROM Teacher NATURAL JOIN User
              WHERE Id = '${results[0].Id}';`
        );
      else if (results[0].UserType === 'Officer')
        userInfo = await query(
          `SELECT Id As Id, FirstName, LastName, UserType 
              FROM Officer NATURAL JOIN User
              WHERE Id = '${results[0].Id}';`
        );
      else return { success: false };
      return {
        success: true,
        userInfo: {
          id: userInfo[0].Id,
          firstName: userInfo[0].FirstName,
          lastName: userInfo[0].LastName,
          userType: userInfo[0].UserType
        }
      };
    }
  },
  getGrade: async ({ id }) => {
    console.log(`checking grade of user id ${id}`);
    const userType = await query(`SELECT UserType FROM User WHERE Id = '${id}';`);
    if (userType[0].UserType !== 'Student') return { success: false };

    const semesterInfo = await query(`SELECT DISTINCT Year, Semester FROM Enroll WHERE Sid = '${id}'`);
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
      const courseInfo = await query(
        `SELECT * 
            FROM Enroll NATURAL JOIN Course
            WHERE Sid = '${id}' AND Semester = '${semesterInfo[s].Semester}' AND Year = '${semesterInfo[s].Year}'`
      );
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
          gpa: sumGrade / sumCredit,
          ca: sumCredit,
          gpax: sumGradeX / sumCreditX,
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
  },
  getInfo: async ({ id }) => {
    const userInfo = await query(`SELECT * FROM Student NATURAL JOIN Faculty WHERE Id = '${id}';`);
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
  }
};
