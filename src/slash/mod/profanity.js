const createEmbed = require('../../utils/createEmbed.js')
const _ = require('../../utils/k8sDB')
const { insert, get, health, timeout } = new _()

module.exports = {
	name: 'profanity',
	description: 'enable/disable profanity detection',
	permissions: 'MODERATE_MEMBERS',
	example: `/profanity [argument]`,
	options: [
        {
            name: 'interact',
            description: 'enable/disable profanity detection',
            type: 5,
            required: true,
        },

	],
	timeout: 5000,
	category: 'mod',
	run: async(interaction, client) => {
        const profanity = interaction.options.get('interact')
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        if(profanity?.value === undefined) return await interaction.reply('Please specify a value')
        if(await health === false) return await interaction.reply({ content: await timeout() })
        let data = {
                profanityCheck: profanity.value
        }
        //console.log(message)
            
                
                let __ = await insert(interaction, data)
    
                let config = createEmbed('#0099ff', `${language('_profanity_message')}`, `${language('_profanity_success', profanity.value, __.lapse)}`)
                interaction.reply({ embeds: [config] })
                
    
            
    
        
    }
}









