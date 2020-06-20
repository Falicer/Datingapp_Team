const express = require("express")
const router = express.Router()

const { checkAuthenticated } = require("../middleware/authentication")

const { getMatches } = require("../utils/matching")

router.get("/", checkAuthenticated, async (req, res) => {
  try {
    const matches = await getMatches(req.user._id)

    res.status(200).render("matches", { matches })
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router
