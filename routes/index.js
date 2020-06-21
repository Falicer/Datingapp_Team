const express = require("express")
const router = express.Router()

const { getPotentialMatches } = require("../utils/matching")

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
