
const { Client, Collection, Permissions } = require('discord.js');
const { GatewayIntentBits } = require('discord-api-types/v10')
const client = new Client({ intents: [
	GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates
], partials: [
	"MESSAGE",
	"CHANNEL",
	"GUILD_MEMBER"
]});
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
client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
client.toggle = new Collection();
require('discord-logs');
require('colors');

let p = 0;
["handlers", "events", "slash", "generate_commands"].forEach((handler, array) => {
    require(`./handlers/${handler}`)(client);
	p++
	if(p == array.length){
		["generated"].forEach(command => {
			require(`./generated/${command}`)(client)
		})
	}
})


process.on('uncaughtException', (reason, p) => {
	console.log(`Uncaught Exception: ${reason}\nAt: ${(p)}`);
  });
  process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled promise rejection: ${reason}\nAt: ${p}`);
  });


  //client.on('debug', console.log);
  
client.login(process.env.TOKEN);
