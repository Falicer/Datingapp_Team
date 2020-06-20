const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const { getUserByEmail, getUserById } = require("./utils/users")

function passportInitialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await getUserByEmail(email)

      if (user == null) {
        return done(null, false, {
          message: "No user found that matched the email ",
        })
      }

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: "Password is incorrect" })
      }
    } catch (error) {
      return done(error)
    }
  }

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser))
  passport.serializeUser((user, done) => {
    return done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    return done(null, await getUserById(id))
  })
}

module.exports = passportInitialize
