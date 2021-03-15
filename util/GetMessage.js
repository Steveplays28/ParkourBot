const Discord = require("discord.js");
/**
 *
 * @param {Discord.Snowflake} guildID
 * @param {Discord.Snowflake} channelID
 * @param {Discord.Snowflake} messageID
 * @param {Discord.Client} client
 * @returns {Discord.Message} Discord.Message
 */
module.exports = function GetMessage(guildID, channelID, messageID, client) {
  return client.guilds.cache
    .get(guildID)
    .channels.cache.get(channelID)
    .messages.cache.find((message) => message.id == messageID);
};
