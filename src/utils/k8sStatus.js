async function GetKubernetesHealth() {
    const axios = require('axios').default
    try {
        const https = require('https');
        const agent = new https.Agent({  
            rejectUnauthorized: false
          });
          const instance = axios.create({
            httpsAgent: new https.Agent({  
              rejectUnauthorized: false
            })})

          instance.interceptors.request.use((config) => {
              config.headers['request-startTime'] = process.hrtime()
              return config
          })
          
          instance.interceptors.response.use((response) => {
              const start = response.config.headers['request-startTime']
              const end = process.hrtime(start)
              const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000))
              response.headers['request-duration'] = milliseconds
              return response
          })
    var data = await instance({ method: 'get',
    url: 'http://192.168.0.20:8080',
    timeout: 2000 }, { httpsAgent: agent }).catch(() => { return { success: false, data: 'No response from cluster' } })
    console.log(data.headers['request-duration'])
    return { success: true, data: `${data.headers['request-duration']} ms` }
    } catch (err){
        return { success: false, data: 'No response from cluster' }
    }
}
module.exports = GetKubernetesHealth