const express = require("express")
const router = express.Router()

// Utils
const { getPotentialMatches } = require("../utils/matching")

// Routes (GET) : /
router.get("/", async (req, res) => {
  try {
    const otherUsers = await getPotentialMatches(req.user)

    res.status(200).render("index", { otherUsers })
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router
