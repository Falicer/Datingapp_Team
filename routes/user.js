const express = require("express")
const router = express.Router()

const { verifyUsers, updateUser } = require("../utils/users")
const { likeUser } = require("../utils/userActions")
const { createMatch, checkIfMatch } = require("../utils/matching")

// Middleware
const { checkAuthenticated } = require("../middleware/authentication")

router.get("/:id", checkAuthenticated, (req, res) => {
  res.status(200).send("You're on the user page")
})

// 1. Authentication (middleware)
// 2. Do database checks (check for potential duplicates)
// 3. Like the user (update database)
// 4. Check if match

router.post("/:id/like", checkAuthenticated, async (req, res) => {
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

router.put("/:id/profile/setup", checkAuthenticated, async (req, res) => {
  const id = req.params.id
  const { age, sexuality, gender } = req.body

  if (!age || !sexuality || !gender) {
    req.flash("error", "You need to fill these values in")
    return res.redirect("/")
  }

  if (age > 70 || age < 18) {
    req.flash("error", "You need to be 18 to continue")
    return res.redirect("/")
  }

  try {
    await updateUser(id, { age, sexuality, gender })

    res.status(200).redirect("/")
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router
