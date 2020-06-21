const express = require("express")
const router = express.Router()

const Chat = require("../models/Chat")

// Middleware
const {
  checkAuthenticated,
  allowInChat,
} = require("../middleware/authentication")

// Utils
const { getMatchFromChatId } = require("../utils/matching")
const { addMessage } = require("../utils/chat")
const { getTrending, searchGiphy } = require("../utils/giphy")

router.get("/:chatId", checkAuthenticated, allowInChat, async (req, res) => {
  const { chatId } = req.params

  try {
    const chat = await Chat.findById(chatId)
    const match = await getMatchFromChatId(chat._id, req.user)

    // It would be really weird if this happened
    if (!match) return res.status(404).send("Page not found")

    res.status(200).render("chat", { chat, otherUser: match.user })
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

router.get(
  "/:chatId/giphy",
  checkAuthenticated,
  allowInChat,
  async (req, res) => {
    const { chatId } = req.params
    const { search = undefined } = req.query

    // If no search query => show trending giphies
    try {
      if (!search) {
        const giphies = await getTrending()

        res.status(200).render("giphy", { giphies, chatId })
      } else {
        const giphies = await searchGiphy(search)

        res.status(200).render("giphy", { giphies, chatId })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send("Internal Server Error")
    }
  }
)

router.post("/:chatId/giphy/search", (req, res) => {
  const { query } = req.body

  res.redirect(`/chat/${req.params.chatId}/giphy?search=${query}`)
})

router.post(
  "/:chatId/message",
  checkAuthenticated,
  allowInChat,
  async (req, res) => {
    const { chatId } = req.params
    const { type, content } = req.body

    try {
      await addMessage(chatId, { type, content })

      res.status(200).redirect(`/chat/${chatId}`)
    } catch (error) {
      console.log(error)
    }
  }
)

module.exports = router
