const createEmbed = require('../utils/createEmbed.js')
const fs = require('fs')
const langs = ['en', 'fr', 'ru', 'sp']


exports.name = "lang";
exports.description = "Change the language of the bot"
exports.run = (message, args, client, prefix) => {
    const guildLanguages = require('../utils/languages/config/languages.json') //<------------------------------------------------------------ FIX IF THE LANGUAGE IN THE JSON FILE IS NOT VALID, PUT THE DEFAULT VARIABLE
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);
    switch (true) {
        case (args[0] === 'lang'): {
                if (langs.includes(args[1])) {

                    guildLanguages[message.guild.id] = args[1];
                    
                        fs.writeFileSync(__dirname + '/../utils/languages/config/languages.json', JSON.stringify(guildLanguages))
                        let newl = require(`../utils/languages/${args[1]}.js`);
                        var config = createEmbed('#0099ff', `${newl('_lang_lang')}`, `${newl('_lang_validation')}`)
                        message.reply({ embeds: [config] })
                    

                }
                else {
                    var config = createEmbed('#0099ff', `${language('_lang_invalid')}`, `${language('_lang_choices', langs)}`)
                    message.reply({ embeds: [config] })
                }
                    
            

        }
        break;

    }
    

	//console.log(new Date().getTime() - message.createdTimestamp )

}

