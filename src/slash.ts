import { Client } from "discord.js"

import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import { readdirSync } from 'fs';
import * as path from 'path'
import("colors")

// setup slash commands
if(process.env.TOKEN == undefined) throw new Error("TOKEN is required");

const commands: string[] = []
readdirSync("./slash/").map(async dir => {
	readdirSync(`./slash/${dir}/`).map(async (cmd) => {
	commands.push(require(path.join(__dirname, `./slash/${dir}/${cmd}`)))
    })
})

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
export default async() => {
	if(process.env.BOT_ID == undefined) throw new Error("BOT_ID is required")
	try {
		console.log('[Discord API] Started refreshing application (/) commands.'.yellow);
			try {
			await rest.put(Routes.applicationCommands(process.env.BOT_ID),
				{ body: commands },
			);   
			} catch (e: any){
				if(e.status != 403) console.log(e)
			}
			
		console.log('[Discord API] Successfully reloaded application (/) commands.'.green);
	} catch (error) {
	}
}

