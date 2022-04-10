const { EmbedBuilder } = require("discord.js");

function createEmbed(color, title, description){
    const embed = new EmbedBuilder()
	        .setColor(color | '#0099ff')
	        .setTitle(`${title}`)
	        .setDescription(`${description}`)
	        .setTimestamp()
	        .setFooter({ text: 'Coded by Kamigen#0001', iconURL: 'https://cdn.discordapp.com/avatars/385441179069579265/864fa98fa71abc1258b21435440e097d.png?size=64' });

            return embed;
}
module.exports = createEmbed