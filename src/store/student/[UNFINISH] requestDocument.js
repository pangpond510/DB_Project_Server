const { query } = require('../utils.js');
const sql = require('../sql.js');

const requestDocumentApi = (req, res) => {
  registerCourse(req.body).then(result => {
    if (result.success) {
      res.send(result.result);
    } else {
      res.sendStatus(400);
    }
    res.end();
  });
};

const requestDocument = async ({ id, docId }) => {
  process.stdout.write(`stduent ${id} request for document ${docId} . . . `);

  //console.log('DONE!!');
  return {};
};

module.exports = requestDocumentApi;
