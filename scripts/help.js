
const { SlashCommandBuilder } = require('@discordjs/builders');

exports.name = "help";
exports.description = "Need help with our bot ?"
module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Need help with our bot ?'),

}


