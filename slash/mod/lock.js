const getDataK8s = require('../../utils/getDataK8s.js')
const { PermissionsFlagBinding, PermissionFlagsBits } = require('discord.js')


module.exports = {
	name: 'lock',
	permissions: 'MANAGE_CHANNELS',
	description: '🔒 Disables role from sending messages in specific channel',
	options: [
		/*{
			name: 'all',
			description: 'Lock all channels',
			type: 1,
			
		},*/
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
		if(await new getDataK8s(interaction).isAlive() === false) return interaction.reply({ content: new getDataK8s(interaction).timeout() })
		if(!interaction.guild.me.permissions.has(PermissionFlagsBits.ManageChannels)) return await interaction.reply('I don\'t have permissions to manage channels')
		const ___ = await new getDataK8s(interaction).k8s()
		const default_role = ___.data.spec.defaultrole || interaction.guildId
		const channel = interaction.options.getChannel('channel') || interaction.channel;
		const isLocked = channel.permissionOverwrites.cache
			.find((r) => r.id === default_role)
			.deny.has(PermissionFlagsBits.SendMessages);
		if (isLocked) {
			return interaction.reply({ content: `**:x: #${channel.name} already locked.**` });
		}
		await channel.permissionOverwrites.edit(default_role, { [PermissionFlagsBits.SendMessages]: false });
		interaction.reply({ content: `**🔒 ${channel} has been locked.**` });
	},
};
