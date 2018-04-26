const { query } = require('../utils.js');

const getDocumentListApi = (req, res) => {
  getDocumentList(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getDocumentList = async id => {
  process.stdout.write(`Checking document . . . `);

  let docList = await query(availCourseQuery());
  docList = docList.map((doc, i) => ({ ...doc, key: i }));

  let requestList = await query(getStudentRequestQuery(id));
  requestList = requestList.map((req, i) => ({ ...req, key: i }));

  console.log('DONE!!');
  return {
    requestList,
    docList
  };
};

// prettier-ignore
const availCourseQuery = (year, semester) => 
    `SELECT * FROM Document;`;

// prettier-ignore
const getStudentRequestQuery = (id) =>
    `SELECT * FROM Request WHERE sId = '${id};'`;

module.exports = getDocumentListApi;
