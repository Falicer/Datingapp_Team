const { model, Schema } = require("mongoose")

const MessageSchema = new Schema({
  type: String,
  message: String, // Either a link to a gipihy or text message
})

const ChatSchema = new Schema({
  matchId: {
    type: Schema.ObjectId,
    required: true,
  },
  messages: [MessageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Model = model("chat", ChatSchema)

module.exports = Model
