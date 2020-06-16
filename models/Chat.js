const { model, Schema } = require("mongoose")

const MessageSchema = new Schema({
  type: String,
  message: String, // Either a link to a gipihy or text message
})

const ChatSchema = new Schema({
  messages: [MessageSchema],
})

const Model = model("chat", ChatSchema)

module.exports = Model
