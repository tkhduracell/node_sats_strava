import { StravaActivity, StravaCreateActivity } from "./StravaActivity"

export async function createActivity(token: string, activity: StravaCreateActivity) {

    const body = new URLSearchParams()
    body.append('name', activity.name)
    // body.append('type', activity.type)
    body.append('sport_type', activity.sport_type)
    body.append('start_date_local', activity.start_date_local)
    body.append('elapsed_time', activity.elapsed_time.toFixed(0))
    body.append('description', activity.description)
    body.append('distance', activity.distance.toFixed(0))
    body.append('trainer', activity.trainer.toFixed(0))
    body.append('commute', activity.commute.toFixed(0))


    const res = await fetch("https://www.strava.com/api/v3/activities",{
        headers: {"Authorization": "Bearer " + token},
        method: 'POST',
        body
    })

    if (res.ok) {
        const data = await res.json() as StravaActivity
        console.log('Activity uploaded!', data)
        return data
    }

    console.error('Failed to create activity', res.status, res.statusText)
    return null
}


export type StravaSportType = 'AlpineSki'
| 'BackcountrySki'
| 'Badminton'
| 'Canoeing'
| 'Crossfit'
| 'EBikeRide'
| 'Elliptical'
| 'EMountainBikeRide'
| 'Golf'
| 'GravelRide'
| 'Handcycle'
| 'HighIntensityIntervalTraining'
| 'Hike'
| 'IceSkate'
| 'InlineSkate'
| 'Kayaking'
| 'Kitesurf'
| 'MountainBikeRide'
| 'NordicSki'
| 'Pickleball'
| 'Pilates'
| 'Racquetball'
| 'Ride'
| 'RockClimbing'
| 'RollerSki'
| 'Rowing'
| 'Run'
| 'Sail'
| 'Skateboard'
| 'Snowboard'
| 'Snowshoe'
| 'Soccer'
| 'Squash'
| 'StairStepper'
| 'StandUpPaddling'
| 'Surfing'
| 'Swim'
| 'TableTennis'
| 'Tennis'
| 'TrailRun'
| 'Velomobile'
| 'VirtualRide'
| 'VirtualRow'
| 'VirtualRun'
| 'Walk'
| 'WeightTraining'
| 'Wheelchair'
| 'Windsurf'
| 'Workout'
| 'Yoga'
