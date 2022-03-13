const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'banner',
	description: 'Get user banner',
	options: [
		{
			name: 'user',
			description: 'user to get banner for',
			type: 6,
		},
	],
	timeout: 3000,
	category: 'general',
	run: async (interaction, client) => {
		const user = interaction.options.getMember('user').user || interaction.user;
		try {
			await client.users.fetch(user);
		} catch (e) {
			return interaction.reply({ content: ":x: i can't find this user" });
		}
		const fetchUser = await client.users.fetch(user);
		await fetchUser.fetch(); // to get user banner you need to fetch user before getting banner
		try {
		const embed = new MessageEmbed()
			.setAuthor(fetchUser.tag, fetchUser.displayAvatarURL({ dynamic: true }))
			
			.setImage(fetchUser.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
			
			.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
			console.log(fetchUser.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setStyle('LINK')
				.setURL(fetchUser.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
				.setLabel('User Banner'),
		);
		interaction.reply({ embeds: [embed], components: [row] });
		} catch {
			return interaction.reply('This user does not have a banner')
		}
		
	},
};
