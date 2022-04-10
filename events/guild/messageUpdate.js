const config = require('../../config.json');
const Discord = require('discord.js');
const getDataK8s = require('../../utils/getDataK8s')

module.exports = async(client, oldMessgae, newMessage) => {
    if(newMessage.author.bot) return;
    var ch_logs = await newMessage.guild.channels.cache.find(c => c.id === (new getDataK8s(newMessage).k8s().then((data) => { return data.data.spec?.logs }))) || 0
    if(ch_logs === 0) return;
    if (!logChannel) return;
    if (oldMessgae.content !== newMessage.content) {
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setFooter({ text: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) })
        .setDescription(`📝 **Message sent by ${newMessage.author} edited in ${newMessage.channel}.** [Jump To Message](${newMessage.url}})`)
        .addFields(
            {
                name: "Old:",
                value: `\`\`\`\n${oldMessgae.content}\`\`\``
            },
            {
                name: "New:",
                value: `\`\`\`\n${newMessage.content}\`\`\``
            }
        )
        return ch_logs.send({ embeds: [embed] })
    }
}