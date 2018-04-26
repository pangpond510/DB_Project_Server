const { query } = require('../utils.js');

const submitRequestApi = (req, res) => {
  submitRequest(req.body).then(result => {
    if (result.success) {
      res.send(result.requestList);
    } else {
      res.sendStatus(400);
    }
    res.end();
  });
};

const submitRequest = async ({ barcode, status }) => {
  process.stdout.write(`some officer tries to update document ${barcode} . . . `);

  const result = await query(checkRequestStatusQuery(barcode));
  let nextStatus;
  if (status === 'Pending' && result[0].status === 'Pending') {
    nextStatus = 'Processing';
  } else if (status === 'Processing' && result[0].status === 'Processing') {
    nextStatus = 'Complete';
  } else {
    console.log('FAIL!!');
    return { success: false };
  }

  try {
    await query(submitQuery(barcode, nextStatus));

    let requestList = await query(getRequestQuery());
    requestList = requestList.map((doc, i) => ({ ...doc, key: i }));

    console.log('DONE!!');
    return {
      success: true,
      requestList
    };
  } catch (error) {
    console.log('FAIL!!');
    return { success: false };
  }
};

// prettier-ignore
const checkRequestStatusQuery = (id) => 
    `SELECT status FROM Request WHERE barcode = ${id};`

// prettier-ignore
const submitQuery = (id, status) => 
    `UPDATE Request SET status = '${status}' WHERE barcode = ${id};`

// prettier-ignore
const getRequestQuery = () =>
    `SELECT * FROM Request;`;

module.exports = submitRequestApi;
