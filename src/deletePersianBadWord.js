 require("dotenv").config();

const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let punish = 0;

const { badWords } = require(".././badPersianWordList.json");
client.on("message", async (message) => {
  if (message.author.bot) return;
  console.log("its worke");
  let confirm = false;
  // search bad word from json list
  for (let i = 0; i < badWords.length; i++) {
    if (message.content.toLowerCase().includes(badWords[i].toLowerCase()))
      confirm = true;
  }
  const member = message.author.id;
  // when a high permission member send bad word message in server
  if (
    message.member.roles.cache.find((r) => r.name === process.env.high_Roll) &&
    confirm == true
  ) {
    return client.users.fetch(member).then((dm) => {
      dm.send(
        `(${message.channel.messages.channel.lastMessage}) ارسال پیام نامناسب رو بس کن 😐`
      );
    });
  } else if (
    //when a normal member send bad word message
    !message.member.roles.cache.find((r) => r.name === process.env.high_Roll) &&
    confirm == true
  ) {
    message.delete();

    punish = punish + 1;

    return client.users.fetch(member).then((dm) => {
      dm.send(
        `(${message.channel.messages.channel.lastMessage})ارسال چنین پیامی خیلی درست نیستا دیگه تکرار نکن 🙂`
      );
    });
  }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
