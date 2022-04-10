const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'Get user avatar',
	options: [
		{
			name: 'server',
			description: 'Get member avatar in this server',
			type: 1,
		},
		{
			name: 'user',
			description: 'User to get avatar',
			type: 1,
			options: [
				{
				name: 'user',
				description: 'User',
				type: 6
				},
			]
		},
	],
	category: 'general',
	run: async (interaction) => {
		const member = interaction.options.getMember('user') || interaction.member;
		const args = interaction.options.getSubcommand()
		if (args == 'server') {
			let icon = interaction.guild.iconURL({ dynamic: true, size: 4096 })
			const embed = new EmbedBuilder()
				.setAuthor({ name: member.user.tag, iconURL: member.avatarURL({ dynamic: true }) })
				.setDescription(`[Icon Link](${icon})`)
				.setImage(icon)
				.setFooter({ text: `Requested By ${interaction.user.tag}\nWant to keep your avatar private from this command ? Check our privacy commands`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
				const row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setStyle('Link')
						.setURL(icon)
						.setLabel('Server Icon'),
				);
			return interaction.reply({ embeds: [embed], components: [row] });
		}
		if(args == 'user'){
		const embed = new EmbedBuilder()
			.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`[Avatar Link](${member.user.displayAvatarURL({ dynamic: true, size: 4096 })})`)
			.setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
			.setFooter({ text: `Requested By ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true } )});
			const row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setStyle('Link')
					.setURL(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
					.setLabel('Member Avatar'),
			);
		return interaction.reply({ embeds: [embed], components: [row] });
			}
	},
};
