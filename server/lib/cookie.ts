import { H3Event } from 'h3';

export type SessionKey = 'Sats-JWT' | 'Sats-UserId' | 'Strava-JWT'

type Cookieopts = Parameters<typeof setCookie>[3]
const opts: Cookieopts = { httpOnly: true, sameSite: 'strict', secure: true, maxAge: 3600*356 }

export function addSessionValues(event: H3Event, values: Partial<Record<SessionKey, string>>): Partial<Record<SessionKey, string>> {
    const json = getCookie(event, '__session')
    if (json) {
        const obj = JSON.parse(json) as Record<SessionKey, string>
        setCookie(event, '__session', JSON.stringify({ ...obj, ...values }), opts)
        return { ...obj, ...values }
    } else {
        setCookie(event, '__session', JSON.stringify(values), opts)
        return values
    }
}

export function getSessionValue(event: H3Event, key: SessionKey): string | null {
    const json = getCookie(event, '__session')
    if (json) {
        const obj = JSON.parse(json) as Partial<Record<SessionKey, string>>
        return obj[key] ?? null
    }
    return null
}