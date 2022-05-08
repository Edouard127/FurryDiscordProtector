const config = require('../../config.json');
const Discord = require('discord.js');
const _ = require('../../utils/k8sDB')
const { get } = new _()

module.exports = async(client, message) => {
    message.guildId = message.guild.id
    var ch_logs = await message.guild.channels.cache.find(c => c.id === get(message).then((data) => { return data.data.spec?.logs || 0})) || 0
    if(ch_logs === 0) return;
    if (!logChannel) return;
    const allLogs = await message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE" });
    const fetchModerator = allLogs.entries.first();
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setDescription(`🗑 **Message sent by ${message.author} deleted in ${message.channel}.**\n${message.content}`)
    .addField('Responsible Moderator:', `<@${fetchModerator.executor.id}>`)
    .setTimestamp()
    .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
    return ch_logs.send({ embeds: [embed] })
}