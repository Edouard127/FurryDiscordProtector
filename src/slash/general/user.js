const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	name: 'user',
	description: 'Get info about user like created at..',
	timeout: 3000,
	options: [
		{
			name: 'user',
			description: 'User to get info about',
			type: 6,
		},
	],
	category: 'general',
	run: async (interaction) => {
		const member = interaction.options.getMember('user') || interaction.member;
		const userCreated = Date.now() - member.user.createdTimestamp;
		const joinedTime = Date.now() - member.joinedTimestamp;
		const memberAvatar = member.avatarURL({ dynamic: true }) || member.user.displayAvatarURL({ dynamic: true });
		const embed = new EmbedBuilder()
			.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
			.setThumbnail(memberAvatar)
			.setFooter({ text: member.id, iconURL: member.displayAvatarURL({ dynamic: true })})
			.setColor('Random')
			.addFields(
				{
					name: 'User Created At:',
					value: `\`${member.user.createdAt.toLocaleString()}\`\n**<t:${Math.floor(
						member.user.createdTimestamp / 1000,
					)}:R>**`,
				},
				{
					name: 'Joined Server',
					value: `\`${member.joinedAt.toLocaleString()}\`\n**<t:${Math.floor(member.joinedTimestamp / 1000)}:R>**`,
				},
				{
					name: 'User Roles:',
					value:
						member.roles.cache
							.filter((r) => r.id !== interaction.guild.id)
							.map((r) => r.toString())
							.join(', ') || 'No Roles.',
				},
				{
					name: 'User Nickname:',
					value: member.nickname || 'None',
				},
				{
					name: 'is it a bot?',
					value: member.user.bot ? '✅' : ':x:',
				},
			);
		if (member.communicationDisabledUntilTimestamp) {
			embed.addField(
				'Timeout Left:',
				`\`${member.communicationDisabledUntil.toLocaleString()}\`\n**<t:${Math.floor(
					member.communicationDisabledUntilTimestamp / 1000,
				)}:R>**`,
			);
		}
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setStyle('Link')
				.setURL(member.user.displayAvatarURL({ dynamic: true }))
				.setLabel('User Avatar'),
		);
		interaction.reply({ embeds: [embed], components: [row] });
	},
};
