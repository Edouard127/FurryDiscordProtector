const db = require("quick.db");
const createEmbed = require('../utils/createEmbed.js')

exports.name = "profanity";
exports.description = "Enable/Disable Profanity Checker"
exports.run = (message, args, prefix) => {
    const guildLanguages = require('../utils/languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);
    (async () => {
        let profanityCheck = ''

        if(!await db.get(`${message.guild.id}.profanityCheck`)){
            profanityCheck = 'enabled'
            let before = new Date().getTime()
            await db.set(`${message.guild.id}.profanityCheck`, true)
            let after = new Date().getTime()
            let ms = after - before

            let config = createEmbed('#0099ff', `${language('_profanity_message')}`, `${language('_profanity_success', profanityCheck, ms)}`)
            message.reply({ embeds: [config] })
            

        }
        else {
            let rev = !await db.get((`${message.guild.id}.profanityCheck`).replace(/['"]+/g, ''))
            //console.log(rev)
            let text = ''
            if(rev) text = 'enabled'
            if(!rev) text = 'disabled'
            let before = new Date().getTime()
            await db.set(`${message.guild.id}.profanityCheck`, rev)
            let after = new Date().getTime()
            let ms = after - before
            let config = createEmbed('#0099ff', `${language('_profanity_message')}`, `${language('_profanity_success', text, ms)}`)
            message.reply({ embeds: [config] })
        }

    })()

}