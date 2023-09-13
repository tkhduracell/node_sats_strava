import { activity } from "../lib/sats"
import { StravaSportType, createActivity } from "../lib/strava";

const activityMapping: Record<string, StravaSportType> = {
    'Crosstraining': 'Crossfit',
    'BodyPump': 'WeightTraining',
}

export default defineEventHandler(async (event) => {
    const { activity: activityId } = getQuery(event)
    if (typeof activityId !== 'string') return setResponseStatus(event, 400, 'Invalid activity: ' + activity)

    const stravaToken = getCookie(event, 'Strava-Token');
    if (typeof stravaToken !== 'string') return setResponseStatus(event, 400, 'Strava token not valid')

    const satsToken = getCookie(event, '.SATS-JWT');
    if (typeof satsToken !== 'string') return setResponseStatus(event, 400, 'Sats token not valid')

    const res = await activity(satsToken, activityId)

    if (res) {
        const { brand, activityName, date, duration } = res

        const uploaded = await createActivity(stravaToken, {
            name: brand + ' ' + activityName,
            description: '',
            distance: 0,
            elapsed_time: duration * 60,
            start_date_local: date,
            sport_type: activityMapping[activityName] ?? 'Workout',
            trainer: 0,
            commute: 0,
        })
        if (!uploaded) return setResponseStatus(event, 500, 'Failed to upload')

        return uploaded
    }

    return setResponseStatus(event, 500, 'Failed to fetch SATS activity')
})