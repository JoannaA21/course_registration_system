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

const port = 3001
app.listen(port, () => {
    console.log(`Serving running on port ${port}`)
})