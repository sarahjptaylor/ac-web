import React from 'react'
import {compose, withProps} from 'recompose'
import {neverUpdate} from 'compose'
import CSSModules from 'react-css-modules'
import Panel, {INVERSE} from 'components/panel'
import EXPLANATION from 'constants/forecast/danger/rating/explanation'
import {Generic} from 'prismic/components'
import styles from './Forecast.css'

function Footer() {
    return (
        <footer styleName='Footer'>
            <Panel expandable header='Danger Ratings Explained'>
                {EXPLANATION}
            </Panel>
            <Panel expandable header='Avalanche Forecasts in your Inbox'>
                <Generic uid='forecast-rss-message' />
            </Panel>
            <Panel expandable header='Forecast Disclaimer'>
                <Generic uid='forecast-disclaimer' />
            </Panel>
        </footer>
    )
}

export default compose(
    neverUpdate,
    CSSModules(styles),
)(Footer)
