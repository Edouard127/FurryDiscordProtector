const db = require("quick.db");
const createEmbed = require('../../utils/createEmbed.js')
const argsList = ['interact', 'threshold', 'exclude']
const removeDuplicates = require('../../utils/removeDuplicates.js')

module.exports = {
    name: 'nsfw',
    description: 'nsfw content detection',
    permissions: 'MANAGE_MEMBERS',
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
            
            (async () => {
        
                    let before = new Date().getTime()
                    await db.set(`${interaction.guildId}.nsfwCheck`, interact.value)
                    let after = new Date().getTime()
                    let ms = after - before
        
                    let config = createEmbed('#0099ff', `${language('_nsfw_config')}`, `${language('_nsfw_success', interact.value, ms)}`)
                    interaction.reply({ embeds: [config] })
                    
        
        
            })();
        }
        break;
        case (threshold !== null && threshold !== undefined): {
                let threshold_ = parseInt(threshold.value)/100
                let before = new Date().getTime();
                (async () => {
                    await db.set(`${interaction.guildId}.nsfwThreshold`, threshold_)
                })().then(() => {
                    let after = new Date().getTime()
                    let ms = after - before
                    let config = createEmbed('#0099ff', `${language('_nsfw_config')}`, `${language('_nsfw_success_threshold', threshold_, ms)}`)
                    interaction.reply({ embeds: [config] })
                })
                
    }        
        break;

        case (excludes !== null && excludes !== undefined): {
            console.log(excludes.value)
                let arr
                (async () => {
                arr = await db.get(`${interaction.guildId}.excludes`) || []
                
                })().then(async () => {
                    arr.push(excludes.value)
                    let new_arr = removeDuplicates(arr)
                    await db.set(`${interaction.guildId}.excludes`, new_arr)
                    
                })
                interaction.reply('Success')
        }
        break;
        case (includes !== null && includes !== undefined): {
            console.log('owo')
            let arr
            (async () => {
            arr = await db.get(`${interaction.guildId}.excludes`) || []
            })()
                
            .then(async () => {
                arr.splice(arr.indexOf(includes.value), 1);
                let new_arr = removeDuplicates(arr)



                await db.set(`${interaction.guildId}.excludes`, new_arr)
                
            }).then(() => {
                interaction.reply('Success')
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