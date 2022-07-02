import { Collection } from 'discord.js'

interface StoredCollection {
    [key: string]: Collection<string[], NodeModule>

}