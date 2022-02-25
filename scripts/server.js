const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const os = require('os')
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }

exports.run = (message, args) => {
    var threads = 0
    var model = ''
    var clock = 0
    for(var i = 0; i <os.cpus().length; i++) {
        threads++
        model = os.cpus()[i].model
        clock = os.cpus()[i].speed / 1000
    }
        const ping = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('📊 Nerd Stats')
	.setDescription(`Made for nerds like you 🤓\n
    <:CPU:946565742055292949> CPU Informations:\nModel: ${model}\nNumber of Threads: ${threads}\nClock: ${clock} Ghz\n\n<:RAM:946581194793971712> RAM Informations:\n Total RAM: ${bytesToSize(os.totalmem())}\nFree RAM: ${bytesToSize(os.freemem())}\nRAM Used by process: ${bytesToSize(process.memoryUsage.rss())}`
      )
	.setTimestamp()
	.setFooter({ text: 'Coded by Kamigen#0001', iconURL: 'https://cdn.discordapp.com/avatars/385441179069579265/864fa98fa71abc1258b21435440e097d.png?size=64' });
    message.channel.send({ embeds: [ping] })
    
    

}

exports.name = "server";