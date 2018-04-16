const express = require('express');
const bodyParser = require('body-parser');
const { connection } = require('./constant.js');
const store = require('./store');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  store
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      if (success) res.sendStatus(200);
      else res.sendStatus(401);
    });
});

connection.connect(function(err) {
  if (err) throw err;
  else {
    console.log('Database is connected!');
    app.listen(7555, () => {
      console.log('Server is running on http://localhost:7555');
    });
  }
});