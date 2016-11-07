import React from 'react'
import moment from 'moment'
import {toCompass} from 'utils/degrees'

const ARROW_STYLE = {
    float: 'right',
}

function Arrow({orientation}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" title={`${orientation} ° from the north clockwise.`} width="16" height="16" viewBox="0 0 16 16" style={ARROW_STYLE}>
            <text x={8} y={12} rotate={orientation}>↑</text>
        </svg>
    )
}

export const Hour = {
    name: 'hour',
    title: 'Hour',
    property({measurementDateTime}) {
        return moment(measurementDateTime).format('HH[h]')
    },
}

export const SnowHeight = {
    name: 'snowHeight',
    title: 'Snow Height',
    property: 'snowHeight',
    style: {
        minWidth: 65
    }
}

export const AirTemperatureAvg = {
    name: 'airTempAvg',
    title: 'Air Temperature Average',
    property: 'airTempAvg',
    style: {
        minWidth: 65
    }
}

export const AirTemperatureMax = {
    name: 'airTempMax',
    title: 'Air Temperature Max (°C)',
    property: 'airTempMax',
    style: {
        minWidth: 65
    }
}

export const AirTemperatureMin = {
    name: 'airTempMin',
    title: 'Air Temperature Min (°C)',
    property: 'airTempMin',
    style: {
        minWidth: 65
    }
}

export const WindSpeedAvg = {
    name: 'windSpeedAvg',
    title: 'Wind Speed Average',
    property: 'windSpeedAvg',
    style: {
        minWidth: 65
    }
}

export const WindDirectionAvg = {
    name: 'windDirAvg',
    title: 'Wind Direction Average',
    property({windDirAvg}) {
        return (
            <span>
                {windDirAvg} ° ({toCompass(windDirAvg)})
                <Arrow orientation={windDirAvg} />
            </span>
        )
    },
    style: {
        minWidth: 105
    }
}

export const WindSpeedGust = {
    name: 'windSpeedGust',
    title: 'Wind Speed Gust',
    property: 'windSpeedGust',
    style: {
        minWidth: 65
    }
}

export const RelativeHumidity = {
    name: 'relativeHumidity',
    title: 'Relative Humidity (%)',
    property: 'relativeHumidity',
    style: {
        minWidth: 65
    }
}
