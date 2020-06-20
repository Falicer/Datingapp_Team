const express = require("express")
const router = express.Router()

const { checkAuthenticated } = require("../middleware/authentication")

router.get("/", checkAuthenticated, (req, res) => {
  const isNew = req.user.age == undefined

  res.status(200).render("index", { isNew, user: req.user })
})

module.exports = router
