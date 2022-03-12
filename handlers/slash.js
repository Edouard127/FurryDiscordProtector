const { readdirSync } = require('fs');
const dir_ = __dirname + '\\../\/slash/';
module.exports = async(client) => {
    readdirSync(dir_).map(async dir => {
        readdirSync(`${dir_}${dir}/`).map(async cmd=> {
            let pull = require(`${dir_}${dir}/${cmd}`)
            client.slash.set(pull.name, pull)
        })
    })
}