
const db = require("quick.db");
const argsList = ['raidmode', 'antispam', 'logs']
const createEmbed = require('../../utils/createEmbed.js')
const insert_K8s = require('../../utils/insertDataK8s.js');
const get_K8s = require('../../utils/getDataK8s.js');
const isAlive = require('../../utils/k8sStatus.js')
module.exports = {
	name: 'config',
	description: 'edit your server bot configuration',
	permissions: 'MANAGE_GUILD',
	example: `/config [argument]`,
	options: [
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
        },
        {
            name: 'logs',
            description: 'logs channel for logging events',
            type: 7,
            channel_types: [0],
        },
        {
            name: 'default_role',
            description: 'default role if not @everyone, example: @Members',
            type: 8,
        },

	],
	timeout: 3000,
	category: 'mod',
	run: async (interaction) => {
        const raidmode = interaction.options.get('raidmode')
        const antispam = interaction.options.get('antispam')
        const logs = interaction.options.get('logs')
        const default_role = interaction.options.get('default_role')
        const guildLanguages = require('../../utils/languages/config/languages.json')
        const guildLanguage = guildLanguages[interaction.guildID] || "en"; // "english" will be the default language
        const language = require(`../../utils/languages/${guildLanguage}.js`);
        if(await new get_K8s(interaction).isAlive() === false) return await interaction.reply({ content: 'There was an error while trying to connect to the Kubernetes Cluster. Please try again later.\nIf the error persists, please contact Kamigen#0001' })
        //console.log(message)
        switch (true) {
            case (raidmode !== null && raidmode !== undefined): {
                let data = {
                    raidmode: raidmode.value
                }
                let __ = await new insert_K8s(interaction, data).k8s()
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
                
                        let __ = await new insert_K8s(interaction, data).k8s()
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
                
                    let __ = await new insert_K8s(interaction, data).k8s()
                        let log = logs.value
                        let config = createEmbed('#0099ff', language('_logs_logs'), language('_logs_success', log, __.lapse))
                        interaction.reply({ embeds: [config] })
                
            }
                break;
            case(default_role !== null && default_role !== undefined): {
                let data = {
                    defaultrole: default_role.value || interaction.guildId
                }
                
                    let __ = await new insert_K8s(interaction, data).k8s()
                        interaction.reply({ content: 'success' })
            }
            default: {
                let __ = await new get_K8s(interaction).k8s()
                let config = createEmbed('#0099ff',
                    `${language('_config_default')}`,

                    `${language('_config_raid_configuration', `\`\`\`${JSON.stringify(__.data.spec)}\`\`\``)}`)

                interaction.reply({ embeds: [config] })
            }
        }
    }
}









