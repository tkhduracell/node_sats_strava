import { invalidRequest, unauthorized } from "../lib/responses"
import { auth } from "../lib/sats"

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event)

    if (!username) return await invalidRequest(event, 'No "username" provided')
    if (!password) return await invalidRequest(event, 'No "password" provided')

    const res = await auth(username, password)
    if (res) {
        const { token, userId } = res
        setCookie(event, '.SATS-JWT', token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 31536000 })
        setCookie(event, '.SATS-UserId', userId, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 31536000 })
        return { token, userId }
    } else {
        return await unauthorized(event, 'SATS auth failed')
    }
})