const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const passport = require("passport")

const initPassport = require('./passport-config')
initPassport(passport)

require("dotenv").config()

// Routes
const index = require("./routes/index")
const login = require("./routes/login")
const register = require("./routes/register")

// Constants
const PORT = 2000

// Init
const app = express()

// Setup view engine
app.set("view-engine", "ejs")
app.use(express.urlencoded({  extended: false }))

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
