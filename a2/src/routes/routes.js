const express = require('express');
const router = express.Router();
const studentUserController = require('../controllers/studentUserController');  //  user controller



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