const fetch = require('node-fetch');
const should = require('chai').should();

const getGrade = async id => {
  const response = await fetch(`http://localhost:7555/user/student/${id}/grade`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return response;
};

const getInfo = async id => {
  const response = await fetch(`http://localhost:7555/user/student/${id}/info`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return response;
};

describe('get student grade feature', function() {
  let response, json;
  before(async function() {
    response = await getGrade('5831063821');
    json = await response.json();
  });
  it('only access by student', async function() {
    response.status.should.equal(200);
  });
  it('get grade of all semester with provideing semester list in ascending order', async function() {
    json.semesterList.should.eql(['2016/1', '2017/1', '2017/2']);
    json.should.have.own.property('2016/1');
    json.should.have.own.property('2017/1');
    json.should.have.own.property('2017/2');
  });
  it('each semester should have stat of student', async function() {
    json['2017/2'].stat.gpa.should.equal('4.00');
    json['2017/2'].stat.ca.should.equal(9);
    json['2017/2'].stat.gpax.should.equal('3.50');
    json['2017/2'].stat.cax.should.equal(18);
  });
});

describe('get student informaiton feature', function() {
  let response, json;
  before(async function() {
    response = await getInfo('5831063821', '12345678');
    json = await response.json();
  });
  it('only access by student', async function() {
    response.status.should.equal(200);
  });
  it('providing student id & ssn', async function() {
    json.should.have.own.property('id');
    json.should.have.own.property('ssn');
  });
  it('providing student name', async function() {
    json.should.have.own.property('firstName');
    json.should.have.own.property('lastName');
  });
  it('providing student contact', async function() {
    json.should.have.own.property('tel');
    json.should.have.own.property('email');
  });
  it('providing student address', async function() {
    json.should.have.own.property('address');
    json.should.have.nested.property('address.houseNo');
    json.should.have.nested.property('address.road');
    json.should.have.nested.property('address.district');
    json.should.have.nested.property('address.subDistrict');
    json.should.have.nested.property('address.province');
    json.should.have.nested.property('address.zipCode');
  });
  it('providing student faculty name', async function() {
    json.should.have.own.property('faculty');
  });
});
