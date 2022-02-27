const createEmbed = require('../utils/createEmbed.js')
const db = require('quick.db')



exports.name = "ping";
exports.description = 'Pong !'
exports.run = (message, args) => {
	const guildLanguages = require('../utils/languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);
	var ws = Math.floor(
		message.createdTimestamp/1000 - new Date().getTime()/1000 
	)
	var api = Math.round(message.client.ws.ping)
	const ping = createEmbed('$0099ff', `${language('_ping_answer')}`, `${language('_ping_response', ws, api)}`)

    message.channel.send({ embeds: [ping] })
	//console.log(new Date().getTime() - message.createdTimestamp )

}
