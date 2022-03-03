const { Client } = require("discord.js");
const client = new Client({ autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_VOICE_STATES",], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/ });
const { Player } = require("discord-player");
const player = new Player(client);
// add the trackStart event so when a song will be played this message will be sent
player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))

module.exports = {
    event: "interactionCreate",
    once: false,
    async run(interaction) {
        if (!interaction.isCommand()) return;
        const command = interaction.commandName
        switch(true){
            case (command === 'play'): {
                if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
                if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
                let query = interaction.options.get("song").value;
                let queue = player.createQueue(interaction.guild, {
                    metadata: {
                        channel: interaction.channel
                    }
                });
                
                
                try {
                    if (!queue.connection) await queue.connect(interaction.member.voice.channel);
                } catch {
                    queue.destroy();
                    return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
                }
        
                await interaction.deferReply();
                let track = await player.search(query, {
                    requestedBy: interaction.user
                }).then(x => x.tracks[0]);
                if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });
        
                queue.play(track);
                
            
        
                return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
            }
            //no break needed because of the return value on the previous statement
            case (command === 'pause'): {
                if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
                if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
                let queue = player.createQueue(interaction.guild, {
                    metadata: {
                        channel: interaction.channel
                    }
                });
                
                
                try {
                        await queue.setPaused(true)
                        await interaction.deferReply();
                        return await interaction.followUp({ content: `✅ | Track paused` });
                } catch (err){
                    console.log(err)
                    return await interaction.reply({ content: "Unknow Error Occurred", ephemeral: true });
                }
            }
            //no break needed because of the return value on the previous statement
            case (command === 'resume'): {
                if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
                if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
                let queue = player.createQueue(interaction.guild, {
                    metadata: {
                        channel: interaction.channel
                    }
                });
                
                
                try {
                        await queue.setPaused(false)
                        await interaction.deferReply();
                        return await interaction.followUp({ content: `✅ | Track resumed` });
                } catch (err){
                    console.log(err)
                    return await interaction.reply({ content: "Unknow Error Occurred", ephemeral: true });
                }
            }
        }
    }
}