import { build } from 'utils/url'
import { baseURL } from './config.json'
import fetch from 'utils/fetch'

export function report(id) {
    const url = build(`${PATH}/${id}`, { id, client }, baseURL)

    return fetch(url).then(parse)
}

export function reports(days = 7) {
    if (days <= 0) {
        throw new RangeError('Number of days must be higher or equal to 1.')
    }

    const url = build(PATH, { client, last: `${days}:days` }, baseURL)

    return fetch(url).then(reports => reports.map(parse).sort(sorter))
}

export function post(report, idToken) {
    const url = build(PATH, { client }, baseURL)
    const options = {
        method: 'POST',
        body: report,
        headers: new Headers({
            Authorization: `Bearer ${idToken}`,
        }),
    }

    return fetch(url, options)
}

// Parser, constants & utils
function parse(submission) {
    const { latlng } = submission

    return Object.assign(submission, {
        lnglat: latlng.map(Number).reverse(),
        datetime: new Date(submission.datetime),
    })
}
function sorter(a, b) {
    return a.datetime < b.datetime
}
const client = 'web'
const PATH = '/min/submissions'
