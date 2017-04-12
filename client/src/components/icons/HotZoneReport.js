import React from 'react'
import hotZoneReport from './hot-zone-report.svg'

function HotZoneReport({width = 24, height = 24, ...props}) {
	return <img width={width} height={height} {...props} src={hotZoneReport} />
}

export default HotZoneReport
