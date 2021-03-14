const Discord = require("discord.js");
const { err_color } = require("./config");

module.exports = function ErrEmbed(name, value, inline = false) {
  return new Discord.MessageEmbed({
    color: err_color,
    title: "Error",
    fields: [
      {
        name: name,
        value: value,
        inline: inline,
      },
    ],
  });
};
