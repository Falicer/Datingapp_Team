const express = require("express")
const router = express.Router()

const User = require("../models/User")

// Middleware
const {
  checkAuthenticated,
  allowInChat,
} = require("../middleware/authentication")

const { getMatchFromChatId } = require("../utils/matching")

router.get("/:chatId", checkAuthenticated, allowInChat, async (req, res) => {
  const { _id } = req.user
  const { chatId } = req.params

  try {
    const match = await getMatchFromChatId(chatId, _id)

    // It would be really weird if this happened
    if (!match) return res.status(404).send("Page not found")

    res
      .status(200)
      .render("chat", { userId: _id, chatId, otherUser: match.user })
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router
