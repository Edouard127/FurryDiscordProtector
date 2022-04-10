const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const humanizeDuration = require('humanize-duration');

module.exports = {
	name: 'role-info',
	permissions: 'MANAGE_ROLES',
	description: 'Display info about role',
	options: [
		{
			name: 'role',
			description: 'Role to display info about',
			type: 8,
			required: true,
		},
	],
	category: 'mod',
	run: async (interaction) => {
		const role = interaction.options.getRole('role');
		const distece = Date.now() - role.createdTimestamp;
		const embed = new EmbedBuilder()
			.setColor(role.hexColor)
			.setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})
			.addFields(
				{
					name: 'Role Name:',
					value: role.name,
				},
				{
					name: 'Role ID:',
					value: role.id,
				},
				{
					name: 'Role Color:',
					value: `${role.hexColor}`,
				},
				{
					name: 'Hosted?',
					value: role.hoist.toString(),
				},
				{
					name: 'Role Position:',
					value: role.position.toString(),
				},
				{
					name: 'Role Managed?',
					value: role.managed.toString(),
				},
				{
					name: 'Role Created At:',
					value: `\`${role.createdAt.toLocaleString()}\`\n**${humanizeDuration(distece, {
						largest: 2,
						round: true,
					})} ago**`,
				},
			);
		if (role.icon) {
			embed.addFields({ name: 'Role Icon:', value: `[Icon URL](${role.iconURL({ size: 4096, format: 'png' })})`});
			embed.setThumbnail(role.iconURL({ size: 4096, format: 'png' }));
			embed.setAuthor({ name: role.name, iconURL: role.iconURL({ size: 4096, format: 'png' })});
		}
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder().setCustomId('perms').setLabel('Role Permission')/*.setEmoji('🔑')*/.setStyle('Primary'),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('members')
					.setLabel('Members With This Role')
					.setStyle('Secondary'),
			);
		interaction.reply({ embeds: [embed], components: [row] });
		const filter = (i) => i.customId === 'perms' || ('members' && i.user.id === interaction.user.id);
		const collector = interaction.channel.createMessageComponentCollector({ filter });
		collector.on('collect', async (i) => {
			if (i.customId === 'perms') {
				await i.deferReply();
				const rolePerms = role.permissions.toArray().join('\n');
				return await i.editReply({
					content: `**${role.name} Role Permissions:**\`\`\`\n${rolePerms}\`\`\``,
					embeds: [],
					components: [],
				});
			}
			if (i.customId === 'members') {
				await i.deferReply();
				if ((await interaction.guild.members.fetch()).filter(m => m.roles.cache.has(role.id)).size == 0) {
					return i.editReply({ content: 'There are 0 members with this role', embeds: [], components: [] });
				}
				const roleMembers = (await interaction.guild.members.fetch()).filter(m => m.roles.cache.has(role.id)).map((r) => r.user.tag).join('\n');
				return await i.editReply({
					content: `**${role.name} Members ( ${role.members.size} )** :\n\`\`\`${roleMembers}\`\`\``,
					embeds: [],
					components: [],
				});
			}
		});
	},
};
