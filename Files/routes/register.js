const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

router.get("/", checkNotAuthenticated, (req, res) => {
  res.status(200).send("You're on the register page")
})

// request(req) from body(body) name(name="input") >> req.body.input
router.post("/", checkNotAuthenticated, async (req, res) => {
  // Encrypting password
  try{
    const passwordHash = await bcrypt.hash(req.body.new_Password, 12)
    // Database info
    // name: req.body.new_Name
    // email: req.body.new_Email
    // password: passwordHash
    res.redirect("/login")
  } catch {
    res.redirect("/register")
  }
  //console.log(userObject pushed into database)

  req.body.new_Email  
})

module.exports = router
