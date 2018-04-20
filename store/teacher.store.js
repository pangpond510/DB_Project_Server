const { query } = require('./utils.js');
const sql = require('./sql.js');

const getAdviseeGrade = async ({ id }) => {
  console.log(`Checking advisee grade of advisor ${id}`);

  const result = await query(sql.adviseeGradeQuery(id));

  console.log(result);

  let adviseeGrade = [];
  result.forEach(element => {
    adviseeGrade.push({
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
