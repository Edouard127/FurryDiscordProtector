const getServerCount = async (client) => {
    // get guild collection size from all the shards
    const req = await client.shard.fetchClientValues("guilds.cache.size");

    // return the added value
    return req.reduce((p, n) => p + n, 0);
}

module.exports = getServerCount