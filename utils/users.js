const User = require("../models/User")

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
  verifyUsers,
}
