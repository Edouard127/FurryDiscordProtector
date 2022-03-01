const ReadText = require('text-from-image')

const axios = require('axios');

var w = /f*u*[c*|k*]* fu[rr|r]|d*o*g*f*u*c*k[e|r]|d(e|ea)d fur|h(8|ate) furr/gmi

async function profanity(url, message){
    var word = message.content
if (word.match(w)) {
    console.log('profanity detected')
}

ReadText(url).then(text => {
    console.log(text);
    if (text.match(w)) {
        message.reply('Furry hate detected')
    }
}).catch(err => {
    console.log(err);
})




axios.get('https://api.sightengine.com/1.0/check.json', {
    params: {
        'url': `${url}`,
        'models': 'wad,offensive,text-content,gore',
        'api_user': '817805869',
        'api_secret': 'jMPG5uUgRY34GXLacV6o',
    }
})
    .then(response => {
        console.log(response)
        // on success: handle response
        switch(true){
            case (response.data.weapon >= 0.50): {
                message.reply('Weapon detected')
            }
            break;
            case (response.data.drugs >= 0.50): {
                message.reply('Drugs detected')
            }
            break;
            case (response.data.gore >= 0.40): {
                message.reply('Gore detected')
            }
            break;
        }
    })
    .catch(function (error) {
        // handle error
        if (error.response) console.log(error.response.data);
        else console.log(error.message);
    })
}
module.exports = profanity