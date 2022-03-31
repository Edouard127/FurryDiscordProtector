const fs = require('fs');
const dir_ = __dirname + '\\../\/generation/';
module.exports = async(client) => {
    fs.readdirSync(dir_).map(async dir => {
        fs.readFileSync(dir_+dir).map(async (file, data) => {
            console.log(file)
        })
    })
}