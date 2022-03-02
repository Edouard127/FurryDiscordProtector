const db = require("quick.db");
const createEmbed = require('../utils/createEmbed.js')
const argsList = ['interact', 'threshold', 'exclude']

exports.name = "nsfw";
exports.description = "NSFW Content Detection"
exports.run = (message, args, prefix) => {
    const guildLanguages = require('../utils/languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);
    switch (true) {
        case (args[1] === 'interact'): {
            (async () => {
                let spamCheck = ''
        
                if(!await db.get(`${message.guild.id}.nsfwCheck`)){
                    spamCheck = 'enabled'
                    let before = new Date().getTime()
                    await db.set(`${message.guild.id}.nsfwCheck`, true)
                    let after = new Date().getTime()
                    let ms = after - before
        
                    let config = createEmbed('#0099ff', `${language('_nsfw_config')}`, `${language('_nsfw_success', spamCheck, ms)}`)
                    message.reply({ embeds: [config] })
                    
        
                }
                else {
                    let rev = !await db.get((`${message.guild.id}.nsfwCheck`).replace(/['"]+/g, ''))
                    //console.log(rev)
                    let text = '' //bruh what the fuck I did
                    if(rev) text = 'enabled'
                    if(!rev) text = 'disabled'
                    let before = new Date().getTime()
                    await db.set(`${message.guild.id}.nsfwCheck`, rev)
                    let after = new Date().getTime()
                    let ms = after - before
                    let config = createEmbed('#0099ff', `${language('_nsfw_config')}`, `${language('_nsfw_success', text, ms)}`)
                    message.reply({ embeds: [config] })
                }
        
            })()
        }
        break;
        case (args[1] === 'threshold'): {
            if(args[2]){
            if(parseInt(args[2]) < 101 && parseInt(args[2]) > 0){
                let threshold = parseInt(args[2])/100
                let before = new Date().getTime();
                (async () => {
                    await db.set(`${message.guild.id}.nsfwThreshold`, threshold)
                })().then(() => {
                    let after = new Date().getTime()
                    let ms = after - before
                    let config = createEmbed('#0099ff', `${language('_nsfw_config')}`, `${language('_nsfw_success_threshold', threshold, ms)}`)
                    message.reply({ embeds: [config] })
                })
                
            }
            else {
                let config = createEmbed('#0099ff', `${language('_nsfw_config')}`, `${language('_nsfw_config_NaN', args[3])}`)
                message.reply({ embeds: [config] })
            }
        }
            console.log('a')
        }
        
        break;

        default: {
                let config = createEmbed('#0099ff', `${language('_nsfw_config')}`, `${language('_nsfw_message', argsList)}`)
                message.reply({ embeds: [config] })
        }
    }


}