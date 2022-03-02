const db = require("quick.db");
const createEmbed = require('../utils/createEmbed.js')

exports.name = "spam";
exports.description = "Enable/Disable Anti-Spam"
exports.run = (message, args, prefix) => {
    const guildLanguages = require('../utils/languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);
    (async () => {
        let spamCheck = ''

        if(!await db.get(`${message.guild.id}.spamCheck`)){
            spamCheck = 'enabled'
            let before = new Date().getTime()
            await db.set(`${message.guild.id}.spamCheck`, true)
            let after = new Date().getTime()
            let ms = after - before

            let config = createEmbed('#0099ff', `${language('_spam_message')}`, `${language('_spam_success', spamCheck, ms)}`)
            message.reply({ embeds: [config] })
            

        }
        else {
            let rev = !await db.get((`${message.guild.id}.spamCheck`).replace(/['"]+/g, ''))
            //console.log(rev)
            let text = ''
            if(rev) text = 'enabled'
            if(!rev) text = 'disabled'
            let before = new Date().getTime()
            await db.set(`${message.guild.id}.spamCheck`, rev)
            let after = new Date().getTime()
            let ms = after - before
            let config = createEmbed('#0099ff', `${language('_spam_message')}`, `${language('_spam_success', text, ms)}`)
            message.reply({ embeds: [config] })
        }

    })()

}