const Chat = require("../models/Chat")

// Helpers
const { createMatchObject, generateId } = require("../helpers")

// Utils
const { findUser } = require("./users")

function createMatch(userId1, userId2) {
  return new Promise((resolve, reject) => {
    void async function () {
      try {
        const user1 = await findUser(userId1)
        const user2 = await findUser(userId2)

        const chat = new Chat()

        const id = generateId()

        // Store match objects on users
        user1.matches.push(createMatchObject(id, user2, chat._id))
        user2.matches.push(createMatchObject(id, user1, chat._id))

        try {
          await Promise.all([chat.save(), user1.save(), user2.save()])

          resolve()
        } catch (error) {
          reject("Something wen't wrong while saving", error)
        }
      } catch (error) {
        reject(error)
      }
    }()
  })
}

module.exports = { createMatch }