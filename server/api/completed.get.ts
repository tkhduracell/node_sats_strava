import { getSessionValue } from "../lib/cookie"
import { internalError, unauthorized } from "../lib/responses"
import { completed } from "../lib/sats"

export default defineEventHandler(async (event) => {
    const token = getSessionValue(event, 'Sats-JWT')
    const userId = getSessionValue(event, 'Sats-UserId')

    if (!token) return await unauthorized(event, 'No SATS token')
    if (!userId) return await unauthorized(event, 'No SATS user')

    console.log("Fetching completed...")
    const data = await completed(token, userId);
    console.log("Fetched", data?.length, "activities")

    if (data) return data

    return await internalError(event, 'Failed to fetch completed')
})