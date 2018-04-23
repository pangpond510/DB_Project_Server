const { query } = require('../utils.js');
const sql = require('../sql.js');

const getAdviseeGradeApi = (req, res) => {
  getAdviseeGrade(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getAdviseeGrade = async ({ id }) => {
  process.stdout.write(`Checking advisee grade of advisor ${id} . . . `);

  const result = await query(sql.adviseeGradeQuery(id));

  let adviseeGrade = [];
  result.forEach((element, index) => {
    adviseeGrade.push({
      key: index,
      firstName: element.firstName,
      lastName: element.lastName,
      id: element.sId,
      GPAX: (element.sumGrade / element.sumCredit).toFixed(2),
      CAX: element.sumCredit
    });
  });

  console.log('DONE!!');
  return adviseeGrade;
};

module.exports = getAdviseeGradeApi;
