const { isAllowedInChat } = require("../utils/chat")

// Check if a user is authorized for a certain chat
function allowInChat(req, res, next) {
  void (async function () {
    try {
      const allowed = await isAllowedInChat(req.user._id, req.params.chatId)

      if (allowed) return next()

      res.status(403).send("You're not authorized")
    } catch (error) {
      console.log(error)
      res.status(500).send("Internal Server Error")
    }
  })()
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/")
  }
  next()
}

module.exports = { checkAuthenticated, checkNotAuthenticated, allowInChat }
