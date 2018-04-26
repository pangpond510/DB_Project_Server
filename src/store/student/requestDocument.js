const { query } = require('../utils.js');

const requestDocumentApi = (req, res) => {
  requestDocument(req.body).then(result => {
    if (result.success) {
      res.send(result.docList);
    } else {
      res.sendStatus(400);
    }
    res.end();
  });
};

const requestDocument = async ({ id, docId }) => {
  process.stdout.write(`stduent ${id} request for document ${docId} . . . `);

  try {
    await query(requestDocumentQuery(id, docId));

    let docList = await query(getStudentRequestQuery(id));
    docList = docList.map((doc, i) => ({ ...doc, key: i }));

    console.log('DONE!!');
    return {
      success: true,
      docList
    };
  } catch (error) {
    console.log('FAIL!!');
    return 400;
  }
};

// prettier-ignore
const requestDocumentQuery = (id, docId) => 
    `INSERT INTO Request (sId, documentId, status, requestDate) 
      VALUES ('${id}','${docId}', 'Pending', CURDATE())`;

// prettier-ignore
const getStudentRequestQuery = (id) =>
    `SELECT * FROM Request WHERE sId = '${id}'`;

module.exports = requestDocumentApi;
