const Timeout = new Set()
const { EmbedBuilder } = require('discord.js');
const humanizeDuration = require("humanize-duration");
const config = require('../../config.json');
const createEmbed = require('../../utils/createEmbed.js')
const insertDataK8s = require('../../utils/insertDataK8s.js');

module.exports = async(client, interaction) => {
	/*const guildLanguages = require('../../utils/languages/config/languages.json')
	const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
	const language = require(`../../utils/languages/${guildLanguage}.js`);
	if(interaction.isModalSubmit()){
		let response = parseInt(interaction.fields.getTextInputValue('config_raid_tres'))
		console.log(response)
		if(response < 1 || response > 20){
			return await interaction.reply({ content: 'Please enter an input in the range of 1 to 20' })
		}
		let data = {
			raidmode: interaction.fields.getTextInputValue('config_raid_tresh')
		}
                let __ = await new insertDataK8s(interaction, data).k8s()
                            var config = createEmbed('#0099ff',
                                `${language("_config_raid_raidmode")}`,
                                `${language("_config_success", __.lapse)}`)
			try {
			return await interaction.reply({ embeds: [config] })
			} catch {
				return await interaction.reply({ content: 'Uh oh, unexpected error happened' })
			}
	}*/
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
		if (!client.slash.has(interaction.commandName)) return;
		if (!interaction.guild) return;
		const command = client.slash.get(interaction.commandName)
		try {
			if (command.timeout) {
				if (Timeout.has(`${interaction.user.id}${command.name}`)) {
					const embed = new EmbedBuilder()
					.setTitle('You are in timeout!')
					.setDescription(`You need to wait **${humanizeDuration(command.timeout, { round: true })}** to use command again`)
					.setColor('#ff0000')
					return interaction.reply({ embeds: [embed], ephemeral: true })
				}
			}
			if (command.permissions) {
				if (!interaction.member.permissions.has(command.permissions)) {
					const embed = new EmbedBuilder()
					.setTitle('Missing Permission')
					.setDescription(`:x: You need \`${command.permissions}\` to use this command`)
					.setColor('#ff0000')
					.setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
					.setTimestamp()
					return interaction.reply({ embeds: [embed], ephemeral: true })
				}
			}
			if (command.devs) {
				if (!config.ownersID.includes(interaction.user.id)) {
					return interaction.reply({ content: ":x: Only devs can use this command", ephemeral: true });
				}
			}
			if (command.ownerOnly) {
				if (interaction.user.id !== interaction.guild.ownerId) {
					return interaction.reply({ content: "Only ownership of this server can use this command", ephemeral: true })
				}
			}
			command.run(interaction, client);
			Timeout.add(`${interaction.user.id}${command.name}`)
			setTimeout(() => {
				Timeout.delete(`${interaction.user.id}${command.name}`)
			}, command.timeout);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });
		}
	}
	if (interaction.isSelectMenu()) {
		const commandsCustomIDs = [
			"fun_cmd",
			"general_cmd",
			"mod_cmd"
		];
		if (commandsCustomIDs.includes(interaction.customId)) {
			const selectedValues = interaction.values;
			const command = client.slash.find(r => r.name === selectedValues[0]);
			if (selectedValues.includes(command.name)) {
				const embed = new EmbedBuilder()
				.setColor('Random')
				.setFooter({ text: `Requested by ${interaction.user.tag}`, icon_url: interaction.user.displayAvatarURL({ dynamic: true })})
				if (command.name) {
					embed.setTitle(`Command: ${command.name}`)
				}
				if (command.description) {
					embed.setDescription(command.description)
				}
				if (command.example) {
					embed.addFields({ name: 'Examples:', value: command.example.replaceAll('<@>', `<@${interaction.user.id}>`)})
				}
				if (command.usage) {
					embed.addFields({ name: 'Usage:', value: command.usage})
				}
				if (command.timeout) {
					embed.addFields({ name: 'Timeout:', value: humanizeDuration(command.timeout, { round: true })})
				}
				interaction.reply({
					embeds: [embed],
					ephemeral: true
				});
			}
		}
	}
} 