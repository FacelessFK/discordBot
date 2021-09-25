// link to file node_modules/dotenv for some config
require("dotenv").config();

// require("./coolDown.js")

// link to status.js file
require("./status.js");
// save some config from discord.js file from node_modules
require("./deleteBadWord.js");

require('./deletePersianBadWord.js')
// require('./music.js')
require("./shutDown.js");

const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const PREFIX = "$";

client.on("message", (message) => {
  if (message.author.bot) return;
  //Take orders from your text in chat start with your prefix
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === "kick") {
      if (
        !message.member.roles.cache.find(
          (r) => r.name === process.env.high_Roll
        ) // put your high level roll in (process.env.high_Roll) for example r.name === 'moderator'
      )
        return message.reply("you do not have permission 😐");
      if (args.length === 0)
        // When you do not enter the correct mention
        return message.reply("Please enter the correct mention 💫");
      const member = message.mentions.members.first();
      // kick when you mention a person after order
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} kicked 🙂`))
          .catch((err) =>
            message.channel.send(
              "i can not kick this person my power is not enough 😖"
            )
          );
      } else {
        message.channel.send("i dont know this person");
      }
    } else if (CMD_NAME === "ban") {
      // ban user order
      if (
        !message.member.roles.cache.find(
          (r) => r.name === process.env.high_Roll
        )
      )
        return message.reply("you do not have permission 😐");
      if (args.length === 0)
        return message.reply("Please enter the correct mention 💫");
      const user = message.mentions.members.first();
      if (user) {
        user
          .ban()
          .then((user) => message.channel.send(`${user} baned 🙂`))
          .catch((err) =>
            message.channel.send(
              "i can not kick this person my power is not enough 😖"
            )
          );
      }
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
