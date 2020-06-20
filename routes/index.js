const express = require("express")
const router = express.Router()

const { checkAuthenticated } = require("../middleware/authentication")

const { getPotentialMatches } = require("../utils/matching")

router.get("/", checkAuthenticated, async (req, res) => {
  const currentUser = req.user
  const isNew = req.user.age == undefined

  try {
    const otherUsers = await getPotentialMatches(req.user)

    res.status(200).render("index", { isNew, currentUser, otherUsers })
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router
