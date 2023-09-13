import { auth, login } from "../lib/sats"

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event)

    const res = await auth(username, password)
    if (res) {
        const { token, userId } = res
        setCookie(event, '.SATS-JWT', token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 31536000 })
        setCookie(event, '.SATS-UserId', userId, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 31536000 })
        return { token, userId }
    } else {
        return { error: 'failed', message: 'See logs' }
    }
})