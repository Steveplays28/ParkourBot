const Mongoose = require("mongoose");

const ticketSchema = Mongoose.Schema({
  ticketID: String,
  userID: String,
  type: String,
  content: String,
  link: String,
  embedLink: String,
  timestamp: Date,
});

module.exports = Mongoose.model("Ticket", ticketSchema);
