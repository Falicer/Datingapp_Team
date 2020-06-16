const { model, Schema } = require("mongoose")

const MatchSchema = new Schema({
  user: {
    _id: Schema.ObjectId,
    name: String,
    small_img_url: String
  },
  chatId: {
    type: Schema.Types.Mixed,
  },
})

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  matches: [MatchSchema],
})

const Model = model("user", UserSchema)

module.exports = Model
