const ReadText = require('text-from-image')

const axios = require('axios');
const db = require('quick.db')
const createEmbed = require('./createEmbed.js')

var w = /(f*)(u*)[c*|k*] fur|d*(o|0)*g(f*)(u*)(c*)(k*)(e|r)|d(e|ea)d fur|h(8|ate) fur|d(1|i)e fur/gmi


async function profanityImage(url){
    const guildLanguages = require('./languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);

ReadText(url).then(text => {
    console.log(text);
    if (text.match(w)) {
        let ch
        let channel
        (async () => {
            ch = await message.guild.channels.cache.find(c => c.id === db.get((`${message.guild.id}.logs`).replace(/['"]+/g, '')))
            if(ch){
                let config = createEmbed('#0099ff', `${language('_raid_')}`, `${language('_raid_message', (await message.guild.fetchOwner()).id)}`)
                ch.send({ embeds: [config]})
            }
            else {
                channel = message.guild.channels.cache.filter(c => c.type === 'text').find(x => x.position == 0);
                let config = createEmbed('#0099ff', `${language('_raid_')}`, `${language('_raid_message', (await message.guild.fetchOwner()).id)}`)
                channel.send({ embeds: [config]})
            }
            
        })
        
        
    }
}).catch(err => {
    console.log(err);
})
}
module.exports = profanityImage