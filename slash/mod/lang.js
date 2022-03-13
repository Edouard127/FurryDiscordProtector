
module.exports = {
    name: 'lang',
	description: 'change bot language',
	permissions: 'MANAGE_SERVER',
	options: [
		{
			name: 'en',
			description: 'english',
			type: 1,
			required: false,
		},
		{
			name: 'fr',
			description: 'français',
			type: 1,
			required: false,
		},
        {
            name: 'ru',
			description: 'pусский',
			type: 1,
			required: false,
        },
        {
            name: 'sp',
			description: 'español',
			type: 1,
			required: false,
        },
	],
    timeout: 3000,
    category: 'mod',

    run: async(interaction, client) => {
        const fs = require("fs");
        const createEmbed = require('../../utils/createEmbed.js')        
        const args = interaction.options.getSubcommand()
        
        
        
            const guildLanguages = require('../../utils/languages/config/languages.json') //<------------------------------------------------------------ FIX IF THE LANGUAGE IN THE JSON FILE IS NOT VALID, PUT THE DEFAULT VARIABLE
                        guildLanguages[interaction.guildId] = args
                        console.log(interaction.options.getSubcommand())
                        
                            fs.writeFileSync(__dirname + '/\/../\/../\/utils/languages/config/languages.json', JSON.stringify(guildLanguages))
                            let newl = require(`../../utils/languages/${args}.js`);
                            var config = createEmbed('#0099ff', `${newl('_lang_lang')}`, `${newl('_lang_validation')}`)
                            interaction.reply({ embeds: [config] })
    }
}