const { PermissionsBitField } = require('discord.js');

module.exports = {
	name: 'clear',
	permissions: 'MANAGE_MESSAGES',
	description: 'Cleans messages from a channel',
	options: [
		{
			name: 'number_of_messages',
			description: 'number of messages to clean',
			min_value: 1,
			max_value: 100,
			type: 10,
			required: true,
		},
		{
			name: 'user',
			description: 'User to clear messsages for',
			type: 6,
		},
		{
			name: 'role',
			description: 'Clear messages from role',
			type: 8,
		},
	],
	timeout: 5000,
	category: 'mod',
	run: async (interaction, client) => {
		function sleep(ms) {
			return new Promise((resolve) => {
			  setTimeout(resolve, ms);
			});
		  }
		if(!interaction.guild.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({ content: `❌ I don't have the permission to manage messages` });
		if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({ content: `❌ You don't have the permission to manage messages` });
		let deleteAmount = interaction.options.getNumber('number_of_messages');
		const user = interaction.options.getUser('user');
		const role = interaction.options.getRole('role');
		if (deleteAmount > 100) {
			deleteAmount = 100;
		}
		const fetchedMessage = await interaction.channel.messages.fetch({ limit: deleteAmount });
		if (user) {
			fetchedMessage.filter((r) => r.author.id === user.id).forEach((msg) => msg.delete());
			interaction.reply({ content: `✅ Successfully deleted ${fetchedMessage.size} messages` })
			await sleep(3000)
			interaction.deleteReply()
		}
		if (role) {
			fetchedMessage.filter((r) => r.member.roles.cache.has(role.id)).forEach((msg) => msg.delete());
			interaction.reply({ content: `✅ Successfully deleted ${fetchedMessage.size} messages` })
			await sleep(3000)
			interaction.deleteReply()
		}

	},
};
