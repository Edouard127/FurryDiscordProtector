const db = require('quick.db')
const createEmbed = require('../utils/createEmbed.js')
let threshold = {}
let c = {}
let raidmode = {}
let sus_members = []
module.exports = {
    event: "guildMemberAdd",
    once: false,
    
    run(member) {
        const guildLanguages = require('../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[member.guild.id] || "en"; // "english" will be the default language
        const language = require(`../utils/languages/${guildLanguage}.js`);
        let ch_logs
        (async () => {
            ch_logs = await member.guild.channels.cache.find(c => c.id === db.get((`${member.guild.id}.logs`).replace(/['"]+/g, ''))) || await member.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').find(x => x.position == 0);                                              
        })().then(() => {
            console.log(ch_logs)
            let config = createEmbed('#0099ff', `New member join`, `Username: ${member.displayName}\nID: ${member.id}\nAccount creation: ${member.user.createdAt}\n`)
            ch_logs.send({ embeds: [config]})
        });
        (async () => {
            if (await db.get(`${member.guild.id}.isRaid`) === true) {
                raidmode[member.guild.id] = { "raid": true }
            }
            else {
                raidmode[member.guild.id] = { "raid": false }
            }

            if (await db.get(`${member.guild.id}.raidmode.raidmode`)) {

                threshold[member.guild.id] = await db.get((`${member.guild.id}.raidmode.raidmode`)).replace(/['"]+/g, '')
                threshold[member.guild.id] = parseInt(threshold[member.guild.id])
            }
            else {

                threshold[member.guild.id] = 5

            }
        })().then(() => {
            if (raidmode[member.guild.id].raid === false) {
                let canClear = true


                if (c[member.guild.id]) {
                    c[member.guild.id].count = c[member.guild.id].count + 1
                }
                else if (!c[member.guild.id]) {
                    c[member.guild.id] = { count: 1 }
                }


                if (c[member.guild.id].count >= threshold[member.guild.id]) {

                    db.set(`${member.guild.id}.isRaid`, true)
                    console.log(sus_members)
                        (async () => {
                            if (await db.get(`${member.guild.id}.logs`)) {

                                let ch = await member.guild.channels.cache.find(c => c.id === db.get((`${member.guild.id}.logs`).replace(/['"]+/g, '')))
                                if (ch) {
                                    let config = createEmbed('#0099ff', `${language('_raid_'), `${language('_raid_message', (await member.guild.fetchOwner()).id)}`}`)
                                    ch.send({ embeds: [config] })
                                }
                                else {
                                    let channel = member.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').find(x => x.position == 0);
                                    let config = createEmbed('#0099ff', `${language('_raid_'), `${language('_raid_message', (await member.guild.fetchOwner()).id)}`}`)
                                    channel.send({ embeds: [config] })
                                }
                            }
                        })
                }
                if (canClear) {
                    setTimeout(() => {

                        canClear = true
                        c[member.guild.id].count = 0

                    }, 10000, canClear = false)
                }
            }


            else {
                member.send(`Hello ${member.user.username}, this server is currently under attack, please try again later`).then(member.kick())
            }
        })
    }
}