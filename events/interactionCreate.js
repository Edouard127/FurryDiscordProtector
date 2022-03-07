const { Client, ClientVoiceManager } = require("discord.js");
const client = new Client({ autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_VOICE_STATES",], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/ });
const { Player } = require("discord-player");
const player = new Player(client);
// add the trackStart event so when a song will be played this message will be sent
player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))
player.on('connectionError', (queue, err) => queue.metadata.channel.send(`${err}`))

module.exports = {
    event: "interactionCreate",
    once: false,
    async run(interaction) {
        if (!interaction.isCommand()) return;
        const command = interaction.commandName
        switch (true) {
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

                track.playlist ? queue.addTracks(track) : queue.addTrack(track);
                if(!queue) return await interaction.followUp({ content: `❌ | Queue error`})
                await queue.play()
                



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
                } catch (err) {
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
                } catch (err) {
                    console.log(err)
                    return await interaction.reply({ content: "Unknow Error Occurred", ephemeral: true });
                }
            }
            //no break needed because of the return value on the previous statement
            case (command === 'volume'): {
                if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
                if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
                let volume = interaction.options.get("volume").value;
                if (volume > 101 || volume < 0) return await interaction.reply({ content: "❌ | Volume out of range" });
                let queue = player.createQueue(interaction.guild, {
                    metadata: {
                        channel: interaction.channel
                    }
                });


                try {
                    await queue.setVolume(volume)
                    await interaction.deferReply();
                    return await interaction.followUp({ content: `✅ | Volume adjusted to ${volume}` });
                } catch (err) {
                    console.log(err)
                    return await interaction.reply({ content: "Unknow Error Occurred", ephemeral: true });
                }
            }
            //no break needed because of the return value on the previous statement
            case (command === 'nowplaying'): {
                if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
                if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
                
                let queue = player.createQueue(interaction.guild, {
                    metadata: {
                        channel: interaction.channel
                    }
                });


                try {
                    let np = await queue.getPlayerTimestamp()
                    console.log(np)
                    let s_current = np.current
                    let s_end = np.end
                    var a_c = s_current.split(':'); // split it at the colons
                    var a_e = s_end.split(':'); // split it at the colons
                    var seconds_c = (+a_c[0]) * 60 * 60 + (+a_c[1]) * 60 + (+a_c[2]); 
                    var seconds_e = (+a_e[0]) * 60 * 60 + (+a_e[1]) * 60 + (+a_e[2]); 
                    await interaction.deferReply();
                    return await interaction.followUp({ content: `a` });
                } catch (err) {
                    console.log(err)
                    return await interaction.reply({ content: "Unknow Error Occurred", ephemeral: true });
                }
            }
            case (command === 'skip'): {
                if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
                if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
                
                let queue = player.createQueue(interaction.guild, {
                    metadata: {
                        channel: interaction.channel
                    }
                });
                try {
                await queue.skip()
                await interaction.deferReply();
                return await interaction.followUp({ content: `✅ | Successfully changed the track` });
                } catch (err) {
                    console.log(err)
                    return await interaction.reply({ content: "Unknow Error Occurred", ephemeral: true });
                }
            }
        }
    }
}