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
  client.commands.set(commandName, command);
  
  console.log(`Successfully loaded ${commandName}`);
}
client.on('messageCreate', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    switch(true){
        case (message.content.startsWith(prefix + 'ping') && !message.author.bot && message.channel.type !== "dm"): {
            try {
                let cmd = client.commands.get(message.content.replace(prefix, ''))
                //console.log(message.content.replace(prefix, '') + ".js");
                if (cmd) cmd.run(message, prefix)
                
            } catch (err) {
                console.log(err)
            }
        }
        break;
        case (message.content.startsWith(prefix + 'server') && !message.author.bot && message.channel.type !== "dm"): {
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
    }
})
var c = 0
var members = []
var n = true
var raidmode = false
client.on('guildMemberAdd', member => {
    if(!raidmode){
    

            c++
            members.push([member])
            if(c >= 2){
                console.log("More than 2 members added")
                raidmode = true
            }
            if(n)
            setTimeout(() => {
                c = 0
                console.log("Cleared")
            }, 20000) 
            n = false
        }
        else {
            member.send(`Hello ${member.user.username}, this server is currently under attack, please try again later`).then(member.kick())
            console.log(members)
        }
    // other stuff ...
    
// other stuff ...
    
})

client.login(process.env.TOKEN).then(() => {
    fullMembersList = []
    function removeDuplicates(arr) {
        let unique_array = []
        for (let i = 0; i < arr.length; i++) {
          if (unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i])
          }
        }
        return unique_array
      }
    client.guilds.cache.forEach(guild => {
        guild.members.cache.forEach(member => {
          var userID = member.id;
          fullMembersList.push(userID)
        })
      })
      var membersList = removeDuplicates(fullMembersList);
    var memberCount = Object.keys(membersList).length;
    console.log(`\n ${client.user.username}@Bot [Started] ${new Date()}
    --------------------------------------\n Utilisateurs: ${memberCount}\n Servers: ${client.guilds.cache.size}\n --------------------------------------\n`);
    
    
})
