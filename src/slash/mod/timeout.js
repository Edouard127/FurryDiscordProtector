const ms = require('ms');
const humanizeDuration = require('humanize-duration');
const { PermissionFlagsBits } = require('discord.js')

module.exports = {
	name: 'timeout',
	description: 'Timeout user from typing or joining voice channel or react to messages',
	options: [
		{
			name: 'user',
			description: 'User to timeout.',
			type: 6,
			required: true,
		},
		{
			name: 'time',
			description: 'Time for user to timeout. example: (1m, 1d, 1mo).',
			type: 3,
			required: true,
			choices: [
				{
					name: '30 seconds',
					type: 3,
					value: '30s'
				},
				{
					name: '5 minutes',
					type: 3,
					value: '5m'
				},
				{
					name: '10 minutes',
					type: 3,
					value: '10m'
				},
				{
					name: '1 hour',
					type: 3,
					value: '1h'
				},
				{
					name: '6 hours',
					type: 3,
					value: '6h'
				},
				{
					name: '12 hours',
					type: 3,
					value: '12h'
				},
				{
					name: '1 day',
					type: 3,
					value: '1d'
				},
				{
					name: '4 days',
					type: 3,
					value: '4d'
				},
				{
					name: '7 days',
					type: 3,
					value: '7d'
				},
			]
		},
	],
	permissions: 'MODERATE_MEMBERS',
	run: async (interaction, client) => {
		
		const member = interaction.options.getMember('user');
		const time = interaction.options.getString('time');
		const botRole = interaction.guild.me.roles.highest.position;
		const role = member.roles.highest.position;
		const authorRole = interaction.member.roles.highest.position;
		if(!interaction.guild.me.permissions.has(PermissionFlagsBits.ModerateMembers)) return await interaction.reply('I don\'t have permissions to moderate members')
		if (member.id === interaction.user.id) return interaction.reply({ content: ":x: You can't timeout yourself!", ephemeral: true });
		
		if (member.id === client.user.id) return interaction.reply({ content: ":x: You can't timeout me!", ephemeral: true });
		
		if(botRole <= role) return await interaction.reply({ content: `:x: I don't have permission to moderate this user`})
		if(authorRole <= role && interaction.user.id !== await interaction.guild.ownerId) return await interaction.reply({ content: `:x: You don't have permission to moderate this user`})
		if (member.permissions.has(PermissionFlagsBits.Administrator)) {
			return interaction
				.reply({
					content: "You can't timeout members with **Administrator** permission.",
					ephemeral: true,
				})
				.catch((e) => {});
		}
		await member.disableCommunicationUntil(Date.now() + ms(time), `By: ${interaction.user.tag}`).catch(console.error);
		return interaction.reply({
			content: `${member} has been timeout for **${humanizeDuration(ms(time), { round: true })}.**`,
		});
	},
};
