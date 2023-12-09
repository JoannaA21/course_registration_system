const jwt = require('jsonwebtoken');
const {
  Sequelize
} = require('sequelize');
const Student_user = require('../models/student');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY; // Replace with your actual secret key for JWT

const login = async (req, res, next) => {
  try {
    const {
      username,
      password
    } = req.body;

    if (!username) {
      return res.status(400).json({
        message: 'Student username or email is required.'
      });
    }

    const validateAdmin = [{
        "id": "1",
        "fname": "Tigist",
        "lname": "Beshy",
        "username": "TB123",
        "password": "TB123"
      },
      {
        "id": "2",
        "fname": "Fairbanks",
        "lname": "Magtibang",
        "username": "FM123",
        "password": "FM123"
      },
      {
        "id": "3",
        "fname": "Jozel",
        "lname": "Surro",
        "username": "JS123",
        "password": "JS123"
      },
      {
        "id": "4",
        "fname": "Joanna",
        "lname": "Apellido",
        "username": "JA123",
        "password": "JA123"
      },
      {
        "id": "5",
        "fname": "Denis",
        "lname": "Onu",
        "username": "DO123",
        "password": "DO123"
      },
    ];

    const admin = validateAdmin.find(user => user.username === username && user.password === password);
    if (admin) {
      console.log(`User with id ${username} exists: ${admin.username}`);

      // Generate and send the JWT token on successful login
      // const token = jwt.sign({
      //   userId: admin.id,
      //   userOrEmail: username,
      //   role: 'admin',
      //   fname: admin.fname,
      //   lname: admin.lname
      // }, SECRET_KEY, {
      //   expiresIn: '1h'
      // });
      // return res.status(200).json({
      //   token
      // }); // return token to user
      // Generate and send the JWT token on successful login
    const token = jwt.sign({
      userId: admin.id,
      userOrEmail: username,
      role: 'admin',
      fname: admin.fname,
      lname: admin.lname
    }, SECRET_KEY, {
      expiresIn: '1h'
    });
    const details = {
      details: {
        id: admin.id,
        userOrEmail: username,
        role: 'admin',
        fname: admin.fname,
        lname: admin.lname
      },
      token: token
    }
    res.status(200).json({
      details
    });
    }

    // Find the user by checking both username and email
    const user = await Student_user.findOne({
      where: Sequelize.or({
          username: username
        }, // Check if the username matches the username field
        {
          email: username
        } // Check if the username matches the email field
      ),
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid username or email.'
      });
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Generate and send the JWT token on successful login
    const token = jwt.sign({
      userId: user.id,
      userOrEmail: username,
      role: 'student',
      fname: user.fname,
      lname: user.lname,
      phone: user.phone
    }, SECRET_KEY, {
      expiresIn: '1h'
    });
    const details = {
      details: {
        role: 'student',
        id: user.id,
        program: user.program,
        department: user.department,
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        dob: user.dob
      },
      token: token
    }
    res.json({
      details
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({
      message: 'An error occurred while logging in.'
    });
  }
};

const verify = async (req, res) => {
  console.log(req.headers);
  console.log(req.headers.authorization);
  const jwtToken = req.headers.authorization; // Extract the JWT token from the headers

  try {
    const result = await jwt.verify(jwtToken, SECRET_KEY);
    const currentTime = Math.floor(Date.now() / 1000);
    const expiration = new Date(result.exp * 1000);

    if (currentTime < expiration) {
      result.message = 'Student_user is still logged in';
      console.log(result);
      res.json(result);
    } else {
      result.message = 'Student_user session has expired';
      console.log(result);
      res.json(result);
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.json({
      message: error.message
    });
  }

};

const logout = async (req, res) => {
  try {
    // Assuming you are using JWT for authentication
    // Clear the token from the client-side (e.g., local storage)
    res.clearCookie('token'); // Clear the token cookie

    // Send a response indicating successful logout
    res.json({
      message: 'Logout successful'
    });
  } catch (error) {
    // Handle any errors that might occur during logout
    res.status(500).json({
      error: 'An error occurred during logout'
    });
  }
};


module.exports = {
  login,
  logout,
  verify,
};