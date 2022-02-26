const db = require("quick.db");
const argsList = ['raidmode']
const arguments_raidmode = ['']
const createEmbed = require('../utils/createEmbed.js')
const { Client, Intents, Collection, MessageEmbed } = require("discord.js");

    const client = new Client({autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/});

exports.name = "config"; 
exports.description = "Configure the Raid Detection for your server"
exports.run = (message, args, prefix) => {
    console.log(message)
    switch(true){
        case (args[1] === 'raidmode'): {
            console.log(args)
            if(args[2]){
                    if(args[2].match(/^[0-9]+$/)){
                        var before = (new Date().getTime()).toFixed(2);
                        (async () => {
                        if(!await db.get(message.guild.id)){
                            await db.set(message.guild.id, {
                                raidmode: args[2],
                            })
                        }
                        else {
                            (async () => {
                                await db.set(message.guild.id, {
                                    raidmode: args[2],
                                })
                            })();
                            
                        }
                        
                        
                    })().then(() => {
                        var after = (new Date().getTime()).toFixed(2)
                        var lapsedTime = after - before
                        var config = createEmbed('#0099ff',
                '⚙️ Raidmode Configuration',
                `✅ Operation Completed in ${lapsedTime} ms`)
                message.reply({ embeds: [config] })
                    })
                    }
                    else {
                        var config = createEmbed('#0099ff',
                '⚙️ Raidmode Configuration',
                `Invalid Syntax: ${args[2]} is not an integer`)
                message.reply({ embeds: [config] })
                    }
                }
                else {
                    var configuration
                    (async () => {
                        try {
                            if(!await db.get(message.guild.id)){
                                configuration = '```No configuration detected for this server```'
                                console.log(configuration)
                            }
                            else {
                                configuration = '```' + JSON.stringify(await db.get(message.guild.id)) + '```'
                                
                            }
                        } catch (err) { console.log(err) }
                    })().then(() => {
                        var config = createEmbed('#0099ff',
                '⚙️ Raidmode Configuration',
                `Current configuration:\n${configuration}\nSyntax: ${prefix}${exports.name} raidmode [ number ] => Number of joins in 10 seconds before triggering the Anti-Raid Mode`)
                message.reply({ embeds: [config] })    
                    })
                    
                }

        }
        
        break;
        default: {
            var config = createEmbed('#0099ff', 
            '⚙️ Config', 
            
            `Bot Configuration\n
            Command: ${prefix}${exports.name}\n\n
            Arguments: ${argsList} `)
            
            message.reply({ embeds: [config] })
        }
    }

}

