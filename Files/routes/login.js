const express = require("express")
const router = express.Router()

router.get("/", checkNotAuthenticated, (req, res) => {
  res.status(200).send("You're on the login page")
})

router.post("/", checkNotAuthenticated ,passport.authenticate("local", {
  succesRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}))

module.exports = router
