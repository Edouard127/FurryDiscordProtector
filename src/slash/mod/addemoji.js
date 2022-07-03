const { PermissionFlagsBits, Util }= require('discord.js');

module.exports = {
	name: 'addemoji',
	description: 'Add emoji to your server',
	options: [
		{
			name: 'emoji',
			description: 'Emoji you want to add to the server',
			type: 3,
			required: true,
		},
		{
			name: 'emoji_name',
			description: 'Name of emoji',
			type: 3,
		},
	],
	permissions: 'MANAGE_EMOJIS',
	example: '/addemoji **emoji:**🙄',
	category: 'mod',
	run: async (interaction) => {
		const emoji = interaction.options.getString('emoji');
		const emojiName = interaction.options.getString('emoji_name');
		const parseCustomEmoji = Util.parseEmoji(emoji);
		if(!interaction.guild.me.permissions.has(PermissionFlagsBits.ManageEmojisAndStickers)) return await interaction.reply({ content: `❌ I don't have the permission to manage emojis` });
		if (parseCustomEmoji.id) {
			const emojiLink = `https://cdn.discordapp.com/emojis/${parseCustomEmoji.id}.${
				parseCustomEmoji.animated ? 'gif' : 'png'
			}`;
			try {
			var createEmoji = await interaction.guild.emojis.create(emojiLink, emojiName || parseCustomEmoji.name)
			} catch (err) {
				return await interaction.reply({ content: err.toString() })
			}
			interaction.reply({
				content: `Added <${createEmoji.animated ? "a" : ""}:${createEmoji.name}:${createEmoji.id}> emoji`,
			});
		} else {
			interaction.reply({
				content: ':x: Not vaild emoji',
				ephemeral: true,
			});
		}
	},
};
