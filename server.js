const express = require("express")
// const cors = require("cors")

const app = express()
const port = 8080

// app.use(cors())
app.use(express.json())

const api = express.Router()

let data

api.post("/info", (req, res) => {
  data = req.body
  console.log(data)
  res.status(200).send("Success!")
})

api.get('/info', (req, res) => {
  res.status(200).send(data)
})

app.use(express.static(__dirname + "/public"))

app.use("/api", api)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
