
const db = require("quick.db");
const argsList = ['raidmode', 'antispam', 'logs']
const createEmbed = require('../../utils/createEmbed.js')

const isAlive = require('../../utils/k8sStatus.js')
const _ = require('../../utils/insertDataRedis')
const { insert, get, health, timeout } = new _()
module.exports = {
	name: 'config',
	description: 'Edit your server bot configuration',
	permissions: 'MANAGE_GUILD',
	example: `/config [argument]`,
	options: [
        {
            name: 'logs',
            description: 'Logs configuration',
            type: 1,
            options: [
                {
                    name: 'channel',
                    description: 'Channel for logging',
                    type: 7,
                    channel_types: 0,
                },
                {
                    name: 'events',
                    description: 'Choose what events to log',
                    type: 3,
                    choices: [
                        {
                            name: 'Detection',
                            description: 'Log all events related to the anti detections, (anti-raid, anti-spam, etc.)',
                            value: 'detection',
                            type: 3,
                        },
                        {
                            name: 'Channels',
                            description: 'Log all events related to channels',
                            value: 'channels',
                            type: 3,
                        },
                        {
                            name: 'Guild',
                            description: 'Log all events related to the server',
                            value: 'guild',
                            type: 3,
                        },
                        {
                            name: 'Messages',
                            description: 'Log all events related to messages',
                            value: 'messages',
                            type: 3,
                        },
                        {
                            name: 'Roles',
                            description: 'Log all events related to roles',
                            value: 'roles',
                            type: 3,
                        },
                        {
                            name: 'Members',
                            description: 'Log all events related to members',
                            value: 'members',
                            type: 3,
                        },
                        {
                            name: 'Invitations',
                            description: 'Log all events related to invitations',
                            value: 'invitations',
                            type: 3,
                        },
                        {
                            name: 'Bot',
                            description: 'Log all events related to the bot',
                            value: 'bot',
                            type: 3,
                        }
                    ]
                }
            ]
        },
        {
            name: 'raid',
            description: 'Will notify when a raid is detected',
            type: 1,
            options: [
                {
                    name: 'switch_raid',
                    description: 'Enable or disable the raid detection',
                    type: 5,
                },
                {
                    name: 'threshold_raid',
                    description: 'Number of joining in 5 seconds before triggering the anti-raid procedure',
                    type: 4,
                },
            ]
        },
        {
            name: 'antispam',
            description: 'Will notify when someone is spamming',
            type: 1,
            options: [
                {
                    name: 'switch_antispam',
                    description: 'Enable or disable the anti-spam',
                    type: 5,
                },
                {
                    name: 'threshold_antispam',
                    description: 'Number of messages in 3 seconds before triggering the anti-spam procedure',
                    type: 4,
                },
            ]
        },
        {
                    name: 'profanity',
                    description: 'Will notify in the channel when a profanity is detected',
                    type: 1,
                    options: [
                        {
                            name: 'add',
                            description: 'Add a profanity word to the list of words, accepts regex pattern and words',
                            value: 'add',
                            type: 3,
                        },
                        {
                            name: 'remove',
                            description: 'Remove a profanity word from the list of words',
                            value: 'remove',
                            type: 3,
                        },
                    ]
        },
        {
            name: 'default-role',
            description: 'Setup defaults',
            type: 1,
            options: [
                {
                    name: 'role',
                    description: 'Default server role for members',
                    type: 8,
                }
            ]
        },

	],
	timeout: 3000,
	category: 'mod',
	run: async (interaction) => {
        console.log(interaction.options)
        const channel = interaction.options.get('channel')
        const events = interaction.options.get('events')
        const profanity = interaction.options.get('profanity')
        const switch_raid = interaction.options.get('switch_raid')
        const thresh_raid = interaction.options.get('threshold_raid')
        const switch_antispam = interaction.options.get('switch_antispam')
        const thresh_antispam = interaction.options.get('threshold_antispam')
        const antispam = interaction.options.get('antispam')
        const logs = interaction.options.get('logs')
        const default_role = interaction.options.get('default')
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        if(typeof await health === "object") return await interaction.reply({ content: timeout() })
        switch (true) {
            case (switch_raid !== null): {
                let data = {
                    raidmode: switch_raid.value
                }
                let __ = await insert(`server_${interaction.user.id}`, JSON.stringify(data), interaction)
                console.log(__)
                            var config = createEmbed('#0099ff',
                                `${language("_config_raid_raidmode")}`,
                                `${language("_config_success", __.lapse)}`)
                            interaction.reply({ embeds: [config] })
            }
                break;
                case (thresh_raid !== null): {
                    let data = {
                        threshold_raid: thresh_raid.value
                    }
                    let __ = await insert(`server_${interaction.user.id}`, JSON.stringify(data), interaction)
                    console.log(__)
                                var config = createEmbed('#0099ff',
                                    `${language("_config_raid_raidmode")}`,
                                    `${language("_config_success", __.lapse)}`)
                                interaction.reply({ embeds: [config] })
                }
                    break;
                    case (switch_antispam !== null): {
                        let data = {
                            antispam: switch_antispam.value
                        }

                        let __ = await insert(`server_${interaction.user.id}`, JSON.stringify(data), interaction)
                        console.log(__)
                                    var config = createEmbed('#0099ff',
                                        `${language("_config_raid_raidmode")}`,
                                        `${language("_config_success", __.lapse)}`)
                                    interaction.reply({ embeds: [config] })
                    }
                        break;
                        case (thresh_antispam !== null): {
                            let data = {
                                threshold_antispam: thresh_antispam.value
                            }
                            let __ = await insert(`server_${interaction.user.id}`, JSON.stringify(data), interaction)
                            console.log(__)
                                        var config = createEmbed('#0099ff',
                                            `${language("_config_raid_raidmode")}`,
                                            `${language("_config_success", __.lapse)}`)
                                        interaction.reply({ embeds: [config] })
                        }
                            break;

            case (antispam !== null && antispam !== undefined): {
                let data = {
                    antispam: antispam.value
                }
                let __ = await insert(`server_${interaction.user.id}`, JSON.stringify(data), interaction)
                            let config = createEmbed('#0099ff',
                                `${language('_config_nspam_config')}`,
                                `${language('_config_success', __.lapse)}`)
                            interaction.reply({ embeds: [config] })       
            }
                break;
            case (logs !== null && logs !== undefined): {
                let data = {
                    logs: logs.value
                }
                
                let __ = await insert(`server_${interaction.user.id}`, JSON.stringify(data), interaction)
                        let log = logs.value
                        let config = createEmbed('#0099ff', language('_logs_logs'), language('_logs_success', log, __.lapse))
                        interaction.reply({ embeds: [config] })
                
            }
                break;
            case(default_role !== null && default_role !== undefined): {
                let data = {
                    defaultrole: default_role.value || interaction.guildId
                }
                
                let __ = await insert(`server_${interaction.user.id}`, JSON.stringify(data), interaction)
                let config = createEmbed('#0099ff', language('_logs_logs'), language('_logs_success', log, __.lapse))
                        interaction.reply({ content: 'success' })
            }
            case(channel !== null && channel !== undefined): {
                let data = {
                    defaultrole: channel?.value
                }
                
                let __ = await insert(`server_${interaction.user.id}`, JSON.stringify(data), interaction)
                let config = createEmbed('#0099ff', language('_logs_logs'), language('_logs_success', log, __.lapse))
                        interaction.reply({ content: 'success' })
            }
            case(events !== null && events !== undefined): {
                let data = {
                    defaultrole: events?.value
                }
                
                let __ = await insert(`server_${interaction.user.id}`, JSON.stringify(data), interaction)
                let config = createEmbed('#0099ff', language('_logs_logs'), language('_logs_success', log, __.lapse))
                        interaction.reply({ content: 'success' })
            }
            case(profanity !== null && profanity !== undefined): {
                let data = {
                    defaultrole: channel?.value
                }
                
                let __ = await insert(`server_${interaction.user.id}`, JSON.stringify(data), interaction)
                let config = createEmbed('#0099ff', language('_logs_logs'), language('_logs_success', log, __.lapse))
                        interaction.reply({ content: 'success' })
            }
            default: {
                let __ = await get(`server_${interaction.user.id}`)
                let config = createEmbed('#0099ff',
                    `${language('_config_default')}`,

                    `${language('_config_raid_configuration', `\`\`\`${JSON.stringify(__)}\`\`\``)}`)

                interaction.reply({ embeds: [config] })
            }
        }
    }
}









