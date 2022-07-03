import { EmbedBuilder, Guild } from "discord.js";


export default async(guild: Guild) => {
    //const logChannel = client.channels.cache.get(config.log_channel_id);
    //if (!logChannel) return;
    const embed = new EmbedBuilder()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png" })
    .setDescription(`${guild.name} now has a banner`)
    .setImage(guild.bannerURL())
    .setTimestamp()
    //return logChannel.send({ embeds: [embed], allowedMentions: { "users": [] } })
}