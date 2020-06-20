const express = require("express")
const mongoose = require("mongoose")

mongoose.set("useFindAndModify", false)

require("dotenv").config()

// Constants
const PORT = 2000

// Init
const app = express()

// Routes
app.use("/", require("./routes/index"))
app.use("/login", require("./routes/login"))
app.use("/register", require("./routes/register"))
app.use("/user", require("./routes/user"))

app.listen(PORT, async () => {
  console.log(`Server on port: ${PORT}`)

  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("Connected to MongoDB")
  } catch (err) {
    console.log(err)
  }
})
