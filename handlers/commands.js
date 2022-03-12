const { readdirSync } = require('fs');
const dir_ = __dirname + '\\../\/scripts/';
module.exports = async(client) => {
    readdirSync(dir_).map(async dir => {
        const commands = readdirSync(`${dir_}${dir}/`).map(async cmd=> {
            let pull = require(`${dir_}${dir}/${cmd}`)
            client.commands.set(pull.name, pull, pull.description)
            if (pull.aliases) {
                pull.aliases.map(p => client.aliases.set(p, pull))
            }
        })
    })
}