const User = require("../models/User")

function doesNotExistInUser(query) {
  return new Promise((resolve, reject) => {
    void async function () {
      const exists = await User.exists(query)

      if (exists) return reject(new Error("Already exists"))

      resolve()
    }()
  })
}

function findUser(id) {
  return new Promise((resolve, reject) => {
    void async function () {
      try {
        const user = await User.findById(id)

        if (!user) reject(new Error(`User id ${id} does not exist`))

        resolve(user)
      } catch (error) {
        reject(error)
      }
    }()
  })
}

module.exports = {
  findUser, doesNotExistInUser
}

