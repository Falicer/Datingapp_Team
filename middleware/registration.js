const { getUserByEmail } = require("../utils/users")

async function isNewUser(req, res, next) {
  const { email } = req.body

  try {
    const user = await getUserByEmail(email)

    if (!user) return next()

    req.flash("error", "This email is already registered")
    res.redirect("/register")
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
}

function passwordsMatch(req, res, next) {
  const { password, password2 } = req.body

  if (password === password2) return next()

  req.flash("error", "Passwords don't match")
  res.redirect("/register")
}

module.exports = { passwordsMatch, isNewUser }
