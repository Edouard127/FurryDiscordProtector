import { AntiRaidManager } from 'discord-antiraid'
import { readdirSync } from 'fs'
import 'colors'
export default (client: AntiRaidManager) => {
  const load = async(dirs: string) => {
    const events = readdirSync(`./events/raid/${dirs}/`).filter((d: string) => d.endsWith("js") );
    for (let file of events) {
      let evt = await import(`../events/raid/${dirs}/${file}`);
      let eName = file.split('.')[0];
      client.on(eName as any, evt.bind(null,client));
      console.log('[Raid Event]'.yellow + ` Loaded ` + eName.green + '.');
    }
  };
  load("guild");
};