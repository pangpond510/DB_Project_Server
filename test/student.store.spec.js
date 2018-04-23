const fetch = require('node-fetch');
const should = require('chai').should();
const { query, closeConnection } = require('../src/store/utils.js');

const getGrade = async id => {
  const response = await fetch(`http://localhost:7555/student/${id}/grade`, {
    method: 'GET'
  });
  return response;
};

const getInfo = async id => {
  const response = await fetch(`http://localhost:7555/student/${id}/info`, {
    method: 'GET'
  });
  return response;
};

const getAvailCourse = async (year, semester) => {
  const response = await fetch(`http://localhost:7555/student/getAvailCourse/${year}/${semester}`, {
    method: 'GET'
  });
  return response;
};

const getCourseSection = async (courseId, year, semester) => {
  const response = await fetch(`http://localhost:7555/student/getCourseSection/${courseId}/${year}/${semester}`, {
    method: 'GET'
  });
  return response;
};

const registerCourse = async (option, id, courseId, section, semester, year) => {
  const response = await fetch('http://localhost:7555/student/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: option,
      detail: {
        id,
        courseId,
        section,
        semester,
        year
      }
    })
  });
  return response;
};

describe('get student grade feature', function() {
  let response, json;
  before(async function() {
    response = await getGrade('5831063821');
    json = await response.json();
  });
  it('get grade of all semester with provideing semester list in ascending order', async function() {
    json.semesterList.should.eql(['2016/1', '2017/1', '2017/2']);
    json.should.have.own.property('2016/1');
    json.should.have.own.property('2017/1');
    json.should.have.own.property('2017/2');
  });
  it('each semester should have own statistic', async function() {
    json['2017/2'].stat.gpa.should.equal('4.00');
    json['2017/2'].stat.ca.should.equal(9);
    json['2017/2'].stat.gpax.should.equal('3.50');
    json['2017/2'].stat.cax.should.equal(18);
  });
});

describe('get student informaiton feature', function() {
  let response, json;
  before(async function() {
    response = await getInfo('5831063821');
    json = await response.json();
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

describe('get available course feature', function() {
  let response, json;
  before(async function() {
    response = await getAvailCourse(2017, 1);
    json = await response.json();
  });
  it('first query will provide only courses in specific semester', async function() {
    for (const c in json) {
      json[c].semester.should.equal(1);
      json[c].year.should.equal(2017);
    }
  });
  before(async function() {
    response = await getCourseSection('2110313', 2017, 1);
    json = await response.json();
  });
  it('second query will provide only specific course in specific semester', async function() {
    for (const c in json) {
      json[c].courseId.should.equal('2110313');
      json[c].semester.should.equal(1);
      json[c].year.should.equal(2017);
    }
  });
  it('second query will provide all sections detail', async function() {
    json[0].sectionNumber.should.equal('1');
    json[1].sectionNumber.should.equal('2');
    json[2].sectionNumber.should.equal('3');
    json[3].sectionNumber.should.equal('33');
  });
});

describe('register course feature', function() {
  it('can register course', async function() {
    const response = await registerCourse('register', '5831063821', '2110422', '33', 2, 2017);
    response.status.should.equal(200);
    const status = await query(
      `SELECT status from Enroll WHERE courseId = '2110422' and sId = '5831063821' and sectionNumber = '33' and year = 2017 and semester = 2;`
    );
    status[0].status.should.equal('Pending');
    await query(`DELETE FROM Enroll WHERE courseId = '2110422' and sId = '5831063821' and sectionNumber = '33' and year = 2017 and semester = 2;`);
  });
  it('can add course', async function() {
    const response = await registerCourse('add', '5831063821', '2110422', '33', 2, 2017);
    response.status.should.equal(200);
    const status = await query(
      `SELECT status from Enroll WHERE courseId = '2110422' and sId = '5831063821' and sectionNumber = '33' and year = 2017 and semester = 2;`
    );
    status[0].status.should.equal('Studying');
    await query(`DELETE FROM Enroll WHERE courseId = '2110422' and sId = '5831063821' and sectionNumber = '33' and year = 2017 and semester = 2;`);
  });
  it('cannot add course that is full', async function() {
    await query(`INSERT INTO Class VALUES ('2110422','0',2017,2,1)`);
    await registerCourse('add', 'student', '2110422', '0', 2, 2017);

    const response = await registerCourse('add', '58310638', '2110422', '0', 2, 2017);
    response.status.should.equal(400);

    await query(`DELETE FROM Enroll WHERE courseId = '2110422' and sId = 'student' and sectionNumber = '0' and year = 2017 and semester = 2;`);
    await query(`DELETE FROM Class WHERE courseId = '2110422' and sectionNumber = '0' and year = 2017 and semester = 2 ;`);
  });
  it('can drop course that student is studying', async function() {
    await registerCourse('add', '5831063821', '2110422', '33', 2, 2017);
    const response = await registerCourse('drop', '5831063821', '2110422', '33', 2, 2017);
    response.status.should.equal(200);
    const status = await query(
      `SELECT status from Enroll WHERE courseId = '2110422' and sId = '5831063821' and sectionNumber = '33' and year = 2017 and semester = 2;`
    );
    status[0].status.should.equal('Drop');
    await query(`DELETE FROM Enroll WHERE courseId = '2110422' and sId = '5831063821' and sectionNumber = '33' and year = 2017 and semester = 2;`);
  });
  it('cannot drop course that student is not studying', async function() {
    const response = await registerCourse('drop', '5831063821', '2110422', '33', 2, 2017);
    response.status.should.equal(400);
  });
  it('can withdraw course that student is studying', async function() {
    await registerCourse('add', '5831063821', '2110422', '33', 2, 2017);
    const response = await registerCourse('withdraw', '5831063821', '2110422', '33', 2, 2017);
    response.status.should.equal(200);
    const status = await query(
      `SELECT status from Enroll WHERE courseId = '2110422' and sId = '5831063821' and sectionNumber = '33' and year = 2017 and semester = 2;`
    );
    status[0].status.should.equal('Withdraw');
    await query(`DELETE FROM Enroll WHERE courseId = '2110422' and sId = '5831063821' and sectionNumber = '33' and year = 2017 and semester = 2;`);
  });
  it('cannot withdraw course that student is not studying', async function() {
    const response = await registerCourse('withdraw', '5831063821', '2110422', '33', 2, 2017);
    response.status.should.equal(400);
  });
  after(async function() {
    closeConnection();
  });
});
