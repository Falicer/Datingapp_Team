const fs = require("fs")

const { Schema, model } = require("mongoose")

const _schema = new Schema({})
const _emptyModel = model("_", _schema)
const generateId = () => new _emptyModel()._id

const createMatchObject = (id, user, chatId) => {
  const { _id, name, image_src } = user

  return {
    _id: id,
    user: {
      _id,
      name,
      image_src,
    },
    chatId,
  }
}

function definedOnSchema(_model, data) {
  return new Promise((resolve, reject) => {
    const schemaKeys = Object.keys(_model.schema.paths).filter(
      (key) => !/^_/m.test(key)
    )
    const rejectedKeys = Object.keys(data).filter(
      (key) => !schemaKeys.includes(key)
    )

    if (rejectedKeys.length > 0)
      return reject(
        new Error(
          `${rejectedKeys.join(", ")} ${
            rejectedKeys.length == 1 ? "is" : "are"
          } not defined on ${_model.modelName} model`
        )
      )

    resolve()
  })
}

function getMatchingGender(sexuality, gender) {
  /*eslint indent: 0*/
  /*eslint no-unreachable: 0*/

  switch (sexuality) {
    case "heterosexual":
      return gender == "male" ? "female" : "male"
      break
    case "homosexual":
      return gender == "male" ? "male" : "female"
    default:
      return /female|male/i
      break
  }
}

function deleteUserImage(_path) {
  return new Promise((resolve) => {
    fs.unlink(_path, (err) => {
      if (err) console.log(err)

      resolve()
    })
  })
}

module.exports = {
  generateId,
  createMatchObject,
  definedOnSchema,
  getMatchingGender,
  deleteUserImage,
}
