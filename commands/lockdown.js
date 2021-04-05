const { prefix, bot_color } = require("../config"),
  Discord = require("discord.js");

module.exports = {
  /**
   *
   * @param {Discord.Message} message
   * @param {String[]} args
   * @param {Discord.Client} Client
   */
  run: async (message, args, Client) => {
    const everyoneSend = message.channel.permissionOverwrites
      .filter((perm) => perm.id == message.guild.roles.everyone.id)
      .first()
      .allow.has("SEND_MESSAGES");

    message.channel.updateOverwrite(message.guild.roles.everyone, {
      SEND_MESSAGES: !everyoneSend,
    });
    message.delete();
  },
  name: "lockdown",
  alias: ["ld"],
  desc: "Removes the 'SEND_MESSAGES' permission",
  usage: `\`\`${prefix}lockdown\`\``,
};
