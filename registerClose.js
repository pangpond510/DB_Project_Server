const fetch = require('node-fetch');

const main = async () => {
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

main();
