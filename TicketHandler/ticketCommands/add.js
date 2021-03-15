const Discord = require("discord.js");
const Mongoose = require("mongoose");
const { err_color } = require("../../config");

const types = require("../types");

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
     * If the specified ticket type is invalid or undefined, return error
     */
    if (!args[1] || !types.ticketTypes.includes(args[1])) {
      return message.channel.send(
        err_embed.addField(
          `Invalid ticket type`,
          args[1]
            ? `\`${args[1]}\` is not a valid ticket type`
            : `No ticket type specified`,
          false
        )
      );
    }

    /**
     * If no content is specified, return error
     */
    if (!args[2]) {
      return message.channel.send(
        err_embed.addField(
          `No content given`,
          `You need to specify content for the ticket`,
          false
        )
      );
    }

    const type = args[1];
    args.shift();
    args.shift();
    /**
     * Joined arguments from `args[2]` to `args[∞]`
     * @type String
     */
    const content = args.join(" ");

    let visualType = type.charAt(0).toUpperCase() + type.slice(1);

    const msg = await message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle("Ticket")
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp(Date.now())
        .addField(
          visualType,
          content + "\n" + `[Go to message](${message.url})`,
          false
        )
        .setDescription(
          `***ID:** ${parseInt(message.channel.id).toString(16)}-${parseInt(
            message.id
          ).toString(16)}*`
        )
    );

    const instance = new Ticket({
      ticketID: `${parseInt(message.channel.id).toString(16)}-${parseInt(
        message.id
      ).toString(16)}`,
      userID: message.author.id,
      type: type,
      content: content,
      link: message.url,
      embedLink: msg.url,
      timestamp: message.createdTimestamp,
    });
    instance.save((err) => {
      if (err) return console.log(err);
    });
  },
  name: "add",
};
