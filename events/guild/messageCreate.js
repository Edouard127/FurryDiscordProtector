const Timeout = new Set();
const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const humanizeDuration = require("humanize-duration");
const fs = require("fs");
const db = require("quick.db");
const spam_ = require("../../utils/antispam.js")
const isNsfwQ = require('../../utils/nsfwdetector.js')
const profanityImage = require('../../utils/profanityImage.js');
const profanityText = require('../../utils/profanityText.js');
const getDataK8s = require('../../utils/getDataK8s.js');
const { createClient } = require('redis');

const client_r = createClient({ url: `redis://default:${process.env.REDIS_MASTER_PASSWORD}@192.168.0.66:6379` });
try {
    client_r.connect()
} catch {}


module.exports = async (client , message) => {

    //client_r.connect()
    //console.log(message.author.id)
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    //if (!message.content.toLowerCase().startsWith(prefix)) return;
    //if (!message.member) message.member = await message.guild.members.fetch(message.member.id);
    if (!message.guild) return;
        const dir_ = __dirname + '\\..\\../\/generated/';
        /*fs.readdirSync(dir_).forEach(command => {
            var cum = require(`../../generated/${command}`)
            cum(message)
        })*/
    /*console.log(await (client_r.get("toggled")))
    
    var _____ = new Map(Object.entries(JSON.parse(await (client_r.get("toggled"?.[message.author.id])))))
    //console.log(_____)
        for (const key of _____) {
            let _ = Object.entries(key[1])
        }
        delete _____
        client_r.disconnect()*/
        try {
        var _______ = Object.entries((JSON.parse(await client_r.get(`toggled_${message.author.id}`))))[0];
        } catch {}
        async function proxy_avatar() {
            try {
            var ___ = new Map(Object.entries(JSON.parse(await client_r.get(message.author.id))))
            } catch {}
            for (var key of ___) {
                let re = new RegExp('^'+_______[0]+'$', "gm");
                if (key[0].match(re)) {
                    return key[1]?.avatar
                }
            }
            await client_r.set(`toggled_${message.author.id}`, JSON.stringify({[_______[0]]: false }))
            return await message.reply({ content: `No proxy found for \`${_______[0]}\`, disabling`, ephemeral: true })
    
        }
        if(typeof _______ !== "undefined"){
        if(_______[1] === true) {
        let oldData = new Map(Object.entries(JSON.parse(await client_r.get(message.author.id).catch(()=> {}))))
        if(oldData.has(_______[0]) == false) { 
            await client_r.set(`toggled_${message.author.id}`, JSON.stringify({[_______[0]]: false }))
            return await message.reply({ content: `Proxy \`${_______[0]}\`not found, disabling`, ephemeral: true})
        }
        else {
            let webhookCollection = await message.channel.fetchWebhooks();
            if (webhookCollection.size > 0) {
                for (key of webhookCollection) {
                    if (key?.owner?.id == message.client.id) {
                        let wb = key[1]
                        await wb.edit({ name: _______[0], avatar: await proxy_avatar() })
                        try {
                            wb.send({ content: message.content, allowedMentions: { "users": [] } })
                            return await message.delete()
                        } catch {}
                    }
                }
            }
            else {
                let wb = await message.channel.createWebhook("Proxies");
                await wb.edit({ name: _______[0], avatar: await proxy_avatar() })
                try {
                    wb.send({ content: message.content, allowedMentions: { "users": [] } })
                    await message.delete()
                } catch {}

            }
        }
    }
}

    var __ = await new getDataK8s(message).k8s()
    var check = __.data.spec
    if (!message.author.bot && message.channel.type !== "dm") {
        if (!message.channel.nsfw) {

                //console.log(message)

                if (check.hasOwnProperty('profanityCheck')) {
                    if(check.profanityCheck == true){
                    profanityText(message)
                    }
                }
            if (message.attachments) {
                    if (check.hasOwnProperty('nsfwCheck')) {
                        if(check.nsfwCheck == true){

                        message.attachments.forEach(attachments => {

                            var url = attachments.proxyURL
                            isNsfwQ(url, message, client)

                                if (check.hasOwnProperty('profanityCheck')) {
                                    if(check.nsfwCheck == true){
            
                                            profanityImage(url, message)
                                        }
                                    }
                            })
                    }
                    }






            }
        }


            if (check.hasOwnProperty('spamCheck')) {
                spam_(message, client)
            }
        let array = message.content.split(" ")
        for (let arr in array) {
            if (array[arr].match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i)) {
                    if (check.hasOwnProperty('nsfwCheck')) {
                        let url = array[arr]
                        if(check.hasOwnProperty('excludes'))
                        check.forEach(data => {
                            if(data == message.channel.id){
                                
                                isNsfwQ(url, message, client) 
                            }
                        })
                    }
            }
        }
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return; 
    const command = client.commands.get(cmd) || client.commands.find((x) => x.aliases && x.aliases.includes(cmd));
    if (command) {
        if (command.timeout) {
            if (Timeout.has(`${message.author.id}${command.name}`)) {
                const embed = new MessageEmbed()
                .setTitle('You are in timeout!')
                .setDescription(`:x: You need to wait **${humanizeDuration(command.timeout, { round: true })}** to use command again`)
                .setColor('#ff0000')
                return message.channel.send({ embeds: [embed] })
            } else {
                command.run(client, message, args);
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        } else {
            command.run(client, message, args)
        }
    }

}