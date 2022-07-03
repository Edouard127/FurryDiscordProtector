const permissions = require('discord-bitfield-calculator')

async function permHas(bitfield, permission){
    let a = permissions.permissions(bitfield);
    if(a.includes(permission)){
        return true
    }
    else {
        return false
    }
}
module.exports = permHas
