const Mongoose = require("mongoose");

const dataSchema = Mongoose.Schema({
  userID: String,
  guildID: String,
  channelID: String,
  messageID: String,
});

module.exports = Mongoose.model("Data", dataSchema);
