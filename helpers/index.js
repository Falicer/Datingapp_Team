const { Schema, model } = require("mongoose")

const _schema = new Schema({})
const _emptyModel = model("_", _schema)
const generateId = () => new _emptyModel()._id

const createMatchObject = (id, user, chatId) => {
  const { _id, name, small_img_url } = user

  return {
    _id: id,
    user: {
      _id,
      name,
      small_img_url,
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

module.exports = {
  generateId,
  createMatchObject,
  definedOnSchema,
  getMatchingGender,
}
