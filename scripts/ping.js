const { Client, Intents, Collection, MessageEmbed } = require("discord.js");

    const client = new Client({autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/});

exports.run = (message, args) => {
        const ping = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Pong !')
	.setDescription(`You've got an answer\n
        ⌛ Latency is ${Math.floor(
			new Date().getTime() - message.createdTimestamp
        )}ms\n⏲️ API Ping is ${Math.round(message.client.ws.ping)} ms`
      )
	.setTimestamp()
	.setFooter({ text: 'Coded by Kamigen#0001', iconURL: 'https://cdn.discordapp.com/avatars/385441179069579265/864fa98fa71abc1258b21435440e097d.png?size=64' });
    message.channel.send({ embeds: [ping] })
	//console.log(new Date().getTime() - message.createdTimestamp )

}

exports.name = "ping";