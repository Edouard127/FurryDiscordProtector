const config = require('../../config.json');
const Discord = require('discord.js')
const slash = require('../../slash')

module.exports = async(client, guild) => {
    client.user.setActivity(`${client.guilds.cache.size} servers to protect`, { type: 'WATCHING' });
        slash(client)
        /*let ownerid = guild.ownerId
        let owner = guild.members.fetch(ownerid).then((owner) => {
            let config = createEmbed('#0099ff', 'Error', 'I need the permission \```application.commands\``` to work properly')
            owner.send({ embeds: [config] })
        })*/
}