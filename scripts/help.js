const createEmbed = require('../utils/createEmbed.js')

exports.name = "help";
exports.description = "Need help with our bot ?"
exports.run = (message, args, client, prefix) => {
    const guildLanguages = require('../utils/languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);
    var desc = ''
    console.log(client.commands)
    client.commands.forEach(command => {
        desc += `\n${command.name}: ${command.description}\n`
    })
    //console.log(desc)
    
    var help = createEmbed('#0099ff', `${language('_help_help')}`, desc)
    message.channel.send({ embeds: [help] })
	//console.log(new Date().getTime() - message.createdTimestamp )

}

