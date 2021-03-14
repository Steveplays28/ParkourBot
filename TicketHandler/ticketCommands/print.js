const Discord = require("discord.js");
const Mongoose = require("mongoose");
const ErrEmbed = require("../../ErrEmbed");
const types = require("../types");

module.exports = {
  /**
   * @param {Discord.Message} message
   * @param {String[]} args
   * @param {Discord.Client} client
   * @param {Mongoose.Model} Ticket
   */
  run: async (message, args, client, Ticket) => {
    if (!args[1] || !types.listTypes.includes(args[1])) {
      return message.channel.send(
        ErrEmbed(
          `Invalid list type`,
          args[1]
            ? `\`${args[1]}\` is not a valid list type`
            : `No ticket type specified`,
          false
        )
      );
    }

    const type = args[1].toLowerCase();

    const searchQuery = type == "all" ? {} : { type: type.slice(0, -1) };

    let data = [];

    try {
      await Ticket.find(searchQuery, (err, docs) => {
        if (err) console.log(err);
        docs.forEach((doc) => {
          data = [
            ...data,
            {
              ticketID: doc.ticketID,
              userID: doc.userID,
              link: doc.link,
              type: doc.type,
              content: doc.content,
              timestamp: doc.timestamp,
            },
          ];
        });
      });
    } catch (err) {
      console.log(err);
    }

    if (data) {
      data.forEach((t) => {
        message.channel.send(
          new Discord.MessageEmbed()
            .setAuthor(
              client.users.cache.find((user) => user.id == t.userID).tag
            )
            .setTitle("Ticket")
            .setFooter(
              client.guilds.cache.find(
                (guild) =>
                  guild.id ==
                  t.link.match(
                    /https?\:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/
                  )[1]
              )
            )
            .setTimestamp(Date.parse(t.timestamp))
            .addField(
              t.type.charAt(0).toUpperCase() + t.type.slice(1),
              t.content + "\n" + `[Go to message](${t.link})`,
              false
            )
            .setDescription(`***ID:** ${t.ticketID}*`)
        );
      });
    }
  },
  name: "print",
};
