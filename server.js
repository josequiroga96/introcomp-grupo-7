const express = require("express")
const cors = require("cors")

const app = express()
const port = 8080

app.use(cors())

const api = express.Router()

api.post("/info", (req, res) => {
  console.log(req.body)
})

app.use(express.static(__dirname + "/public"))

app.use("/api", api)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
