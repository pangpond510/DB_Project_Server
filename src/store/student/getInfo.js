const { query } = require('../utils.js');
const sql = require('../sql.js');

const getInfoApi = (req, res) => {
  getInfo(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getInfo = async ({ id }) => {
  console.log(`Checking information of student ${id}`);

  const userInfo = await query(sql.userInfoQuery(id, 'Student'));
  return {
    id: userInfo[0].id,
    ssn: userInfo[0].ssn,
    firstName: userInfo[0].firstName,
    lastName: userInfo[0].lastName,
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

module.exports = getInfoApi;
