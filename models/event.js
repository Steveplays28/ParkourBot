const Mongoose = require('mongoose')

const eventSchema = Mongoose.Schema({
  type: String,
  timestamp: Date
})

module.exports = Mongoose.model('Event', eventSchema)