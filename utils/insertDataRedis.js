const { createClient } = require('redis')
const client = createClient({ url: `redis://default:${process.env.REDIS_MASTER_PASSWORD}@172.31.214.125:6379` })
const { MessageAttachment } = require('discord.js');
client.connect()




const Error = require('./errors/extensibleErrors.js')

class InsertRedis {

    async insert(id, data){
        if(typeof data === "undefined") return new Error(`Data must not be empty\nReceived: ${typeof data}`)
        if(typeof JSON.parse(data) !== "object") throw new Error(`Data must be an Object\nReceived: ${typeof data}`)
        await client.set(id, data).catch((err, result) => {
            if(err) return new Error(`${err}`)
        })
        return "ok"
    }
    async get(id){
        const data = await client.get(id).catch((err, result) => {
            if(err) return new Error(`${err}`)
        })
        return data
    }
    async health(){
        let start = new Date().getTime()
        const ms = await client.ping().then(() => {
            return new Date().getTime()- start
        }).catch((err) => {
            return new Error(`${err}`)
        })
        return ms
    }
    timeout(){
        return 'There was an error while trying to connect to the Redis database. Please try again later.\nIf the error persists, please contact Kamigen#0001.'
    }
}
module.exports = InsertRedis