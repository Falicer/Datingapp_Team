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
        const { data } = await getTrending()

        const giphies = data.map((giphy) => {
          return {
            alt: giphy.title,
            src: giphy.images.original.url,
            id: giphy.id,
          }
        })

        res.status(200).render("giphy", { giphies, chatId })

        console.log(giphies)
        // res
        //   .status(200)
        //   .render("giphy-overview", { layout: "layout-no-nav", ...renderData })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send("Internal Server Error")
    }
  }
)

router.post(
  "/:chatId/message",
  checkAuthenticated,
  allowInChat,
  async (req, res) => {
    const { chatId } = req.params
    const { type, content } = req.body

    console.log(type, content)

    try {
      await addMessage(chatId, { type, content })

      res.status(200).redirect(`/chat/${chatId}`)
    } catch (error) {
      console.log(error)
    }
  }
)

module.exports = router
