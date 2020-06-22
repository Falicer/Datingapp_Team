const Chat = require("../models/Chat")
const User = require("../models/User")

// Helpers
const {
  getMatchingGender,
  createMatchObject,
  generateId,
} = require("../helpers")

// Utils
const { getUserById, doesNotExistInUser } = require("./users")

function likedEachOther(...ids) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const result = await User.find({
          _id: { $in: ids },
          likesReceived: { $in: ids },
        })

        resolve(result.length == 2)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function checkIfMatch(...ids) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const isMatch = await likedEachOther(...ids)

        resolve(isMatch)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

const areNotMatched = (...ids) =>
  doesNotExistInUser({ _id: { $in: ids }, "matches.user._id": { $in: ids } })

function createMatch(userId1, userId2) {
  return new Promise((resolve, reject) => {
    void (async function () {
      // Check if users aren't matched
      try {
        await areNotMatched(userId1, userId2)
      } catch (error) {
        return reject(new Error("Already matched"))
      }

      try {
        const user1 = await getUserById(userId1)
        const user2 = await getUserById(userId2)

        const id = generateId()

        const chat = new Chat({ matchId: id })

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
    })()
  })
}

function getPotentialMatches(user) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const users = await User.find({
          _id: { $ne: user._id },
          likesReceived: { $nin: [user._id] },
          gender: getMatchingGender(user.sexuality, user.gender),
          sexuality: user.sexuality,
        })

        resolve(users)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function getMatches(id) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const result = await User.findById(id, "matches")

        if (!result || !("matches" in result) || !result.matches.length)
          return resolve([])

        resolve(result.matches)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function getMatchFromChatId(chatId, { _id }) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const { matchId } = await Chat.findById(chatId)
        const _matches = await User.find(
          { _id, "matches._id": matchId },
          "matches"
        )

        if (!_matches || _matches.length == 0) return resolve(null)

        const { matches } = _matches[0]

        resolve(matches.find((match) => match._id.equals(matchId)))
      } catch (error) {
        reject(error)
      }
    })()
  })
}

module.exports = {
  createMatch,
  checkIfMatch,
  getPotentialMatches,
  getMatches,
  getMatchFromChatId,
}
