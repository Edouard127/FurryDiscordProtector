import yaml from 'js-yaml';
import fs from 'fs';
import { config, Client1_13, ApiRoot } from 'kubernetes-client'
import DefaultConfig from './types/Kubernetes/DefaultConfig';
const crd = import("./crd.json")
const StorageConfig: DefaultConfig = yaml.load(fs.readFileSync(__dirname + '../../default_config.yaml', 'utf8'));

export default class Kubernetes {
    client: ApiRoot
    constructor() {
        const kubeconfig = config.loadKubeconfig('./k8s.txt')
        const backend = config.fromKubeconfig(kubeconfig)
        this.client = new Client1_13({ backend , version: "1.13"})
        this.client.addCustomResourceDefinition(crd)
    }
    async insert(message, data_) {
        //console.log(((this.message.guildId).replace(/\["']/g, '')))
        
        try {
            var ___ = await this.client.apis.addCustomResourceDefinition(crd)
            } catch {
                
                default_c.metadata.name = message.guildId
                default_c.spec.id = ((message.guildId).replace(/\["']/g, ''))
                try {
                await client.client.apis["stable.storage.com"].v1.ns("config").kamiplurial.post({ body: default_c })
                } catch {
                    message.reply(`Uh oh, something went wrong. Please try again later.`)
                }
            }

        //console.log(map)
        let before = new Date().getTime()
        let result = ___.body.spec
        let newObj = Object.assign({}, result, JSON.parse(data_));
        default_c.spec = newObj
        default_c.metadata.name = message.guildId
        console.log(default_c.spec)
        client.client.apis["stable.storage.com"].v1.ns("config").kamiplurial(message.guildId).patch({ body: { spec: default_c.spec } })
        let after = new Date().getTime()
        let lapse = after - before
        

        return { success: true, lapse: lapse, oldConfig: data_, newData: newObj }
    }
}