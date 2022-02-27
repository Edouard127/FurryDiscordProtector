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
            let u = message.guild.members.cache.get(message.author.id)
            if(spam.tooQuick(thresh, 3000)){
                
                if(message.guild.members.cache.get(message.author.id).moderatable){
                    message.react('😡')
                    message.reply('Stop spamming, bad fluffer')
                        try {
                                message.guild.members.cache.get(message.author.id).timeout(1*30*1000, 'Protection')
                        
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