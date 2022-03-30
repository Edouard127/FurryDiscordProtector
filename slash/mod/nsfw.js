const createEmbed = require('../../utils/createEmbed.js')
const argsList = ['interact', 'threshold', 'exclude']
const removeDuplicates = require('../../utils/removeDuplicates.js')
const subArrays = require('../../utils/subArrays.js')
const getDataK8s = require('../../utils/getDataK8s.js')
const insertDataK8s = require('../../utils/insertDataK8s.js')
const base64 = require('../../utils/base64.js')


module.exports = {
    name: 'nsfw',
    description: 'nsfw content detection',
    permissions: 'MANAGE_GUILD',
    example: '/nsfw interact true/false -> enable/disable\n/nsfw threshold 60 -> If image is detected as 60% nsfw\n',
    options: [
        {
            name: 'interact',
            description: 'enable/disable NSFW Content Detection',
            type: 5,
            required: false,
        },
        {
            name: 'threshold',
            description: 'setup the threshold for the nsfw detection',
            type: 4,
            min_value: '0',
            max_value: '100',
            required: false,
        },
        {
            name: 'exclude',
            description: 'exclude channels from the function',
            type: 7,
            channel_types: 0,
            required: false,
        },
        {
            name: 'include',
            description: 'remove channels from the exclude function',
            type: 7,
            channel_types: 0,
            required: false,
        },
    ],
    timeout: 3000,
    category: 'mod',

    run: async(interaction, client) => {

    const interact = interaction.options.get('interact')
    const threshold = interaction.options.get('threshold')
    const excludes = interaction.options.get('exclude')
    const includes = interaction.options.get('include')

        const { MessageMentions: { CHANNELS_PATTERN } } = require('discord.js');
    const guildLanguages = require('../../utils/languages/config/languages.json')
    const guildLanguage = guildLanguages[interaction.guildId] || "en"; // "english" will be the default language
    const language = require(`../../utils/languages/${guildLanguage}.js`);
    switch (true) {
        case (interact !== null && interact !== undefined): {
            let data = {
                nsfwCheck: interact.value
            }
        await new insertDataK8s(interaction, data).k8s().then((result) => {
            let config = createEmbed('#0099ff', `${language('_nsfw_config')}`, `${language('_nsfw_success', interact.value, result.lapse)}`)
            interaction.reply({ embeds: [config] })
        })  
        }
        break;
        case (threshold !== null && threshold !== undefined): {
                let threshold_ = parseInt(threshold.value)/100
                let data = {
                    nsfwThreshold: threshold_
                }
                let a = await new insertDataK8s(interaction, data).k8s()
                let config = createEmbed('#0099ff', `${language('_nsfw_config')}`, `${language('_nsfw_success_threshold', threshold_, a.lapse)}`)
                interaction.reply({ embeds: [config] })
                
    }        
        break;

        case (excludes !== null && excludes !== undefined): {
            let ___ = removeDuplicates(await new getDataK8s(interaction).k8s().then((data) => { if(typeof data.data.spec?.excludes !== "undefined") { (data.data.spec.excludes).push(excludes.value); return data.data.spec.excludes } else { let a = []; a.push(excludes.value); return a } }))
            let data = {
                excludes: ___
            }
            await new insertDataK8s(interaction, data).k8s().then(() => {
                interaction.reply('Success')
            }).catch(err => {
                interaction.reply(`❌ || \`\`\`${err}\`\`\``)
            })
            
        }
        break;
        case (includes !== null && includes !== undefined): {
            let ___ = subArrays(await removeDuplicates(await new getDataK8s(interaction).k8s().then(data => { if(typeof data.data.spec?.excludes !== "undefined"){ (data.data.spec.excludes).push(includes.value); return data.data.spec.excludes } else { return []} })), [includes.value])
            if(typeof ___ === "undefined") { console.log(0); return }
            let data = {
                excludes: ___
            }
            await new insertDataK8s(interaction, data).k8s().then(() => {
                interaction.reply('Success')
            }).catch(err => {
                console.log(_arr_)
                interaction.reply(`❌ || \`\`\`${err}\`\`\``)
            })
            
            
            
    }
    break;

        default: {
                let config = createEmbed('#0099ff', `${language('_nsfw_config')}`, `${language('_nsfw_message', argsList)}`)
                interaction.reply({ embeds: [config] })
        }
    }
    }
}