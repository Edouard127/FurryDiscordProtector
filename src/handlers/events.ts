import { Client } from 'discord.js';
const { readdirSync } = require("fs");
require('colors');
module.exports = (client: Client) => {
  const load = async(dirs: string) => {
    const events = readdirSync(`./events/${dirs}/`).filter((d: string) => d.endsWith("js") );
    for (let file of events) {
      let evt = await import(`../events/${dirs}/${file}`);
      let eName = file.split('.')[0];
      client.on(eName, evt.bind(null,client));
      console.log('[Events]'.yellow + ` Loaded ` + eName.green + '.');
    }
  };
  ["client", "guild"].forEach((x) => load(x));
};