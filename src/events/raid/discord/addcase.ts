import { Case } from 'discord-antiraid/lib/src/interfaces'
export default (memberId: string, guildId: string, event: string, oldCase: Case) => {
    console.log(memberId, guildId, event, oldCase)
}