class Base64 {
    constructor(data){
        this.data = data;
    }
    async encode(){
    let buff = Buffer.from(this.data, 'ascii')
    let base64data = buff.toString('hex');
    return base64data || 0
    }
    async decode(){
    let buff = Buffer.from(this.data, 'hex')
    let base64data = buff.toString('ascii')
    return base64data || 0
    }
}
module.exports = Base64;