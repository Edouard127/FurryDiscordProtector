import { AuditLogEvent, Client, EmbedBuilder, GuildBan } from "discord.js";


export default async(client: Client, ban: GuildBan) => {
    //const logChannel = await client.channels.cache.get(config.log_channel_id);
    //if (!logChannel) return;
    const allLogs = await ban.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanRemove });
    const fetchModerator = allLogs.entries.first();
    if(fetchModerator == null || fetchModerator.executor == null) return;
    const embed = new EmbedBuilder()
    .setAuthor({  name: ban.guild.name, iconURL: ban.guild.iconURL({ forceStatic: true }) ?? "https://cdn.discordapp.com/embed/avatars/0.png" })
    .setDescription(`<@${ban.user.id}> unbanned`)
    .setThumbnail(ban.user.displayAvatarURL({ forceStatic: true }))
    .setTimestamp()
    .setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL({ forceStatic: true }) ?? "https://cdn.discordapp.com/embed/avatars/0.png" })
    .addFields(
        {
            name: "Responsible Moderator:",
            value: `<@${fetchModerator.executor.id}>`,
            inline: true
        },
        {
            name: "Unban Reason:",
            value: fetchModerator.reason || 'No reason',
            inline: true
        }
    )
    //logChannel.send({ embeds: [embed], allowedMentions: { "users": [] } })
}