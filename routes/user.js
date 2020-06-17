const express = require("express")
const router = express.Router()

const { verifyUsers } = require("../utils/users")
const { likeUser } = require("../utils/userActions")
const { createMatch, checkIfMatch } = require("../utils/matching")

router.get("/:id", (req, res) => {
  res.status(200).send("You're on the user page")
})

// 1. Authentication (middleware)
// 2. Do database checks (check for potential duplicates)
// 3. Like the user (update database)
// 4. Check if match

router.post("/:id/like", async (req, res) => {
  const userIds = ["5ee9156cb470389a1cedfbe4", req.params.id]

  try {
    await Promise.all([verifyUsers(userIds), likeUser(...userIds)])

    if (await checkIfMatch(...userIds)) {
      await createMatch(...userIds)

      return res.status(201).send(`New Match: ${req.params.id})\n`)
    }

    res.status(200).send(`Liked User: ${req.params.id})\n`)
  } catch (error) {
    res.status(400).send(`${error}\n\n`)
  }
})

module.exports = router
