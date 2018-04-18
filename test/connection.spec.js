const fetch = require('node-fetch');
const should = require('chai').should();

const login = async (username, password) => {
  const response = await fetch('http://localhost:7555/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
  return response;
};

describe('login feature', function() {
  it('login with existing student username and valid password', async function() {
    const response = await login('5831063821', '12345678');
    const json = await response.json();
    response.status.should.equal(200);
    json.should.have.own.property('id');
    json.should.have.own.property('firstName');
    json.should.have.own.property('lastName');
    json.userType.should.equal('Student');
  });
  /*
  it('login with existing teacher username and valid password', async function() {
    const response = await login('teacher', '1234');
    const json = await response.json();
    response.status.should.equal(200);
    json.should.have.own.property('id');
    json.should.have.own.property('firstName');
    json.should.have.own.property('lastName');
    json.userType.should.equal('Teacher');
  });
  */
  /*
  it('login with existing officer username and valid password', async function() {
    const response = await login('officer', '1234');
    const json = await response.json();
    response.status.should.equal(200);
    json.should.have.own.property('id');
    json.should.have.own.property('firstName');
    json.should.have.own.property('lastName');
    json.userType.should.equal('Officer');
  });
  */
  it('login with existing username and invalid password', async function() {
    const response = await login('student', '12345');
    response.status.should.equal(401);
  });
  it('login with non existing username', async function() {
    const response = await login('pond', '1234');
    response.status.should.equal(401);
  });
});
