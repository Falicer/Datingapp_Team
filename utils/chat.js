const Chat = require("../models/Chat")

const { doesExistInUser } = require("../utils/users")

function isAllowedInChat(userId, chatId) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const allowed = await doesExistInUser({
          _id: userId,
          "matches.chatId": chatId,
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
