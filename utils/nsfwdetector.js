const axios = require('axios').default
function isNsfwQ(url, message){
    try {
    axios.get(`https://nsfw-demo.sashido.io/api/image/classify?url=${url}`).then((response, err) => {
        if(err) { throw err }
        if(response.data[0].className === 'Hentai' || response.data[0].className === 'Porn'){
                message.reply(`Your image has been flagged as NSFW, please refrain from posting this kind of stuff`).then(() => {
                    setTimeout(() => message.delete(), 1)
                })
            
        }
    })
} catch(err) {
    console.log(err)
}
}
module.exports = isNsfwQ