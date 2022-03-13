
const db = require("quick.db");
const argsList = ['raidmode', 'antispam', 'logs']
const createEmbed = require('../../utils/createEmbed.js')
module.exports = {
	name: 'config',
	description: 'edit your server bot configuration',
	permissions: 'MANAGE_MEMBERS',
	example: `/config [argument]`,
	options: [
        {
            name: 'summary',
            description: 'config summary for the server',
            type: 1,
            required: false,
        },
		{
			name: 'raidmode',
			description: 'number of joins in 10 seconds before triggering the Anti-Raid Mode',
			type: 4,
			required: false,
		},
        {
            name: 'antispam',
            description: 'number of messages in 3 seconds before triggering the Anti-Spam',
            type: 4,
            required: false,
        },
        {
            name: 'logs',
            description: 'logs channel for logging events',
            type: 7,
            required: false,
        },

	],
	timeout: 5000,
	category: 'mod',
	run: async (interaction, client) => {
        const raidmode = interaction.options.get('raidmode')
        const antispam = interaction.options.get('antispam')
        const logs = interaction.options.get('logs')
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        //console.log(message)
        switch (true) {
            case (raidmode !== null && raidmode !== undefined): {
                
                        let before = (new Date().getTime()).toFixed(2);
                        (async () => {
                            if (!await db.get(interaction.guildId)) {
                                try {
                                    await db.set(`${interaction.guildId}.raidmode`, {
                                        raidmode: raidmode.value,
                                    })
                                } catch { }
                            }
                            else {
                                (async () => {
                                    try {
                                        await db.set(`${interaction.guildId}.raidmode`, {
                                            raidmode: raidmode.value,
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
            case (antispam !== null && antispam !== undefined): {
                console.log(antispam.value)
                
                        let before = (new Date().getTime()).toFixed(2);
                        (async () => {
                                    try {
                                        await db.set(`${interaction.guildId}.antispam`, {
                                            antispam: antispam.value,
                                        })
                                    } catch { }

                            


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
            case (logs !== null && logs !== undefined): {
                    let before = (new Date().getTime()).toFixed(2);
                    (async () => {
                        before = new Date().getTime()
                        await db.set(`${interaction.guildId}.logs`, logs.value)

                    })().then(() => {
                        let after = (new Date().getTime()).toFixed(2)
                        let ms = after - before
                        let log = logs.value
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
}









