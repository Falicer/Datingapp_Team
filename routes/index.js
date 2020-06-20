const express = require("express")
const router = express.Router()

const { checkAuthenticated } = require("../middleware/authentication")

router.get("/", checkAuthenticated, (req, res) => {
  const { name } = req.user

  res.status(200).render("index", { name })
})

module.exports = router
