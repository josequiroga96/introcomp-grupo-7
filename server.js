const express = require("express")
const cors = require("cors")

const app = express()
const port = 8080

app.use(cors())

app.use(express.static(__dirname + "/public"))

app.post("api/info", (req, res) => {
  console.log(req.body)
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
