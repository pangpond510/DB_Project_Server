const { query } = require("../utils.js");

const getPaymentStatusApi = (req, res) => {
  getPaymentStatus(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getPaymentStatus = async ({ id }) => {
  process.stdout.write(`Checking payment for student ${id} . . . `);

  let payment = await query(paymentQuery(id));
  payment = payment.map((doc, i) => ({ ...doc, key: i }));

  console.log("DONE!!");
  return payment;
};

// prettier-ignore
const paymentQuery = (id) => 
    `SELECT * FROM StudentPayment WHERE sId = '${id}' ORDER BY year DESC, semester DESC;`;

module.exports = getPaymentStatusApi;
