import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import Tutorial from './Tutorial'
import {Image} from 'components/misc'

export default function Radar() {
    return (
        <Article title='Radar Imagery'>
            <TabSet>
                <Tab title='BC Mosaic'>
                    <Image src='http://avalanche.ca/assets/images/weather/new_radar_BC_mosaic.png' />
                </Tab>
                <Tab title='South Coast'>
                    <Image src='http://avalanche.ca/assets/images/weather/new_radar_s_cst.png' />
                </Tab>
                <Tab title='Sourth Interior'>
                    <Image src='http://avalanche.ca/assets/images/weather/new-radar_s_interior.png' />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='radar' />
                </Tab>
            </TabSet>
        </Article>
    )
}
