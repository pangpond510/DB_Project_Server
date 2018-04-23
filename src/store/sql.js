// prettier-ignore

module.exports = {
  typeQuery: (id) => 
    `SELECT userType FROM User WHERE id = '${id}';`,

  loginQuery: (id) => 
    `SELECT * FROM User WHERE id = '${id}';`,

  userBasicInfoQuery: (id, userType) => 
    `SELECT id, firstName, lastName, userType 
      FROM ${userType} NATURAL JOIN User 
      WHERE id = '${id}';`,

  yearSemesterQuery: (id) => 
    `SELECT DISTINCT year, semester 
      FROM Enroll WHERE sId = '${id}' 
      ORDER BY year,semester;`,

  courseQuery: (id,year,semester) => 
    `SELECT * FROM Enroll NATURAL JOIN Course 
      WHERE sId = '${id}' AND semester = '${semester}' AND year = '${year}';`,

  userInfoQuery: (id, userType) => 
    `SELECT * FROM ${userType} NATURAL JOIN Faculty WHERE id = '${id}';`,

  availCourseQuery: (year, semester) => 
    `SELECT DISTINCT courseId, courseName, shortName, credit, semester, year FROM Course NATURAL JOIN Class 
      WHERE semester = ${semester} AND year = ${year} 
      ORDER BY courseId`,

  courseSectionQuery: (courseId, year, semester) => 
    `SELECT * FROM Course NATURAL JOIN Class 
      WHERE courseId = '${courseId}' AND semester = ${semester} AND year = ${year} 
      ORDER BY sectionNumber;`,

  adviseeGradeQuery: id => 
    `SELECT S.firstName, S.lastName, E.sId,sum(C.credit) AS sumCredit ,sum(C.credit*E.grade) AS sumGrade 
      FROM ((Enroll E NATURAL JOIN Course C) INNER JOIN Student S ON E.sId = S.id) INNER JOIN Advise A ON E.sId = A.sId
      WHERE A.tid = '${id}' GROUP BY E.sId ORDER BY E.sId;`,
  
  addCourseQuery: (sid, courseId, section, semester, year, option) => 
    `INSERT INTO Enroll (sId, courseId, sectionNumber, year, semester, status, enrollDate) 
      VALUES ('${sid}', '${courseId}', '${section}', ${year}, ${semester}, '${option}', CURDATE());`,
      
  dropCourseQuery: (sid, courseId, section, semester, year, option) => 
    `UPDATE Enroll
      SET status = '${option}'
      WHERE Sid='${sid}' AND courseId='${courseId}' AND sectionNumber='${section}' AND year=${year} AND semester=${semester};`,

  checkCourseCanRegister: (sid, courseId) => 
    `SELECT * from Enroll
      WHERE sId = '${sid}' AND courseId = '${courseId}' AND (status = 'Finish' OR status = 'Pending' OR status = 'Studying');`,

  undoRegister: (id, courseId, section, semester, year) => 
    `DELETE FROM Enroll 
      WHERE courseId = '${courseId}' and sId = '${id}' and sectionNumber = '${section}' and year = ${year} and semester = ${semester} and status = 'Pending';`,

  checkEnrollCountQuery: (courseId, section, semester, year, status) => 
    `SELECT courseId, sectionNumber, year, semester, count(sId) AS count, maxEnrollment
      FROM Enroll NATURAL JOIN Class
      WHERE courseId='${courseId}' AND sectionNumber='${section}' AND year=${year} AND semester=${semester} AND status='${status}'
      GROUP BY courseId, sectionNumber, year, semester;`,
      
  checkCourseStatus: (sid, courseId, section, semester, year) => 
    `SELECT status from Enroll
      WHERE sId = '${sid}' AND courseId = '${courseId}' AND sectionNumber = '${section}' AND year = ${year} AND semester = ${semester};`,

  checkPendingCourse: (sid, semester, year) => 
    `SELECT courseId, courseName, shortName, sectionNumber, credit 
      FROM Enroll NATURAL JOIN Course 
      WHERE sId = '${sid}' AND semester = ${semester} AND year = ${year} AND status = 'Pending'`,

  checkRegisterResult: (sid, semester, year) => 
    `SELECT courseId, courseName, shortName, sectionNumber, credit 
      FROM Enroll NATURAL JOIN Course 
      WHERE sId = '${sid}' AND semester = ${semester} AND year = ${year} AND ( status = 'Studying' OR status = 'Denied')`
};
