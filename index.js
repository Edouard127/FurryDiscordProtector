const { Client, Collection, Permissions, MessageEmbed } = require("discord.js");
const fs = require('fs');
const db = require("quick.db");
const spam_ = require("./utils/antispam.js")
const dir = './scripts/';
const config = require("./config.json");
const prefix = config.prefix
const isNsfwQ = require('./utils/nsfwdetector.js')
const profanityImage = require('./utils/profanityImage.js');
const profanityText = require('./utils/profanityText.js');
const createEmbed = require('./utils/createEmbed.js')
const getServerCount = require('./utils/getServerCount.js');
const { message } = require("./utils/spamDetect.js");


const client = new Client({ autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/ });
client.commands = new Collection();
// Read the Commands Directory, and filter the files that end with .js
const commands = fs.readdirSync(dir).filter(file => file.endsWith(".js"));
if (!fs.existsSync(__dirname + '/utils/languages/config/languages.json')) {
    fs.writeFileSync(__dirname + '/utils/languages/config/languages.json', "{}")
}
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
process.on('unhandledRejection', error => {
    console.log('Unhandled promise rejection:', error);
});
process.on('uncaughtException', error => {
    console.log('Uncaught Exception:', error);
})
client.on('messageCreate', message => {
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
                message.attachments.forEach(attachments => {
                    let nsfwCheck
                    (async () => {
                        nsfwCheck = await db.get(`${message.guild.id}.nsfwCheck`) || false
                    })().then(() => {
                        if(nsfwCheck === true) {
                        url = attachments.proxyURL
                        isNsfwQ(url, message)
                        }
                    })
                    let check
                    (async () => {
                        check = await db.get(`${message.guild.id}.profanityCheck`) || false

                    })().then(() => {
                        if (check === true) {
                            profanityImage(url, message)
                        }
                    })

                })

            }
        }

        
        let spamCheck
        (async () => {
            spamCheck = await db.get(`${message.guild.id}.spamCheck`) || false
        })().then(() => {
            if(spamCheck === true) {
                spam_(message, client)
            }
        })
        let array = message.content.split(" ")
        for (let arr in array) {
            if (array[arr].match(/(https?:\/\/.*\.(?:png|jpg))/i)) {
                let nsfwCheck
                (async () => {
                    nsfwCheck = await db.get(`${message.guild.id}.nsfwCheck`) || false
                })().then(() => {
                    if(nsfwCheck === true) {
                        url = array[arr]
                    isNsfwQ(url, message)
                    }
                })
            }
        }
    }


    const args = message.content.slice(prefix.length).trim().split(/ +/);

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
            let cmd = client.commands.get(args[0])
            //console.log(message.content.replace(prefix, '') + ".js");
            if (cmd) cmd.run(message, args, client, prefix)

        }
            break;
        case (args[0] === 'lang' && !message.author.bot && message.channel.type !== "dm"): {
            if (message.guild.members.cache.get(message.author.id).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                let cmd = client.commands.get(args[0])
                //console.log(message.content.replace(prefix, '') + ".js");
                if (cmd) cmd.run(message, args, client, prefix)
            }
            else {
                message.reply("You do not have permissions to use this command ```Permissions.FLAGS.MANAGE_GUILD```")
            }

        }
            break;
        case (args[0] === 'raidmode' && !message.author.bot && message.channel.type !== "dm"): {
            let cmd = client.commands.get(args[0])
            //console.log(message.content.replace(prefix, '') + ".js");
            if (cmd) cmd.run(message, args, client, prefix)
        }
            break;
        case (args[0] === 'profanity' && !message.author.bot && message.channel.type !== "dm"): {
            if (message.guild.members.cache.get(message.author.id).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                let cmd = client.commands.get(args[0])
                //console.log(message.content.replace(prefix, '') + ".js");
                if (cmd) cmd.run(message, args, client, prefix)
            }
            else {
                message.reply("You do not have permissions to use this command ```Permissions.FLAGS.MANAGE_GUILD```")
            }
        }
            break;
        case (args[0] === 'spam' && !message.author.bot && message.channel.type !== "dm"): {
            if (message.guild.members.cache.get(message.author.id).permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                let cmd = client.commands.get(args[0])
                //console.log(message.content.replace(prefix, '') + ".js");
                if (cmd) cmd.run(message, args, client, prefix)
            }
            else {
                message.reply("You do not have permissions to use this command ```Permissions.FLAGS.MANAGE_CHANNELS```")
            }
        }
            break;
    }
})


