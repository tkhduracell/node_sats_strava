import { completed } from "../lib/sats"

export default defineEventHandler(async (event) => {
    const token = getCookie(event, '.SATS-JWT')
    const userId = getCookie(event, '.SATS-UserId')

    if (!token) return await setResponseStatus(event, 403, 'No SATS token')
    if (!userId) return await setResponseStatus(event, 403, 'No SATS userId')

    console.log("Fetching completed...")
    const data = await completed(token, userId);
    console.log("Fetched completed:", data)

    return data
})