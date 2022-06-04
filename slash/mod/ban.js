const { PermissionFlagsBits, ActionRowBuilder, SelectMenuBuilder }= require('discord.js');

module.exports = {
	name: 'ban',
	description: 'Ban a member',
	permissions: 'BAN_MEMBERS',
	example: `/ban <@>\n/ban <@> spamming`,
	options: [
		{
			name: 'user',
			description: 'User to ban',
			type: 6,
			required: true,
		},
		{
			name: 'reason',
			description: 'Reason for the ban',
			type: 3,
			required: false
		},
		{
			name: 'delete_messages',
			description: 'Delete messages',
			min_value: 0,
			max_value: 7,
			type: 4,
			required: false,
		},
		{
			name: 'time',
			description: 'Time for the ban',
			type: 4,
			required: false,
			choices: [
				{
					name: "1 hour",
					type: 4,
					value: 1
				},
				{
					name: "6 hours",
					type: 4,
					value: 6
				},
				{
					name: "12 hours",
					type: 4,
					value: 12
				},
				{
					name: "1 day",
					type: 4,
					value: 24
				},
				{
					name: "2 days",
					type: 4,
					value: 48
				},
				{
					name: "1 week",
					type: 4,
					value: 168
				},
				{
					name: "2 weeks",
					type: 4,
					value: 336
				},
				{
					name: "1 month",
					type: 4,
					value: 730
				},
				{
					name: "1 year",
					type: 4,
					value: 8760
				},
				{
					name: "Indefinite",
					type: 4,
					value: 0
				},
			]
		}
	],
	timeout: 3000,
	category: 'mod',
	run: async (interaction, client) => {
		const member = interaction.options.getMember('user');
		if(member === null) return await interaction.reply({ content: 'This is not a valid user' })
		const days = interaction.options.getInteger('delete_messages') || 0;
		const time = interaction.options.getInteger("time") || 0
		var reason = interaction.options.getString('reason') || 0
		if (member.id === interaction.user.id) {
			return interaction.reply({ content: ":x: You can't ban yourself!", ephemeral: true });
		}
		if (member.id === client.user.id) {
			return interaction.reply({ content: ":x: You can't ban me!", ephemeral: true });
		}

		if(!interaction.guild.me.permissions.has(PermissionFlagsBits.BanMembers)) return await interaction.reply({ content: `❌ I don't have the permission to ban` });
		const botRole = interaction.guild.me.roles.highest.position;
		const role = member.roles.highest.position;
		const authorRole = interaction.member.roles.highest.position;
		if (authorRole <= role && interaction.user.id !== await interaction.guild.ownerId) {
			return interaction.reply({ content: `:x: **You can\'t ban ${member.user.username}**`, ephemeral: true });
		}
		if (botRole <= role) {
			return interaction.reply({ content: `:x: **I can\'t ban ${member.user.username}**`, ephemeral: true });
		}
		try {
			const row = new ActionRowBuilder().addComponents(
				new SelectMenuBuilder()
					.setCustomId('reason')
					.setPlaceholder('Select a reason')
					.addOptions(
						{
							label: 'Spamming',
							value: 'Spamming',
						},
						{
							label: 'Avdertising',
							value: 'Avdertising',
						},
						{
							label: 'Raider',
							value: 'Raider'
						},
						{
							label: 'Trolling',
							value: 'Trolling'
						},
						{
							label: 'Pedophilia',
							value: 'Pedophilia'
						},
						{
							label: "Underage",
							value: 'Underage'
						},
						{
							label: "Harassment",
							value: 'Harassment'
						}
					),
			);
			if(reason === 0){
			interaction.reply({ content: '**Select a reason:**', components: [row] });
			
				const filter = (i) => i.customId === 'reason' && i.user.id === interaction.user.id;
			const collector = interaction.channel.createMessageComponentCollector({ filter: filter });
			collector.on('collect', async (i) => {
				if (i.customId === 'reason') {
					reason = i.values[0]; // Get first option from select menu
					member.send(`You have been banned from ${interaction.guild.name} for the following reason: \`${reason}\``).then(() => {
						member.ban({ reason: `By: ${interaction.user.tag} | Reason: ${reason}`, days: days });
					})
					return interaction.editReply({ content: `✅ **${member} has been banned**`, components: [] });
				}
			});
		}
		else {
			member.send(`You have been banned from ${interaction.guild.name} for the following reason: \`${reason}\``).then(() => {
				member.ban({ reason: `By: ${interaction.user.tag} | Reason: ${reason}`, days: Math.round(time/24) });
			})
			return interaction.reply({ content: `✅ **${member} has been banned**`, components: [] });
		}
		} catch (e) {
			console.error(e);
			return interaction.reply({ content: 'Please check my permissions and role position' });
		}
	},
};
