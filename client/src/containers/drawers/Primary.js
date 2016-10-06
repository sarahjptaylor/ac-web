import React, {PropTypes} from 'react'
import {compose, withProps, mapProps, getContext, withHandlers, defaultProps} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getPrimary} from 'selectors/drawers'
import {RIGHT} from 'components/page/drawer'
import Drawer from 'components/page/drawer'
import {pushNewLocation} from 'utils/router'
import Controls from './controls/Map'

const location = {
    pathname: '/map'
}

export default compose(
    withRouter,
    getContext({
        location: PropTypes.object.isRequired,
        map: PropTypes.object.isRequired,
    }),
    connect(getPrimary),
    defaultProps({
        side: RIGHT,
    }),
    withProps(({children}) => ({
        children: [<Controls />, children]
    })),
    withHandlers({
        onCloseClick: props => event => {
            pushNewLocation(location, props)
        }
    })
)(Drawer)
