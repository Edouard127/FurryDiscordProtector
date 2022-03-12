const createEmbed = require('../utils/createEmbed.js')
const bytesToSize = require('../utils/bytesToSize.js')
const os = require('os')



module.exports = {
    name: 'ping',
	description: 'Stats for nerds like you 🤓',
	timeout: 5000,
    run: async (client, message) => {
        const guildLanguages = require('../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
        const language = require(`../utils/languages/${guildLanguage}.js`);
        var threads = 0
        var model = ''
        var clock = 0
        
        for(var i = 0; i <os.cpus().length; i++) {
            threads++
            model = os.cpus()[i].model
            clock = os.cpus()[i].speed / 1000
        }
        var freemem = bytesToSize(os.freemem())
        var totalmem = bytesToSize(os.totalmem())
        var memusage = bytesToSize(process.memoryUsage.rss())
        const ping = createEmbed('#0099ff', `${language('_stats_nerd')}`,`${language('_stats_nerd_infos', model, threads, clock, totalmem, freemem, memusage)}`)
    
        message.channel.send({ embeds: [ping] })
	},
}