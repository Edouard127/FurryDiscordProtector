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
    let data = await instance.get('https://192.168.0.20:6443/livez', { httpsAgent: agent })
    //console.log(data)
    return { success: true, data: `OK: ${data.headers['request-duration']} MS` }
    } catch (err){
        return { success: false, data: 'No response from cluster, aborting' }
    }
}
module.exports = GetKubernetesHealth