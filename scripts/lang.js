const createEmbed = require('../utils/createEmbed.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs')


exports.name = "lang";
exports.description = "Change the language of the bot"
module.exports = {
    data: new SlashCommandBuilder()
    .setName('lang')
    .setDescription('lang')
    //.addStringOption(string => { return string.setName('value').setDescription('languages').addChoice('en').addChoice('fr').addChoice('ru').addChoice('sp')}),

}


