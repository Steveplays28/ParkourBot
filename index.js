const ms = require("ms");
const Discord = require("discord.js"),
  fs = require("fs"),
  settings = require("./config");
const updateMemberCount = require("./updateMemberCount");
const {
    prefix,
    permissions,
    err_color,
    startup_logging_channel,
  } = require("./config"),
  env = require("dotenv").config();
const client = new Discord.Client({
  ws: { intents: new Discord.Intents(Discord.Intents.ALL) },
});

const token = process.env.TOKEN;

client.login(token).catch((err) => console.log(err));

const date = Date.now();

let commands = [];
fs.readdirSync("./commands").forEach((file) => {
  commands.push(`require('./commands/${file}')`);
});

client
  .on("ready", () => {
    console.log(`\x1b[35m${client.user.username}\x1b[0m`);
    client.user
      .setPresence(`${prefix}help | developed by M1x3l and Steveplays :D`, {
        type: "LISTENING",
      })
      .catch((err) => console.log(err));

    client.guilds.cache.each((guild) => {
      try {
        guild.channels.cache
          .find(
            (channel) =>
              channel.name.toLowerCase() == startup_logging_channel ||
              channel.name.toLowerCase() ==
                startup_logging_channel.replace(/ /g, "-")
          )
          .send(
            new Discord.MessageEmbed()
              .setTitle(`${client.user.username} is online now`)
              .setDescription(
                `Time from startup to sending of this message: \`${ms(
                  Date.now() - date,
                  { long: true }
                )}\``
              )
          );
        updateMemberCount.run(guild);
      } catch (err) {
        console.log(
          `\x1b[33mNo startup logging channel found on \x1b[34m${guild.name}\x1b[0m`
        );
      }
    });
  })

  .on("message", (message) => {
    if (
      message.author == client.user ||
      !message.content.startsWith(prefix) ||
      !message.guild
    )
      return;

    if (
      !message.channel.name.includes("bot") &&
      !message.member.hasPermission("MANAGE_MESSAGES", {
        checkAdmin: true,
        checkOwner: true,
      })
    )
      return;

    var args = message.content.split(" ");
    args.shift();
    const command = message.content
      .split(" ")[0]
      .replace(prefix, "")
      .toLowerCase();
    if (!command) return;

    let c = eval(
      commands.find(
        (com) =>
          eval(com).name.toLowerCase() == command ||
          eval(com).alias.includes(command)
      )
    );
    if (!c) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(`Invalid command`)
          .setDescription(`Command \`${command}\` was not found`)
      );
    }

    cName = c.name;
    if (
      !message.member.hasPermission(
        permissions[cName ? cName.toLowerCase : "default"],
        {
          options: {
            checkAdmin: true,
            checkOwner: true,
          },
        }
      )
    ) {
      return message.channel
        .send(
          new Discord.MessageEmbed()
            .setTitle("Insufficient Permissions")
            .setColor(err_color)
            .setDescription(
              `You do not have the permission \`${
                permissions[c.name.toLowerCase()]
              }\`, which is needed to execute this command.`
            )
        )
        .catch((err) => console.log(err));
    }

    if (c)
      c.run(message, args, client).catch((err) => {
        console.log(err);
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(":x: Error :x:")
            .setDescription(err)
        );
      });
  })

  .on("guildMemberAdd", (member) => {
    updateMemberCount.run(member.guild);
  })

  .on("guildMemberRemove", (member) => {
    updateMemberCount.run(member.guild);
  });
