const createEmbed = require('../utils/createEmbed.js')
const bytesToSize = require('../utils/bytesToSize.js')
const os = require('os')


exports.name = "server";
exports.description = 'Stats for nerds like you 🤓'
exports.run = (message, args) => {
    var threads = 0
    var model = ''
    var clock = 0
    var guilds_count = 0
    for(var i = 0; i <os.cpus().length; i++) {
        threads++
        model = os.cpus()[i].model
        clock = os.cpus()[i].speed / 1000
    }
    const ping = createEmbed('#0099ff', '📊 Nerd Stats', `Made for nerds like you 🤓\n
    <:CPU:946565742055292949> CPU Informations:\nModel: ${model}\nNumber of Threads: ${threads}\nClock: ${clock} Ghz\n\n
    <:RAM:946581194793971712> RAM Informations:\n Total RAM: ${bytesToSize(os.totalmem())}\nFree RAM: ${bytesToSize(os.freemem())}\nRAM Used by process: ${bytesToSize(process.memoryUsage.rss())}`)

    message.channel.send({ embeds: [ping] })
    
    

}

