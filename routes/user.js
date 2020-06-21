const express = require("express")
const router = express.Router()

const { verifyUsers, updateUser } = require("../utils/users")
const { likeUser } = require("../utils/userActions")
const { createMatch, checkIfMatch } = require("../utils/matching")

// Middleware
const { checkAuthenticated } = require("../middleware/authentication")

const { getUserById } = require("../utils/users")

const userIdInSession = (req, res, next) =>
  req.user._id == req.params.id ? next() : res.status(401).send("Unauthorized")

router.get("/", checkAuthenticated, (req, res) => {
  res.redirect(`/user/${req.user._id}`)
})

// Account page
router.get("/:id", checkAuthenticated, userIdInSession, async (req, res) => {
  const { id } = req.params
  try {
    const user = await getUserById(id)

    res.status(200).render("account", { user })
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

router.put(
  "/:id/update",
  checkAuthenticated,
  userIdInSession,
  async (req, res) => {
    const { id } = req.params
    const data = req.body
    const changedData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => req.user[key] != value)
    )

    if (!Object.keys(changedData).length) {
      return res.redirect(`/user/${id}`)
    }

    try {
      await updateUser(id, changedData)

      res.status(200).redirect(`/user/${id}`)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
)

// 1. Authentication (middleware)
// 2. Do database checks (check for potential duplicates)
// 3. Like the user (update database)
// 4. Check if match

router.post("/:id/like", checkAuthenticated, async (req, res) => {
  const userIds = [req.user._id, req.params.id]

  try {
    await Promise.all([verifyUsers(userIds), likeUser(...userIds)])

    if (await checkIfMatch(...userIds)) {
      await createMatch(...userIds)

      return res.status(201).redirect("/matches")
    }

    res.status(200).redirect("/")
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
