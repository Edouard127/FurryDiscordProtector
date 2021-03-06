import { AuditLogEvent, Client, EmbedBuilder, GuildChannel } from 'discord.js'

export default async(client: Client, channel: GuildChannel) => {
    const allLogs = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete });
    const fetchLogs = allLogs.entries.first();
    if(fetchLogs == undefined || fetchLogs.executor == null) return
    //const logChannel = await client.channels.cache.get(config.log_channel_id);
    //if (!logChannel) return;
    const embed = new EmbedBuilder()
    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png" })
    .setTitle('š Channel Deleted')
    .setDescription(`š¬ **Channel Name:** \`${channel.name}\`\n:id: **Channel ID:** \`${channel.id}\`\nšØ **Channel Type:** \`${channel.type}\``)
    .addFields(
        [
            {
                name: 'Responsible Moderator:', value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.tag}\`)`
            },
        ],
        )
    .setTimestamp()
    .setFooter({ text: fetchLogs.executor.tag, iconURL: fetchLogs.executor.displayAvatarURL({ forceStatic: true }) || "https://cdn.discordapp.com/embed/avatars/0.png" })
    //logChannel.send({ embeds: [embed], allowedMentions: { "users": [] } })
}