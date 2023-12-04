const Student_user = require('../models/student');
const { Sequelize } = require('sequelize');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.
// import bcrypt
const bcrypt = require('bcrypt');

// Get all Student_users
const getAllStudent_users = async (req, res, next) => {
  try {
    const users = await Student_user.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get a Student_user by ID
const getStudent_userById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Student_user.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Student_user not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Create a new 
const createStudent_user = async (req, res, next) => {
  const { fname, lname, email, username, phone, dob,
    department, program, password } = req.body;
  try {
    created_at = today.toISOString();
    updated_at = today.toISOString();

    const user = await Student_user.create({ 
      fname,
      lname,
      email,
      username,
      phone,
      password,
      dob,
      department,
      program,
      created_at, 
      updated_at
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
    console.log('error: ' + err.message);
  }
};

// Update a user by ID
const updateStudent_user = async (req, res, next) => {
  const { id } = req.params;
  const { fname, lname, username, role, email, phone, password } = req.body;
  try {
    const user = await Student_user.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Student_user not found' });
    }

    user.fname = fname;
    user.lname = lname;
    if (email){
      user.email = email;
    }
    if (username){
      user.username = username;
    }
    if (role){
      user.role = role;
    }
    user.phone = phone;
    if (password){
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }
    user.updated_at = today.toISOString();
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// forgot password
const forgotPassword = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier) {
      return res.status(400).json({ message: 'Student_username or email is required.' });
    }

    // Find the user by checking both username and email
    const user = await Student_user.findOne({
      where: Sequelize.or(
        { username: identifier }, // Check if the identifier matches the username field
        { email: identifier } // Check if the identifier matches the email field
      ),
    });

    if (!user){
      return res.status(404).json({ message: 'Student_user not found' });
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.update({password: hashedPassword});

    res.status(200).json({ message: 'Password successfully changes.' });
  } catch (err) {
    console.error('Error logging in: ', err);
    res.status(500).json({ message: 'An error occured while loggin in.' });
  }
};

// Delete a user by ID
const deleteStudent_user = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Student_user.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Student_user not found' });
    }
    await user.destroy();
    console.log('Student_user has been deleted.');
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllStudent_users,
  getStudent_userById,
  createStudent_user,
  updateStudent_user,
  deleteStudent_user,
  forgotPassword,
};
