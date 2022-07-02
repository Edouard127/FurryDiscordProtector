const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'emojis',
	description: 'Get a list of emojis',
	description_localizations: {
		"fr": "Obtenir la liste d'emojis",
		"es-ES": "Obtener la lista de emojis",
		"ru": "Получить список эмодзи"
	},
	category: 'general',
	run: async (interaction) => {
		const emojis = interaction.guild.emojis.cache.map((r) => r).join(' ');
		const embed = new EmbedBuilder()
			.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})
			.setTitle(
				`${interaction.guild.emojis.cache.filter((r) => r.animated === false).size} Emotes, ${
					interaction.guild.emojis.cache.filter((r) => r.animated).size
				} Animated (${interaction.guild.emojis.cache.size} Total)`,
			)
			.setDescription(emojis.toString())
			.setColor('Random')
			.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })});
		return interaction.reply({ embeds: [embed] });
	},
};
