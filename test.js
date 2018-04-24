const fetch = require('node-fetch');

const main1 = async () => {
  const response = await fetch('http://localhost:7555/student/registerCourse', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: 'student',
      courseList: [
        {
          courseId: '2110327',
          section: '33'
        },
        {
          courseId: '2110332',
          section: '33'
        }
      ]
    })
  });
  if (response.status === 200) {
    const json = await response.json();
    console.log(json);
  }
};

const main2 = async () => {
  const response = await fetch('http://localhost:7555/student/registerCourse', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: 'student2',
      courseList: [
        {
          courseId: '2110327',
          section: '33'
        },
        {
          courseId: '2110332',
          section: '33'
        }
      ]
    })
  });
  if (response.status === 200) {
    const json = await response.json();
    console.log(json);
  }
};

const main3 = async () => {
  const response = await fetch('http://localhost:7555/officer/manageRegisterPeriod', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: 'close'
    })
  });
  console.log(response.status);
};

//main1();
//main2();
main3();
