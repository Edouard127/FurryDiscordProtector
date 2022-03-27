const yaml = require('js-yaml');
const fs = require('fs');
const crd = yaml.load(fs.readFileSync('./crd.yaml', 'utf8'));
const { KubeConfig,Client } = require('kubernetes-client')
const Request = require('kubernetes-client/backends/request')
const process = require('process');
class Kubernetes {
    constructor() {
        const kubeconfig = new KubeConfig()
        kubeconfig.loadFromFile('./k8s.txt')
        const backend = new Request({ kubeconfig })
        this.client = new Client({ backend , version: "1.13"})
        //this.client.addCustomResourceDefinition(crd)
        
    }
}
module.exports = Kubernetes