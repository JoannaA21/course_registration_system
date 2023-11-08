const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')


const app = express();

app.use(bodyParser.json())
app.use('/', routes)

const port = 3001
app.listen(port, () => {
    console.log(`Serving running on port ${port}`)
})