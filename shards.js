const { Client, ShardingManager } = require('discord.js');
const client = new Client({autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/});

const manager = new ShardingManager('./index.js', { token: process.env.TOKEN, totalShards: "auto", });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();
