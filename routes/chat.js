const express = require("express")
const router = express.Router()

// Middleware
const {
  checkAuthenticated,
  allowInChat,
} = require("../middleware/authentication")

router.get("/:chatId", checkAuthenticated, allowInChat, async (req, res) =>
  res.status(200).render("register")
)

module.exports = router
