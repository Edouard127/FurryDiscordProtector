const db = require("quick.db");
const createEmbed = require('../utils/createEmbed.js')

exports.name = "raidmode";
exports.description = "Enable/Disable Raidmode"
exports.run = (message, args, prefix) => {
    (async () => {

        if(!await db.get(`${message.guild.id}.isRaid`)){
            let before = new Date().getTime()
            await db.set(`${message.guild.id}.isRaid`, {
                isRaid: true
            })
            let after = new Date().getTime()
            let diff = after - before

            let config = createEmbed()
            

        }
        else {
            let rev = !await db.get(`${message.guild.id}.isRaid`)
            await db.set(`${message.guild.id}.isRaid`, {
                isRaid: rev
            })
        }

    })().then(() => {

    })

}