import { readdirSync, readFileSync, writeFileSync } from 'fs';
const yaml = require('js-yaml');
const dir_ = __dirname + '\\../\/generation/';
export default async () => {
    readdirSync(dir_).map(async (dir: string) => {
        const data = yaml.load(readFileSync(dir_ + dir, 'utf8'));
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
    writeFileSync(__dirname + `/\/../generated/customFunction_${content.guildId}.js`, newFunc)
        
    })
}
/**
 * Need recode
 */