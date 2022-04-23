
var kube = require('../k8s.js')
var client = new kube
const yaml = require('js-yaml');
const fs = require('fs');
const default_c = yaml.load(fs.readFileSync(__dirname + '../\/../\/default_config.yaml', 'utf8'));
const Error = require('./errors/extensibleErrors.js')


class InsertKubernetes {
    constructor(message, data) {
        if(typeof data === "undefined") return new Error(`Data must not be empty\nReceived: ${typeof data}`)
        if(data.constructor !== Object) return new Error(`Data must be an Object\nReceived: ${typeof data}`)
        this.message = message
        this.data = data
        this.reply = message.reply.bind(message)
    }
    async k8s() {
        let data = this.data
        //console.log(((this.message.guildId).replace(/\["']/g, '')))
        await client.client.loadSpec()
        
        try {
            var ___ = await client.client.apis["stable.storage.com"].v1.ns("config").kamiplurial(this.message.guildId).get()
            } catch {
                
                default_c.metadata.name = this.message.guildId
                default_c.spec.id = ((this.message.guildId).replace(/\["']/g, ''))
                try {
                await client.client.apis["stable.storage.com"].v1.ns("config").kamiplurial.post({ body: default_c })
                } catch {
                    this.reply(`Uh oh, something went wrong. Please try again later.`)
                }
            }

        //console.log(map)
        let before = new Date().getTime()
        let result = ___.body.spec
        let newObj = Object.assign({}, result, this.data);
        default_c.spec = newObj
        default_c.metadata.name = this.message.guildId
        //console.log(default_c.spec)
        try {
        client.client.apis["stable.storage.com"].v1.ns("config").kamiplurial(this.message.guildId).patch({ body: { spec: default_c.spec } })
        } catch {}
        let after = new Date().getTime()
        let lapse = after - before
        
        delete this.message
        delete this.data
        delete this.reply
        return { success: true, lapse: lapse, oldConfig: data, newData: newObj }
    }
}
module.exports = InsertKubernetes

