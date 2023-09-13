import { addSessionValues } from "../lib/cookie"


export default defineEventHandler(async (event) => {
    const { error, code, state } = await getQuery(event)

    if (error) {
        console.error('Error in redirect', error)
        await sendRedirect(event, '/list?error=' + error)
        return
    }

    const body = new URLSearchParams()
    body.append("client_id", process.env.STRAVA_CLIENT_ID ?? '')
    body.append("client_secret", process.env.STRAVA_CLIENT_SECRET ?? '')
    body.append("code", typeof code == 'string' ? code : '')
    body.append("grant_type", 'authorization_code')

    const res = await fetch("https://www.strava.com/oauth/token", {
        method: 'POST',
        body
    })

    if (res.ok) {
        const {expires_at, expires_in, access_token, refresh_token, athlete, token_type} = await res.json()

        addSessionValues(event, { 'Strava-JWT': access_token })
        await sendRedirect(event, '/upload?state=' + (typeof state == 'string' ? state : ''))
    } else {
        console.log('Failed to exchange Strava token', { code: res.status, text: res.statusText })

        await sendRedirect(event, '/list?error=' + error)
    }

})