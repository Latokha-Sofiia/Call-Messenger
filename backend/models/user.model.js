// const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: false },
  photo_url: { type: String, required: false },
  password: { type: String, required: true },
  sessions: [{ type: String }],
})

module.exports = mongoose.model("users", UserSchema)
