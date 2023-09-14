import { getSessionValue } from "../lib/cookie"

export default defineEventHandler(async (event) => {
    return { userId: !!getSessionValue(event, 'Sats-UserId') }
})