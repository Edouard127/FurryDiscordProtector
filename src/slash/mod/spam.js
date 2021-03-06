const createEmbed = require('../../utils/createEmbed.js')
const _ = require('../../utils/k8sDB')
const { insert } = new _()
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
            required: true,
        },

	],
	timeout: 5000,
	category: 'mod',
	run: async (interaction, client) => {
        const spam = interaction.options.get('interact')
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        if(spam?.value === undefined) return await interaction.reply('Please specify a value')
        //console.log(message)
        //let data = await new getDataK8s(interaction).k8s()
        let data = {
            spamCheck: spam.value
        }
        await insert(interaction, data).then((result) => {
            let config = createEmbed('#0099ff', `${language('_spam_message')}`, `${language('_spam_success', spam.value, result.lapse)}`)
            interaction.reply({ embeds: [config] })
        })

    



    }
}









