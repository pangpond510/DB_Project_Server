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
router.get('/student/:id/grade', require('./store/student/getGrade.js'));
router.get('/student/:id/info', require('./store/student/getInfo.js'));
router.get('/student/getAvailCourse/:year/:semester', require('./store/student/getAvailCourse.js'));
router.get('/student/getCourseSection/:courseId/:year/:semester', require('./store/student/getCourseSection.js'));
router.post('/student/register', require('./store/student/registerCourse.js'));

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
