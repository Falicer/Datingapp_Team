const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

// Utils / Helpers
const { createUser } = require("../utils/users")

// Middleware
const { checkNotAuthenticated } = require("../middleware/authentication")
const { passwordsMatch, isNewUser } = require("../middleware/registration")

router.get("/", checkNotAuthenticated, async (req, res) =>
  res.status(200).render("register")
)

router.post(
  "/",
  checkNotAuthenticated,
  isNewUser,
  passwordsMatch,
  async (req, res) => {
    const { name, email, password } = req.body

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      await createUser({ name, email, password: hashedPassword })

      res.status(200).redirect("/login")
    } catch (error) {
      console.log(error)
      res.status(500).send("Internal Server Error")
    }
  }
)

module.exports = router
