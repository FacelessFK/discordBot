require("dotenv").config();

const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

//----member counter of server app in status of our bot----
client.on("ready", async () => {
  console.log(`${client.user.tag} has logged in.`);

  const memberUpdate = client.guilds.cache.get(process.env.mainBotId); //replace your server id instead process.env.mainBotId , for example ("111111111111111111")

  // loop for update your member in status
  setInterval(function () {
    client.user.setActivity(
      memberUpdate.memberCount.toLocaleString() + " Ghost",
      {
        type: "WATCHING",
      }
    );
  }, 5000);
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
