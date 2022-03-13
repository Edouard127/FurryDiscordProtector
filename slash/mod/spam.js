
const db = require("quick.db");
const argsList = ['raidmode', 'antispam', 'logs']
const createEmbed = require('../../utils/createEmbed.js')
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
        let before = new Date().getTime();
        (async () => {
            try {
                await db.set(`${interaction.guildId}.spamCheck`, spam.value)
            } catch (err){
                console.log(err)
             }

    


})().then(() => {
            let after = new Date().getTime()
            let ms = after - before

            let config = createEmbed('#0099ff', `${language('_spam_message')}`, `${language('_spam_success', spam.value, ms)}`)
            interaction.reply({ embeds: [config] })
        })
    }
}









