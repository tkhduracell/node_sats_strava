import { upcoming } from "../lib/sats"
import { internalError, unauthorized } from "../lib/responses"
import { getSessionValue } from "../lib/cookie"

export default defineEventHandler(async (event) => {
    const token = getSessionValue(event, 'Sats-JWT')

    if (!token) return await unauthorized(event, 'No SATS token')

    console.log("Fetching upcoming...")
    const data = await upcoming(token);
    console.log("Fetched upcoming:", data)

    if (data) return data

    return await internalError(event, 'Failed to fetch completed')
})