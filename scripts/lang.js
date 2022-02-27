const createEmbed = require('../utils/createEmbed.js')
const langs = ['en', 'fr']

exports.name = "lang";
exports.description = "Change the language of the bot"
exports.run = (message, args, client, prefix) => {
    switch (true) {
        case (args[0] === 'lang'): {
            if (args[1]) {
                if (langs.includes(args[1])) {
                }
                    
            }

        }
            break;
        default: {
            var config = createEmbed('#0099ff',
                '⚙️ Config',

                `Bot Configuration\n
            Command: ${prefix}${exports.name}\n\n
            Arguments: ${argsList} `)

            message.reply({ embeds: [config] })
        }
    }
    
    var help = createEmbed('#0099ff', '❓ Help', desc)
    message.channel.send({ embeds: [help] })
	//console.log(new Date().getTime() - message.createdTimestamp )

}

