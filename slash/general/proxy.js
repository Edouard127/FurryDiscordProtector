const getDataK8s = require('../../utils/getDataK8s.js')
const insertDataK8s = require('../../utils/insertDataK8s.js')
const { createClient } = require('redis');
//const createEmbed = require('../../utils/createEmbed.js')
const axios = require('axios').default

const client = createClient({ url: `redis://default:${process.env.REDIS_MASTER_PASSWORD}@192.168.0.66:6379` });
client.on('error', (err) => { console.log('Redis Client Error', err); client.disconnect()});
const unallowed = ["clyde", "system", "support", "discord", "hypesquad", "kamigen", "furry protector"]



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
                /*{
                    name: 'avatar_image',
                    description: 'Proxy user avatar',
                    type: 11,
                    required: false,
                },*/
            ]
        },
        {
            name: 'list',
            description: 'Get a list of your proxy users, can only be seen by you',
            type: 1,
        },
        {
            name: 'use',
            description: 'Use one of your proxy users',
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'Proxy user name',
                    type: 3,
                    required: true
                },
                {
                    name: 'content',
                    description: 'Proxy content',
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: 'edit',
            description: 'Edit one of your proxy users',
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'Proxy user name',
                    type: 3,
                    required: true
                },
                {
                    name: 'new_name',
                    description: 'Proxy user new name',
                    type: 3,
                    required: false
                },
                {
                    name: 'new_avatar',
                    description: 'Proxy user new avatar',
                    type: 3,
                    required: false
                },
                
            ]
        },
        {
            name: 'tupperbox',
            description: 'Import from tupperbox',
            type: 1,
            options: [
                /*{
                    name: 'json_file',
                    description: 'Import proxy user data from tupperbox file',
                    type: 11,
                    require: false,
                    
                },*/
                {
                    name: 'json_link',
                    description: 'Import proxy user data from tupperbox file url',
                    type: 3,
                    require: false,
                },
            ]
        },
        {
            name: 'plurialkit',
            description: 'Import from tupperbox',
            type: 1,
        },
        {
            name: 'remove',
            description: 'Delete Proxy user',
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'Proxy user to remove',
                    type: 3,
                    required: true
                },
            ]
        },
        {
            name: 'toggle',
            description: 'Toggle Proxy user',
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'Proxy user to toggle',
                    type: 3,
                    required: true
                },
            ]
        },


    ],
    run: async (interaction, bot) => {
        if(await new getDataK8s(interaction).isAlive() === false) return await interaction.reply({ content: 'There was an error while trying to connect to the Kubernetes Cluster. Please try again later.\nIf the error persists, please contact Kamigen#0001' })
        
        client.connect();
        
        const args = interaction.options.getSubcommand()
        const name = interaction.options.get('name')?.value || 'default'
        
        
        if (unallowed.includes(name.toLowerCase())) {
            if(name.toLowerCase() == 'kamigen'){
                return await interaction.reply({ content: `How dare you using my master name ?`, ephemeral: true })   
            }
            else {
                return await interaction.reply({ content: `Name cannot contain \`${name.toLowerCase()}\``, ephemeral: true })
            }
            
        }

        const avatar = interaction.options.get('avatar')?.value || 'https://cdn.discordapp.com/embed/avatars/0.png'
        /*const avatar_file = interaction.options
        console.log(avatar_file)*/
        try {
        var check = await axios.get(avatar)
        if(!check.headers['content-type'].match(/(image)+\//gm)) return await interaction.reply({ content: 'Invalid image URL', ephemeral: true })
        } catch (e){
            return await interaction.reply({ content: 'Could not find an image', ephemeral: true})
        }


        if (args == 'register') {
            let config = {
                [name]:
                {
                    avatar: avatar,
                },

            }
            let oldData = new Map(Object.entries(JSON.parse(await client.get(interaction.user.id) || '{}')))
            console.log(oldData)
            let toCheck = new Map(Object.entries(config))
            var i = 0
            
            for (var data of oldData) {
                for (key of toCheck) {
                    let re = new RegExp('^'+key[0]+'$', "gm");
                    console.log(data[0], key[0])
                    if (data[0].match(re)) {
                        i = 0
                        return await interaction.reply({ content: `The proxy: \`${data[0]}\` already exists. Please try again with a different proxy`, ephemeral: true })

                    }
                }
                i++
            }
            try {
                try {
                    var _ = Object.assign(JSON.parse(await client.get(interaction.user.id) || '{}'), config)
                } catch {
                    return await interaction.reply({ content: 'You have 0 proxy', ephemeral: true })
                }
                await client.set(interaction.user.id, JSON.stringify(_))
            } catch (e) {
                return await interaction.reply({ content: `Unexpected error: ${e}`, ephemeral: true })
            }
            try {
                await client.disconnect();
            } catch (e) {
                return await interaction.reply({ content: `Error while disconnecting\nThe error has been handled by the bot\nThe actions before the errors are successfully registered`, ephemeral: true })
            }
            return await interaction.reply('ok')
        }
        if (args == 'list') {
            var __ = []
            var data = new Map(Object.entries(JSON.parse(await client.get(interaction.user.id) || '{}')))
            console.log(data.size)
            if(data.size <= 0) return await interaction.reply({ content: 'You have 0 proxy', ephemeral: true })
            for (i of data) {
                __.push(i[0])
            }
            return await interaction.reply({ content: `Your proxies:\n\`${__.join("\n")}\``, ephemeral: true })
        }

        if (args == 'use') {
            //console.log(interaction.channel)
            const content = interaction.options.get('content')?.value
            async function proxy_avatar() {
                let _ = new Map(Object.entries(JSON.parse(await client.get(interaction.user.id))))
                for (key of _) {
                    
                    let re = new RegExp('^'+name+'$', "gm");
                    if (key[0].match(re)) {
                        return key[1].avatar
                    }
                }
                return await interaction.reply({ content: `No proxy found for ${name}`, ephemeral: true })

            }
            let webhookCollection = await interaction.channel.fetchWebhooks();
            if (webhookCollection.size > 0) {
                for (key of webhookCollection) {
                    if (key?.owner?.id == interaction.client.id) {
                        let wb = key[1]
                        await wb.edit({ name: name, avatar: await proxy_avatar() })
                        try {
                            wb.send({ content: content, allowedMentions: { "users": [] } })
                            await interaction.reply({ content: `_ _` })
                            return await interaction.deleteReply()
                        } catch (e) {
                            return await interaction.reply({ content: e, ephemeral: true })
                        }
                    }
                }
            }
            else {
                let wb = await interaction.channel.createWebhook("Proxies");
                await wb.edit({ name: name, avatar: await proxy_avatar() })
                try {
                    wb.send({ content: content, allowedMentions: { "users": [] } })
                    await interaction.reply({ content: `_ _` })
                    await interaction.deleteReply()
                } catch (e) {
                    return await interaction.reply({ content: e, ephemeral: true })
                }
                return await interaction.reply({ content: 'Created the webhook for this channel', ephemeral: true })

            }

        }
        if(args == 'edit'){
            const new_name = await interaction.options.get('new_name')?.value || false
            const new_avatar = await interaction.options.get('new_avatar')?.value || false
            if(new_name == false && new_avatar == false) return await interaction.reply({ content: 'Please enter a new name or new avatar for the proxy', ephemeral: true})
            if(name == new_name) return await interaction.reply({ content: 'Cannot use same name', ephemeral: true})
            try {
                if(new_avatar != false){
                let check = await axios.get(new_avatar)
                if(!check.headers['content-type'].match(/(image)+\//gm)) return await interaction.reply({ content: 'Invalid image URL', ephemeral: true })
                }
                } catch (e){
                    return await interaction.reply({ content: 'Could not find an image', ephemeral: true})
                }            
            let oldData = new Map(Object.entries(JSON.parse(await client.get(interaction.user.id))))
            if(oldData.has(name) == false) { 
                return await interaction.reply({ content: `Proxy \`${name}\`not found`, ephemeral: true})
            }
            let _ = []
            for(var key of [...oldData]){
                console.log(key[1])
                if(key[0] == name){
                    key[0] = new_name
                }
                if(key[0] == name && key[1] != new_avatar){
                console.log('new avatar')
                key[1] = new_avatar
                }
                _.push(key)
            }
            _ = Object.fromEntries(_)
            console.log(_)
            await client.set(interaction.user.id, JSON.stringify(_))
            try {
                await client.disconnect();
            } catch (e) {
                return await interaction.reply({ content: `Error while disconnecting\nThe error has been handled by the bot\nThe actions before the errors are successfully registered`, ephemeral: true })
            }
            return await interaction.reply({ content: '✅ Success', ephemeral: true })
        }
        if(args == 'tupperbox'){
            let __ = {}
            const json_link = interaction.options.get('json_link')?.value || 'no'
            
            let match = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&amp;=]*)/gm
            if(json_link.match(match) == false) return await interaction.reply({ content: 'Invalid URL', ephemeral: true})
            let _ = await axios.get(json_link).then((response) => { return response.data.tuppers })
            _ = _.map(function(index) {
                __[index.name] = { avatar: index.avatar_url || 'https://cdn.discordapp.com/embed/avatars/0.png' }
            })
            let _o = []
            let old = Object.entries(__).forEach(key => {
                _o.push(key[0])
            })
            delete old
            __ = Object.assign(__, JSON.parse(await client.get(interaction.user.id)))
            await client.set(interaction.user.id, JSON.stringify(__))
            
            try {
                await client.disconnect();
                return await interaction.reply({ content: `Successfully added:\n\`${_o.join('\n')}\``})
            } catch (e) {
                return await interaction.reply({ content: `Error while disconnecting\nThe error has been handled by the bot\nThe actions before the errors are successfully registered`, ephemeral: true })
            }
            
        }
        if(args == 'plurialkit'){
            //const _ = await axios.get(`https://api.pluralkit.me/v2/systems/${interaction.user.id}`)
            //console.log(_)
            try {
                await client.disconnect();
            } catch (e) {
                return await interaction.reply({ content: `Error while disconnecting\nThe error has been handled by the bot\nThe actions before the errors are successfully registered`, ephemeral: true })
            }
            return await interaction.reply({ content: `Their shit so hard to use I can't even find how to get the user data 😭😭`, ephemeral: true })
        }
        if(args == 'remove'){
            var data = JSON.parse(await client.get(interaction.user.id))
            let re = new RegExp('^'+name+'$', "gm");
            let _ = {}
            new Map(Object.entries(data)).forEach(function(value, index) {
                if(index.match(re)){
                    delete data[index]
                }
            
            })
            try {
                await client.disconnect();
            } catch (e) {
                return await interaction.reply({ content: `Error while disconnecting\nThe error has been handled by the bot\nThe actions before the errors are successfully registered`, ephemeral: true })
            }
            await client.set(interaction.user.id, JSON.stringify(data))
            return await interaction.reply({ content: '✅ Success', ephemeral: true })

        }
        if(args == 'toggle'){
            let oldData = new Map(Object.entries(JSON.parse(await client.get(interaction.user.id))))
            if(oldData.has(name) == false) { 
                return await interaction.reply({ content: `Proxy \`${name}\`not found`, ephemeral: true})
            }
            try {
                var _______ = Object.entries((JSON.parse(await client.get(`toggled_${interaction.user.id}`))))[0][1];
            } catch (e) {
                console.log(e)
            }
                _______ = _______ === false ? true : false
                
            await client.set(`toggled_${interaction.user.id}`, JSON.stringify({[name]: _______ }))
            
            try {
                await client.disconnect();
            } catch (e) {
                return await interaction.reply({ content: `Error while disconnecting\nThe error has been handled by the bot\nThe actions before the errors are successfully registered`, ephemeral: true })
            }
            if(_______ == true){
                return await interaction.reply({ content: `Successfully enabled`, ephemeral: true})
            }
            else {
                return await interaction.reply({ content: `Successfully disabled`, ephemeral: true})
            }
            
        }


    },

}