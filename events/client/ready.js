require('colors')
const { EmbedBuilder } = require('discord.js')
const slash = require('../../slash');

module.exports = async (client) => {
    //client.user.setStatus('dnd')
    client.user.setStatus('idle')
	//client.user.setActivity(`${client.guilds.cache.size} servers to protect`, { type: 3 });
    client.user.setActivity(`❌Criticals functions not working❌`, { type: 3 });
    console.log(`[Discord API] Logged in as ${client.user.tag}`.magenta);
    slash(client);
    setInterval(() => {
        client.channels.fetch('948369400866684969').then(channel => channel.messages.fetch('948380114868125757').then(message => {

            client.shard.broadcastEval(client => [client.shard.ids, client.ws.status, client.ws.ping, client.guilds.cache.size])
                .then((results) => {

                    const embed = new EmbedBuilder()
                        .setTitle(`👨‍💻 Bot Shards (${client.shard.count})`)
                        .setColor('Random')
                        .setTimestamp();


                    embed.addFields(
                        { name: "📡 Shard", value: `${results[0][0][0]}` },
                        { name: "**Status:**", value: `${results[0][1]}` },
                        { name: "**Ping:**", value: `${results[0][2]}` },
                        { name: "**Guilds:**", value: `${results[0][3]}` }
                    )


                    message.edit({ content: '_ _', embeds: [embed] })
                })
                .catch((error) => {
                    console.error(error);
                });
        }))
    }, 10000)
};