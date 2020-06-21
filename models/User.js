const { model, Schema, Types } = require("mongoose")

const MatchSchema = new Schema({
  user: {
    _id: Types.ObjectId,
    name: String,
    small_img_url: String,
  },
  chatId: {
    type: Types.ObjectId,
    ref: "chat",
  },
})

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: Number,
  gender: String,
  sexuality: String,
  likesReceived: [{ type: Types.ObjectId, ref: "user" }], // Collect likes received (store other user ids)
  matches: [MatchSchema],
})

const Model = model("user", UserSchema)

module.exports = Model
