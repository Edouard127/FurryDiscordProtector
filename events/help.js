const { Client, Collection, Permissions, MessageEmbed, Snowflake, GuildMember } = require("discord.js");
const fs = require("fs");
const dir = __dirname + '\\../\/scripts/';
const commands = fs.readdirSync(dir).filter(file => file.endsWith(".js"));
if (!fs.existsSync(__dirname + '\\../\/utils/languages/config/languages.json')) {
    fs.writeFileSync(__dirname + '\\../\/utils/languages/config/languages.json', "{}")
}
const createEmbed = require('../utils/createEmbed.js')
const client = new Client({ autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_VOICE_STATES",], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/ });
client.commands = new Collection();

// Loop over the Command files
for (const file of commands) {
    // Get the command name from splitting the file
    const commandName = file.split(".")[0];
    // Require the file
    const command = require(`${dir}${file}`);

    // Set the command to a collection
    client.commands.set(commandName, command, command.description);

}
module.exports = {
    event: 'interactionCreate', 
    once: false,
    async run(interaction){
        const command = interaction.commandName
        if(command === 'help'){
        const guildLanguages = require('../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildId] || "en"; // "english" will be the default language
        const language = require(`../utils/languages/${guildLanguage}.js`);
        var desc = 'soon'
        //console.log(desc)
        
        var help = createEmbed('#0099ff', `${language('_help_help')}`, desc)
        interaction.reply({ embeds: [help] })
        }
    }
}