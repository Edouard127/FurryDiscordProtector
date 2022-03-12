const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType } = require('discord-api-types/v9');
exports.name = "config";
exports.description = "Configure the Raid Detection for your server"

module.exports = {
    data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Server configuration')
    .addSubcommand(subcommand => {
        return subcommand
            .setName('raidmode')
            .setDescription('Number of joins in 10 seconds before triggering the Anti-Raid Mode')
            .addIntegerOption(int => { return int.setMinValue(2).setMaxValue(20).setName('value').setDescription('value') })
    })
    .addSubcommand(subcommand => {
        return subcommand
            .setName('antispam')
            .setDescription('Number of messages in 3 seconds before triggering the Anti-Spam')
            .addIntegerOption(int => { return int.setMinValue(2).setMaxValue(20).setName('value').setDescription('value') })

    })
    .addSubcommand(subcommand => { return subcommand.setName('logs').setDescription('Logs channel for logging events').addChannelOption(channel => { return channel.addChannelType(ChannelType.GuildText).setName('value').setDescription('value') }) }),

}











    
