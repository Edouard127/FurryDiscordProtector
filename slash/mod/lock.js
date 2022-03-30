const getDataK8s = require('../../utils/getDataK8s.js')


module.exports = {
	name: 'lock',
	permissions: 'MANAGE_CHANNELS',
	description: '🔒 Disables role from sending messages in specific channel',
	options: [
		{
			name: 'all',
			description: 'Lock all channels',
			type: 1,
			
		},
		{
			name: 'channel',
			description: 'Channel to lock',
			type: 1,
			options: [
				{
				name: 'channel',
				description: 'Channel to lock',
				type: 7,
				channel_types: [0],
			}
		]
		},
	],
	timeout: 3000,
	category: 'mod',
	run: async (interaction) => {
		const ___ = await new getDataK8s(interaction).k8s()
		const default_role = ___.data.spec.defaultrole || interaction.guildId
		const channel = interaction.options.getChannel('channel') || interaction.channel;
		const isLocked = channel.permissionOverwrites.cache
			.find((r) => r.id === default_role)
			.deny.has('SEND_MESSAGES');
		if (isLocked) {
			return interaction.reply({ content: `**:x: #${channel.name} already locked.**` });
		}
		await channel.permissionOverwrites.edit(default_role, { SEND_MESSAGES: false });
		interaction.reply({ content: `**🔒 ${channel} has been locked.**` });
	},
};
