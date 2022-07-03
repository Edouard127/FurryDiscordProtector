import { EmbedBuilder } from "@discordjs/builders";
import { Client, GuildEmoji } from "discord.js";


export default async(client: Client, oldEmoji: GuildEmoji, newEmoji: GuildEmoji) => {
    //const logChannel = client.channels.cache.get(config.log_channel_id);
    //if (!logChannel) return;
    const fetchEmojiAuthor = await newEmoji.fetchAuthor();
    if (oldEmoji.name !== newEmoji.name && oldEmoji.name != null && newEmoji.name != null) {
        const embed = new EmbedBuilder()
        .setAuthor({ name: newEmoji.guild.name, iconURL: newEmoji.guild.iconURL({ forceStatic: true }) ?? "https://cdn.discordapp.com/embed/avatars/0.png" })
        .setTimestamp()
        .setFooter({ text: fetchEmojiAuthor.tag, iconURL: fetchEmojiAuthor.displayAvatarURL({ forceStatic: true }) })
        .setTitle('🤩 Emoji Updated')
        .setDescription(`**${fetchEmojiAuthor} has updated <:${newEmoji.name}:${newEmoji.id}> emoji**`)
        .addFields(
            [
                {
                    name: "Old name:",
                    value: oldEmoji.name
                },
                {
                    name: "New name:",
                    value: newEmoji.name
                },
                {
                    name: "Responsible Moderator:",
                    value: `<@${fetchEmojiAuthor.id}>`
                }
            ]
        )
        //return logChannel.send({ embeds: [embed], allowedMentions: { "users": [] } })
    } else {
        console.error("Could not find the emoji name")
    }
}