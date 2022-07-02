const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const channelTypes = {
	GUILD_TEXT: 0,
	DM: 1,
	GUILD_VOICE: 2,
	GROUP_DM: 3,
	GUILD_CATEGORY: 4,
	GUILD_NEWS: 5,
	GUILD_NEWS_THREAD: 10,
	GUILD_PUBLIC_THREAD: 11,
	GUILD_PRIVATE_THREAD: 12,
	GUILD_STAGE_VOICE: 13,
	GUILD_DIRECTORY: 14,
	GUILD_FORUM: 15
}

module.exports = {
	name: 'channel-info',
	description: 'Show channel informations',
	description_localizations: {
		"fr": "Afficher les informations sur le channel",
		"es-ES": "Mostrar información del canal",
		"ru": "Показать информацию о канале"
	},
	options: [
		{
			name: 'channel',
			description: 'Select the channel on which you want to get information',
			description_localizations: {
				"fr": "Sélectionnez le channel sur lequel vous souhaitez obtenir les informations",
				"es-ES": "Seleccione el canal sobre el que desea obtener información",
				"ru": "Выберите канал, по которому вы хотите получить информацию"
			},
			type: 7,
			required: true,
		},
	],
	category: 'general',
	run: async (interaction) => {
		const channel = interaction.options.getChannel('channel');
		const embed = new EmbedBuilder().setTitle(`${channel.name} Info`);
		if (channel.isText && channel.topic) embed.setDescription(channel.topic);
		
		if (channel.rateLimitPerUser) embed.addField({ name: 'Slow Mode:', value: `${channel.rateLimitPerUser} Seconds` });
		if (channel.parent) embed.addFields({ name: 'Catgory Name:', value: channel.parent.name });
		if (channel.lastPinTimestamp) embed.addFields({ name: 'Last Pin Message At:', value: `<t:${Math.floor(channel.lastPinTimestamp / 1000)}:R>`})
		if (channel.nsfw) embed.addFields({ name: 'Channel NSFW?', value: 'Yes' });
		for(const [key, value] of Object.entries(channelTypes)){
			if(channel.type == value){ 
				var type = key
				break;
			}
		}
		embed.addFields({ name: 'Channel Type:', value: type, inline: true })
		embed.addFields({ name: 'Channel Created At:', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:R>`, inline: true });
		embed.setColor(interaction.guild.me.displayHexColor);
		
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('members')
				.setStyle('Primary')
				.setLabel('Members With Access To Channel')
				.setEmoji({ name:'👩‍👧‍👦' }),
		);
		await interaction.reply({
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
				i.editReply({
					content: `**${channel} Members:**\n\n${channel.members.map((r) => r).join('')}`,
				});
			}
		});
	},
};
