import { internalError, unauthorized } from "../lib/responses"
import { completed } from "../lib/sats"

export default defineEventHandler(async (event) => {
    const token = getCookie(event, '.SATS-JWT')
    const userId = getCookie(event, '.SATS-UserId')
    const session = getCookie(event, '__session')
    console.log('Cookies', {token, userId, session})

    if (!token) return await unauthorized(event, 'No SATS token')
    if (!userId) return await unauthorized(event, 'No SATS userId')

    console.log("Fetching completed...")
    const data = await completed(token, userId);
    console.log("Fetched completed:", data)

    if (data) return data

    return await internalError(event, 'Failed to fetch completed')
})