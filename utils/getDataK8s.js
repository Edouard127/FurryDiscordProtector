var kube = require('../k8s.js')
var client = new kube
const yaml = require('js-yaml');
const fs = require('fs');
const default_c = yaml.load(fs.readFileSync(__dirname + '../\/../\/default_config.yaml', 'utf8'));
const error = require('./errors/extensibleErrors.js')
const axios = require('axios').default
const https = require('https')

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
    async isAlive(){
        const agent = new https.Agent({  
            rejectUnauthorized: false
          });
        let url = 'http://192.168.0.20:8080'
        let _ = await axios({
            method: 'get',
            url: url,
            timeout: 2000
        }, { httpsAgent: agent }).then(async() => { return { isAlive: true } })
        .catch(async(err) => {
            return { isAlive: false }
        })
        return _.isAlive
    }
    timeout(){
        return 'There was an error while trying to connect to the Kubernetes Cluster. Please try again later.\nIf the error persists, please contact Kamigen#0001.\nThe error is likely caused by the machine being offline or unavailable.\nThe unavailability is caused by an unknown issue with the server that we are not able to identify 😭.\nIf you wish to help us to buy a new machine, you can support the developer by sending a little bit of money to <https://paypal.me/naoris2020/>'
    }
}
module.exports = GetKubernetes