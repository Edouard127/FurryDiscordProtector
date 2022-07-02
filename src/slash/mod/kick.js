const { PermissionFlagsBits, ActionRowBuilder, SelectMenuBuilder }= require('discord.js');
module.exports = {
	name: 'kick',
	description: 'kicks a member.',
	permissions: 'KICK_MEMBERS',
	options: [
		{
			name: 'user',
			description: 'user to kick',
			type: 6,
			required: true,
		},
		{
			name: 'reason',
			description: 'reason for kick',
			type: 3,
		},
	],
	timeout: 3000,
	category: 'mod',
		run: async (interaction, client) => {
			const member = interaction.options.getMember('user');
			if(member === null) return await interaction.reply({ content: 'This is not a valid user' })
			var reason = interaction.options.getString('reason') || 0
			if (member.id === interaction.user.id) {
				return interaction.reply({ content: ":x: You can't kick yourself!", ephemeral: true });
			}
			if (member.id === client.user.id) {
				return interaction.reply({ content: ":x: You can't kick me!", ephemeral: true });
			}
			if (member.banable === false || member.user.bot) {
				return interaction.reply({ content: ":x: I can't kick this user", ephemeral: true });
			}
			//if(member.user.bot) return await interaction.reply({ content: ":x: I can't message this bot", ephemeral: true });

			if(!interaction.guild.me.permissions.has(PermissionFlagsBits.KickMembers)) return await interaction.reply({ content: `❌ I don't have the permission to kick` });
			const botRole = interaction.guild.me.roles.highest.position;
			const role = member.roles.highest.position;
			const authorRole = interaction.member.roles.highest.position;
			if (authorRole <= role && interaction.user.id !== await interaction.guild.ownerId) {
				return interaction.reply({ content: `:x: **You can\'t kick ${member.user.username}**`, ephemeral: true });
			}
			if (botRole <= role) {
				return interaction.reply({ content: `:x: **I can\'t kick ${member.user.username}**`, ephemeral: true });
			}
			try {
				const row = new ActionRowBuilder().addComponents(
					new SelectMenuBuilder()
						.setCustomId('reason')
						.setPlaceholder('Select a reason')
						.addOptions(
							{
								label: 'Spaming',
								value: 'spaming',
							},
							{
								label: 'Adv',
								value: 'adv',
							},
						),
				);
				/*if(reason === 0){
				interaction.reply({ content: '**Select a reason:**', components: [row] });
				
					const filter = (i) => i.customId === 'reason' && i.user.id === interaction.user.id;
				const collector = interaction.channel.createMessageComponentCollector({ filter: filter });
				collector.on('collect', async (i) => {
					if (i.customId === 'reason') {
						reason = i.values[0]; // Get first option from select menu
						member.send(`You have been kicked from ${interaction.guild.name} for the following reason: \`${reason}\``).then(() => {
							member.kick(reason);
						})
						return interaction.editReply({ content: `✅ **${member} has been kicked**`, components: [] });
					}
				});
			}
			else {*/
				member.send(`You have been kicked from ${interaction.guild.name} for the following reason: \`${reason}\``).then(() => {
					member.kick(reason);
				})
				return interaction.reply({ content: `✅ **${member} has been kicked**`, components: [] });
			//}
			} catch (e) {
				console.error(e);
				return interaction.reply({ content: 'Please check my permissions and role position' });
			}
		},
	};
	
