// prettier-ignore

module.exports = {
  typeQuery: id => `SELECT UserType FROM User WHERE Id = '${id}';`,
  loginQuery: id => `SELECT * FROM User WHERE Id = '${id}';`,
  userBasicInfoQuery: (id, userType) => `SELECT Id, FirstName, LastName, UserType FROM ${userType} NATURAL JOIN User WHERE Id = '${id}';`,
  yearSemesterQuery: id => `SELECT DISTINCT Year, Semester FROM Enroll WHERE Sid = '${id}' ORDER BY Year,Semester;`,
  courseQuery: (id,year,semester) => `SELECT * FROM Enroll NATURAL JOIN Course WHERE Sid = '${id}' AND Semester = '${semester}' AND Year = '${year}';`,
  userInfoQuery: (id, userType) => `SELECT * FROM ${userType} NATURAL JOIN Faculty WHERE Id = '${id}';`
};
