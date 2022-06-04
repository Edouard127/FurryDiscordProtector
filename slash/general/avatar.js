const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
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
		if(!interaction.isChatInputCommand()) return
		const member = interaction.options.getMember('user')
		const args = interaction.options.getSubcommand()
		if (args == 'server') {
			let icon = interaction.guild?.iconURL({ size: 4096 })
			const embed = new EmbedBuilder()
				.setAuthor({ name: member.user.tag, iconURL: member?.avatar})
				.setDescription(`[Icon Link](${icon})`)
				.setImage(icon)
				.setFooter({ text: `Requested By ${interaction.user.tag}\nWant to keep your avatar private from this command ? Check our privacy commands`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) });
				const row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Link)
						.setURL(icon)
						.setLabel('Server Icon'),
				);
			return interaction.reply({ embeds: [embed], components: [row] });
		}
		if(args == 'user'){
		const embed = new EmbedBuilder()
			.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ size: 4096 }) })
			.setDescription(`[Avatar Link](${member?.avatar})`)
			.setImage(member?.avatar)
			.setFooter({ text: `Requested By ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 } )});
			const row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setURL(member.user.displayAvatarURL({ size: 4096 }))
					.setLabel('Member Avatar'),
			);
		return interaction.reply({ embeds: [embed], components: [row] });
			}
	},
};
