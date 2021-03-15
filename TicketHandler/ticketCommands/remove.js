const Discord = require("discord.js");
const Mongoose = require("mongoose");
const { err_color } = require("../../config");
const GetMessage = require("./../../util/GetMessage");

module.exports = {
  /**
   *
   * @param {Discord.Message} message
   * @param {String[]} args
   * @param {Discord.Client} client
   * @param {Mongoose.Model} Ticket
   */
  run: async (message, args, client, Ticket) => {
    let err_embed = new Discord.MessageEmbed()
      .setTitle("Error")
      .setColor(err_color);

    /**
     * If the specified ticket ID is invalid or undefined, return error
     */
    if (!args[1] || !args[1].match(/[a-f0-9]+-[a-f0-9]+/i)) {
      return message.channel.send(
        err_embed.addField(
          `Invalid ticket ID`,
          `${
            args[1]
              ? `\`${args[1]}\` is not a valid ticket ID`
              : `No ticket ID specified`
          }\nA valid ticket ID matches this RegEx: \`/[a-f0-9]+-[a-f0-9]+/i\``,
          false
        )
      );
    }

    const id = args[1];

    Ticket.findOneAndRemove({ ticketID: id }, {}, (err, doc, res) => {
      if (err) {
        console.log(err);
      }
      messageIDs = doc.link.match(
        /https?\:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/
      );
      embedIDs = doc.embedLink.match(
        /https?\:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/
      );
      try {
        GetMessage(
          messageIDs[1],
          messageIDs[2],
          messageIDs[3],
          client
        ).delete();
        GetMessage(embedIDs[1], embedIDs[2], embedIDs[3], client).delete();
      } catch (err) {
        console.log(err);
      }
    });
  },
  name: "remove",
};
