const express = require('express')
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json())

const port = 3001
app.listen(port, () => {
    console.log(`Serving running on port ${port}`)
})