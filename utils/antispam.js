const spam = require("./spamDetect.js")
const db = require("quick.db");
const { Permissions } = require("discord.js")

function spam_(message, client){
    spam.log(message)
    var thresh = 0
    try {
        (async () => {
            if(!await db.get(`${message.guild.id}.antispam.antispam`)){
            thresh = 6
        }
        else {
            thresh = JSON.stringify(await db.get(`${message.guild.id}.antispam.antispam`)).replace(/['"]+/g, '')
        }
        })().then(() => {
            //let u = message.guild.members.cache.get(message.author.id)
            if(spam.sameMessages(thresh, 3000)){
                
                if(message.guild.members.cache.get(message.author.id).moderatable){
                    message.react('😡')
                        try {
                                message.guild.members.cache.get(message.author.id).timeout(1*30*1000, 'Protection')
                                let ch_logs
                                (async () => {
                                    ch_logs = await message.guild.channels.cache.find(c => c.id === db.get((`${message.guild.id}.logs`).replace(/['"]+/g, '')))
                                    if(ch_logs){
                                        let config = createEmbed('#0099ff', `${language('_spam')}`, `${language('_spam_', message.author.username)}`)
                                        ch_logs.send({ embeds: [config]})
                                    }
                                    else {
                                        ch_logs = message.guild.channels.cache.filter(c => c.type === 'text').find(x => x.position == 0);
                                        let config = createEmbed('#0099ff', `${language('_spam')}`, `${language('_spam_', message.author.username)}`)
                                        ch_logs.send({ embeds: [config]})
                                    }
                                    
                                })
                        
                    } catch (err) {
                        
                    }
                    
                } 
                else false
                    
                
                
              }
        }).catch(err => console.log(err))
    } catch (err) {
        console.log(err)
    }
    
    
}
module.exports = spam_