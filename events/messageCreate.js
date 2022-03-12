const { Client, Collection, Permissions, MessageEmbed, Snowflake, GuildMember } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const spam_ = require("../utils/antispam.js")
const config = require("../config.json");
const prefix = config.prefix
const dev = config.dev
const isNsfwQ = require('../utils/nsfwdetector.js')
const profanityImage = require('../utils/profanityImage.js');
const profanityText = require('../utils/profanityText.js');
const dir = __dirname + '\\../\/scripts/';
const commands = fs.readdirSync(dir).filter(file => file.endsWith(".js"));
if (!fs.existsSync(__dirname + '\\../\/utils/languages/config/languages.json')) {
    fs.writeFileSync(__dirname + '\\../\/utils/languages/config/languages.json', "{}")
}
const client = new Client({ autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_VOICE_STATES",], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/ });
client.commands = new Collection();

// Loop over the Command files
for (const file of commands) {
    // Get the command name from splitting the file
    const commandName = file.split(".")[0];
    // Require the file
    const command = require(`${dir}${file}`);

    console.log(`Attempting to load command ${commandName}`);
    // Set the command to a collection
    client.commands.set(commandName, command, command.description);

    console.log(`Successfully loaded ${commandName}`);
}
module.exports = {
    event: "messageCreate",
    once: false,
    async run(message) {
        if (!message.author.bot && message.channel.type !== "dm") {
            if (!message.channel.nsfw) {
                let check
                (async () => {
                    check = await db.get(`${message.guild.id}.profanityCheck`) || false

                })().then(() => {
                    if (check === true) {
                        profanityText(message)
                    }
                })
                if (message.attachments) {
                    let url
                    let nsfwCheck
                    (async () => {
                        nsfwCheck = await db.get(`${message.guild.id}.nsfwCheck`) || false
                    })().then(() => {
                        if (nsfwCheck === true) {
                            message.attachments.forEach(attachments => {

                                url = attachments.proxyURL
                                isNsfwQ(url, message)
                                let check
                                let uwu
                                (async () => {
                                    check = await db.get(`${message.guild.id}.profanityCheck`) || false
                                    uwu = await db.get(`${message.guild.id}.excludes`) || []

                                })().then(() => {
                                        if (!uwu.includes(message.channel.id)) {
                                            if (check === true) {
                                                profanityImage(url, message)
                                            }
                                        }
                                })
                            })
                        }





                    })

                }
            }


            let spamCheck
            (async () => {
                spamCheck = await db.get(`${message.guild.id}.spamCheck`) || false
            })().then(() => {
                if (spamCheck === true) {
                    spam_(message, client)
                }
            })
            let array = message.content.split(" ")
            for (let arr in array) {
                if (array[arr].match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i)) {
                    let nsfwCheck
                    (async () => {
                        nsfwCheck = await db.get(`${message.guild.id}.nsfwCheck`) || false
                    })().then(() => {
                        if (nsfwCheck === true) {
                            url = array[arr]
                            let uwu
                            (async () => {
                                uwu = await db.get(`${message.guild.id}.nsfw.excludes`) || []
                                    if (!uwu.includes(message.channel.id)) {
                                isNsfwQ(url, message)
                                    }
                            })().then(() => {
                                console.log(uwu)
                            })

                        }
                    })
                }
            }
        }


        const args = message.content.split(' ')
        args[0] = args[0].replace(prefix, '')

        switch (true) {

            case (args[0] === 'ping' && !message.author.bot && message.channel.type !== "dm"): {
                try {
                    let cmd = client.commands.get(message.content.replace(prefix, ''))
                    //console.log(message.content.replace(prefix, '') + ".js");
                    if (cmd) cmd.run(message, prefix)

                } catch (err) {
                    console.log(err)
                }
            }
                break;
            case (args[0] === 'server' && !message.author.bot && message.channel.type !== "dm"): {
                try {
                    let cmd = client.commands.get(message.content.replace(prefix, ''))
                    //console.log(message.content.replace(prefix, '') + ".js");
                    if (cmd) cmd.run(message, prefix)

                } catch (err) {
                    console.log(err)
                }
            }

                break;
            case (args[0] === 'config' && !message.author.bot && message.channel.type !== "dm"): {
                if (message.guild.members.cache.get(message.author.id).permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) {
                    if (message.guild.members.cache.get(message.author.id).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                        try {

                            let cmd = client.commands.get(args[0])
                            //console.log(message.content.replace(prefix, '') + ".js");
                            let p = prefix
                            if (cmd) cmd.run(message, args, p)

                        } catch (err) {
                            console.log(err)
                        }
                    }
                    else {
                        message.reply("You do not have permissions to use this command ```Permissions.FLAGS.MANAGE_GUILD```")
                    }
                }
                else {
                    message.reply("You do not have permissions to use this command ```Permissions.FLAGS.MODERATE_MEMBERS```")
                }

            }
                break;
            case (args[0] === 'help' && !message.author.bot && message.channel.type !== "dm"): {
                try {
                    let cmd = client.commands.get(args[0])
                    //console.log(message.content.replace(prefix, '') + ".js");
                    if (cmd) cmd.run(message, args, client, prefix)
                } catch (err) { console.log(err) }

            }
                break;
            case (args[0] === 'lang' && !message.author.bot && message.channel.type !== "dm"): {
                if (message.guild.members.cache.get(message.author.id).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                    try {
                        let cmd = client.commands.get(args[0])
                        //console.log(message.content.replace(prefix, '') + ".js");
                        if (cmd) cmd.run(message, args, client, prefix)
                    } catch (err) { console.log(err) }
                }
                else {
                    message.reply("You do not have permissions to use this command ```Permissions.FLAGS.MANAGE_GUILD```")
                }

            }
                break;
            case (args[0] === 'raidmode' && !message.author.bot && message.channel.type !== "dm"): {
                if (message.guild.members.cache.get(message.author.id).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                    try {
                        let cmd = client.commands.get(args[0])
                        //console.log(message.content.replace(prefix, '') + ".js");
                        if (cmd) cmd.run(message, args, client, prefix)
                    } catch (err) { console.log(err) }
                }
                else {
                    message.reply("You do not have permissions to use this command ```Permissions.FLAGS.MANAGE_GUILD```")
                }
            }
                break;
            case (args[0] === 'profanity' && !message.author.bot && message.channel.type !== "dm"): {
                if (message.guild.members.cache.get(message.author.id).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                    try {
                        let cmd = client.commands.get(args[0])
                        //console.log(message.content.replace(prefix, '') + ".js");
                        if (cmd) cmd.run(message, args, client, prefix)
                    } catch (err) { console.log(err) }
                }
                else {
                    message.reply("You do not have permissions to use this command ```Permissions.FLAGS.MANAGE_GUILD```")
                }
            }
                break;
            case (args[0] === 'spam' && !message.author.bot && message.channel.type !== "dm"): {
                if (message.guild.members.cache.get(message.author.id).permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                    try {
                        let cmd = client.commands.get(args[0])
                        //console.log(message.content.replace(prefix, '') + ".js");
                        if (cmd) cmd.run(message, args, client, prefix)
                    } catch (err) { console.log(err) }
                }
                else {
                    message.reply("You do not have permissions to use this command ```Permissions.FLAGS.MANAGE_CHANNELS```")
                }
            }
                break;
            case (args[0] === 'nsfw' && !message.author.bot && message.channel.type !== "dm"): {
                if (message.guild.members.cache.get(message.author.id).permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                    try {
                        let cmd = client.commands.get(args[0])
                        //console.log(message.content.replace(prefix, '') + ".js");
                        if (cmd) cmd.run(message, args, client, prefix)
                    } catch (err) { console.log(err) }
                }
                else {
                    message.reply("You do not have permissions to use this command ```Permissions.FLAGS.MANAGE_CHANNELS```")
                }
            }
                break;
            case (args[0] === 'play' && !message.author.bot && message.channel.type !== "dm"): {
                try {
                    let cmd = client.commands.get(args[0])
                    //console.log(message.content.replace(prefix, '') + ".js");
                    if (cmd) cmd.run(message, args, client, prefix)
                } catch (err) { console.error(err) }

            }
                break;
        }
    }
};