const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json())

const api = express.Router()

let data;

api.post("/info", (req, res) => {
    data = req.body
    res.status(200).send("Success!")
})

app.use(express.static(__dirname + "/public/phone"))

app.use("/api", api)

app.get('/web', (req, res) => {
    let path = __dirname + '/public/web/index.html'
    res.status(200).sendFile(path)
})

api.get("/data", (req, res) => {
    res.status(200).send({data})
})

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
)
