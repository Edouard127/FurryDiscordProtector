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

  const classify = async (url, message) => {
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
      return result;
    }
  
    try {
        var predictions = null
      // Image must be in tf.tensor3d format
      // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
      const image = await tf.node.decodeImage(pic.data, 3);
      predictions = await model.classify(image);
  
      image.dispose(); // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
  
      result = predictions;
    } catch (err) {
      console.error("Prediction Error: ", err);
      result.error = "Model is not loaded yet!";
      return result;
    }
  
    console.log(result[0]);
    let threshold
    (async () => {
      threshold = await db.get(`${message.guild.id}.nsfwThreshold`) || 0.50
    })().then(() => {
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
          message.reply(`Your image has been flagged as GORE, please refrain from posting this kind of stuff to avoid your account getting banned from Discord`).then(() => {
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

    })
  };
init()
module.exports = classify