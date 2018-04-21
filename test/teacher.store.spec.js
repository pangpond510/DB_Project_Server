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
  it('provide advisee detail', async function() {
    json[0].should.have.own.property('id');
    json[0].should.have.own.property('firstName');
    json[0].should.have.own.property('lastName');
  });
  it('each advisee should have overall statistics', async function() {
    json[0].should.have.own.property('GPAX');
    json[0].should.have.own.property('CAX');
  });
  it('calculate correct statistics', async function() {
    json[0].GPAX.should.equal('3.50');
    json[0].CAX.should.equal(18);
  });
});
