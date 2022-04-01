const getDataK8s = require('../../utils/getDataK8s.js')
const insertDataK8s = require('../../utils/insertDataK8s.js')


module.exports = {

    name: 'proxy',
    description: 'WORK IN PROGRESS',
    options: [
        {
            name: 'register',
            description: 'Register a new proxy user',
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'Proxy user name',
                    type: 3,
                    required: true,
                },
                {
                    name: 'avatar',
                    description: 'Proxy user avatar',
                    type: 3,
                    required: false,
                },
            ]
        },
        {
            name: 'list',
            description: 'Get a list of your proxy users, can only be seen by you',
            type: 1,
        },
        

    ],
    run: async (interaction, client) => {
        const args = interaction.options.getSubcommand()


        if(args == 'register') {
            let config = {
                [interaction.author.id]: [
                    {
                        
                    },
                ]
            }
            await new insertDataK8s(interaction)
        }
        if(args == 'list') {

        }


    },

}