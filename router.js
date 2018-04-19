const express = require('express');
const router = express.Router();

const userStore = require('./store/user.store.js');
const studentStore = require('./store/student.store.js');
const teacherStore = require('./store/teacher.store.js');

//user api
router.post('/login', (req, res) => {
  userStore
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

//student api
router.get('/student/:id/grade', (req, res) => {
  studentStore
    .getGrade({
      id: req.params.id
    })
    .then(result => {
      res.send(JSON.stringify(result));
      res.end();
    });
});

router.get('/student/:id/info', (req, res) => {
  studentStore
    .getInfo({
      id: req.params.id
    })
    .then(result => {
      res.send(JSON.stringify(result));
      res.end();
    });
});

router.get('/student/getAvailCourse/:year/:semester', (req, res) => {
  studentStore
    .getAvailCourse({
      year: req.params.year,
      semester: req.params.semester
    })
    .then(result => {
      res.send(JSON.stringify(result));
      res.end();
    });
});

//teacher api
router.get('/teacher/:id/adviseeGrade', (req, res) => {
  teacherStore
    .getAdviseeGrade({
      id: req.params.id
    })
    .then(result => {
      res.send(JSON.stringify(result));
      res.end();
    });
});

module.exports = router;
