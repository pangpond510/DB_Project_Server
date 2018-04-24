const { query } = require('../utils.js');
const sql = require('../sql.js');

const getScheduleApi = (req, res) => {
  getSchedule(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getSchedule = async ({ id }) => {
  process.stdout.write(`Checking schedule of student ${id} . . . `);

  //console.log('DONE!!');
  return {};
};

module.exports = getScheduleApi;
