import { Client, GuildEmoji, EmbedBuilder } from "discord.js";


export default async(client: Client, emoji: GuildEmoji) => {
    //const logChannel = client.channels.cache.get(config.log_channel_id);
    //if (!logChannel) return;
    const fetchEmojiAuthor = await emoji.fetchAuthor();
    const embed = new EmbedBuilder()
    .setAuthor({ name: emoji.guild.name, iconURL: emoji.guild.iconURL() ?? "https://cdn.discordapp.com/attachments/947234032347930685/992965502987145257/unknown.png" })
    .setTitle('Emoji Created')
    .setDescription(`${fetchEmojiAuthor} has deleted <${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}> emoji`)
    .setThumbnail(emoji.url)
    .setFooter({ text: fetchEmojiAuthor.tag, iconURL: fetchEmojiAuthor.displayAvatarURL({ forceStatic: true }) })
    .setTimestamp()
    .addFields(
        {
            name: "Responsible Moderator:",
            value: `<@${fetchEmojiAuthor.id}>`
        },
    )
    //return logChannel.send({ embeds: [embed], allowedMentions: { "users": [] } })
}