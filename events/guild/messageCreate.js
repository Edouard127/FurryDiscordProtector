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
const _K8s = require('../../utils/getDataK8s.js');

module.exports = async (client , message) => {
    if (!message.author.bot && message.channel.type !== "dm") {
        if (!message.channel.nsfw) {
            var __ = await new _K8s(message).k8s()
            //console.log(__)
            //console.log(checks)
                var check = __.data.spec
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
                            isNsfwQ(url, message)

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


        let spamCheck
        (async () => {
            spamCheck = await db.get(`${message.guild.id}.spamCheck`) || false
        })().then(() => {
            if (spamCheck === true) {
                spam_(message, client)
            }
        })
        let array = message.content.split(" ")
        for (let arr in array) {
            if (array[arr].match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i)) {
                let nsfwCheck
                (async () => {
                    nsfwCheck = await db.get(`${message.guild.id}.nsfwCheck`) || false
                })().then(() => {
                    if (nsfwCheck === true) {
                        url = array[arr]
                        let uwu
                        (async () => {
                            uwu = await db.get(`${message.guild.id}.excludes`) || []
                                if (!uwu.includes(message.channel.id)) {
                            isNsfwQ(url, message)
                                }
                        })()

                    }
                })
            }
        }
    }
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.members.fetch(message.member.id);
    if (!message.guild) return;
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