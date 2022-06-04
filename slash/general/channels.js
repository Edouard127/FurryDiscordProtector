const { MessageAttachment } = require('discord.js');

const channelType = {
	GUILD_TEXT: 0,
	GUILD_VOICE: 2,
	GUILD_CATEGORY: 4
}

module.exports = {
	name: 'channels',
	description: 'Shows specific type of channels in this server.',
	options: [
		{
			name: 'type',
			description: 'Type of channel to show.',
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
