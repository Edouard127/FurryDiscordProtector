const { Client, MessageEmbed } = require("discord.js");
const fs = require('fs');
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
// Read the Commands Directory, and filter the files that end with .js


process.on('unhandledRejection', error => {
    console.log('Unhandled promise rejection:', error);
});
process.on('uncaughtException', error => {
    console.log('Uncaught Exception:', error);
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
