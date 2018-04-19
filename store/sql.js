// prettier-ignore

module.exports = {
  typeQuery: id => `SELECT userType FROM User WHERE id = '${id}';`,
  loginQuery: id => `SELECT * FROM User WHERE id = '${id}';`,
  userBasicInfoQuery: (id, userType) => `SELECT id, firstName, lastName, userType FROM ${userType} NATURAL JOIN User WHERE id = '${id}';`,
  yearSemesterQuery: id => `SELECT DISTINCT year, semester FROM Enroll WHERE sid = '${id}' ORDER BY year,semester;`,
  courseQuery: (id,year,semester) => `SELECT * FROM Enroll NATURAL JOIN Course WHERE sid = '${id}' AND semester = '${semester}' AND year = '${year}';`,
  userInfoQuery: (id, userType) => `SELECT * FROM ${userType} NATURAL JOIN Faculty WHERE id = '${id}';`,
  availCourseQuery: (year, semester) => `SELECT * FROM Course NATURAL JOIN Class WHERE semester = ${semester} AND year = ${year} ORDER BY courseId, sectionNumber;`
};
