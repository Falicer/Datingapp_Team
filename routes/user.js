const express = require("express")
const router = express.Router()

// Utils
const {
  getUserById,
  verifyUsers,
  updateUser,
  deleteUser,
  likeUser,
  createMatch,
  checkIfMatch,
} = require("../utils")

// Middleware
const userIdInSession = (req, res, next) => {
  req.user._id == req.params.id ? next() : res.status(401).send("Unauthorized")
}

// Route (GET) : /user
router.get("/", (req, res) => {
  res.redirect(`/user/${req.user._id}`)
})

// Route (GET) : /user/:id
router.get("/:id", userIdInSession, async (req, res) => {
  try {
    const user = await getUserById(req.params.id)

    res.status(200).render("account", { user })
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

// Route (PUT) : /user/:id/update
router.put("/:id/update", userIdInSession, async (req, res) => {
  const id = req.params.id
  const data = req.body

  const changedData = Object.entries(data).filter(([k, v]) => req.user[k] != v)

  if (!changedData.length) return res.redirect(`/user/${id}`)

  try {
    await updateUser(id, Object.fromEntries(changedData))

    res.status(200).redirect(`/user/${id}`)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

// Route (POST) : /user/:id/liked?userId=:otherUserId
router.post("/:id/like", userIdInSession, async (req, res) => {
  const userIds = [req.params.id, req.query.userId]

  try {
    await Promise.all([verifyUsers(userIds), likeUser(...userIds)])

    if (await checkIfMatch(...userIds)) {
      await createMatch(...userIds)

      return res.status(201).redirect("/matches")
    }

    res.status(200).redirect("/")
  } catch (error) {
    res.status(400).send(`${error}\n`)
  }
})

// Route (GET) : /user/:id/profile/setup
router.put("/:id/profile/setup", userIdInSession, async (req, res) => {
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

// Route (DELETE) : /user/:id/delete
router.delete("/:id/delete", userIdInSession, async (req, res) => {
  const { id } = req.params
  try {
    await deleteUser(id)

    req.logOut()
    res.status(200).redirect("/login")
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router
