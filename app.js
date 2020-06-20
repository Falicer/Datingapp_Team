const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")

mongoose.set("useFindAndModify", false)

// Passport config
require("./passport-config")(passport)

// Env config
require("dotenv").config()

// Constants
const PORT = 2000

// Express Init
const app = express()

// EJS
app.set("view engine", "ejs")

// Flash
app.use(flash())

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Other
app.use(methodOverride("_method"))

// Routes
app.use("/", require("./routes/index"))
app.use("/login", require("./routes/login"))
app.use("/register", require("./routes/register"))
app.use("/user", require("./routes/user"))

app.delete("/logout", (req, res) => {
  req.logOut()
  res.redirect("/login")
})

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
