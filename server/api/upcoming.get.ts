import { CookieJar } from "tough-cookie"
import { upcoming } from "../lib/sats"
import { internalError, unauthorized } from "../lib/responses"

export default defineEventHandler(async (event) => {
    const login_cookie = getCookie(event, '.SATS-Cookie')
    const login_url = getCookie(event, '.SATS-Url')

    if (!login_cookie) return await unauthorized(event, 'No .SATS-Cookie')
    if (!login_url) return await unauthorized(event, 'No .SATS-Url')

    const jar = new CookieJar()
    await jar.setCookie(login_cookie, login_url);

    console.log("Fetching upcoming...")
    const data = await upcoming(jar);
    console.log("Fetched upcoming:", data)

    if (data) return data

    return await internalError(event, 'Failed to fetch completed')
})