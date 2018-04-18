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
    .then(result => {
      if (result.success) res.send(JSON.stringify(result.userInfo));
      else res.sendStatus(401);
      res.end();
    });
});

app.get('/user/student/:id/grade', (req, res) => {
  store
    .getGrade({
      id: req.params.id
    })
    .then(result => {
      if (result.success) res.send(JSON.stringify(result.gradeInfo));
      else res.sendStatus(403);
      res.end();
    });
});

app.get('/user/student/:id/info', (req, res) => {
  store
    .getInfo({
      id: req.params.id
    })
    .then(result => {
      if (result.success) res.send(JSON.stringify(result.userInfo));
      else res.sendStatus(403);
      res.end();
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
