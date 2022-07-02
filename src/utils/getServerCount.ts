import { Client } from "discord.js"

export default async function getServerCount(client: Client) {
    if(client.shard == null) return
    // get guild collection size from all the shards
    const req = await client.shard.fetchClientValues("guilds.cache.size");

    // return the added value
    return req.reduce((p, n) => p as any + n as any, 0);
}
