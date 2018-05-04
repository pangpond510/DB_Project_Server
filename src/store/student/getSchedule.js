const { query } = require('../utils.js');

const getScheduleApi = (req, res) => {
  getSchedule(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getSchedule = async ({ id }) => {
  process.stdout.write(`Checking schedule of student ${id} . . . `);
  const result = await query(checkAcademicStatusQuery());
  const { year, semester } = result[0];

  let schedule = await query(checkScheduleQuery(id, year, semester));
  schedule = schedule.map((s, i) => ({ ...s, key: i }));

  console.log('DONE!!');
  return schedule;
};

// prettier-ignore
const checkAcademicStatusQuery = () => 
    `SELECT * FROM AcademicPeriod WHERE status ='now' ;`;

// prettier-ignore
const checkScheduleQuery = (id, year, semester) => 
    `SELECT courseId, shortName, time 
      FROM Enrollment NATURAL JOIN ClassSchedule NATURAL JOIN Course
      WHERE sId = ${id} AND year = ${year} AND semester = ${semester} AND status = 'Studying';`;

module.exports = getScheduleApi;
