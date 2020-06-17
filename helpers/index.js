const { Schema, model } = require("mongoose")

exports.createMatchObject = (id, user, chatId) => {
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

const _schema = new Schema({})
const _emptyModel = model("_", _schema)

exports.generateId = () => new _emptyModel()._id
