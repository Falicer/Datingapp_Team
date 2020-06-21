const Chat = require("../models/Chat")
const User = require("../models/User")

const { doesExistInUser } = require("../utils/users")

function isAllowedInChat(userId, chatId) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const { _id } = await Chat.findById({ _id: chatId }, "matchId")

        const allowed = await doesExistInUser({
          _id: userId,
          "matches.chatId": _id,
        })

        resolve(allowed)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function addMessage(chatId, { type, content }) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const chat = await Chat.findById(chatId)

        chat.messages.push({ type, content })

        await chat.save()

        resolve()
      } catch (error) {
        reject(error)
      }
    })()
  })
}

module.exports = {
  isAllowedInChat,
  addMessage,
}
