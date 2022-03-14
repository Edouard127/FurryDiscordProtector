const { Client, ClientVoiceManager } = require("discord.js");
const { GatewayIntentBits } = require('discord-api-types/v10')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates
    ], partials: [
        "MESSAGE",
        "CHANNEL",
        "GUILD_MEMBER"
    ]
});
const { Player, QueryType } = require("discord-player");
const player = new Player(client);



module.exports = {

    name: 'music',
    description: 'Plays a song',
    options: [
        {
            name: 'leave',
            description: 'Leave the channel',
            type: 1,
        },
        {
            name: 'play',
            description: 'play some cool music',
            type: 1,
            options: [{
                name: 'song',
                description: 'The URL or the query of the song to play',
                type: 3,
                required: true
            }],

        },
        {
            name: 'pause',
            description: 'pause the current song',
            type: 1,
        },
        {
            name: 'resume',
            description: 'resume the current song',
            type: 1,
        },
        {
            name: 'volume',
            description: 'volume of the current song',
            type: 1,
            options: [{
                name: 'volume',
                description: 'volume of the current song',
                type: 4,
                min_value: 0,
                max_value: 100,
                required: true
            }]
        },

    ],


    run: async (interaction, client) => {
        let music = interaction.options.getSubcommand()
        //console.log(music)
        if (music === 'play') {
            let args = interaction.options.get('song').value
            client.distube.play(interaction.member.voice.channel, args, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction
            })
            return interaction.reply(`Started playing`)
        }
        if (music === 'leave') {
            client.distube.voices.leave(interaction)
            return interaction.reply(`Successfully left`)
        }
        if (music === 'pause') {
            const queue = client.distube.getQueue(interaction)
            if (!queue) return interaction.reply(`Queue is empty`)
            try {
            queue.pause()
            return interaction.reply('Paused the song')
            } catch (e) {
                return interaction.reply('Song is already paused')
            }

        }
        if (music === 'resume') {
            const queue = client.distube.getQueue(interaction)
            if (!queue) return interaction.reply(`Queue is empty`)
            try {
            queue.resume()
            return interaction.reply('Resumed the song')
            } catch (e) {
                return interaction.reply('Song is already playing')
            }
        }
        if (music === 'volume') {
            let args = interaction.options.get('volume').value
            const queue = client.distube.getQueue(interaction)
            if (!queue) return interaction.reply(`Queue is empty`)
            queue.setVolume(args)
            return interaction.reply(`Volume set to \`${args}\``)
        }
    }


}
