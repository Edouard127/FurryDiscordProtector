const { Client, MessageEmbed, Collection, User } = require("discord.js");
const fs = require('fs');



fs.readdir('./events/', (err, files) => { // We use the method readdir to read what is in the events folder
    if (err) return console.error(err); // If there is an error during the process to read all contents of the ./events folder, throw an error in the console
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`); // Here we require the event file of the events folder
        if (eventFunction.disabled) return; // Check if the eventFunction is disabled. If yes return without any error

        const event = eventFunction.event || file.split('.')[0]; // Get the exact name of the event from the eventFunction variable. If it's not given, the code just uses the name of the file as name of the event
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; // Here we define our emitter. This is in our case the client (the bot)
        const once = eventFunction.once; // A simple variable which returns if the event should run once

        // Try catch block to throw an error if the code in try{} doesn't work
        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args)); // Run the event using the above defined emitter (client)
        } catch (error) {
            console.error(error.stack); // If there is an error, console log the error stack message
        }
    });
});



const client = new Client({ autoReconnect: true, max_message_cache: 0, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_VOICE_STATES",], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],/*, disableEveryone: true*/ });
const { Player } = require("discord-player");

client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
["commands", "events", "slash"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
const player = new Player(client);
player.on("channelEmpty", async (queue) => {
    queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
    queue.destroy()
})
player.on("botDisconnect", (queue) => {
    queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!");
    queue.destroy()
})

// Read the Commands Directory, and filter the files that end with .js


process.on('unhandledRejection', error => {
    console.log('Unhandled promise rejection:', error);
});
process.on('uncaughtException', error => {
    console.log('Uncaught Exception:', error);
})

client.login(process.env.TOKEN)
