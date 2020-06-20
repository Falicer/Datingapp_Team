const express = require("express")
const router = express.Router()

const { checkAuthenticated } = require("../middleware/authentication")

router.get("/", checkAuthenticated, async (req, res) => {
  res.status(200).send("Matches page")
})

module.exports = router
