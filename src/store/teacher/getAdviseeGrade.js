const { query } = require('../utils.js');

const getAdviseeGradeApi = (req, res) => {
  getAdviseeGrade(req.params).then(result => {
    res.send(JSON.stringify(result));
    res.end();
  });
};

const getAdviseeGrade = async ({ id }) => {
  process.stdout.write(`Checking advisee grade of advisor ${id} . . . `);

  const result = await query(adviseeGradeQuery(id));

  let adviseeGrade = [];
  for (let i = 0; i < result.length; i++) {
    const advisee = result[i];

    adviseeGrade.push({
      key: i,
      firstName: advisee.firstName,
      lastName: advisee.lastName,
      id: advisee.sId,
      GPAX: (advisee.sumGrade / advisee.sumCredit).toFixed(2),
      CAX: advisee.sumCredit
    });
  }

  console.log('DONE!!');
  return adviseeGrade;
};

// prettier-ignore
const adviseeGradeQuery = id => 
    `SELECT S.firstName, S.lastName, E.sId, sum(C.credit*E.grade) AS sumGrade, sum(C.credit) AS sumCredit
      FROM ((Enrollment E NATURAL JOIN Course C) INNER JOIN Student S ON E.sId = S.id) INNER JOIN Advise A ON E.sId = A.sId
      WHERE A.tid = '${id}' GROUP BY E.sId ORDER BY E.sId;`;

module.exports = getAdviseeGradeApi;
