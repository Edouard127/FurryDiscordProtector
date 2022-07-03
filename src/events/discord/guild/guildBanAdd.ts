import { Client, EmbedBuilder, GuildBan } from "discord.js";

module.exports = async(client: Client, ban: GuildBan) => {
    //const logChannel = await client.channels.cache.get(config.log_channel_id);
    //if (!logChannel) return;
    const allLogs = await ban.guild.fetchAuditLogs({ type: 22 });
    const fetchModerator = allLogs.entries.first();
    if(fetchModerator == undefined || fetchModerator.executor == null) return
    const embed = new EmbedBuilder()
    .setAuthor({ name: ban.user.tag, iconURL: ban.user.displayAvatarURL({ forceStatic: true }) })
    .setDescription(`**🔨 <@${ban.user.id}> banned from the server.**`)
    .setThumbnail(ban.user.displayAvatarURL({ forceStatic: true }))
    .setTimestamp()
    .setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL({ forceStatic: true }) ?? "https://cdn.discordapp.com/embed/avatars/0.png"  })
    .addFields([
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`,
                inline: true
            },
            {
                name: "Ban Reason:",
                value: fetchModerator.reason || '',
                inline: true
            }
        ]
    )
    //logChannel.send({ embeds: [embed], allowedMentions: { "users": [] } } )
}