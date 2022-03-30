const createEmbed = require('../../utils/createEmbed.js')
const getDataK8s = require('../../utils/getDataK8s.js')
const insertDataK8s = require('../../utils/insertDataK8s.js')
module.exports = {
	name: 'antispam',
	description: 'enable/disable antispam',
	permissions: 'MANAGE_MESSAGES',
	example: `/antispam [argument]`,
	options: [
        {
            name: 'interact',
            description: 'enable/disable antispam',
            type: 5,
            required: false,
        },

	],
	timeout: 5000,
	category: 'mod',
	run: async (interaction, client) => {
        const spam = interaction.options.get('interact')
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        //console.log(message)
        //let data = await new getDataK8s(interaction).k8s()
        let data = {
            spamCheck: spam.value
        }
        await new insertDataK8s(interaction, data).k8s().then((result) => {
            let config = createEmbed('#0099ff', `${language('_spam_message')}`, `${language('_spam_success', spam.value, result.lapse)}`)
            interaction.reply({ embeds: [config] })
        })

    



    }
}









