import { addSessionValues } from "../lib/cookie"
import { invalidRequest, unauthorized } from "../lib/responses"
import { auth } from "../lib/sats"

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event)

    if (!username) return await invalidRequest(event, 'No "username" provided')
    if (!password) return await invalidRequest(event, 'No "password" provided')

    const res = await auth(username, password)
    if (res) {
        const { token, userId } = res
        addSessionValues(event, { 'Sats-JWT':  token, 'Sats-UserId': userId})
        return { token, userId }
    } else {
        return await unauthorized(event, 'SATS auth failed')
    }
})