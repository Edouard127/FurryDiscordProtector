const ReadText = require('text-from-image')

const db = require('quick.db')
const createEmbed = require('./createEmbed.js')

var w = /(f*)(u*)[c*|k*] fur|d*(o|0)*g(f*)(u*)(c*)(k*)(e|r)|d(e|ea)d fur|h(8|ate) fur|d(1|i)e fur/gmi


async function profanityImage(url, message){
    const guildLanguages = require('./languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);

ReadText(url, message).then(text => {
    if (text.match(w)) {
        let ch_logs
        (async () => {
            ch_logs = await message.guild.channels.cache.find(c => c.id === db.get((`${message.guild.id}.logs`).replace(/['"]+/g, '')))
            if(ch_logs){
                let config = createEmbed('#0099ff', `${language('_profanity')}`, `${language('_profanity_', message.url)}`)
                ch_logs.send({ embeds: [config]})
            }
            else {
                ch_logs = message.guild.channels.cache.filter(c => c.type === 'text').find(x => x.position == 0);
                let config = createEmbed('#0099ff', `${language('_profanity')}`, `${language('_profanity_', message.url)}`)
                ch_logs.send({ embeds: [config]})
            }
            
        })
        
        
    }
}).catch(err => {
    console.log(err);
})
}
module.exports = profanityImage