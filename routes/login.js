const passport = require("passport")
const express = require("express")
const router = express.Router()

// Routes (GET) : /login
router.get("/", (req, res) => {
  res.status(200).render("login", { layout: "layout-plain" })
})

// Routes (POST) : /login
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
)

module.exports = router
