const Mongoose = require('mongoose')

const ticketSchema = Mongoose.Schema({
  ticketID: String,
  userID: Number,
  type: String,
  content: String,
  link: String,
  timestamp: Date
})

module.exports = Mongoose.model('Ticket', ticketSchema)