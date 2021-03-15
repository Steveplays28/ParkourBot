const Mongoose = require("mongoose");

const userDataSchema = Mongoose.Schema({
  userID: String,
  openTickets: Number,
  artXP: Number,
  votingXP: Number,
});

module.exports = Mongoose.model("UserData", userDataSchema);
