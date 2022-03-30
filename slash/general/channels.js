const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'channels',
	description: 'Shows specific type of channels in this server.',
	options: [
		{
			name: 'type',
			description: 'Type of channel to show.',
			type: 3,
			required: true,
			choices: [
				{
					name: 'Text',
					value: 'text',
				},
				{
					name: 'Voice',
					value: 'voice',
				},
				{
					name: 'Category',
					value: 'category',
				},
			],
		},
	],
	category: 'general',
	run: async (interaction) => {
		const type = interaction.options.getString('type');
		if (type === 'text') {
			let num = 0;
			let loop = '';
			interaction.guild.channels.cache
				.filter((r) => r.type === 'GUILD_TEXT')
				.forEach((channel) => {
					num++;
					loop += `**#${num}** - ${channel.name}\nID: ${channel.id}\nRaw Position: ${channel.rawPosition}\nnsfw ?: ${channel.nsfw}\n\n\n`;
				});
				let file = new MessageAttachment(Buffer.from(loop, 'utf-8'), 'channels.txt')
			return interaction.reply({
				content: `**\`💬\` ${interaction.guild.name}** Text Channels :`, files: [file],
			});
		}
		if (type === 'voice') {
			let num = 0;
			let loop = '';
			interaction.guild.channels.cache
				.filter((r) => r.type === 'GUILD_VOICE')
				.forEach((channel) => {
					num++;
					loop += `**#${num}** - ${channel.name}\nID: ${channel.id}\nRaw Position: ${channel.rawPosition}\nRegion: ${channel.rtcRegion}\nBitrate: ${channel.bitrate}\nUser limit: ${channel.userLimit}\n\n\n`;
				});
				let file = new MessageAttachment(Buffer.from(loop, 'utf-8'), 'channels.txt')
			return interaction.reply({
				content: `**\`🔊\` ${interaction.guild.name}** Voice Channels :`, files: [file]
			});
		}
		if (type === 'category') {
			let num = 0;
			let loop = '';
			interaction.guild.channels.cache
				.filter((r) => r.type === 'GUILD_CATEGORY')
				.forEach((channel) => {
					num++;
					loop += `**#${num}** - ${channel.name}\nID: ${channel.id}\nRaw Position: ${channel.rawPosition}\n\n\n`;
				});
			let file = new MessageAttachment(Buffer.from(loop, 'utf-8'), 'channels.txt')
			interaction.reply({
				content: `**\`📂\` ${interaction.guild.name}** Category Channels :`, files: [file]
			});
		}
	},
};
