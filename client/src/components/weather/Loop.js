import React, {PropTypes} from 'react'
import {compose, setDisplayName, setPropTypes, mapProps} from 'recompose'
import moment from 'moment'
import range from 'lodash/range'
import padstart from 'lodash/padstart'
import Loop from 'components/loop'
import {domain} from './config.json'

const HOURS = new Map([
	['AC_RDPS_BC_12hr-precip', range(0, 48, 12)],
	['AC_RDPS_BC_2500m-wind', range(0, 48, 6)],
	['AC_RDPS_BC_3hr-precip', range(0, 48, 3)],
	['AC_RDPS_BC_freezing-level', range(0, 48, 6)],
	['AC_RDPS_BC_hal-24hr-snowfall', range(0, 48, 3)],
	['AC_RDPS_BC_weather-systems', range(0, 48, 6)],
	['AC_GDPS_BC_12hr-precip', range(0, 144, 12)],
	['AC_GDPS_BC_1500m-temp', range(0, 144, 6)],
    ['AC_GDPS_BC_2500m-wind', range(0, 144, 6)],
	['AC_GDPS_EPA_clouds-500hgts', range(0, 144, 6)],
	['AC_GDPS_EPA_pacific-systems', range(0, 144, 6)],
	['AC_GDPS_EPA_precipitable-water', range(0, 144, 6)],
	['AC_HRDPS_BC_wms-1hr-precip', range(0, 48)],
	['AC_HRDPS_BC_wms-cumulative-precip', range(0, 48, 6)],

	['AC_RDPS_BC_12hr-precip1', range(12, 48 + 1, 12)],
	['AC_RDPS_BC_precip-types', range(0, 48, 3)],
	['AC_RDPS_W-CST_3hr-precip-clds-th-slp', range(0, 48, 6)],
	['AC_GDPS_BC_750-wind', range(0, 144, 6)],
	['AC_GDPS_BC_850-temp', range(0, 144, 6)],
	['AC_GDPS_EPA_clouds-precip-th-slp', range(0, 144, 6)],
	['AC_GDPS_EPA_clouds-th-500hts', range(0, 144, 6)],
	['AC_GDPS_EPA_tpw', range(0, 144, 6)],
	['AC_GDPS_W-CAN_precip-th-slp', range(0, 144, 6)],
	['AC_HRDPS_BC_wms-1hr-precip1', range(0, 42)],
	['AC_HRDPS_BC-LAM_1hr-precip', range(0, 42)],
	['AC_HRDPS_S-CST_12hr-precip', range(12, 48, 12)],
	['AC_HRDPS_S-INT_12hr-precip', range(12, 48, 12)],
])

const RUNS = new Map([
	['AC_RDPS_BC_12hr-precip', range(0, 24, 6)],
	['AC_RDPS_BC_2500m-wind', range(0, 24, 6)],
	['AC_RDPS_BC_3hr-precip', range(0, 24, 6)],
	['AC_RDPS_BC_freezing-level', range(0, 24, 6)],
	['AC_RDPS_BC_hal-24hr-snowfall', range(0, 24, 6)],
	['AC_RDPS_BC_weather-systems', range(0, 24, 6)],
	['AC_GDPS_BC_12hr-precip', range(0, 24, 6)],
	['AC_GDPS_BC_1500m-temp', range(0, 24, 6)],
    ['AC_GDPS_BC_2500m-wind', range(0, 24, 6)],
	['AC_GDPS_EPA_clouds-500hgts', range(0, 24, 6)],
	['AC_GDPS_EPA_pacific-systems', range(0, 24, 6)],
	['AC_GDPS_EPA_precipitable-water', range(0, 24, 6)],
	['AC_HRDPS_BC_wms-1hr-precip', range(0, 24, 6)],
	['AC_HRDPS_BC_wms-cumulative-precip', range(0, 24, 6)],

	['AC_RDPS_BC_12hr-precip1', range(0, 24, 6)],
	['AC_RDPS_BC_precip-types', range(0, 24, 6)],
	['AC_RDPS_W-CST_3hr-precip-clds-th-slp', range(0, 24, 6)],
	['AC_GDPS_BC_750-wind', range(0, 24, 6)],
	['AC_GDPS_BC_850-temp', range(0, 24, 6)],
	['AC_GDPS_EPA_clouds-precip-th-slp', range(0, 24, 6)],
	['AC_GDPS_EPA_clouds-th-500hts', range(0, 24, 12)],
	['AC_GDPS_EPA_tpw', range(0, 24, 6)],
	['AC_GDPS_W-CAN_precip-th-slp', range(0, 24, 6)],
	['AC_HRDPS_BC_wms-1hr-precip1', [6, 18]],
	['AC_HRDPS_BC-LAM_1hr-precip', [6, 18]],
	['AC_HRDPS_S-CST_12hr-precip', [6, 18]],
	['AC_HRDPS_S-INT_12hr-precip', [6, 18]],
])

export const TYPES = [...HOURS.keys()]
export const TITLES = new Map([
    ['AC_RDPS_BC_weather-systems', 'Weather systems']
])

const propTypes = {
    type: PropTypes.oneOf(TYPES).isRequired,
    run: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    hours: PropTypes.arrayOf(PropTypes.number),
}


export function formatUrl({type, date = new Date(), run, hour, hours}) {
    if (Array.isArray(hours)) {
        return hours.map(hour => formatUrl({type, date, run, hour}))
    }

	hour = padstart(String(hour), 3, '0')
	run = padstart(String(run), 2, '0')
	date = moment(date).format('YYYYMMDD')

	return `${domain}/loops/images/${type}_${date}${run}_${hour}HR.jpg`
}



function propsMapper({
    type,
    run = RUNS.get(type)[0],
    date = new Date(),
    hours = HOURS.get(type)
}) {
    return {
        urls: formatUrl({date, type, run, hours}),
        openImageInNewTab: true,
    }
}

export default compose(
    setDisplayName('WeatherLoop'),
    setPropTypes(propTypes),
    mapProps(propsMapper),
)(Loop)
