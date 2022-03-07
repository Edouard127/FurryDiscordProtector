const createEmbed = require('../utils/createEmbed.js')
const db = require('quick.db')



exports.name = "ping";
exports.description = 'Pong !'
exports.run = (message, args) => {
	const guildLanguages = require('../utils/languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);
	let ws = 0
	let api = Math.round(message.client.ws.ping)
	let ping = createEmbed('$0099ff', `${language('_ping_answer')}`, `${language('_ping_response', ws, api)}`)

    message.channel.send({ embeds: [ping] }).then((msg) => {
		ws = msg.createdTimestamp - message.createdTimestamp
		ping = createEmbed('$0099ff', `${language('_ping_answer')}`, `${language('_ping_response', ws, api)}`)
		msg.edit({ embeds: [ping] })
	})
	//console.log(new Date().getTime() - message.createdTimestamp )

}
