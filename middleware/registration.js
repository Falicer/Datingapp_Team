const emailValidator = require("email-validator")

const { getUserByEmail } = require("../utils/users")

async function validateInputs(req, res, next) {
  const { email, name, password, password2 } = req.body

  const nameRegEx = new RegExp(/^[a-z]*?$/, "im")
  const passwordRegEx = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) // Source: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

  const errors = []

  // Validate if email is correct
  if (!emailValidator.validate(email)) {
    errors.push("Incorrect email")
  } else if ((await getUserByEmail(email)) != undefined) {
    errors.push("This email is already registered")
  }

  // Check for name length
  if (name.length < 2) {
    errors.push("Name is too short")
  } else if (!nameRegEx.test(name)) {
    errors.push("You can't have numbers or special characters in your name")
  }

  // Validate password
  if (!passwordRegEx.test(password)) {
    errors.push(
      "Password must have atleast eight characters, including one letter and one number"
    )
  } else if (password !== password2) {
    errors.push("Passwords don't match")
  }

  if (errors.length == 0) return next()

  req.flash("errors", errors)
  res.status(406).redirect("/register")
}

module.exports = { validateInputs }
