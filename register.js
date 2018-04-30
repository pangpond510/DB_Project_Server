const fetch = require('node-fetch');

const main0 = async () => {
  const response = await fetch('http://localhost:7555/officer/manageRegisterPeriod', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: 'open'
    })
  });
  console.log(response.status);
};

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
      id: '6130000121',
      courseList: [
        {
          courseId: '2110327',
          section: '33',
          option: 'add'
        }
      ]
    })
  });
  if (response.status === 200) {
    const json = await response.json();
    console.log(json);
  }
};

const main = async () => {
  //await main0();
  //await main1();
  await main2();
  /*
  const response = await fetch('http://localhost:7555/student/requestDocument', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: '5830000121',
      docId: 'CR23'
    })
  });
  if (response.status === 200) {
    const json = await response.json();
    console.log(json);
  }
  */
};

main();
