const db = require("quick.db");
const createEmbed = require('../../utils/createEmbed.js')
const insertDataK8s = require('../../utils/insertDataK8s')

module.exports = {
    name: 'raidmode',
    description: 'enable/disable raidmode',
    type: 1,
    permissions: 'MODERATE_MEMBERS',
    example: '/raidmode interact [false/true]\n',
    options: [{
        name: 'interact',
        description: 'enable/disable raidmode',
        type: 5,
        required: true,
    }],

    run: async (interaction, client) => {
        const raidmode = interaction.options.get('interact')
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        let data = {
            isRaid: raidmode.value
        }
        let _ = await new insertDataK8s(interaction, data).k8s()
        let config = createEmbed('#0099ff', `${language('_raidmode_raidmode')}`, `${language('_raidmode_success', raidmode.value, _.lapse)}`)
        interaction.reply({ embeds: [config] })

    }
}