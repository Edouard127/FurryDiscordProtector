
const db = require("quick.db");
const argsList = ['raidmode', 'antispam', 'logs']
const createEmbed = require('../../utils/createEmbed.js')
module.exports = {
	name: 'profanity',
	description: 'enable/disable profanity detection',
	permissions: 'MANAGE_MEMBERS',
	example: `/profanity [argument]`,
	options: [
        {
            name: 'interact',
            description: 'enable/disable profanity detection',
            type: 5,
            required: false,
        },

	],
	timeout: 5000,
	category: 'mod',
	run: (interaction, client) => {
        const profanity = interaction.options.get('interact')
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        //console.log(message)
        (async () => {
            
console.log(interaction.guildId)
                
                let before = new Date().getTime()
                await db.set(`${interaction.guildID}.profanityCheck`, profanity.value)
                let after = new Date().getTime()
                let ms = after - before
    
                let config = createEmbed('#0099ff', `${language('_profanity_message')}`, `${language('_profanity_success', profanity.value, ms)}`)
                interaction.reply({ embeds: [config] })
                
    
            
    
        })()
    }
}









