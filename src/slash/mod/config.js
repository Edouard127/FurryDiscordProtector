
const db = require("quick.db");
const argsList = ['raidmode', 'antispam', 'logs']
const createEmbed = require('../../utils/createEmbed.js')

const removeDuplicates = require('../../utils/removeDuplicates.js')
const subArrays = require('../../utils/subArrays.js')
const _ = require('../../utils/k8sDB')
const { insert, get, health, timeout, insertTo } = new _()
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
        {
            name: "clear",
            description: 'Clear the configuration',
            type: 1
        },
        {
            name: "summary",
            description: 'Config summary',
            type: 1
        }

	],
	timeout: 3000,
	category: 'mod',
	run: async (interaction) => {
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        if(typeof await health === "object") return await interaction.reply({ content: timeout() })
        for(let index of interaction.options.data){
            for(let option of index.options){
            
                switch (index.name){
                    case "clear": {
                        for(let option of index.options){
                        await insert(interaction, JSON.stringify({}))
                        }
                        return await interaction.reply({ content: "Successfully reseted" })
                    }
                    case "logs": {

                            switch(option.name){
                                case "events": {
                                    for(let option of index.options){
                                            let ___ = await get(interaction).then(data => {
                                                return data.data.spec?.events || []
                                            })
                                            ___ = ___.concat([option.value])
                                            
                                            await insert(interaction, JSON.stringify({ events: ___ }))
                                        }
                                        return interaction.reply("Ok")
                                }
                                case "channel": {
                                    for(let option of index.options){
                                    await insert(interaction, JSON.stringify({ logs: option.value }))
                                    }
                                    return interaction.reply("Ok")
                                }
                            }
                    }
                    case "raid": {
                        switch(option.name){
                            case "switch_raid": {
                                for(let option of index.options){
                                await insert(interaction, JSON.stringify({ raidmode: option.value }))
                                }
                                return interaction.reply("Ok")
                            }
                            case "threshold_raid": {
                                for(let option of index.options){
                                await insert(interaction, JSON.stringify({ raidCheck: option.value }))
                                }
                                return interaction.reply("Ok")
                            }
                        }
                    }
                    case "antispam": {
                        switch(option.name){
                            case "switch_antispam": {
                                for(let option of index.options){
                                await insert(interaction, JSON.stringify({ antispam: option.value }))
                                }
                                return interaction.reply("Ok")
                            }
                            case "threshold_antispam": {
                                for(let option of index.options){
                                await insert(interaction, JSON.stringify({ spamCheck: option.value }))
                                }
                                return interaction.reply("Ok")
                            }
                        }
                        
                    }
                    case "profanity": {
                        switch(option.name){
                            case "add": {
                                for(let option of index.options){
                                let ___ = await get(interaction).then(data => {
                                    return data.data.spec?.profanityWords || []
                                })
                                ___ = ___.concat([option.value])
                                await insert(interaction, JSON.stringify({ profanityWords: ___ }))
                            }
                                return interaction.reply("Ok")
                            }
                            case "remove": {
                                for(let option of index.options){
                                let ___ = await get(interaction).then(data => {
                                    return data.data.spec?.profanityWords || []
                                })
                                ___ = subArrays(___, [option.value])
                                await insert(interaction, JSON.stringify({ profanityWords: ___ }))
                            }
                                return interaction.reply("Ok")
                            }
                        }
                    }
                    case "default-role": {
                        for(let option of index.options){
                            await insert(interaction, JSON.stringify({ default: option.value }))
                            return interaction.reply("Ok")
                        }
                    }
                    case "summary": {
                        let __ = await get(interaction)
                        let config = createEmbed('#0099ff',
                            `${language('_config_default')}`,
        
                            `${language('_config_raid_configuration', `\`\`\`${JSON.stringify(__.data.spec)}\`\`\``)}`)
        
                        return interaction.reply({ embeds: [config] })
                    }
                    default: {
                        let __ = await get(interaction)
                        let config = createEmbed('#0099ff',
                            `${language('_config_default')}`,
        
                            `${language('_config_raid_configuration', `\`\`\`${JSON.stringify(__.data.spec)}\`\`\``)}`)
        
                        interaction.reply({ embeds: [config] })
                    }
                }
        }
    }
        
    }
}









