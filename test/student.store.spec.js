const fetch = require('node-fetch');
const should = require('chai').should();
const { query, closeConnection, openConnection } = require('../src/store/utils.js');

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

const registerCourse = async (id, courseList) => {
  const response = await fetch('http://localhost:7555/student/registerCourse', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      courseList
    })
  });
  return response;
};

const addDropCourse = async (id, courseList) => {
  const response = await fetch('http://localhost:7555/student/addDropCourse', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      courseList
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
  it('provide student id & ssn', async function() {
    json.should.have.own.property('id');
    json.should.have.own.property('ssn');
  });
  it('provide student name', async function() {
    json.should.have.own.property('firstName');
    json.should.have.own.property('lastName');
  });
  it('provide student contact', async function() {
    json.should.have.own.property('tel');
    json.should.have.own.property('email');
  });
  it('provide student address', async function() {
    json.should.have.own.property('address');
    json.should.have.nested.property('address.houseNo');
    json.should.have.nested.property('address.road');
    json.should.have.nested.property('address.district');
    json.should.have.nested.property('address.subDistrict');
    json.should.have.nested.property('address.province');
    json.should.have.nested.property('address.zipCode');
  });
  it('provide student faculty name', async function() {
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

describe('register add/drop course feature', function() {
  before(async function() {
    openConnection();
    await query(`INSERT INTO Course VALUES ('0000000','Test Course 1','TC1',0)`);
    await query(`INSERT INTO Course VALUES ('1111111','Test Course 2','TC2',0)`);
    await query(`INSERT INTO Class VALUES ('0000000','0',2017,2,1)`);
    await query(`INSERT INTO Class VALUES ('0000000','1',2017,2,10)`);
    await query(`INSERT INTO Class VALUES ('1111111','0',2017,2,1)`);
    await query(`INSERT INTO Class VALUES ('1111111','1',2017,2,10)`);
  });
  describe('register course feature', function() {
    it('can register course more than 1 course', async function() {
      const id = '5831063821';
      const courseList = [
        {
          courseId: '0000000',
          section: '1'
        },
        {
          courseId: '1111111',
          section: '1'
        }
      ];
      const response = await registerCourse(id, courseList);
      response.status.should.equal(200);

      const status1 = await query(
        `SELECT status from Enroll WHERE courseId = '0000000' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`
      );
      status1[0].status.should.equal('Pending');

      const status2 = await query(
        `SELECT status from Enroll WHERE courseId = '1111111' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`
      );
      status2[0].status.should.equal('Pending');

      await query(`DELETE FROM Enroll WHERE courseId = '0000000' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`);
      await query(`DELETE FROM Enroll WHERE courseId = '1111111' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`);
    });
    it('cannot register same course', async function() {
      const id = '5831063821';
      const courseList = [
        {
          courseId: '0000000',
          section: '0'
        },
        {
          courseId: '0000000',
          section: '1'
        }
      ];
      const response = await registerCourse(id, courseList);
      response.status.should.equal(200);

      const status1 = await query(
        `SELECT * from Enroll WHERE courseId = '0000000' and sId = '5831063821' and sectionNumber = '0' and year = 2017 and semester = 2;`
      );
      status1.length.should.equal(0);

      const status2 = await query(
        `SELECT * from Enroll WHERE courseId = '0000000' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`
      );
      status2.length.should.equal(0);
    });
    it('can register only 1 time', async function() {
      const id = '5831063821';
      const courseList = [
        {
          courseId: '0000000',
          section: '1'
        },
        {
          courseId: '1111111',
          section: '1'
        }
      ];
      const response1 = await registerCourse(id, courseList);
      response1.status.should.equal(200);
      const response2 = await registerCourse(id, courseList);
      response2.status.should.equal(400);

      await query(`DELETE FROM Enroll WHERE courseId = '0000000' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`);
      await query(`DELETE FROM Enroll WHERE courseId = '1111111' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`);
    });
  });
  describe('add/drop course feature', function() {
    it('can add more than 1 course', async function() {
      const id = '5831063821';
      const courseList = [
        {
          courseId: '0000000',
          section: '1',
          option: 'add'
        },
        {
          courseId: '1111111',
          section: '1',
          option: 'add'
        }
      ];
      const response = await addDropCourse(id, courseList);
      response.status.should.equal(200);
      const status1 = await query(
        `SELECT status from Enroll WHERE courseId = '0000000' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`
      );
      status1[0].status.should.equal('Studying');
      const status2 = await query(
        `SELECT status from Enroll WHERE courseId = '1111111' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`
      );
      status2[0].status.should.equal('Studying');

      await query(`DELETE FROM Enroll WHERE courseId = '0000000' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`);
      await query(`DELETE FROM Enroll WHERE courseId = '1111111' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`);
    });
    it('cannot add course that is full', async function() {
      const id1 = 'student';
      const id2 = '5831063821';
      const courseList = [
        {
          courseId: '0000000',
          section: '0',
          option: 'add'
        }
      ];

      const response1 = await addDropCourse(id1, courseList);
      response1.status.should.equal(200);
      const json1 = await response1.json();
      json1[0].status.should.equal('Studying');

      const response2 = await addDropCourse(id2, courseList);
      response2.status.should.equal(200);
      const json2 = await response2.json();
      json2[0].status.should.equal('Error');

      await query(`DELETE FROM Enroll WHERE courseId = '0000000' and sId = 'student' and sectionNumber = '0' and year = 2017 and semester = 2;`);
    });
    it('cannot add course that student is studying in other section or already finish', async function() {
      const id = '5831063821';
      const courseList1 = [
        {
          courseId: '0000000',
          section: '0',
          option: 'add'
        }
      ];
      const courseList2 = [
        {
          courseId: '0000000',
          section: '1',
          option: 'add'
        }
      ];
      const response1 = await addDropCourse(id, courseList1);
      response1.status.should.equal(200);
      const json1 = await response1.json();
      json1[0].status.should.equal('Studying');

      const response2 = await addDropCourse(id, courseList1);
      response2.status.should.equal(200);
      const json2 = await response2.json();
      json2[0].status.should.equal('Error');

      await query(`DELETE FROM Enroll WHERE courseId = '0000000' and sId = '5831063821' and sectionNumber = '0' and year = 2017 and semester = 2;`);
    });
    it('can drop course that student is studying', async function() {
      const id = '5831063821';
      const courseList1 = [
        {
          courseId: '1111111',
          section: '1',
          option: 'add'
        }
      ];
      const courseList2 = [
        {
          courseId: '1111111',
          section: '1',
          option: 'drop'
        }
      ];
      await addDropCourse(id, courseList1);

      const response = await addDropCourse(id, courseList2);
      response.status.should.equal(200);
      const status = await query(
        `SELECT status from Enroll WHERE courseId = '1111111' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`
      );
      status[0].status.should.equal('Drop');

      await query(`DELETE FROM Enroll WHERE courseId = '1111111' and sId = '5831063821' and sectionNumber = '1' and year = 2017 and semester = 2;`);
    });
  });
  after(async function() {
    await query(`DELETE FROM Class WHERE  courseId = '0000000' and sectionNumber = '0' and year = 2017 and semester = 2;`);
    await query(`DELETE FROM Class WHERE  courseId = '0000000' and sectionNumber = '1' and year = 2017 and semester = 2;`);
    await query(`DELETE FROM Class WHERE  courseId = '1111111' and sectionNumber = '0' and year = 2017 and semester = 2;`);
    await query(`DELETE FROM Class WHERE  courseId = '1111111' and sectionNumber = '1' and year = 2017 and semester = 2;`);
    await query(`DELETE FROM Course WHERE courseId = '0000000';`);
    await query(`DELETE FROM Course WHERE courseId = '1111111';`);
    closeConnection();
  });
});
