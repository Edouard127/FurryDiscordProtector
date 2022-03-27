const createEmbed = require('../../utils/createEmbed.js')
const insertDataK8s = require('../../utils/insertDataK8s.js')

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
	run: async(interaction, client) => {
        const profanity = interaction.options.get('interact')
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        let data = {
                profanityCheck: profanity.value
        }
        //console.log(message)
            
                
                let before = new Date().getTime();
                new insertDataK8s(interaction, data).k8s()
                let after = new Date().getTime();
                let ms = after - before
    
                let config = createEmbed('#0099ff', `${language('_profanity_message')}`, `${language('_profanity_success', profanity.value, ms)}`)
                interaction.reply({ embeds: [config] })
                
    
            
    
        
    }
}









