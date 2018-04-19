const fetch = require('node-fetch');
const should = require('chai').should();

const getAdviseeGrade = async id => {
  const response = await fetch(`http://localhost:7555/teacher/${id}/adviseeGrade`, {
    method: 'GET'
  });
  return response;
};

describe('get current advisee grade feature', function() {
  let response, json;
  before(async function() {
    response = await getAdviseeGrade('teacher');
    json = await response.json();
  });
  it('get grade of all current advisees in ascending order', async function() {
    json[0].id.should.equal('5831063821');
  });
  it('each advisee should have overall statistic', async function() {
    json[0].should.have.own.property('id');
    json[0].should.have.own.property('GPAX');
    json[0].should.have.own.property('CAX');
  });
});
