const { MessageAttachment } = require('discord.js');

const channelType = {
	GUILD_TEXT: 0,
	GUILD_VOICE: 2,
	GUILD_CATEGORY: 4
}

module.exports = {
	name: 'channels',
	description: 'Shows the specific type of channels in this server.',
	description_localizations: {
		"fr": "Montre le type spécifique de channels dans ce serveur.",
		"es-ES": "Muestra el tipo específico de canales en este servidor.",
		"ru": "Показывает конкретный тип каналов в данном сервере."
	},
	options: [
		{
			name: 'type',
			description: 'Type of channels.',
			description_localizations: {
				"fr": "Type de channels",
				"es-ES": "Tipo de canales",
				"ru": "Тип каналов"
			},
			type: 4,
			required: true,
			choices: [
				{
					name: 'GUILD_TEXT',
					value: channelType.GUILD_TEXT
				},
				{
					name: 'GUILD_VOICE',
					value: channelType.GUILD_VOICE
				},
				{
					name: 'GUILD_CATEGORY',
					value: channelType.GUILD_CATEGORY
				},
			],
		},
	],
	category: 'general',
	run: async (interaction) => {
		const type = interaction.options.getInteger('type')

		const channels = await interaction.guild.channels.cache.filter((r) => r.type === type).map((channel) => `Name: ${channel.name} ID: ${channel.id}`).join('\n')
		let file = new MessageAttachment(Buffer.from(channels, 'utf-8'), 'channels.txt')
		return await interaction.reply({
			content: `**\`💬\` ${interaction.guild.name}** Text Channels :`, files: [file],
		});

	},
};
