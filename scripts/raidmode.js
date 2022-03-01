const db = require("quick.db");
const createEmbed = require('../utils/createEmbed.js')

exports.name = "raidmode";
exports.description = "Enable/Disable Raidmode"
exports.run = (message, args, prefix) => {
    const guildLanguages = require('../utils/languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);
    (async () => {
        let isRaid = ''

        if(!await db.get(`${message.guild.id}.isRaid`)){
            //console.log('not found')
            isRaid = 'enabled'
            let before = new Date().getTime()
            await db.set(`${message.guild.id}.isRaid`, true)
            let after = new Date().getTime()
            let ms = after - before

            let config = createEmbed('#0099ff', `${language('_raidmode_raidmode')}`, `${language('_raidmode_success', isRaid, ms)}`)
            message.reply({ embeds: [config] })
            

        }
        else {
            let rev = !await db.get((`${message.guild.id}.isRaid`).replace(/['"]+/g, ''))
            //console.log(rev)
            let text = ''
            if(rev) text = 'enabled'
            if(!rev) text = 'disabled'
            let before = new Date().getTime()
            await db.set(`${message.guild.id}.isRaid`, rev)
            let after = new Date().getTime()
            let ms = after - before
            let config = createEmbed('#0099ff', `${language('_raidmode_raidmode')}`, `${language('_raidmode_success', text, ms)}`)
            message.reply({ embeds: [config] })
        }

    })()

}