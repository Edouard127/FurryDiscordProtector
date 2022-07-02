const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
module.exports = {
	name: 'avatar',
	description: "Get an avatar",
	description_localizations: {
		"en-US": "Get an avatar",
		"fr": "Obtener un avatar",
		"es-ES": "Conseguir un avatar",
		"ru": "Получить аватар"
	},
	options: [
		{
			name: 'server',
			description: "Get server avatar",
			description_localizations: {
				"fr": "Récupérer l'avatar du serveur",
				"es-ES": "Obtener el avatar del servidor",
				"ru": "Получить аватар сервера"
			},
			type: 1,
		},
		{
			name: 'user',
			description: 'User to get avatar',
			description_localizations: {
				"fr": "L'utilisateur à qui avoir l'avatar",
				"es-ES": "Usuario para obtener el avatar",
				"ru": "Пользователь для получения аватара"
			},
			type: 1,
			options: [
				{
				name: 'user',
				description: 'User',
				description_localizations: {
					"fr": "Utilisateur",
					"es-ES": "Usuario",
					"ru": "пользователь"
				},
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
