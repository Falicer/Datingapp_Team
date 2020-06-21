const express = require("express")
const router = express.Router()

const Chat = require("../models/Chat")

// Middleware
const {
  checkAuthenticated,
  allowInChat,
} = require("../middleware/authentication")

const { getMatchFromChatId } = require("../utils/matching")
const { addMessage } = require("../utils/chat")

router.get("/:chatId", checkAuthenticated, allowInChat, async (req, res) => {
  const { _id } = req.user
  const { chatId } = req.params

  try {
    const chat = await Chat.findById(chatId)
    const match = await getMatchFromChatId(chat._id, _id)

    // It would be really weird if this happened
    if (!match) return res.status(404).send("Page not found")

    res.status(200).render("chat", { userId: _id, chat, otherUser: match.user })
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

router.get("/:chatId/giphy", checkAuthenticated, allowInChat, (req, res) => {
  res.render("giphy")
})

router.post(
  "/:chatId/message",
  checkAuthenticated,
  allowInChat,
  async (req, res) => {
    const { chatId } = req.params
    const { type, content } = req.body

    try {
      await addMessage(chatId, { type, message: content })

      res.status(200).redirect(`/chat/${chatId}`)
    } catch (error) {
      console.log(error)
    }
    // console.log(type, content)
  }
)

module.exports = router
