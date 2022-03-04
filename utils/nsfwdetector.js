const tf = require('@tensorflow/tfjs-node')
const nsfw = require("nsfwjs")
const axios = require('axios')
const db = require('quick.db')



const model_url = "https://nsfw-detector.000webhostapp.com/"
const shape_size = "299"

let module_vars = { model: null };
const init = async () => {
if (!module_vars.model) {
    try {
      module_vars.model = await nsfw.load(model_url, { size: parseInt(shape_size) });
      console.info("The NSFW Model was loaded successfuly!");
    } catch (err) {
      console.error(err);
    }
  }
}

  async function classify(url, message) {
    const guildLanguages = require('./languages/config/languages.json')
    const guildLanguage = guildLanguages[message.guild.id] || "en"; // "english" will be the default language
    const language = require(`./languages/${guildLanguage}.js`);
    let pic; 
    let result = {};
  
    const { model } = module_vars;
  
    try {
      pic = await axios.get(url, {
        responseType: "arraybuffer",
      });
    } catch (err) {
      console.error("Download Image Error:", err);
      result.error = err;
      return err
    }
  
    try {
        var predictions = null
      // Image must be in tf.tensor3d format
      // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
      let isImage = url.split("/")
      let imagecheck = isImage[isImage.length - 1].split(".")
      var image
        
        if(imagecheck[imagecheck.length - 1] === "png" || imagecheck[imagecheck.length - 1] === "jpg" || imagecheck[imagecheck.length - 1] === "jpeg"){
          image = await tf.node.decodeImage(pic.data, 3);
          predictions = await model.classify(image);
          }
        else if(imagecheck[imagecheck.length - 1] === "gif"){
          image = pic.data
          predictions = await model.classifyGif(image);
        }
  
    
        result = predictions;
        console.log(result[0]);
        let threshold
          threshold = await db.get(`${message.guild.id}.nsfwThreshold`) || 0.50
          axios.get('https://api.sightengine.com/1.0/check.json', {
            params: {
              'url': url,
              'models': 'gore',
              'api_user': process.env.API_U,
              'api_secret': process.env.API_S,
            }
          })
          .then(function (response) {
            let gore = response.data.gore.prob
            console.log(gore)
            if(gore >= threshold){
              message.reply(`${language('_gore_message')}`).then(() => {
                try {
                setTimeout(() => message.delete().catch(), 0)
                } catch {}
            })
            }
          })
          .catch(function (error) {
            // handle error
            if (error.response) console.log(error.response.data);
            else console.log(error.message);
          });
          if(result[0].className === "Hentai" && result[0].probability >= threshold || result[0].className === "Porn" && result[0].probability >= threshold) {
            message.reply(`Your image has been flagged as NSFW, please refrain from posting this kind of stuff`).then(() => {
                try {
                setTimeout(() => message.delete().catch(), 0)
                } catch {}
            })
        }
    
    } catch (err) {
      console.error("Prediction Error: ", err);
      result.error = "Model is not loaded yet!";
      return result;
    }
  

  };
init()
module.exports = classify