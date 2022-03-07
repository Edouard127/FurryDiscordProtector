const db = require("quick.db");
const argsList = ['raidmode', 'antispam', 'logs']
const createEmbed = require('../utils/createEmbed.js')

exports.name = "config";
exports.description = "Configure the Raid Detection for your server"
exports.run = (message, args, prefix) => {
    const { MessageMentions: { CHANNELS_PATTERN } } = require('discord.js');
    const guildLanguages = require('../utils/languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);
    //console.log(message)
    switch (true) {
        case (args[1] === 'raidmode'): {
            console.log(args)
            if (args[2]) {
                if (args[2].match(/^[0-9]+$/)) {
                    let before = (new Date().getTime()).toFixed(2);
                    (async () => {
                        if (!await db.get(message.guild.id)) {
                            try {
                            await db.set(`${message.guild.id}.raidmode`, {
                                raidmode: args[2],
                            })
                        } catch {}
                        }
                        else {
                            (async () => {
                                try {
                                await db.set(`${message.guild.id}.raidmode`, {
                                raidmode: args[2],
                            })
                        } catch {}
                            })();

                        }


                    })().then(() => {
                        var after = (new Date().getTime()).toFixed(2)
                        var lapsedTime = after - before
                        var config = createEmbed('#0099ff',
                            `${language("_config_raid_raidmode")}`,
                            `${language("_config_success", lapsedTime)}`)
                            message.reply({ embeds: [config] })
                    })
                }
                else {
                    var config = createEmbed('#0099ff',
                        `${language("_config_raid_raidmode")}`,
                        `${language("_config_bad_syntax", args[2])}`)
                        message.reply({ embeds: [config] })
                }
            }
            else {
                let configuration
                (async () => {
                    try {
                        if (!await db.get(message.guild.id)) {
                            configuration = language("_config_no_configuration")
                            
                        }
                        else {
                            try {
                            configuration = '```' + JSON.stringify(await db.get(message.guild.id)) + '```'
                            } catch {}

                        }
                    } catch {}
                })().then(() => {
                    let config = createEmbed('#0099ff',
                        `${language('_config_raid_raidmode')}`,
                        `${language('_config_raid_configuration', configuration, prefix, exports.name)}`)
                    message.reply({ embeds: [config] })
                    
                    
                })

            }

        }

            break;
        case (args[1] === 'antispam'): {
            //console.log(args)
            if (args[2]) {
                if (args[2].match(/^[0-9]+$/)) {
                    let before = (new Date().getTime()).toFixed(2);
                    (async () => {
                        if (!await db.get(message.guild.id)) {
                            try {
                            await db.set(`${message.guild.id}.antispam`, {
                                antispam: args[2],
                            })
                        } catch {}
                        }
                        else {
                            (async () => {
                                try {
                                await db.set(`${message.guild.id}.antispam`, {
                                antispam: args[2],
                            })
                        } catch {}
                            })();

                        }


                    })().then(() => {
                        let after = (new Date().getTime()).toFixed(2)
                        let lapsedTime = after - before
                        let config = createEmbed('#0099ff',
                            `${language('_config_nspam_config')}`,
                            `${language('_config_success', lapsedTime)}`)
                        message.reply({ embeds: [config] })
                    })
                }
                else {
                    let config = createEmbed('#0099ff',
                        `${language('_config_nspam_config')}`,
                        `${language("_config_bad_syntax", args[2])}`)
                    message.reply({ embeds: [config] })
                }
            }
            else {
                let configuration
                (async () => {
                    try {
                        if (!await db.get(message.guild.id)) {
                            configuration = language("_config_no_configuration")
                            
                        }
                        else {
                            try {
                            configuration = '```' + JSON.stringify(await db.get(message.guild.id)) + '```'
                            } catch {}

                        }
                    } catch {}
                })().then(() => {
                    let config = createEmbed('#0099ff',
                        `${language('_config_nspam_config')}`,
                        `${language('_config_nspam_configuration', configuration, prefix, exports.name)}`)
                    message.reply({ embeds: [config] })
                })
            }
        }
            break;
        case (args[1] === 'logs'): {
            let matches = args[2].match(CHANNELS_PATTERN);
            if(matches){
            let chan = message.mentions.channels.first()
            let before
            let after
                (async () => {
                    before = new Date().getTime()
                    await db.set(`${message.guild.id}.logs`, chan.id)
                    
                })().then(() => {
                    let ms = after - before
                    let log = chan.name
                    let config = createEmbed('#0099ff', language('_logs_logs'), language('_logs_success', log, ms))
                    message.reply({ embeds: [config] })
                })
            }
            else {
                let config = createEmbed('#0099ff', language('_logs_logs'), language('_logs_bad_syntax', args[2], ms))
                message.reply({ embeds: [config] })
            }
        }
        break;
        default: {
            let config = createEmbed('#0099ff',
                `${language('_config_default')}`,

                `${language('_config_default_syntax', exports.name, argsList)}`)

            message.reply({ embeds: [config] })
        }
    }

}

