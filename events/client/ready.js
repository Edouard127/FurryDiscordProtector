require('colors')
const { MessageEmbed } = require('discord.js')
const slash = require('../../slash');

module.exports = async client => {   
      client.user.setActivity('Code Surgery', { type: 'LISTENING' });
      console.log(`[Discord API] Logged in as ${client.user.tag}`.magenta);
      slash(client);
      setInterval(() => {
            client.channels.fetch('948369400866684969').then(channel => channel.messages.fetch('948380114868125757').then(message => {

                  client.shard.broadcastEval(client => [client.shard.ids, client.ws.status, client.ws.ping, client.guilds.cache.size])
                    .then((results) => {
                        
                        const embed = new MessageEmbed()
                            .setTitle(`👨‍💻 Bot Shards (${client.shard.count})`)
                            .setColor('#ccd6dd')
                            .setTimestamp();

                              
                            embed.addFields(
                                  { name: "📡 Shard", value: `${results[0][0][0]}`},
                                  { name: "**Status:**", value: `${results[0][1]}`},
                                  { name: "**Ping:**", value: `${results[0][2]}`},
                                  { name: "**Guilds:**", value: `${results[0][3]}`}
                            )
                            
                            
                        message.edit({ content: '_ _', embeds: [embed] })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }))
        }, 10000)
};