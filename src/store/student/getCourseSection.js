const { query } = require('../utils.js');

const getCourseSectionApi = (req, res) => {
  getCourseSection(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getCourseSection = async ({ courseId, year, semester }) => {
  process.stdout.write(`Checking detail for course ${courseId} in semester ${year}/${semester} . . . `);

  const courseDetail = await query(courseDetailQuery(courseId));
  const sectionList = await query(sectionDetailQuery(courseId, year, semester));

  for (let i = 0; i < sectionList.length; i++) {
    const section = sectionList[i];
    const enroll = await query(checkEnrollCountQuery(courseId, section.sectionNumber, semester, year, 'Studying'));
    sectionList[i].enrollNumber = enroll.length === 0 ? 0 : enroll[0].count;
    sectionList[i].key = i;
  }

  console.log('DONE!!');
  return {
    ...courseDetail[0],
    semester: semester,
    year: year,
    sectionList: sectionList
  };
};

// prettier-ignore
const courseDetailQuery = courseId => 
    `SELECT * FROM Course WHERE CourseId = '${courseId}'`;

// prettier-ignore
const sectionDetailQuery = (courseId, year, semester) => 
    `SELECT Cl.courseId, Cl.sectionNumber, GROUP_CONCAT(DISTINCT T.tId ORDER BY T.tId SEPARATOR ', ') As Teacher , GROUP_CONCAT(DISTINCT CONCAT(Cs.day, ' (',  Cs.startTime, ' - ', DATE_ADD(Cs.startTime, INTERVAL Cs.period HOUR_MINUTE), ')') ORDER BY Cs.day, Cs.startTime SEPARATOR '\n') As Time
      FROM Class Cl #NATURAL JOIN Teach T NATURAL JOIN ClassSchedule Cs
      LEFT JOIN Teach T ON Cl.courseId = T.courseId AND Cl.sectionNumber = T.sectionNumber AND Cl.semester = T.semester AND Cl.year = T.year
      LEFT JOIN ClassSchedule Cs ON Cl.courseId = Cs.courseId AND Cl.sectionNumber = Cs.sectionNumber AND Cl.semester = Cs.semester AND Cl.year = Cs.year
      WHERE Cl.courseId = '${courseId}' AND Cl.year = ${year} AND Cl.semester = ${semester}
      GROUP BY Cl.courseId, Cl.sectionNumber, Cl.year, Cl.semester
      ORDER BY Cl.courseId, Cl.sectionNumber, Cl.year, Cl.semester;`;

// prettier-ignore
const checkEnrollCountQuery = (courseId, section, semester, year, status) =>
    `SELECT courseId, sectionNumber, year, semester, count(sId) AS count, maxEnrollment
      FROM Enroll NATURAL JOIN Class
      WHERE courseId='${courseId}' AND sectionNumber='${section}' AND year=${year} AND semester=${semester} AND status='${status}'
      GROUP BY courseId, sectionNumber, year, semester;`;

module.exports = getCourseSectionApi;
