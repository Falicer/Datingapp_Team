const express = require("express")
const router = express.Router()

// Models
const Chat = require("../models/Chat")

// Middleware
const { allowInChat } = require("../middleware/authentication")

// Utils
const {
  getMatchFromChatId,
  addMessage,
  getTrending,
  searchGiphy,
} = require("../utils")

// Route (GET) : /chat/:id
router.get("/:chatId", allowInChat, async (req, res) => {
  const { chatId } = req.params

  try {
    const chat = await Chat.findById(chatId)
    const match = await getMatchFromChatId(chat._id, req.user)

    // It would be really weird if this happened
    if (!match) return res.status(404).send("Page not found")

    res
      .status(200)
      .render("chat", { layout: "layout-plain", chat, otherUser: match.user })
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

// Route (GET) : /chat/:id/giphy
router.get("/:chatId/giphy", allowInChat, async (req, res) => {
  const chatId = req.params.chatId
  const { search = undefined } = req.query

  try {
    const giphyApiCall = !search ? getTrending : searchGiphy.bind(null, search)
    const giphies = await giphyApiCall()

    res.status(200).render("giphy", { giphies, chatId })
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

// Route redirect (POST) : /chat/:id/giphy/search
router.post("/:chatId/giphy/search", allowInChat, (req, res) => {
  const chatId = req.params.chatId
  const query = req.body.query

  res.redirect(`/chat/${chatId}/giphy?search=${query}`)
})

// Route (POST) : /chat/:id/message
router.post("/:chatId/message", allowInChat, async (req, res) => {
  const chatId = req.params.chatId
  const userId = req.user._id
  const { type, content } = req.body

  try {
    await addMessage(chatId, { type, content, userId })

    res.status(200).redirect(`/chat/${chatId}`)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
