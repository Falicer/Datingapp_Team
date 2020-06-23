const { model, Schema, Types } = require("mongoose")

const MessageSchema = new Schema({
  type: String,
  content: String, // Either a link to a gipihy or text message
  userId: Types.ObjectId,
  date: {
    type: Date,
    default: Date.now,
  },
})

const ChatSchema = new Schema(
  {
    matchId: {
      type: Types.ObjectId,
      required: true,
    },
    messages: [MessageSchema],
  },
  { timestamps: true }
)

const Model = model("chat", ChatSchema)

module.exports = Model
