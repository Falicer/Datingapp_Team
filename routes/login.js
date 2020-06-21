const passport = require("passport")
const express = require("express")
const router = express.Router()

const { checkNotAuthenticated } = require("../middleware/authentication")

router.get("/", (req, res) => {
  res.status(200).render("login", { layout: "layout-plain" })
})

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
)

module.exports = router
