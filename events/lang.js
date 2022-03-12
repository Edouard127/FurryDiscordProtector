const fs = require("fs");
const createEmbed = require('../utils/createEmbed.js')
module.exports = {

event: 'interactionCreate',
once: false,
async run(interaction){

const command = interaction.commandName



if(command === 'lang'){
    const subcommand = interaction.options.getSubcommand()
    const guildLanguages = require('../utils/languages/config/languages.json') //<------------------------------------------------------------ FIX IF THE LANGUAGE IN THE JSON FILE IS NOT VALID, PUT THE DEFAULT VARIABLE
const guildLanguage = guildLanguages[interaction.guildId] || "en"; // "english" will be the default language
const language = require(`../utils/languages/${guildLanguage}.js`);
                guildLanguages[interaction.guildId] = subcommand
                console.log(interaction.options.getSubcommand())
                
                    fs.writeFileSync(__dirname + '/../utils/languages/config/languages.json', JSON.stringify(guildLanguages))
                    let newl = require(`../utils/languages/${subcommand}.js`);
                    var config = createEmbed('#0099ff', `${newl('_lang_lang')}`, `${newl('_lang_validation')}`)
                    interaction.reply({ embeds: [config] })
}
}
}