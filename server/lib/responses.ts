import { H3Event } from 'h3';

export async function internalError(event: H3Event, msg: string) {
    console.error('InternalError:', msg)
    await setResponseStatus(event, 500)
    return { error: 'InternalError', msg }
}

export async function unauthorized(event: H3Event, msg: string) {
    console.warn('Unauthorized:', msg)
    await setResponseStatus(event, 403)
    return { error: 'Unauthorized', msg }
}

export async function invalidRequest(event: H3Event, msg: string) {
    console.warn('Invalid Request:', msg)
    await setResponseStatus(event, 400)
    return { error: 'InvalidRequest', msg }
}