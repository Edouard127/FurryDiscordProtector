const { PermissionFlagsBits } = require('discord.js')

module.exports = {
	name: 'unban',
	permissions: 'BAN_MEMBERS',
	description: 'unban user from this server',
	options: [
		{
			name: 'all',
			description: 'unban all users from this server',
			type: 1,
		},
		{
			name: 'id',
			description: 'user to unban',
			type: 1,
			options: [
				{
					name: 'user_id',
					description: 'user ID to unban',
					type: 4,
					required: true,
				}
			]
		},
	],
	timeout: 3000,
	category: 'mod',
	run: async (interaction) => {
		if(!interaction.guild.me.permissions.has(PermissionFlagsBits.BanMembers)) return await interaction.reply({ content: `❌ I don't have the permission to unban` });
		if(!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return await interaction.reply({ content: `❌ You don't have the permission to unban` });
		const command = interaction.options.getSubcommand()
		const input = interaction.options.getInteger('user_id');
		if (command === 'all') {
			const fetchBans = await interaction.guild.bans.fetch();
			if (fetchBans.size === 0) {
				return interaction.reply('There are no banned users.');
			}
			const usersBanned = fetchBans.map((r) => r.user.id);
			usersBanned.forEach((user) => {
				interaction.guild.bans.remove(user, `By: ${interaction.user.tag} unban all`);
			});
			return interaction.reply(`✅ **${fetchBans.size}** members being unbanned`);
		}
		if(command === 'id'){
		try {
			if(!interaction.guild.bans.resolve(input)) return await interaction.reply('This user is not banned')
			const user = await interaction.guild.bans.remove(input, `By: ${interaction.user.tag}`);
			interaction.reply({ content: `✅ **@${user.username} has been unbanned**` });
		} catch (e) {
			console.error(e);
			return interaction.reply({ content: `There was an error trying to unban.` });
		}
	}
	},
};