let threshold = {}
let c = {}
let raidmode = {}
let sus_members = []
client.on('guildMemberAdd', member => {
    const guildLanguages = require('./utils/languages/config/languages.json')
    const guildLanguage = guildLanguages[member.guild.id] || "en"; // "english" will be the default language
    const language = require(`./utils/languages/${guildLanguage}.js`);
    (async () => {
        if (await db.get(`${member.guild.id}.isRaid`) === true) {
            raidmode[member.guild.id] = { "raid": true }
        }
        else {
            raidmode[member.guild.id] = { "raid": false }
        }

        if (await db.get(`${member.guild.id}.raidmode.raidmode`)) {

            threshold[member.guild.id] = await db.get((`${member.guild.id}.raidmode.raidmode`)).replace(/['"]+/g, '')
            console.log(threshold)
            console.log(threshold[member.guild.id])
        }
        else {

            threshold[member.guild.id] = 5

        }
    })().then(() => {
        if (raidmode[member.guild.id].raid === false) {
            sus_members[member.guild.id].push({ member })
            let canClear = true


            if (c[member.guild.id]) {
                c[member.guild.id].count = c[member.guild.id].count + 1
            }
            else if (!c[member.guild.id]) {
                c[member.guild.id] = { count: 2 }
            }


            if (c[member.guild.id].count >= threshold[member.guild.id]) {

                db.set(`${member.guild.id}.isRaid`, true)
                console.log(sus_members)
                    (async () => {
                        if (await db.get(`${member.guild.id}.logs`)) {

                            let ch = await member.guild.channels.cache.find(c => c.id === db.get((`${member.guild.id}.logs`).replace(/['"]+/g, '')))
                            if (ch) {
                                let config = createEmbed('#0099ff', `${language('_raid_'), `${language('_raid_message', (await member.guild.fetchOwner()).id)}`}`)
                                ch.send({ embeds: [config] })
                            }
                            else {
                                let channel = member.guild.channels.cache.filter(c => c.type === 'text').find(x => x.position == 0);
                                let config = createEmbed('#0099ff', `${language('_raid_'), `${language('_raid_message', (await member.guild.fetchOwner()).id)}`}`)
                                channel.send({ embeds: [config] })
                            }
                        }
                    })
            }
            if (canClear) {
                setTimeout(() => {

                    canClear = true
                    c[member.guild.id].count = 0

                }, 10000, canClear = false)
            }
        }


        else {
            member.send(`Hello ${member.user.username}, this server is currently under attack, please try again later`).then(member.kick())
        }
    })
})


let memberCount = 0
client.login(process.env.TOKEN).then(() => {
    client.once('ready', () => {

        client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} servers to protect`, type: 'WATCHING' }] });
        client.user.setStatus('dnd');
        client.guilds.cache.map(guild => memberCount = +guild.memberCount)
        let servers
        (async () => {
            servers = await getServerCount(client)

        })().then(() => {
            console.log(`\n ${client.user.username}@Bot [Started] ${new Date()}
            --------------------------------------\n Users: ${memberCount}\n Servers: ${servers}\n --------------------------------------\n`)
        })
        setInterval(() => {
            client.channels.fetch('948369400866684969').then(channel => channel.messages.fetch('948380114868125757').then(message => {

                client.shard.broadcastEval(client => [client.shard.ids, client.ws.status, client.ws.ping, client.guilds.cache.size])
                    .then((results) => {
                        const embed = new MessageEmbed()
                            .setTitle(`👨‍💻 Bot Shards (${client.shard.count})`)
                            .setColor('#ccd6dd')
                            .setTimestamp();

                        results.map((data) => {
                            embed.addField(`📡 Shard ${data[0]}`, `**Status:** ${data[1]}\n**Ping:** ${data[2]}ms\n**Guilds:** ${data[3]}`, false)
                        });
                        message.edit({ content: '_ _', embeds: [embed] })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }))
        }, 10000)
    })

})
