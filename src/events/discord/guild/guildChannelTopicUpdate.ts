import { EmbedBuilder, Client, GuildChannel, APIAuditLogChangeKeyTopic } from "discord.js";

export default async(client: Client, channel: GuildChannel, topic: APIAuditLogChangeKeyTopic) => {
    //const logChannel = client.channels.cache.get(config.log_channel_id);
    //if (!logChannel) return;
    const embed = new EmbedBuilder()
    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL({ forceStatic: true }) ?? "https://cdn.discordapp.com/embed/avatars/0.png" })
    .addFields(
        {
            name: "Old Topic:",
            value: topic.old_value || 'None'
        },
        {
            name: "New Topic",
            value: topic.new_value || 'None'
        }
    )
    .setTimestamp()
   //return logChannel.send({ embeds: [embed], allowedMentions: { users: [] } });
}