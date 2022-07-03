import { Client, Partials } from 'discord.js'
import { GatewayIntentBits } from 'discord-api-types/v10'
import { AntiRaidManager } from 'discord-antiraid'

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

const antiraid = new AntiRaidManager(client, {
    enabled: true,
    events: [
        "channelDelete",
        "roleDelete",
        "threadDelete",
		"guildBanAdd",
		"guildBanRemove",
		"guildMemberRemove"
    ],
    exemptedRoles: [], // Ignored roles (ex: ['848500766955405332'])
    exemptedUsers: [], // Ignored users (ex: ['555429540613062656'])
    rateLimit: -1, // Number of events before sanction
    time: 10000, // Time in ms before case deletion
    sanction: 'removeAllRoles', // Sanction to apply (ex: 'removeAllRoles' / 'ban' / 'kick')
    reason: 'Raid Prevention', // Audit Log Reason
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


["events", "slash"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
})
	require("./handlers/raid")(antiraid)
  
client.login(process.env.TOKEN);
