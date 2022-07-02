const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	name: 'banner',
	description: 'Get user banner',
	description_localizations: {
		"fr": "Obtenir la bannière de l'utilisateur",
		"es-ES": "Obtener el banner del usuario",
		"ru": "Получить баннер пользователя"
	},
	options: [
		{
			name: 'user',
			description: 'User to receive a banner from',
			description_localizations: {
				"fr": "Utilisateur pour obtenir la bannière",
				"es-ES": "Usuario para obtener la pancarta de",
				"ru": "Пользователь для получения баннера от"
			},
			type: 6,
		},
	],
	timeout: 3000,
	category: 'general',
	run: async (interaction, client) => {
		const user = interaction.options.getMember('user')?.user || interaction.user;
		await client.users.fetch(user).catch(() => {
			return interaction.reply({ content: ":x: i can't find this user" });
		})
		const fetchUser = await client.users.fetch(user);
		await fetchUser.fetch(); // to get user banner you need to fetch user before getting banner
		try {
		const embed = new EmbedBuilder()
			.setAuthor({ name: fetchUser.username, iconURL: fetchUser.displayAvatarURL({ dynamic: true })})
			.setImage(fetchUser.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
			.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })});
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setStyle('Link')
				.setURL(fetchUser.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
				.setLabel('User Banner'),
		);
		return await interaction.reply({ embeds: [embed], components: [row] });
		} catch (e){
			return interaction.reply('This user does not have a banner')
		}
		
	},
};