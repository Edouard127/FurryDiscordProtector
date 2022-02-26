const { Client, Intents, Collection } = require("discord.js");
const fs = require('fs');
const db = require("quick.db");
const dir = './scripts/';
const config = require("./config.json");
const prefix = config.prefix

const client = new Client({autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/});
client.commands = new Collection();
// Read the Commands Directory, and filter the files that end with .js
const commands = fs.readdirSync(dir).filter(file => file.endsWith(".js"));
// Loop over the Command files
for (const file of commands) {
  // Get the command name from splitting the file
  const commandName = file.split(".")[0];
  // Require the file
  const command = require(`${dir}${file}`);

  console.log(`Attempting to load command ${commandName}`);
  // Set the command to a collection
  client.commands.set(commandName, command, command.description);
  
  console.log(`Successfully loaded ${commandName}`);
}
client.on('messageCreate', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    switch(true){
        case (args[0] === 'ping' && !message.author.bot && message.channel.type !== "dm"): {
            try {
                let cmd = client.commands.get(message.content.replace(prefix, ''))
                //console.log(message.content.replace(prefix, '') + ".js");
                if (cmd) cmd.run(message, prefix)
                
            } catch (err) {
                console.log(err)
            }
        }
        break;
        case (args[0] ===  'server' && !message.author.bot && message.channel.type !== "dm"): {
            try {
                let cmd = client.commands.get(message.content.replace(prefix, ''))
                //console.log(message.content.replace(prefix, '') + ".js");
                if (cmd) cmd.run(message, prefix)
                
            } catch (err) {
                console.log(err)
            }
        }
        break;
        case (args[0] === 'config' && !message.author.bot && message.channel.type !== "dm"): {
            try {
                
                let cmd = client.commands.get(args[0])
                //console.log(message.content.replace(prefix, '') + ".js");
                var p = prefix
                if (cmd) cmd.run(message, args, p)
                
            } catch (err) {
                console.log(err)
            }
        }
        break;
        case (args[0] === 'help' && !message.author.bot && message.channel.type !== "dm"): {
                let cmd = client.commands.get(args[0])
                //console.log(message.content.replace(prefix, '') + ".js");
                if (cmd) cmd.run(message, args, client, prefix)

        }
    }
})

var c = 0
var raidmode = false
var threshold = {}
var c = {}
client.on('guildMemberAdd', member => {
    (async () => {
        if(!await db.get(`${member.guild.id}.raidmode.raidmode`)){
            
            threshold = 5
        }
        else {
            
            threshold[member.guild.id] = JSON.stringify(await db.get(`${member.guild.id}.raidmode.raidmode`)).replace(/['"]+/g, '')
            console.log(threshold[member.guild.id])
            
        }
    })().then(() => {
        if(!raidmode){
            var canClear = true

        
                if(!c[member.guild.id]){
                    c[member.guild.id] = { count: 1 }
                    //console.log(c)
                }
                else {
                    c[member.guild.id].count++
                    //console.log(c)
                }
                
                
                
                if(c[member.guild.id].count >= threshold[member.guild.id]){
                    
                    raidmode = true
                }
                if(canClear){
                setTimeout(() => {
                    
                    canClear = false
                    
                }, 10000, canClear = true, c[member.guild.id].count = 0)
            }
            }
            else {
                member.send(`Hello ${member.user.username}, this server is currently under attack, please try again later`).then(member.kick())
                console.log(members)
            }
    })
    
    
})

var memberCount = 0
client.login(process.env.TOKEN).then(() => {
    client.on('ready', () => {
        client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} servers to protect`, type: 'WATCHING'}]});
        client.user.setStatus('dnd');
        client.guilds.cache.map(guild => memberCount=+guild.memberCount)
        console.log(`\n ${client.user.username}@Bot [Started] ${new Date()}
      --------------------------------------\n Users: ${memberCount}\n Servers: ${client.guilds.cache.size}\n --------------------------------------\n`) 
    })
       
})