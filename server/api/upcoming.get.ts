import { CookieJar } from "tough-cookie"
import { upcoming } from "../lib/sats"

export default defineEventHandler(async (event) => {
    const login_cookie = getCookie(event, '.SATS-Cookie')
    const login_url = getCookie(event, '.SATS-Url')

    if (!login_cookie) return setResponseStatus(event, 403)
    if (!login_url) return setResponseStatus(event, 403)

    const jar = new CookieJar()
    await jar.setCookie(login_cookie, login_url);

    console.log("Fetching upcoming...")
    const data = await upcoming(jar);
    console.log("Fetched upcoming:", data)

    return data
})