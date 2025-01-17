import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Metadata, Entry, LocationEntry } from 'components/metadata'

WeatherStationMetadata.propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    elevation: PropTypes.number.isRequired,
    utcOffset: PropTypes.number.isRequired,
    description: PropTypes.string,
    source: PropTypes.string,
    owner: PropTypes.string,
}

function WeatherStationMetadata({
    longitude,
    latitude,
    elevation,
    utcOffset,
    description,
    owner,
    source,
}) {
    return (
        <Metadata>
            <Entry term="Source">{source}</Entry>
            <LocationEntry longitude={longitude} latitude={latitude} />
            <Entry term="Elevation">
                <span style={NO_TEXT_TRANSFORM}>{elevation} m</span>
            </Entry>
            <Entry term="Time zone">
                UTC-0
                {Math.abs(utcOffset)}
                :00
            </Entry>
            {description && <Entry title="Description">{description}</Entry>}
            {owner &&
                typeof owner === 'object' && (
                    <Entry title="Owner">{owner}</Entry>
                )}
        </Metadata>
    )
}

export default memo(WeatherStationMetadata)

// Constants
const NO_TEXT_TRANSFORM = {
    textTransform: 'none',
}
