const express = require('express');
const router = express.Router();
const studentUserController = require('../controllers/studentUserController');  //  user controller
const course = require('../controllers/courseController'); //import courseController
const registeredCourse = require('../controllers/registeredCourseController')
const contactForm = require('../controllers/contactFormController')

// Routes for create user 
router.post('/signup', studentUserController.createStudent_user);
// Routes for forgot password
router.post('/forgot_passsword', studentUserController.forgotPassword);
// Routes for get all users
router.get('/studentuser/', studentUserController.getAllStudent_users);
// Routes for get user by id
router.get('/studentuser/:id', studentUserController.getStudent_userById);
// Route for update user
router.put('/studentuser/:id', studentUserController.updateStudent_user);
// Route for delete user
router.delete('/studentuser/:id', studentUserController.deleteStudent_user);
//Route for creating course
router.post('/createcourse', course.createCourse);
//Route for accessing all courses
router.get('/courses', course.getAllCourses);
//Route for accessing specific course
router.get('/getcourse/:courseCode', course.getCourse_byCourseCode);
//Route for student register for course
router.post('/register', registeredCourse.studentRegister_ForACourse);
//Route for student drop course
router.delete('/coursedrop/:id', registeredCourse.studentDropsACourse);
//Route for accessing courses with registered student 
router.get('/getregisteredcourse', registeredCourse.getAllRegisteredCourses);
//Route for exchange course for student
router.put('/exchangecourse', registeredCourse.studentExchangesCourse);
//Route for student create question
router.post('/studentquery', contactForm.studentHasAQuestion);
//Route for admin reponse to questions
router.post('/adminresponse', contactForm.adminResponse);
//Route for accessing all questions
router.get('/allquestions', contactForm.getAllQuestions);

module.exports = router;