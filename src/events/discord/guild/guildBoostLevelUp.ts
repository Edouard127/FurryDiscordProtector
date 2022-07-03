import { Client, EmbedBuilder, Guild } from "discord.js";

export default async(client: Client, guild: Guild) => {
    //const logChannel = client.channels.cache.get(config.log_channel_id);
    //if (!logChannel) return;
    const embed = new EmbedBuilder()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL({ forceStatic: true }) ?? "https://cdn.discordapp.com/embed/avatars/0.png" })
    .setDescription(`${guild.name} is now level ${guild.premiumTier}`)
    .setTimestamp()
    //return logChannel.send({ embeds: [embed], allowedMentions: { users: [] } })
}