const { query } = require('../utils.js');

const getRequestListApi = (req, res) => {
  getRequestList(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getRequestList = async id => {
  process.stdout.write(`Checking document . . . `);

  let requestList = await query(getRequestQuery(id));
  requestList = requestList.map((req, i) => ({ ...req, key: i }));

  console.log('DONE!!');
  return requestList;
};

// prettier-ignore
const getRequestQuery = () =>
    `SELECT * FROM Request;`;

module.exports = getRequestListApi;
