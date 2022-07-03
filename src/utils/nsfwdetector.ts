import { Message } from "discord.js";
import { Prediction } from "../types/NSFW/classed";
import NRequest from "../types/NSFW/NRequest";

const axios = require('axios')
const db = require('quick.db')



async function classify(url: URL, message: Message){
  const threshold: number = await db.get(`${message.guild!.id}.nsfwThreshold`) || 0.50
  let req: NRequest = await axios.get(`http://localhost:3000/api/classify?url=${url}`).data
  const className: Prediction = req.data.predictionClass[0]
  
  if(className.className == "Hentai" && className.prediction >= threshold || className.className == "Porn" && className.prediction >= threshold){
    const self = await message.guild?.fetchMe() 
    if(self!.permissions.has(BigInt(1 << 13))){
      message.reply("Your image has been flagged as NSFW, please refrain from posting this kind of stuff").then(() => {
      message.delete().catch(err => err)
      })
    }
  }
}
module.exports = classify