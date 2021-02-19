const Mongoose = require('mongoose')

const userDataSchema = Mongoose.Schema({
  userID: Decimal128,
  openTickets: Number,
  artXP: Number,
  votingXP: Number
})

module.exports = Mongoose.model('UserData', userDataSchema)