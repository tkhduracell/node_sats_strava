import { completed } from "../lib/sats"

export default defineEventHandler(async (event) => {
    const token = getCookie(event, '.SATS-JWT')
    const userId = getCookie(event, '.SATS-UserId')

    if (!token) return false
    if (!userId) return false

    console.log("Fetching completed...")
    const data = await completed(token, userId);
    console.log("Fetched completed:", data)

    return data
})