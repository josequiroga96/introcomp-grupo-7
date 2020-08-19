const express = require('express')
var cors = require('cors')
const app = express()
const port = 8080

const path = require('path')

app.use(cors())

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/sensors.html')))

app.post('info', (req, res) => {
    console.log(req.body)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))