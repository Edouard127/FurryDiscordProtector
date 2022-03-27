async function GetKubernetesHealth() {
    const axios = require('axios').default
    try {
        const https = require('https');
        const agent = new https.Agent({  
            rejectUnauthorized: false
          });
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let data = await axios.get('https://192.168.0.20:6443/livez?verbose', { httpAgent: agent })
    //console.log(data)
    return { success: true, data: JSON.stringify(data.data) }
    } catch (err){
        console.log(err)
        return { success: false, data: 'No response from cluster, aborting' }
    }
}
module.exports = GetKubernetesHealth