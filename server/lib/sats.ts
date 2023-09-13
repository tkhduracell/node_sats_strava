import { CookieJar } from 'tough-cookie'
import { CompletedActivity, CompletedActivityPage } from './CompletedActivity';
import { UpcomingActivityPage } from './UpcomingActivityPage';
import { Activity } from './Activity';

// const {cookie: login_cookie, url: login_url} = await login(process.env.SATS_USERNAME ?? '', process.env.SATS_PASSWORD ?? '');
// const jar = new CookieJar()
// const c = await jar.setCookie(login_cookie, login_url);

export async function upcoming(jar: CookieJar) {
    const res = await fetch("https://www.sats.se/mina-sidor/kommande-traning", {
        "headers": {
            "Cookie": await jar.getCookieString("https://www.sats.se/mina-sidor/kommande-traning"),
            "Referer": "https://www.sats.se/mina-sidor",
        },
        redirect: 'manual'
    });
    if (res.ok) {
        const text = await res.text()
        const json = JSON.parse(text.match(/<script data-props="true" type="application\/json">\s*(.*?)\s*<\/script>/)?.[1] ?? '{}')

        const { myUpcomingTraining } = json as UpcomingActivityPage

        const out = [] as {centerName: string, activityName: string, startTime: string, date: string}[]
        for (const {upcomingTrainings} of myUpcomingTraining) {
            for (const {centerName, activityName, startTime, date} of upcomingTrainings.trainings) {
                out.push({ centerName, activityName, startTime, date });
            }
        }
        return out
    } else {
        console.error('Failed to fetch upcoming', res.statusText, res.status);
        return null
    }
}

export async function auth(username: string, password: string): Promise<{ token: string, userId: string } | null> {
    const res = await fetch("https://hfnapi.sats.com/api/sats/auth/login", {
      headers: {
        "Accept": "*/*",
        "Time-Zone": "Europe/Stockholm",
        "targeting-group": "all",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-SE, sv-SE",
        "Content-Type": "application/json",
        "User-Agent": "iOS/5.6.0b2779",
        "Connection": "keep-alive",
        "Ocp-Apim-Subscription-Key": "21438312008e4f73890f01a499293a7a",
        "X-preferred-language": "en-SE",
      },
      body: JSON.stringify({ "passWord": password, "userId": username }),
      method: "POST"
    });

    if (res.ok) {
        const { token, userId } = await res.json()
        return { token, userId }
    } else {
        console.error('Request to auth failed', { status: res.status, statusText: res.statusText })
        return null
    }
}

export async function completed(token: string, userId: string): Promise<CompletedActivity[] | null> {
    const res = await fetch(`https://hfnapi.sats.com/sats-mobileapp-bff/legacy/members/${userId}/completed-activities?page=0&pageSize=10`, {
      headers: {
        "Content-Type": "application/json",
        "X-preferred-language": "en-SE",
        "targeting-group": "all",
        "Accept": "*/*",
        "X-CookieAuthentication": "Auth-SatsElixia=" + token,
        "User-Agent": "iOS/5.6.0b2779",
        "Accept-Language": "en-SE, sv-SE",
        "Accept-Encoding": "gzip, deflate, br",
        "Ocp-Apim-Subscription-Key": "21438312008e4f73890f01a499293a7a",
      }
    });

    if (res.ok) {
        const { items } = await res.json() as CompletedActivityPage
        return items
    } else {
        console.error('Request to list completed failed', { status: res.status, statusText: res.statusText })
        return null
    }
}


export async function activity(token: string, activityId: string): Promise<Activity | null> {
    const res = await fetch(`https://hfnapi.sats.com/socialapi/sats/trainingevent/${activityId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-preferred-language": "en-SE",
        "targeting-group": "all",
        "Accept": "*/*",
        "X-CookieAuthentication": "Auth-SatsElixia=" + token,
        "User-Agent": "iOS/5.6.0b2779",
        "Accept-Language": "en-SE, sv-SE",
        "Accept-Encoding": "gzip, deflate, br",
        "Ocp-Apim-Subscription-Key": "21438312008e4f73890f01a499293a7a",
      }
    });

    if (res.ok) {
        const out = await res.json() as Activity
        console.debug(out)
        return out
    } else {
        console.error('Request to get activity failed', { status: res.status, statusText: res.statusText })
        return null
    }
}

export async function login(username: string, password: string): Promise<{ cookie: string, url: string }> {
    const body = new URLSearchParams();
    body.append('onError', '/logga-in?onSuccess=%2Fmina-sidor')
    body.append('onSuccess', '/mina-sidor')
    body.append('user', username)
    body.append('password', password)

    const login = await fetch("https://www.sats.se/api/log-in", {
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9,sv-SE;q=0.8,sv;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "Referer": "https://www.sats.se/logga-in?onSuccess=%2Fmina-sidor",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body,
      redirect: 'manual',
      method: "POST"
    });

    const url = login.url
    const cookie = login.headers.get('Set-Cookie') ?? ''

    console.log({url, cookie })

    return { cookie, url }
}



