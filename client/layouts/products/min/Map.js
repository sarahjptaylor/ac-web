import React, { createElement, useEffect, useState } from 'react'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import StaticMap from 'components/map/StaticMap'
import minWithIncident from 'components/icons/min/min-pin-with-incident.png'
import { INCIDENT } from 'constants/min'
import { useReport } from './Context'
import { supported } from 'utils/mapbox'
import min from 'components/icons/min/min-pin.png'
import { Map, useFullscreenControl, useNavigationControl } from 'hooks/mapbox'

export default function ContextMap() {
    const report = useReport()

    if (!report) {
        return null
    }

    const { title, lnglat } = report
    const withIncident = report.obs.some(hasIncident)
    const src = withIncident ? minWithIncident : min

    return createElement(supported() ? DynamicMap : FallbackMap, {
        center: lnglat,
        src,
        title,
        zoom: 8,
    })
}

function FallbackMap({ center, zoom, src, title }) {
    const [lng, lat] = center
    const url = 'https://www.avalanche.ca/' + src
    const overlay = `url-${encodeURIComponent(url)}(${lng},${lat})`

    return (
        <StaticMap
            zoom={zoom}
            longitude={lng}
            latitude={lat}
            height={HEIGHT}
            overlay={overlay}
            title={title}
        />
    )
}

function DynamicMap({ center, zoom, src, title }) {
    const [map, setMap] = useState(null)
    const element = Object.assign(document.createElement('img'), {
        src,
        title,
        width: 20,
    })

    useEffect(() => {
        if (!map) {
            return
        }

        const marker = new mapbox.Marker({ element })

        marker.setLngLat(center)
        marker.addTo(map)
    }, [map])

    const style = {
        height: HEIGHT + 'px',
    }

    useNavigationControl(map)
    useFullscreenControl(map)

    return <Map ref={setMap} style={style} options={{ center, zoom }} />
}

// Constants & utils
const HEIGHT = 175
function hasIncident(observation) {
    return observation.obtype === INCIDENT
}
