const db = require("quick.db");
const { ChannelType } = require('discord-api-types/v9');
const argsList = ['raidmode', 'antispam', 'logs']
const createEmbed = require('../utils/createEmbed.js')

module.exports = async(interaction) => {

        const guildLanguages = require('../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../utils/languages/${guildLanguage}.js`);
        //console.log(message)
        const command = interaction.options.getSubcommand() || interaction.options.get('value').value 
        console.log(command)
        //const command = interaction.commandName
        const args = interaction.options.get('value').value 
        console.log(args)
        switch (true) {
            case (command === 'raidmode'): {
                        let before = (new Date().getTime()).toFixed(2);
                        (async () => {
                            if (!await db.get(interaction.guildId)) {
                                try {
                                    await db.set(`${interaction.guildId}.raidmode`, {
                                        raidmode: args,
                                    })
                                } catch { }
                            }
                            else {
                                (async () => {
                                    try {
                                        await db.set(`${interaction.guildId}.raidmode`, {
                                            raidmode: args,
                                        })
                                    } catch { }
                                })();

                            }


                        })().then(() => {
                            var after = (new Date().getTime()).toFixed(2)
                            var lapsedTime = after - before
                            var config = createEmbed('#0099ff',
                                `${language("_config_raid_raidmode")}`,
                                `${language("_config_success", lapsedTime)}`)
                            interaction.reply({ embeds: [config] })

                        })
                    

            }

                break;
            case (command === 'antispam'): {
                //console.log(args)
                        let before = (new Date().getTime()).toFixed(2);
                        (async () => {
                            if (!await db.get(interaction.guildId)) {
                                try {
                                    await db.set(`${interaction.guildId}.antispam`, {
                                        antispam: args,
                                    })
                                } catch { }
                            }
                            else {
                                (async () => {
                                    try {
                                        await db.set(`${interaction.guildId}.antispam`, {
                                            antispam: args,
                                        })
                                    } catch { }
                                })();

                            }


                        })().then(() => {
                            let after = (new Date().getTime()).toFixed(2)
                            let lapsedTime = after - before
                            let config = createEmbed('#0099ff',
                                `${language('_config_nspam_config')}`,
                                `${language('_config_success', lapsedTime)}`)
                            interaction.reply({ embeds: [config] })
                        })
                    
            }
                break;
            case (command === 'logs'): {
                    let before = (new Date().getTime()).toFixed(2);
                    (async () => {
                        before = new Date().getTime()
                        await db.set(`${interaction.guildId}.logs`, args)

                    })().then(() => {
                        let after = (new Date().getTime()).toFixed(2)
                        let ms = after - before
                        let log = args
                        let config = createEmbed('#0099ff', language('_logs_logs'), language('_logs_success', log, ms))
                        interaction.reply({ embeds: [config] })
                    })
                
            }
                break;
            default: {
                let config = createEmbed('#0099ff',
                    `${language('_config_default')}`,

                    `${language('_config_default_syntax', exports.name, argsList)}`)

                interaction.reply({ embeds: [config] })
            }
        }
    }
