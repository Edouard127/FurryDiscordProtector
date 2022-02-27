const db = require("quick.db");
const argsList = ['raidmode', 'antispam']
const createEmbed = require('../utils/createEmbed.js')

exports.name = "config";
exports.description = "Configure the Raid Detection for your server"
exports.run = (message, args, prefix) => {
    const guildLanguages = require('../utils/languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`../utils/languages/${guildLanguage}.js`);
    //console.log(message)
    switch (true) {
        case (args[1] === 'raidmode'): {
            console.log(args)
            if (args[2]) {
                if (args[2].match(/^[0-9]+$/)) {
                    var before = (new Date().getTime()).toFixed(2);
                    (async () => {
                        if (!await db.get(message.guild.id)) {
                            await db.set(`${message.guild.id}.raidmode`, {
                                raidmode: args[2],
                            })
                        }
                        else {
                            (async () => {
                                await db.set(`${message.guild.id}.raidmode`, {
                                raidmode: args[2],
                            })
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
                var configuration
                (async () => {
                    try {
                        if (!await db.get(message.guild.id)) {
                            configuration = language("_config_no_configuration")
                            
                        }
                        else {
                            configuration = '```' + JSON.stringify(await db.get(message.guild.id)) + '```'

                        }
                    } catch (err) { console.log(err) }
                })().then(() => {
                    var config = createEmbed('#0099ff',
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
                    var before = (new Date().getTime()).toFixed(2);
                    (async () => {
                        if (!await db.get(message.guild.id)) {
                            await db.set(`${message.guild.id}.antispam`, {
                                antispam: args[2],
                            })
                        }
                        else {
                            (async () => {
                                await db.set(`${message.guild.id}.antispam`, {
                                antispam: args[2],
                            })
                            })();

                        }


                    })().then(() => {
                        var after = (new Date().getTime()).toFixed(2)
                        var lapsedTime = after - before
                        var config = createEmbed('#0099ff',
                            `${language('_config_nspam_config')}`,
                            `${language('_config_success', lapsedTime)}`)
                        message.reply({ embeds: [config] })
                    })
                }
                else {
                    var config = createEmbed('#0099ff',
                        `${language('_config_nspam_config')}`,
                        `${language("_config_bad_syntax", args[2])}`)
                    message.reply({ embeds: [config] })
                }
            }
            else {
                var configuration
                (async () => {
                    try {
                        if (!await db.get(message.guild.id)) {
                            configuration = language("_config_no_configuration")
                            
                        }
                        else {
                            configuration = '```' + JSON.stringify(await db.get(message.guild.id)) + '```'

                        }
                    } catch (err) { console.log(err) }
                })().then(() => {
                    var config = createEmbed('#0099ff',
                        `${language('_config_nspam_config')}`,
                        `${language('_config_nspam_configuration', configuration, prefix, exports.name)}`)
                    message.reply({ embeds: [config] })
                })
            }
        }
            break;
        default: {
            var config = createEmbed('#0099ff',
                `${language('_config_default')}`,

                `${language('_config_default_syntax', exports.name, argsList)}`)

            message.reply({ embeds: [config] })
        }
    }

}

