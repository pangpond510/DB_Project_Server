const { query } = require('../utils.js');
const sql = require('../sql.js');

const getPaymentStatusApi = (req, res) => {
  getPaymentStatus(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getPaymentStatus = async ({ id }) => {
  process.stdout.write(`Checking payment status of student ${id} . . . `);

  const result = await query(sql.checkPaymentStatusQuery(id));

  console.log('DONE!!');
  return result;
};

module.exports = getPaymentStatusApi;
