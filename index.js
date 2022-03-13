
const { Discord, Client, Collection } = require('discord.js');
const { GatewayIntentBits } = require('discord-api-types/v10')
const client = new Client({ intents: [
	GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessages
], partials: [
	"MESSAGE",
	"CHANNEL",
	"GUILD_MEMBER"
]});


client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
require('discord-logs');
require('colors');

["handlers", "events", "slash"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


  
client.login(process.env.TOKEN);