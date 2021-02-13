const Mongoose = require('mongoose')


const dataSchema = Mongoose.Schema({
  userID: Number,
  guildID: Number,
  channelID: Number,
  messageID: Number
})

module.exports = Mongoose.model('Data', dataSchema)