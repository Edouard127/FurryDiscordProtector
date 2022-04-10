module.exports = {
	name: 'badges',
	description: 'Get list of members with badges',
	options: [
		{
			name: 'badge',
			description: 'Badge you want to get list of members for',
			type: 3,
			required: true,
			choices: [
				{
					name: 'Discord Staff',
					value: 'staff',
				},
				{
					name: 'Discord Partnerd',
					value: 'partnerd',
				},
				{
					name: 'Hypesquad Events',
					value: 'HYPESQUAD_EVENTS',
				},
				{
					name: 'Bug Hunter Level 1',
					value: 'BUGHUNTER_LEVEL_1',
				},
				{
					name: 'House Bravery',
					value: 'HOUSE_BRAVERY',
				},
				{
					name: 'Early Supporter',
					value: 'EARLY_SUPPORTER',
				},
				{
					name: 'Bug Hunter Level 2',
					value: 'BUGHUNTER_LEVEL_2',
				},
				{
					name: 'Verified Bot',
					value: 'VERIFIED_BOT',
				},
				{
					name: 'Early Verified Bot Developer',
					value: 'EARLY_VERIFIED_BOT_DEVELOPER',
				},
				{
					name: 'Discord Certified Moderator',
					value: 'DISCORD_CERTIFIED_MODERATOR',
				},
			],
		},
		{
			name: 'role',
			description: 'Get list of all members with this badge',
			type: 8,
		},
	],
	category: 'general',
	run: async (interaction) => {
		const badges = interaction.options.getString('badge');
		const role = interaction.options.getRole('role');
		if (badges === 'staff') {
			const getMemberWithRole = role?.members.filter((r) => r.user.flags?.has('Staff'));
			const staffBadges = (await interaction.guild.members.fetch()).filter((r) =>
				r.user.flags?.has('Staff'),
			);
			if (staffBadges.size === 0) {
				return interaction.reply({
					content: ':x: No one in this server has `Discord Staff`',
				});
			}
			if (role) {
				const getFilterdBadges = getMemberWithRole.map((r) => r.user).join('\n');
				return interaction.reply({
					content: `Total Members with role **${role.name}** has \`Discord Staff\` is **${getMemberWithRole.size}**\n\n${getFilterdBadges}`,
				});
			}
			if (staffBadges) {
				const filterBadges = staffBadges.map((r) => r.user).join('\n');
				interaction.reply({
					content: `There are **${staffBadges.size}** members with this badge\n\n${filterBadges}`,
				});
			}
		}
		if (badges === 'partnerd') {
			const getMemberWithRole = role?.members.filter((r) => r.user.flags?.has('Partner'));
			const partnerdBadge = (await interaction.guild.members.fetch()).filter((r) =>
				r.user.flags?.has('Partner'),
			);
			if (partnerdBadge.size === 0) {
				return interaction.reply({
					content: ':x: No one in this server has `Partnerd Badge`',
				});
			}
			if (role) {
				const getFilterdBadges = getMemberWithRole.map((r) => r.user).join('\n');
				return interaction.reply({
					content: `Total Members with role **${role.name}** has \`Partnerd Badge\` is **${getMemberWithRole.size}**\n\n${getFilterdBadges}`,
				});
			}
			if (partnerdBadge) {
				const filterBadges = partnerdBadge.map((r) => r.user).join('\n');
				interaction.reply({
					content: `There are **${partnerdBadge.size}** members with this badge\n\n${filterBadges}`,
				});
			}
		}
		if (badges === 'HYPESQUAD_EVENTS') {
			const getMemberWithRole = role?.members.filter((r) => r.user.flags?.has('Hypesquad'));
			const hypeSquadBadge = (await interaction.guild.members.fetch()).filter((r) =>
				r.user.flags?.has('Hypesquad'),
			);
			if (hypeSquadBadge.size === 0) {
				return interaction.reply({
					content: ':x: No one in this server has `HypeSquad Events`',
				});
			}
			if (role) {
				const getFilterdBadges = getMemberWithRole.map((r) => r.user).join('\n');
				return interaction.reply({
					content: `Total Members with role **${role.name}** has \`${badges.replaceAll('_', ' ')}\` is **${
						getMemberWithRole.size
					}**\n\n${getFilterdBadges}`,
				});
			}
			if (hypeSquadBadge) {
				const filterBadges = hypeSquadBadge.map((r) => r.user).join('\n');
				interaction.reply({
					content: `There are **${hypeSquadBadge.size}** members with this badge\n\n${filterBadges}`,
				});
			}
		}
		if (badges === 'BUGHUNTER_LEVEL_1') {
			const getMemberWithRole = role?.members.filter((r) => r.user.flags?.has('BugHunterLevel1'));
			const bughunter1 = (await interaction.guild.members.fetch()).filter((r) =>
				r.user.flags?.has('BugHunterLevel1'),
			);
			if (bughunter1.size === 0) {
				return interaction.reply({
					content: ':x: No one in this server has `Bug Hunter Level 1`',
				});
			}
			if (role) {
				const getFilterdBadges = getMemberWithRole.map((r) => r.user).join('\n');
				return interaction.reply({
					content: `Total Members with role **${role.name}** has \`${badges.replaceAll('_', ' ')}\` is **${
						getMemberWithRole.size
					}**\n\n${getFilterdBadges}`,
				});
			}
			if (bughunter1) {
				const filterBadges = bughunter1.map((r) => r.user).join('\n');
				interaction.reply({
					content: `There are **${bughunter1.size}** members with this badge\n\n${filterBadges}`,
				});
			}
		}
		if (badges === 'HOUSE_BRAVERY') {
			const houseBravery = (await interaction.guild.members.fetch()).filter((r) => r.user.flags?.has('HypeSquadOnlineHouse1'));
			if (houseBravery.size === 0) {
				return interaction.reply({
					content: ':x: No one in this server has `House Bravery`',
				});
			}
			if (role) {
				const getFilterdBadges = getMemberWithRole.map((r) => r.user).join('\n');
				return interaction.reply({
					content: `Total Members with role **${role.name}** has \`${badges.replaceAll('_', ' ')}\` is **${
						getMemberWithRole.size
					}**\n\n${getFilterdBadges}`,
				});
			}
			if (houseBravery) {
				const filterBadges = houseBravery.map((r) => r.user).join('\n');
				interaction.reply({
					content: `There are **${hypeSquadBadge.size}** members with this badge\n\n${filterBadges}`,
				});
			}
		}
		if (badges === 'EARLY_SUPPORTER') {
			const earlyBadge = (await interaction.guild.members.fetch()).filter((r) => r.user.flags?.has('PremiumEarlySupporter'));
			if (earlyBadge.size === 0) {
				return interaction.reply({
					content: ':x: No one in this server has `Early Supporter`',
				});
			}
			if (role) {
				const getFilterdBadges = getMemberWithRole.map((r) => r.user).join('\n');
				return interaction.reply({
					content: `Total Members with role **${role.name}** has \`${badges.replaceAll('_', ' ')}\` is **${
						getMemberWithRole.size
					}**\n\n${getFilterdBadges}`,
				});
			}
			if (earlyBadge) {
				const filterBadges = earlyBadge.map((r) => r.user).join('\n');
				interaction.reply({
					content: `There are **${earlyBadge.size}** members with this badge\n\n${filterBadges}`,
				});
			}
		}
		if (badges === 'BUGHUNTER_LEVEL_2') {
			const bughunter2 = (await interaction.guild.members.fetch()).filter((r) =>
				r.user.flags?.has('BugHunterLevel2'),
			);
			if (bughunter2.size === 0) {
				return interaction.reply({
					content: ':x: No one in this server has `Bug Hunter Level 2`',
				});
			}
			if (role) {
				const getFilterdBadges = getMemberWithRole.map((r) => r.user).join('\n');
				return interaction.reply({
					content: `Total Members with role **${role.name}** has \`${badges.replaceAll('_', ' ')}\` is **${
						getMemberWithRole.size
					}**\n\n${getFilterdBadges}`,
				});
			}
			if (bughunter2) {
				const filterBadges = (await interaction.guild.members.fetch())
					.filter((r) => r.user.flags?.has('BugHunterLevel2'))
					.map((r) => r.user)
					.join('\n');
				interaction.reply({
					content: `There are **${bughunter2.size}** members with this badge\n\n${filterBadges}`,
				});
			}
		}
		if (badges === 'VERIFIED_BOT') {
			const verifiedBotBadge = (await interaction.guild.members.fetch()).filter((r) =>
				r.user.flags?.has('VerifiedBot'),
			);
			if (verifiedBotBadge.size === 0) {
				return interaction.reply({
					content: ':x: No one in this server has `Verified Bot`',
				});
			}
			if (role) {
				const getFilterdBadges = getMemberWithRole.map((r) => r.user).join('\n');
				return interaction.reply({
					content: `Total Members with role **${role.name}** has \`${badges.replaceAll('_', ' ')}\` is **${
						getMemberWithRole.size
					}**\n\n${getFilterdBadges}`,
				});
			}
			if (verifiedBotBadge) {
				const filterBadges = verifiedBotBadge.map((r) => r.user).join('\n');
				interaction.reply({
					content: `There are **${verifiedBotBadge.size}** members with this badge\n\n${filterBadges}`,
				});
			}
		}
		if (badges === 'EARLY_VERIFIED_BOT_DEVELOPER') {
			const getMemberWithRole = role?.members.filter((r) => r.user.flags?.has('VerifiedDeveloper'));
			const devsBadges = (await interaction.guild.members.fetch()).filter((r) =>
				r.user.flags?.has('VerifiedDeveloper'),
			);
			if (devsBadges.size === 0) {
				return interaction.reply({
					content: ':x: No one in this server has `Early Verified Bot Developer`',
				});
			}
			if (role) {
				const getFilterdBadges = getMemberWithRole.map((r) => r.user).join('\n');
				return interaction.reply({
					content: `Total Members with role **${role.name}** has \`${badges.replaceAll('_', ' ')}\` is **${
						getMemberWithRole.size
					}**\n\n${getFilterdBadges}`,
				});
			}
			if (devsBadges) {
				const filterBadges = devsBadges.map((r) => r.user).join('\n');
				interaction.reply({
					content: `There are **${devsBadges.size}** members with this badge\n\n${filterBadges}`,
				});
			}
		}
		if (badges === 'DISCORD_CERTIFIED_MODERATOR') {
			const getMemberWithRole = role?.members.filter((r) => r.user.flags?.has('CertifiedModerator'));
			const moderatorBadge = (await interaction.guild.members.fetch()).filter((r) =>
				r.user.flags?.has('CertifiedModerator'),
			);
			if (moderatorBadge.size === 0) {
				return interaction.reply({
					content: ':x: No one in this server has `Discord Certified Moderator`',
				});
			}
			if (role) {
				const getFilterdBadges = getMemberWithRole.map((r) => r.user).join('\n');
				return interaction.reply({
					content: `Total Members with role **${role.name}** has \`${badges.replaceAll('_', ' ')}\` is **${
						getMemberWithRole.size
					}**\n\n${getFilterdBadges}`,
				});
			}
			if (moderatorBadge) {
				const filterBadges = moderatorBadge.map((r) => r.user).join('\n');
				interaction.reply({
					content: `There are **${moderatorBadge.size}** members with this badge\n\n${filterBadges}`,
				});
			}
		}
	},
};
