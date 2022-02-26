const createEmbed = require('../utils/createEmbed.js')

exports.name = "help";
exports.description = "Need help with our bot ?"
exports.run = (message, args, client, prefix) => {
    var desc = ''
    console.log(client.commands)
    client.commands.forEach(command => {
        desc += `\n${command.name}: ${command.description}\n`
    })
    //console.log(desc)
    
    var help = createEmbed('#0099ff', '❓ Help', desc)
    message.channel.send({ embeds: [help] })
	//console.log(new Date().getTime() - message.createdTimestamp )

}

