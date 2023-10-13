import { getSessionValue } from "../lib/cookie";
import { internalError, invalidRequest } from "../lib/responses";
import { activity } from "../lib/sats"
import { StravaSportType, createActivity } from "../lib/strava";

const activityMapping: Record<string, StravaSportType> = {
    'Crosstraining': 'Crossfit',
    'BodyPump': 'WeightTraining',
}

export default defineEventHandler(async (event) => {
    const { activity: activityId } = getQuery(event)
    if (typeof activityId !== 'string') return await invalidRequest(event, 'Invalid activity: ' + activity)

    const stravaToken = getSessionValue(event, 'Strava-JWT')
    if (typeof stravaToken !== 'string') return await invalidRequest(event, 'Strava token not valid')

    const satsToken = getSessionValue(event, 'Sats-JWT')
    if (typeof satsToken !== 'string') return await invalidRequest(event, 'Sats token not valid')

    const res = await activity(satsToken, activityId)

    if (res) {
        const { brand, activityName, date, duration } = res

        const uploaded = await createActivity(stravaToken, {
            name: brand.toUpperCase() + ': ' + activityName,
            description: 'Uploaded with https://sats-strava.web.app/',
            distance: 0,
            elapsed_time: duration * 60,
            start_date_local: date,
            sport_type: activityMapping[activityName] ?? 'Workout',
            trainer: 0,
            commute: 0,
        })

        if (uploaded) return uploaded

        return await internalError(event, 'Failed to upload')
    }

    return await internalError(event,  'Failed to fetch SATS activity')
})