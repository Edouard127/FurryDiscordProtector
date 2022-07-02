import { slash } from '../etc/globalStorage';
import { readdirSync } from 'fs';
module.exports = async() => {
    readdirSync("./slash/").map(async dir => {
        readdirSync(`./slash/${dir}/`).map(async cmd=> {
            let pull = require(`../slash/${dir}/${cmd}`)
            slash.set(pull.name, pull)
        })
    })
}