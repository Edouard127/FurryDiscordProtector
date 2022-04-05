const db = require('quick.db')
const createEmbed = require('./createEmbed.js')

const _K8s = require('./getDataK8s.js');

var w = /(f*)(u*)[c*|k*] fur|d*(o|0)*g(f*)(u*)(c*)(k)(e|r)|d(e|ea)d fur|h(8|ate) fur|d(1|i)e fur/gmi


async function profanityText(message){
    //console.log(message)
    const guildLanguages = require('./languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);

    var word = message.content
if (word.match(w)) {
    var __ = await new _K8s(message).k8s()
    //console.log('matched')
    //console.log(__.data.spec.logs)
            var ch_logs =  await message.guild.channels.cache.find(c => c.id === __.data.spec.logs) || 0
            if(ch_logs === 0) return;
            let config = createEmbed('#0099ff', `${language('_profanity')}`, `${language('_profanity_', message.url)}`)
            console.log(ch_logs)
            ch_logs.send({ embeds: [config]})

        }
    
}
module.exports = profanityText