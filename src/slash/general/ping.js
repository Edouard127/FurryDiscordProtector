const insertDataRedis = require('../../utils/insertDataRedis')
const k8sData = require("../../utils/k8sStatus")

const createEmbed = require('../../utils/createEmbed.js')
module.exports = {
	name: 'ping',
	description: 'Get bot latency',
	description_localizations: {
		"fr": "Obtenir la latence du bot",
		"es-ES": "Obtener la latencia del bot",
		"ru": "Получить задержку бота"
	},
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
		let ping = createEmbed('$0099ff', `${language('_ping_answer')}`, `⌛ Latency is ${ws} ms\n⏲️ API Ping is ${api} ms\n<:shards:953319913039200296> Redis Healthz: \`${await new insertDataRedis().health()}\`\n<:shards:953319913039200296> Kubernetes Healthz: \`${await (await k8sData()).data}\``)
		interaction.editReply({ embeds: [ping], content: `<@${interaction.user.id}>` });
	},
};
