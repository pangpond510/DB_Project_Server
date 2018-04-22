const fetch = require('node-fetch');

fetch('http://localhost:7555/student/register', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    option: 'add',
    detail: {
      id: '5831063821',
      courseId: '2110422',
      section: '33',
      semester: 2,
      year: 2017
    }
  })
});
