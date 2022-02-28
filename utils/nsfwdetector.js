const axios = require('axios').default
async function isNsfwQ(url, message){
    try {
    var data = await axios.get(`https://nsfw-demo.sashido.io/api/image/classify?url=${url}`)
        console.log(data.data)
        if(err) { throw err }
        try {
        if(data.data[0].className === 'Hentai' || data.data[0].className === 'Porn'){
                message.reply(`Your image has been flagged as NSFW, please refrain from posting this kind of stuff`).then(() => {
                    try {
                    setTimeout(() => message.delete().catch(), 0)
                    } catch {}
                })
            
        }
    } catch(err){}
        /*else if(response.data[1].className === 'Hentai' || response.data[1].className === 'Porn'){
            message.reply(`Your image has been flagged as NSFW, please refrain from posting this kind of stuff`).then(() => {
                setTimeout(() => message.delete(), 1)
            })
        }*/
    
} catch(err) {
    console.log(err)
}
}
module.exports = isNsfwQ