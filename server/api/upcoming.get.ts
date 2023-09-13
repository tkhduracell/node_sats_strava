import { upcoming } from "../lib/sats"
import { internalError, unauthorized } from "../lib/responses"

export default defineEventHandler(async (event) => {
    const token = getCookie(event, '.SATS-JWT')
    const userId = getCookie(event, '.SATS-UserId')
    console.log('Cookies', {token, userId})

    if (!token) return await unauthorized(event, 'No SATS token')
    if (!userId) return await unauthorized(event, 'No SATS userId')

    console.log("Fetching upcoming...")
    const data = await upcoming(token);
    console.log("Fetched upcoming:", data)

    if (data) return data

    return await internalError(event, 'Failed to fetch completed')
})