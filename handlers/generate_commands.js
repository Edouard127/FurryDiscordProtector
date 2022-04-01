const fs = require('fs');
const yaml = require('js-yaml');
const dir_ = __dirname + '\\../\/generation/';
module.exports = async (client) => {
    fs.readdirSync(dir_).map(async dir => {
        const data = yaml.load(fs.readFileSync(dir_ + dir, 'utf8'));
        const content = data
        var newFunc = `/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// SERVER ${content.guildId} ///////////////////////////////////
function customFunction_${content.guildId}(message) {
    if(message.author.bot) return;
    console.log(message.author.id)
  if(message.content == "${content.prefix}${content.arg}"){
      message.reply(\`${content.response}\`)
  }
}
module.exports = customFunction_${content.guildId}
`;
        fs.writeFile(__dirname + `/\/../generated/customFunction_${content.guildId}.js`, newFunc, function (err) {
            if (err) throw err
        })
    })
}