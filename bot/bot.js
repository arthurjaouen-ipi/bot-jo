const Discord = require("discord.js")
const config = require("./config.json")

const client = new Discord.Client()

const prefix = "!"
client.on("message", async function(message) { 
    if (message.author.bot 
        || !message.content.startsWith(prefix)) {
            return
    }

    const commandBody = message.content.slice(prefix.length)
    const args = commandBody.split(' ')
    const command = args.shift().toLowerCase()
    const commandText = message.content.slice(prefix.length+command.length+1)

    if (command === "cb") {
        message.reply(await require("./watson")(commandText))
    }
    else if (command === "cbtts") {
        message.reply(await require("./watson")(commandText), {tts: true})
    }
})

client.login(config.BOT_TOKEN)