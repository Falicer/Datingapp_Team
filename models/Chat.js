const { model, Schema } = require("mongoose")

const MessageSchema = new Schema({
  type: String,
  content: String, // Either a link to a gipihy or text message
  date: {
    type: Date,
    default: Date.now,
  },
})

const ChatSchema = new Schema(
  {
    matchId: {
      type: Schema.ObjectId,
      required: true,
    },
    messages: [MessageSchema],
  },
  { timestamps: true }
)

const Model = model("chat", ChatSchema)

module.exports = Model
