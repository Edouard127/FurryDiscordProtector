import { ActivityType, Client, Guild } from "discord.js";

export default async(client: Client, guild: Guild) => {
        if(client.user == null) return
        client.user.setActivity(`${client.guilds.cache.size} servers to protect`, { type: ActivityType.Watching });    
        /*let ownerid = guild.ownerId
        let owner = guild.members.fetch(ownerid).then((owner) => {
            let config = createEmbed('#0099ff', 'Error', 'I need the permission \```application.commands\``` to work properly')
            owner.send({ embeds: [config] })
        })*/
}