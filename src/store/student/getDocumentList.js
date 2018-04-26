const { query } = require('../utils.js');

const getDocumentListApi = (req, res) => {
  getDocumentList(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getDocumentList = async () => {
  process.stdout.write(`Checking document . . . `);

  let docList = await query(availCourseQuery());
  docList = docList.map((doc, i) => ({ document: `${doc.documentId} - ${doc.documentName}`, key: i }));

  console.log('DONE!!');
  return docList;
};

// prettier-ignore
const availCourseQuery = (year, semester) => 
    `SELECT * FROM Document`;

module.exports = getDocumentListApi;
