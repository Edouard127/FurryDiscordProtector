const axios = require('axios')
const db = require('quick.db')


async function classify(url, message, client){
  const threshold = await db.get(`${message.guild.id}.nsfwThreshold`) || 0.50
  const guildLanguages = require('./languages/config/languages.json')
  const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
  const language = require(`./languages/${guildLanguage}.js`);
  let req = await axios.get(`http://localhost:3000/api/classify?url=${url}`);
  let className = req.data.data[0].className; let prob = req.data.data[0].probability;
  if(className === 'Hentai' && prob >= threshold || className === "Porn" && prob >= threshold){
    
    if(!message.guild.me.permissions.has('MANAGE_MESSAGES')){
      message.reply(`${language('_nsfw_warning')}\n\`\`\`I don't have permission to manage messages\`\`\``)
    }
    else {
    message.reply(`${language('_nsfw_warning')}`).then(() => {
      try {
      message.delete()
      } catch {}
  })
}
  }
}
module.exports = classify