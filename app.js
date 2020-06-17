const express = require("express")
const mongoose = require("mongoose")

mongoose.set("useFindAndModify", false)

require("dotenv").config()

// Routes
const index = require("./routes/index")
const login = require("./routes/login")
const register = require("./routes/register")

// Constants
const PORT = 2000

// Init
const app = express()

// Routes
app.use("/", index)
app.use("/login", login)
app.use("/register", register)

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
