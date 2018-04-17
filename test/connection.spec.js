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
  it('login with existing username and valid password', async function() {
    const response = await login('student', '1234');
    const json = await response.json();
    response.status.should.equal(200);
    json.Id.should.equal('5432154321');
    json.FirstName.should.equal('Nakrean');
    json.LastName.should.equal('Reankengmak');
    json.UserType.should.equal('Student');
  });
  it('login with existing username and invalid password', async function() {
    const response = await login('student', '12345');
    response.status.should.equal(401);
  });
  it('login with non existing username', async function() {
    const response = await login('pond', '1234');
    response.status.should.equal(401);
  });
});
