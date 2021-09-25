require("dotenv").config();

const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
// tern off bot just from discord high level member with high permission
client.on("message", (message) => {
  if (message.author.bot) return;
  if (
    message.content.toLowerCase() == "shutdown" &&
    message.member.roles.cache.find((r) => r.name === process.env.high_Roll) // put your high level roll in (process.env.high_Roll) for example r.name === 'moderator'
  ) {
    console.log("shut");
    message.channel.send("Shutting down...").then(() => {
      // shutdown order in discord js
      process.exit();
    });
  } else if (
    message.content.toLowerCase() == "shutdown" &&
    !message.member.roles.cache.find((r) => r.name === process.env.high_Roll)
  )
    return message.reply("you do not have permission to shut down bot 🙁");
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
