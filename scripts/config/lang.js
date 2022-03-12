const createEmbed = require('../utils/createEmbed.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs')


exports.name = "lang";
exports.description = "Change the language of the bot"
module.exports = {
    data: new SlashCommandBuilder()
    .setName('lang')
    .setDescription('language')
    .addStringOption(string => { return string.setName('value').setDescription('languages').addChoice('english', 'en').addChoice('français', 'fr').addChoice('русский', 'ru').addChoice('español', 'sp')}),

}


