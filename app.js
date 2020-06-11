const express = require("express")

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

app.listen(PORT, () => console.log(`Server on port: ${PORT}`))
