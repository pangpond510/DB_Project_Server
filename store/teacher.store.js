const { query } = require('./utils.js');
const sql = require('./sql.js');

const getAdviseeGrade = async ({ id }) => {
  console.log(`Checking advisee grade of advisor ${id}`);

  const result = await query(`SELECT E.sid,sum(C.credit) AS sumCredit ,sum(C.credit*E.grade) AS sumGrade 
	  FROM Enroll E NATURAL JOIN Advise AS A, Course C 
    WHERE E.courseId = C.courseId AND A.tid = '${id}' GROUP BY E.sid ORDER BY E.sid;`);

  let adviseeGrade = [];
  result.forEach(element => {
    adviseeGrade.push({
      id: element.sid,
      GPAX: (element.sumCredit / element.sumGrade).toFixed(2),
      CAX: element.sumCredit
    });
  });

  return adviseeGrade;
};

module.exports = {
  getAdviseeGrade
};
