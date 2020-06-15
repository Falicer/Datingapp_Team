const express = require("express")
const router = express.Router()

router.get("/", checkAuthenticated,(req, res) => {
  res.render("index.ejs", { name: req.user.name })
})

module.exports = router
