if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}

const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")

const initPassport = require('./passport-config')
initPassport(
  passport, 
  email => users.find(user => user.email === email)
  id => users.find(user => user.id === id)
)

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
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

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

app.delete("/logout", (req, res) => {
  req.logOut()
  res.redirect("/login")
})

function checkAuthenticated(req, res, next){
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
  if (req.isAuthenticated()) {
    return res.redirect("/")
  }
  next()
}