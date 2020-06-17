const User = require("../models/User")

function doesNotExistInUser(query) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const exists = await User.exists(query)

        return exists ? reject() : resolve()
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function doesExistInUser(query) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const exists = await User.exists(query)

        return exists ? resolve() : reject()
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function findUser(id) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const user = await User.findById(id)

        if (!user) reject(new Error(`User id ${id} does not exist`))

        resolve(user)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

module.exports = {
  findUser,
  doesNotExistInUser,
  doesExistInUser,
}
