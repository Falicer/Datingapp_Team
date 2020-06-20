const User = require("../models/User")

const { definedOnSchema } = require("../helpers")

function updateUser(id, data) {
  return new Promise((resolve, reject) => {
    if (typeof data != "object") return reject("Need to pass in data object")

    void (async function () {
      try {
        await definedOnSchema(User, data)
        await User.findByIdAndUpdate(id, data)

        resolve()
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function createUser(data) {
  return new Promise((resolve, reject) => {
    void (async function () {
      const { name, email, password } = data

      const user = new User({
        name,
        email,
        password,
      })

      try {
        await user.save()
        resolve()
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const user = await User.findOne({ email: email })

        resolve(user)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const user = await User.findById(id)

        if (!user) reject(new Error(`User id ${id}, does not exist`))

        resolve(user)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function doesNotExistInUser(query, errorMsg) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const exists = await User.exists(query)

        return exists ? reject(errorMsg) : resolve()
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function verifyUser(id) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const result = await User.exists({ _id: id })
        resolve({ id, result })
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function verifyUsers(ids) {
  return new Promise((resolve, reject) => {
    void (async function () {
      const pendingUserVerifications = ids.map((id) => {
        return verifyUser(id)
      })

      try {
        const verifications = await Promise.all(pendingUserVerifications)
        const failedVerifications = verifications.filter(
          (verification) => !verification.result
        )

        const json = JSON.stringify(failedVerifications)

        failedVerifications.length > 0
          ? reject(`Failed verifications : ${json}`)
          : resolve()
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

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  doesNotExistInUser,
  doesExistInUser,
  verifyUsers,
  updateUser,
}
