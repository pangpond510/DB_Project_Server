const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { connection, corsConfig } = require('./src/constant.js');

const app = express();

app.use(bodyParser.json());
app.use(cors(corsConfig));

app.use('/', require('./src/router.js'));

connection.connect(function(err) {
  if (err) throw err;
  else {
    console.log('Database is connected!');
    app.listen(7555, () => {
      console.log('Server is running on http://localhost:7555');
    });
  }
});
