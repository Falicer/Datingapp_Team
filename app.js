const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const bodyParser = require("body-parser")
const flash = require("express-flash")
const methodOverride = require("method-override")
const expressEjsLayouts = require("express-ejs-layouts")

// Stop => DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated
mongoose.set("useFindAndModify", false)

// Custom Middleware
const {
  checkAuthenticated,
  checkNotAuthenticated,
  setUserVariables,
  useBackgroundImages,
} = require("./middleware")

// Passport Config
require("./passport-config")(passport)

// Env Config
require("dotenv").config()

// Constants
const PORT = process.env.PORT || 2000

// Express Init
const app = express()

// Local variables for development
app.locals.development = {}
if (process.argv.includes("--development")) {
  app.locals.development = {
    enabled: true,
    email: "johndoe@live.nl",
    password: "1234567890A",
  }
}

// Static
app.use(express.static("dist"))
app.use(express.static("assets"))
app.use(express.static("uploads"))

// EJS & EJS Layouts
app.set("view engine", "ejs")
app.use(expressEjsLayouts)

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

// Method Override
app.use(methodOverride("_method"))

// Styling (Images) Middleware
app.use(useBackgroundImages)

// Routes
app.use("/login", checkNotAuthenticated, require("./routes/login"))
app.use("/register", checkNotAuthenticated, require("./routes/register"))

// Set local user Object, not for login and register
app.use(setUserVariables, checkAuthenticated)
app.use("/", require("./routes/index"))
app.use("/user", require("./routes/user"))
app.use("/matches", require("./routes/matches"))
app.use("/chat", require("./routes/chat"))

app.delete("/logout", (req, res) => {
  req.logOut()
  res.redirect("/login")
})

// API
app.use("/api", require("./routes/api"))

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
