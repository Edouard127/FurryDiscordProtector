var kube = require('../k8s.js')
var client = new kube
const yaml = require('js-yaml');
const fs = require('fs');
const default_c = yaml.load(fs.readFileSync(__dirname + '../\/../\/default_config.yaml', 'utf8'));
const error = require('./errors/extensibleErrors.js')

class GetKubernetes {

    constructor(message) {
        this.message = message
    }
    async k8s() {
        //console.log(((this.message.guildId).replace(/\["']/g, '')))
        await client.client.loadSpec()
        let before = new Date().getTime()
        try {
        var __ = await client.client.apis["stable.storage.com"].v1.ns("config").kamiplurial(this.message.guildId).get()
        } catch {
            //console.log('0')
            default_c.metadata.name = this.message.guildId
            default_c.spec.id = ((this.message.guildId).replace(/\["']/g, ''))

            await client.client.apis["stable.storage.com"].v1.ns("config").kamiplurial.post({ body: default_c })
        }
        let after = new Date().getTime()
        let lapse = after - before
        return { success: true, lapse: lapse, data: __.body }



    }
}
module.exports = GetKubernetes

