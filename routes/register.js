const express = require("express")
const router = express.Router()
const { hash } = require("bcrypt")

// Utils / Helpers
const { createAndStoreUser } = require("../utils/users")

// Middleware
const { validateInputs } = require("../middleware/registration")

// Routes (GET) : /register
router.get("/", (req, res) => {
  res.status(200).render("register", { layout: "layout-plain" })
})

// Routes (POST) : /register
router.post("/", validateInputs, async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await hash(password, 10)

    // Store user in database
    const user = await createAndStoreUser({
      name,
      email,
      password: hashedPassword,
    })

    // Loggin after register
    req.login(user, (err) =>
      err ? res.status(200).redirect("/login") : res.redirect("/")
    )
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router
