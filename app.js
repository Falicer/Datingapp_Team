const express = require("express")

// Constants
const PORT = 2000

const app = express()

app.get("/", (req, res) => {
  res.status(200).send("Hello World!")
})

app.listen(PORT, () => console.log(`Server on port: ${PORT}`))
