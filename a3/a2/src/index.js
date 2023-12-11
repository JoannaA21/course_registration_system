const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')


const app = express();

// Enable CORS
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  }));

// Body parser middleware
app.use(bodyParser.json())
app.options('*', cors());
app.use('/', routes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  var message;
  if (err.message === 'Validation error: Validation isEmail on email failed') {
    message = 'Your email address is invalid.';
  } else if (err.message === 'Validation error: Email already exists in the database.') {
    message = 'This email address is already taken, please try different email address.';
  } else {
    message = 'Oops! Something went wrong.';
  }
  res.status(500).json({ error: message });
});

const port = 3001
app.listen(port, () => {
    console.log(`Serving running on port ${port}`)
})