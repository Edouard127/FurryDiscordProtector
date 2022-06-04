const badges = { //see https://discord.com/developers/docs/resources/user#user-object-user-flags
	STAFF: 1 << 0, //Discord Employee
	PARTNER: 1 << 1, //Partnered Server Owner
	HYPESQUAD: 1 << 2, //HypeSquad Events Member
	BUGHUNTER_LEVEL_1: 1 << 3, //Bug Hunter Level 1
	HYPESQUAD_ONLINE_HOUSE_1: 1 << 6, //House Bravery Member
	HYPESQUAD_ONLINE_HOUSE_2: 1 << 7, //House Brilliance Member
	HYPESQUAD_ONLINE_HOUSE_3: 1 << 8, //House Balance Member
	PREMIUM_EARLY_SUPPORTER: 1 << 9, //Early Nitro Supporter
	TEAM_PSEUDO_USER: 1 << 10, //User is a (team) -> https://discord.com/developers/docs/topics/teams
	BUGHUNTER_LEVEL_2: 1 << 14, //Bug Hunter Level 2
	VERIFIED_BOT: 1 << 16, //Verified Bot
	VERIFIED_DEVELOPER: 1 << 17, //Verified Early Developer
	CERTIFIED_MODERATOR: 1 << 18, //Discord Certified Moderator
}

module.exports = {
	name: 'badges',
	description: 'Get list of members with badges',
	options: [
		{
			name: 'badge',
			description: 'Badge you want to get list of members for',
			type: 4,
			required: true,
			choices: [
				{
					name: 'Discord Staff',
					value: badges.STAFF,
				},
				{
					name: 'Discord Partnerd',
					value: badges.PARTNER
				},
				{
					name: 'Hypesquad Events',
					value: badges.HYPESQUAD
				},
				{
					name: 'Bug Hunter Level 1',
					value: badges.BUGHUNTER_LEVEL_1
				},
				{
					name: 'House Bravery',
					value: badges.HYPESQUAD_ONLINE_HOUSE_1
				},
				{
					name: 'House Brilliance',
					value: badges.HYPESQUAD_ONLINE_HOUSE_2
				},
				{
					name: 'House Balance',
					value: badges.HYPESQUAD_ONLINE_HOUSE_3
				},
				{
					name: 'Early Supporter',
					value: badges.PREMIUM_EARLY_SUPPORTER
				},
				{
					name: 'Bug Hunter Level 2',
					value: badges.BUGHUNTER_LEVEL_2
				},
				{
					name: 'Verified Bot',
					value: badges.VERIFIED_BOT
				},
				{
					name: 'Early Verified Bot Developer',
					value: badges.VERIFIED_DEVELOPER
				},
				{
					name: 'Discord Certified Moderator',
					value: badges.CERTIFIED_MODERATOR
				},
			],
		},
	],
	category: 'general',
	run: async (interaction) => {
		if (!interaction.isChatInputCommand()) return
		const badge = interaction.options.getInteger('badge');
		for(const [key, value] of Object.entries(badges)){
			if(value == badge) {
				var _badgeName = key
				break;
			}
		}		
		let _badge = (await interaction?.guild?.members.fetch()).filter((r) => r.user.flags?.has(badge));
		if (_badge.size < 1) return await interaction.reply({ content: `:x: No one in this server has \`${_badgeName}\`` })
		const badgeList = _badge.map((r) => r.user).join('');
		return await interaction.reply({ content: badgeList.length < 1001 ? `There are **${_badge.size}** members with this badge\n\n${badgeList}` : `There are **${_badge.size}** members with this badge`, allowedMentions: { "users": [] } });
	}
};
