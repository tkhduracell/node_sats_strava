

export default defineEventHandler(async (event) => {
    const { state } = getQuery(event)

    const url = new URL("https://www.strava.com/oauth/authorize")
    url.searchParams.append("client_id", process.env.STRAVA_CLIENT_ID ?? '')
    url.searchParams.append("redirect_uri", process.env.STRAVA_REDIRECT_URL ?? "http://localhost:3000/api/strava_auth_exchange")
    url.searchParams.append("response_type", "code")
    url.searchParams.append("approval_prompt", "auto")
    url.searchParams.append("scope", "read,activity:write")
    url.searchParams.append("state", typeof state == 'string' ? state : '')

    await sendRedirect(event, url.toString(), 307)
})