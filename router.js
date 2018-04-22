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

router.post('/student/register', (req, res) => {
  if (req.body.option === 'register') {
    studentStore.registerCourse(req.body.detail).then(result => {
      res.sendStatus(result.status);
      res.end();
    });
  } else if (req.body.option === 'add') {
    studentStore.addCourse(req.body.detail).then(result => {
      res.sendStatus(result.status);
      res.end();
    });
  } else if (req.body.option === 'drop') {
    studentStore.dropCourse(req.body.detail).then(result => {
      res.sendStatus(result.status);
      res.end();
    });
  } else if (req.body.option === 'withdraw') {
    studentStore.withdrawCourse(req.body.detail).then(result => {
      res.sendStatus(result.status);
      res.end();
    });
  } else {
    res.sendStatus(400);
    res.end();
  }
});

router.get('/student/:id/getCoursePendingList', (req, res) => {
  studentStore
    .getCoursePendingList({
      id: req.params.id
    })
    .then(result => {
      res.send(JSON.stringify(result));
      res.end();
    });
});

router.get('/student/:id/getRegisterResult', (req, res) => {
  studentStore
    .getRegisterResult({
      id: req.params.id
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
