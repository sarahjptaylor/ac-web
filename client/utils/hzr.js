import bboxPolygon from '@turf/bbox-polygon'
import isWithinRange from 'date-fns/is_within_range'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'

export function title({ report, loading, hotZone }) {
    const name = hotZone ? hotZone.name : null

    return !loading
        ? report
            ? name
            : `No ${name} report is currently available`
        : name || 'Loading...'
}

export function geometry(hotZone) {
    return bboxPolygon(hotZone.bbox)
}

export function shareUrl({ uid, data }) {
    return `${document.location.origin}/hot-zone-reports/${data.region}/${uid}`
}

export function isValid({ dateOfIssue, validUntil }) {
    return isWithinRange(
        new Date(),
        startOfDay(dateOfIssue),
        endOfDay(validUntil)
    )
}
