const { query } = require('../utils.js');

const getInfoApi = (req, res) => {
  getInfo(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getInfo = async ({ id }) => {
  process.stdout.write(`Checking information of student ${id} . . . `);

  const userInfo = await query(infoQuery(id));

  if (userInfo.length === 0) {
    console.log('FAIL!!');
    return {};
  }

  console.log('DONE!!');
  return {
    id: userInfo[0].id,
    ssn: userInfo[0].ssn,
    firstName: userInfo[0].firstName,
    lastName: userInfo[0].lastName,
    sex: userInfo[0].sex,
    status: userInfo[0].status,
    tel: userInfo[0].tel,
    email: userInfo[0].email,
    address: {
      houseNo: userInfo[0].houseNumber,
      road: userInfo[0].road,
      district: userInfo[0].district,
      subDistrict: userInfo[0].subDistrict,
      province: userInfo[0].province,
      zipCode: userInfo[0].zipCode
    },
    faculty: userInfo[0].facultyName
  };
};

// prettier-ignore
const infoQuery = (id) => 
    `SELECT * FROM Student NATURAL JOIN Faculty WHERE id = '${id}';`;

module.exports = getInfoApi;
