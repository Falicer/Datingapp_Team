const Chat = require("../models/Chat")
const User = require("../models/User")

// Helpers
const { createMatchObject, generateId } = require("../helpers")

// Utils
const { findUser, doesNotExistInUser } = require("./users")

const isNewMatch = (...ids) => doesNotExistInUser({ _id: { $in: ids }, "matches.user._id": { $in: ids } })
const isNewLike = ([currentUserId, likedUserId]) => doesNotExistInUser({ _id: likedUserId, likesReceived: { $in: currentUserId } })

function createMatch(userId1, userId2) {
  return new Promise((resolve, reject) => {
    void async function () {
      try {
        const user1 = await findUser(userId1)
        const user2 = await findUser(userId2)

        const chat = new Chat()

        const id = generateId()

        user1.matches.push(createMatchObject(id, user2, chat._id))
        user2.matches.push(createMatchObject(id, user1, chat._id))

        try {
          await Promise.all([chat.save(), user1.save(), user2.save()])

          resolve()
        } catch (error) {
          reject(error)
        }
      } catch (error) {
        reject(error)
      }
    }()
  })
}

module.exports = { createMatch, isNewMatch, isNewLike }