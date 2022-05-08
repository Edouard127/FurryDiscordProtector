const createEmbed = require('../../utils/createEmbed.js')
const _ = require('../../utils/k8sDB.js')
const { insert, get } = new _()
let threshold = {}
let c = {}
let raidmode = {}
let sus_members = []
    
    module.exports = async(client, member) => {
        member.guildId = member.guild.id
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[member.guild.id] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        member.guidId = member.guild.id
            var ch_logs = await member.guild.channels.cache.find(c => c.id === (get(member).then((data) => { return data.data.spec?.logs || 0}))) || 0
            
            let config = createEmbed('#0099ff', `New member join`, `Username: ${member.displayName}\nID: ${member.id}\nAccount creation: ${member.user.createdAt}\n`)
            if(ch_logs != 0) ch_logs.send({ embeds: [config]})
                raidmode[member.guild.id] = { "raid": await get(member).then((data) => { return data.data.spec?.isRaid || false}) }

                threshold[member.guild.id] = (await get(member).then((data) => { return data.data.spec?.raidmode || 3}))
            if (raidmode[member.guild.id].raid === false) {
                let canClear = true


                if (c[member.guild.id]) {
                    c[member.guild.id].count = c[member.guild.id].count + 1
                }
                else if (!c[member.guild.id]) {
                    c[member.guild.id] = { count: 1 }
                }


                if (c[member.guild.id].count >= threshold[member.guild.id]) {
                    member.send(`Hello ${member.user.username}, this server is currently under attack, please try again later`).then(member.kick())

                    let data = {
                        isRaid: raidmode.value
                    }
                    let _ = await insert(member, data)

                                    let config = createEmbed('#0099ff', `${language('_raid_'), `${language('_raid_message', (await member.guild.fetchOwner()).id)}`}`)
                                    if(ch_logs != 0) ch_logs.send({ embeds: [config] })
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
    }