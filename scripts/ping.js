const createEmbed = require('../utils/createEmbed.js')



exports.name = "ping";
exports.description = 'Pong !'
exports.run = (message, args) => {
	const ping = createEmbed('$0099ff', 'Pong !', `You've got an answer\n
	⌛ Latency is ${Math.floor(
		message.createdTimestamp - new Date().getTime()
	)}ms\n⏲️ API Ping is ${Math.round(message.client.ws.ping)} ms`)

    message.channel.send({ embeds: [ping] })
	//console.log(new Date().getTime() - message.createdTimestamp )

}
