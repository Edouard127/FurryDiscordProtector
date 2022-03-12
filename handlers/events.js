const { readdirSync } = require("fs");
require('colors');
const dir_ = __dirname + '\\../\/events/';
module.exports = (client) => {
  const load = dirs => {
    const events = readdirSync(`${dir_}${dirs}/`).filter(d => d.endsWith("js") );
    for (let file of events) {
      let evt = require(`${dir_}${dirs}/${file}`);
      let eName = file.split('.')[0];
      client.on(eName, evt.bind(null,client));
      console.log('[Events]'.yellow + ` Loaded ` + eName.green + '.');
    }
  };
  ["client", "guild"].forEach((x) => load(x));
};