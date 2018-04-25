const express = require('express');
const router = express.Router();

//user api
router.post('/login', require('./store/user/authenticate.js'));

//student api
router.get('/student/:id/grade', require('./store/student/getGrade.js'));
router.get('/student/:id/info', require('./store/student/getInfo.js'));
router.get('/student/getAvailCourse/:year/:semester', require('./store/student/getAvailCourse.js'));
router.get('/student/getCourseSection/:courseId/:year/:semester', require('./store/student/getCourseSection.js'));
router.post('/student/registerCourse', require('./store/student/registerCourse.js'));
router.post('/student/addDropCourse', require('./store/student/addDropCourse.js'));
router.get('/student/:id/getCoursePendingList', require('./store/student/getCoursePendingList.js'));
router.get('/student/:id/getRegisterResult', require('./store/student/getRegisterResult.js'));

//teacher api
router.get('/teacher/:id/adviseeGrade', require('./store/teacher/getAdviseeGrade'));

//officer api
router.post('/officer/manageRegisterPeriod', require('./store/officer/manageRegisterPeriod.js'));

module.exports = router;
