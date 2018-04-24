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
      WHERE sId = '${id}' AND semester = '${semester}' AND year = '${year}' AND (status = 'Finish' OR status = 'Withdraw');`,

  userInfoQuery: (id, userType) => 
    `SELECT * FROM ${userType} NATURAL JOIN Faculty WHERE id = '${id}';`,

  availCourseQuery: (year, semester) => 
    `SELECT DISTINCT courseId, courseName, shortName, credit, semester, year FROM Course NATURAL JOIN Class 
      WHERE semester = ${semester} AND year = ${year} 
      ORDER BY courseId`,
  
  courseDetailQuery: (courseId) => 
    `SELECT * FROM Course WHERE CourseId = '${courseId}'`,

  courseSectionQuery: (courseId, year, semester) => 
    `SELECT Cl.courseId, Cl.sectionNumber, GROUP_CONCAT(DISTINCT T.tId ORDER BY T.tId SEPARATOR ', ') As Teacher , GROUP_CONCAT(DISTINCT CONCAT(Cs.day, ' (',  Cs.startTime, ' - ', DATE_ADD(Cs.startTime, INTERVAL Cs.period HOUR_MINUTE), ')') ORDER BY Cs.day, Cs.startTime SEPARATOR '\n') As Time
      FROM Class Cl #NATURAL JOIN Teach T NATURAL JOIN ClassSchedule Cs
      LEFT JOIN Teach T ON Cl.courseId = T.courseId AND Cl.sectionNumber = T.sectionNumber AND Cl.semester = T.semester AND Cl.year = T.year
      LEFT JOIN ClassSchedule Cs ON Cl.courseId = Cs.courseId AND Cl.sectionNumber = Cs.sectionNumber AND Cl.semester = Cs.semester AND Cl.year = Cs.year
      WHERE Cl.courseId = '${courseId}' AND Cl.year = ${year} AND Cl.semester = ${semester}
      GROUP BY Cl.courseId, Cl.sectionNumber, Cl.year, Cl.semester
      ORDER BY Cl.courseId, Cl.sectionNumber, Cl.year, Cl.semester;`,

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
      WHERE sId = '${sid}' AND semester = ${semester} AND year = ${year} AND ( status = 'Studying' OR status = 'Denied')`,
  
  checkPaymentStatusQuery: (sid) =>
    `SELECT * FROM StudentPayment WHERE sId = '${id}'`,

  checkAcademicStatus: () => 
    `SELECT * FROM AcademicStatus;`,

  setAcademicStatus: (oldYear, oldSemester, oldStatus, newYear, newSemester, newStatus) => 
    `UPDATE AcademicStatus
      SET year = ${newYear}, semester = ${newSemester}, registerPeriod = '${newStatus}' 
      WHERE year = ${oldYear} AND semester = ${oldSemester} AND registerPeriod = '${oldStatus}';`
};
