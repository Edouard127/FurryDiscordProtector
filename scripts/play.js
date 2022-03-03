const ytdl = require("@discordjs/voice");
const { AudioPlayerStatus, AudioResource, entersState, joinVoiceChannel, VoiceConnectionStatus, MusicSubscription } = require("@discordjs/voice")
const { Interaction, GuildMember, Snowflake } = require("discord.js")
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ['GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS'] });

exports.name = "play"
exports.description = "Play your favorite music"

exports.run = async (message, args) => {
    console.log(args)
	if (args[1] === 'deploy') {
		await message.guild.commands.set([
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
		]);

		await message.reply('Deployed!');
	}
}

/**
 * Maps guild IDs to music subscriptions, which exist if the bot has an active VoiceConnection to the guild.
 */



