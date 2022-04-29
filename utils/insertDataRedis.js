const { createClient } = require('redis')
const client = createClient({ url: `redis://default:${process.env.REDIS_MASTER_PASSWORD}@172.18.171.106:6379` })
const { MessageAttachment } = require('discord.js');




const Error = require('./errors/extensibleErrors.js')

class InsertRedis {
    

    async insert(id, data, interaction){
        let before = new Date().getTime()
        if(typeof data === "undefined") return new Error(`Data must not be empty\nReceived: ${typeof data}`)
        if(typeof JSON.parse(data) !== "object") throw new Error(`Data must be an Object\nReceived: ${typeof data}`)
        let previous = await client.get(id)
        console.log(typeof previous, data, JSON.stringify(previous))
        if(typeof JSON.parse(previous) != "object") {
            await client.set(id, JSON.stringify({}))
            let file = new MessageAttachment(Buffer.from(previous, 'utf-8'), 'data.json')
            return await interaction.reply({ content: 'Something went wrong while trying to insert the data.\nThis could be a corrupted configuration', files: [file]})
        }
        data = Object.assign(JSON.parse(previous), data)
        console.log(data)        
        await client.set(id, JSON.stringify(data)).then((response) => {
            console.log(response)
        }).catch((err) => {
            client.connect().catch()
            return new Error(`${err}`)
        })
        let after = new Date().getTime()
        let diff = after - before
        return { success: true, lapse: diff }
    }
    async get(id, interaction){
        const data = await client.get(id).catch((err) => {
            client.connect().catch()
            return new Error(`${err}`)
        })
        
        if(typeof JSON.parse(data) != "object"){
            let file = new MessageAttachment(Buffer.from(JSON.parse(data), 'utf-8'), 'data.json')
            await client.set(id, JSON.stringify({}))
            return await interaction.reply({ content: 'Uh oh, something went wrong on our side.\nThis could be a corrupted configuration\nWe will restore the configuration to a valid state.', files: [file]})
        } 
        return data
    }
    async health(){
        let start = new Date().getTime()
        const ms = await client.ping().then(() => {
            console.log('a')
            return new Date().getTime() - start
        }).catch((err) => {
            client.connect().catch()
            return new Error(`${err}`)
        })
        return ms
    }
    timeout(){
        return 'There was an error while trying to connect to the Redis database. Please try again later.\nIf the error persists, please contact Kamigen#0001.'
    }
}
module.exports = InsertRedis