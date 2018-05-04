const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { corsConfig } = require('./constant.js');

const app = express();

app.use(bodyParser.json());
app.use(cors(corsConfig));

app.use('/', require('./router.js'));

app.listen(7555, () => {
  console.log('Server is running on http://localhost:7555');
});
