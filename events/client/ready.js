const { Client, Collection, Permissions, MessageEmbed, Snowflake, GuildMember, } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const getServerCount = require('../../utils/getServerCount.js');
const client = new Client({ autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_VOICE_STATES",], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/ });
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
const fs = require('fs');

const dir = __dirname + '//../\/../\/scripts/';
const commands = fs.readdirSync(dir).filter(file => file.endsWith(".js"));
const cmd = [];


module.exports = async(client) => {
        client.user.setPresence({ status: 'idle', afk: true, activities: [{ name: /*`${client.guilds.cache.size} servers to protect`*/`⚠️ MAINTENANCE ⚠️`, type: 'WATCHING' }] })
        client.user.setStatus('idle');
        client.guilds.cache.forEach(async (guild) => {
            guild.commands.set(cmd)
})
            
            let servers
            let members
            (async () => {
                members = await client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
                servers = await getServerCount(client)
    
            })().then(() => {
                    console.log(`\n ${client.user.username}@Bot [Started] ${new Date()}
                    --------------------------------------\n Users: ${members}\n Servers: ${servers}\n --------------------------------------\n`)
               
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
    }
