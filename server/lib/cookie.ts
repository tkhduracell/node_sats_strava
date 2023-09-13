import { H3Event } from 'h3';

export type SessionKey = 'Sats-JWT' | 'Sats-UserId' | 'Strava-JWT'

export function addSessionValues(event: H3Event, values: Partial<Record<SessionKey, string>>): Partial<Record<SessionKey, string>> {
    const json = getCookie(event, '__session')
    if (json) {
        const obj = JSON.parse(json) as Record<SessionKey, string>
        setCookie(event, '__session', JSON.stringify({ ...obj, ...values }))
        return { ...obj, ...values }
    } else {
        setCookie(event, '__session', JSON.stringify(values))
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