const getDataK8s = require('../../utils/getDataK8s.js')
const { PermissionFlagsBits, PermissionsBitField } = require('discord.js')


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
		if(await new getDataK8s(interaction).isAlive() === false) return await interaction.reply({ content: new getDataK8s(interaction).timeout() })
		if(!interaction.guild.me.permissions.has(PermissionFlagsBits.ManageChannels)) return await interaction.reply('I don\'t have permissions to manage channels')
		const ___ = await new getDataK8s(interaction).k8s()
		const default_role = ___.data.spec.defaultrole || interaction.guildId
		const channel = interaction.options.getChannel('channel') || interaction.channel;
		const isUnlocked = channel.permissionOverwrites.cache
			.find((r) => r.id === default_role)
			.deny.has(PermissionFlagsBits.SendMessages);
		if (!isUnlocked) {
			return interaction.reply({ content: `**:x: #${channel.name} already unlocked.**` });
		}
		await channel.permissionOverwrites.edit(default_role, { [PermissionFlagsBits.SendMessages]: null });
		interaction.reply({ content: `**🔒 ${channel} has been unlocked.**` });
	},
};