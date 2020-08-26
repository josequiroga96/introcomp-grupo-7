const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json())

const api = express.Router()

api.post("/info", (req, res) => {
  console.log(req.body)
  res.status(200).send("Success!")
})

app.use(express.static(__dirname + "/public"))

app.use("/api", api)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
