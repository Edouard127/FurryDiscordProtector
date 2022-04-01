/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// SERVER 943385959679025162 ///////////////////////////////////
function customFunction_943385959679025162(message) {
    if(message.author.bot) return;
    console.log(message.author.id)
  if(message.content == "%test"){
      message.reply(`<@${message.author.id}> OWO`)
  }
}
module.exports = customFunction_943385959679025162
