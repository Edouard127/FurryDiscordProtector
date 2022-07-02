import { Client, Partials } from 'discord.js'
import { GatewayIntentBits } from 'discord-api-types/v10'
import('colors')
const client = new Client(
	{ 
		intents: [
			GatewayIntentBits.Guilds, 
			GatewayIntentBits.GuildMembers, 
			GatewayIntentBits.GuildInvites, 
			GatewayIntentBits.GuildMessages, 
			GatewayIntentBits.GuildVoiceStates, 
			GatewayIntentBits.MessageContent
		], partials: [
			Partials.GuildMember,
			Partials.Channel,
			Partials.Message
		]
});
/*const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { DisTube } = require('distube')
client.distube = new DisTube(client, {
	leaveOnStop: false,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	plugins: [
	  new SpotifyPlugin({
		emitEventsAfterFetching: true
	  }),
	  new SoundCloudPlugin(),
	  new YtDlpPlugin()
	],
  })*/


["handlers", "events", "slash", "generate_commands"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
})
  
client.login(process.env.TOKEN);
