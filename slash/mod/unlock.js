const getDataK8s = require('../../utils/getDataK8s.js')


module.exports = {
	name: 'unlock',
	permissions: 'MANAGE_CHANNELS',
	description: '🔒 Undisables role from sending messages in specific channel',
	options: [
		{
			name: 'all',
			description: 'Unock all channels',
			type: 1,
			
		},
		{
			name: 'channel',
			description: 'Channel to unlock',
			type: 1,
			options: [
				{
				name: 'channel',
				description: 'Channel to unlock',
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
		const isUnlocked = channel.permissionOverwrites.cache
			.find((r) => r.id === default_role)
			.deny.has('SEND_MESSAGES');
		if (!isUnlocked) {
			return interaction.reply({ content: `**:x: #${channel.name} already unlocked.**` });
		}
		await channel.permissionOverwrites.edit(default_role, { SEND_MESSAGES: true });
		interaction.reply({ content: `**🔒 ${channel} has been unlocked.**` });
	},
};