const { Client, Collection, Permissions, MessageEmbed, Snowflake, GuildMember } = require("discord.js");
const { AudioPlayerStatus, AudioResource, entersState, joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice")
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
const { Player } = require("discord-player");

fs.readdir('./events/', (err, files) => { // We use the method readdir to read what is in the events folder
    if (err) return console.error(err); // If there is an error during the process to read all contents of the ./events folder, throw an error in the console
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`); // Here we require the event file of the events folder
        if (eventFunction.disabled) return; // Check if the eventFunction is disabled. If yes return without any error

        const event = eventFunction.event || file.split('.')[0]; // Get the exact name of the event from the eventFunction variable. If it's not given, the code just uses the name of the file as name of the event
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; // Here we define our emitter. This is in our case the client (the bot)
        const once = eventFunction.once; // A simple variable which returns if the event should run once

        // Try catch block to throw an error if the code in try{} doesn't work
        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args)); // Run the event using the above defined emitter (client)
        } catch (error) {
            console.error(error.stack); // If there is an error, console log the error stack message
        }
    });
});



const client = new Client({ autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_VOICE_STATES",], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/ });
const player = new Player(client);
// add the trackStart event so when a song will be played this message will be sent
player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))
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
                            (async () => {
                        check = await db.get(`${message.guild.id}.profanityCheck`) || false

                    })().then(() => {
                        if (check === true) {
                            profanityImage(url, message)
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
            if (array[arr].match(/(https?:\/\/.*\.(?:png|jpg))/i)) {
                let nsfwCheck
                (async () => {
                    nsfwCheck = await db.get(`${message.guild.id}.nsfwCheck`) || false
                })().then(() => {
                    if (nsfwCheck === true) {
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
        case (args[0] === 'nsfw' && !message.author.bot && message.channel.type !== "dm"): {
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
            case (args[0] === 'play' && !message.author.bot && message.channel.type !== "dm"): {
                let cmd = client.commands.get(args[0])
                //console.log(message.content.replace(prefix, '') + ".js");
                if (cmd) cmd.run(message, args, client, prefix)
    
            }
                break;
    }
})
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    // /play track:Despacito
    // will play "Despacito" in the voice channel
    if (interaction.commandName === "play") {
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
        const query = interaction.options.get("song").value;
        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });
        
        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });

        queue.play(track);

        return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
    }
});

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
client.on('guildCreate', async (guild) => {
    client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} servers to protect`, type: 'WATCHING' }] });
    client.user.setStatus('dnd');
    try {
    await guild.commands.set([
        {
            name: 'play',
            description: 'Plays a song',
            options: [
                {
                    name: 'song',
                    type: 'STRING',
                    description: 'The URL or the query of the song to play',
                    required: true,
                },
            ],
        },
        {
            name: 'skip',
            description: 'Skip to the next song in the queue',
        },
        {
            name: 'queue',
            description: 'See the music queue',
        },
        {
            name: 'pause',
            description: 'Pauses the song that is currently playing',
        },
        {
            name: 'resume',
            description: 'Resume playback of the current song',
        },
        {
            name: 'leave',
            description: 'Leave the voice channel',
        },
    ])
} catch {
    let ownerid = guild.ownerId
    let owner = guild.members.fetch(ownerid).then((owner) => {
        let config = createEmbed('#0099ff')
    })
}
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
