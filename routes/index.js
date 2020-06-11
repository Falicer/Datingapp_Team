const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).send("You're on the homepage")
})

module.exports = router
