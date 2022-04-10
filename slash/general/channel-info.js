const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	name: 'channel-info',
	description: 'Show info about channel in this server',
	options: [
		{
			name: 'channel',
			description: 'Select channel you need info about',
			type: 7,
			required: true,
		},
	],
	category: 'general',
	/**
	 *
	 * @param {*} interaction
	 */
	run: async (interaction) => {
		const channel = interaction.options.getChannel('channel');
		const embed = new EmbedBuilder().setTitle(`${channel.name} Info`);
		if (channel.isText && channel.topic) {
			embed.setDescription(channel.topic);
		}
		if (channel.rateLimitPerUser) {
			embed.addField({ name: 'Slow Mode:', value: `${channel.rateLimitPerUser} Seconds` });
		}
		if (channel.parent) {
			embed.addFields({ name: 'Catgory Name:', value: channel.parent.name });
		}
		if (channel.lastPinTimestamp) {
			embed.addFields(
				{ name: 'Last Pin Message At:', value: `<t:${Math.floor(channel.lastPinTimestamp / 1000)}:R>`}
			)
		}
		if (channel.nsfw) {
			embed.addFields({ name: 'Channel NSFW?', value: 'Yes' });
		}
		let channelTypes;
		switch (channel.type) {
			case 'GUILD_TEXT':
				channelTypes = 'Text Channel';
				break;
			case 'GUILD_VOICE':
				channelTypes = 'Voice Channel';
				break;
			case 'GUILD_CATEGORY':
				channelTypes = 'Category Channel';
				break;
			case 'GUILD_NEWS':
				channelTypes = 'News Channel';
				break;
			case 'GUILD_STORE':
				channelTypes = 'Store Channel';
				break;
			case 'GUILD_NEWS_THREAD':
				channelTypes = 'News Thread Channel';
				break;
			case 'GUILD_PUBLIC_THREAD':
				channelTypes = 'Public Thread Channel';
				break;
			case 'GUILD_PRIVATE_THREAD':
				channelTypes = 'Private Thread Channel';
				break;
			case 'GUILD_STAGE_VOICE':
				channelTypes = 'Stage Channel';
				break;
		}
		embed.addFields({ name: 'Channel Type:', value: 'to fix', inline: true })
		embed.addFields({ name: 'Channel Created At:', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:R>`, inline: true });
		embed.setColor(interaction.guild.me.displayHexColor);
		
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('members')
				.setStyle('Primary')
				.setLabel('Members With Access To Channel')
				.setEmoji({ name:'👩‍👧‍👦' }),
		);
		interaction.reply({
			embeds: [embed],
			components: [row],
		});
		const filter = (i) => i.customId === 'members' && i.user.id === interaction.user.id;
		const collector = interaction.channel.createMessageComponentCollector({ filter: filter, max: 1 });
		collector.on('collect', async (i) => {
			if (i.customId === 'members') {
				await i.deferReply();
				if (!channel.members.size) {
					return i.editReply({
						content: `:x: I can\'t find any members with access in this channel (or not cached members)`,
					});
				}
				let loopedMembers = '';
				let num = 0;
				channel.members.forEach((member) => {
					num++;
					loopedMembers += `**#${num}** | ${member}\n`;
				});
				i.editReply({
					content: `**${channel} Members:**\n\n${loopedMembers}`,
				});
			}
		});
	},
};
