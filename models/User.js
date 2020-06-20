const { model, Schema } = require("mongoose")

const MatchSchema = new Schema({
  user: {
    _id: Schema.ObjectId,
    name: String,
    small_img_url: String,
  },
  chatId: {
    type: Schema.Types.Mixed,
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
  likesReceived: [Schema.ObjectId], // Collect likes received (store other user ids)
  matches: [MatchSchema],
})

const Model = model("user", UserSchema)

module.exports = Model
