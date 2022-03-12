const createEmbed = require('../utils/createEmbed.js')
const { Client, MessageEmbed } = require("discord.js");
const client = new Client({ autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_VOICE_STATES",], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/ });
module.exports = {
    event: "guildCreate",
    once: false,
    async run(guild) {
        client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} servers to protect`, type: 'WATCHING' }] });
    client.user.setStatus('dnd');
    try {
    await guild.commands.set([
        {
            name: 'ping',
            description: ''
        },
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
    }
}