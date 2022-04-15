const insertDataRedis = require('../../utils/insertDataRedis')

const createEmbed = require('../../utils/createEmbed.js')
module.exports = {
	name: 'ping',
	description: 'Get bot latency',
	timeout: 2000,
	category: 'general',
	run: async (interaction, client) => {
		const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
		await interaction.reply('🏓 Pong!');
		const msg = await interaction.fetchReply();
		let ws = msg.createdTimestamp - interaction.createdTimestamp
		let api = Math.round(client.ws.ping)
		let ping = createEmbed('$0099ff', `${language('_ping_answer')}`, `${language('_ping_response', ws, api, (await new insertDataRedis().health()))}`)
		interaction.editReply({ embeds: [ping], content: `<@${interaction.user.id}>` });
	},
};
