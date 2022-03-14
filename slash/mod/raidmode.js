const db = require("quick.db");
const createEmbed = require('../../utils/createEmbed.js')

module.exports = {
    name: 'raidmode',
    description: 'enable/disable raidmode',
    type: 1,
    permissions: 'MANAGE_MEMBERS',
    example: '/raidmode interact [false/true]\n',
    options: [{
        name: 'interact',
        description: 'enable/disable raidmode',
        type: 5,
        required: true,
    }],

    run: async(interaction, client) => {
        const raidmode = interaction.options.get('interact')
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        //console.log(message)
        (async () => {
            
                
                let before = new Date().getTime()
                await db.set(`${interaction.guildID}.isRaid`, raidmode.value)
                let after = new Date().getTime()
                let ms = after - before
    
                let config = createEmbed('#0099ff', `${language('_raidmode_raidmode')}`, `${language('_raidmode_success', raidmode.value, ms)}`)
                interaction.reply({ embeds: [config] })
                
    
            
    
        })()
    }
}