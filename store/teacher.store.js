const { query } = require('./utils.js');
const sql = require('./sql.js');

const getAdviseeGrade = async ({ id }) => {
  console.log(`Checking advisee grade of advisor ${id}`);

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
  return adviseeGrade;
};

module.exports = {
  getAdviseeGrade
};
