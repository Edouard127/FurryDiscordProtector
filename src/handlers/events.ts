import { Client } from 'discord.js';
import { readdirSync } from 'fs'
import 'colors'
export default (client: Client) => {
  const load = async(dirs: string) => {
    const events = readdirSync(`./events/discord/${dirs}/`).filter((d: string) => d.endsWith("js") );
    for (let file of events) {
      let evt = await import(`../events/discord/${dirs}/${file}`);
      let eName = file.split('.')[0];
      client.on(eName, evt.bind(null,client));
      console.log('[Events]'.yellow + ` Loaded ` + eName.green + '.');
    }
  };
  ["client", "guild"].forEach((x) => load(x));
};