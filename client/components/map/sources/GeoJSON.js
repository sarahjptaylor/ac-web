import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../Context'

export default class GeoJSONSource extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        data: PropTypes.object,
        maxzoom: PropTypes.number,
        attribution: PropTypes.string,
        buffer: PropTypes.number,
        tolerance: PropTypes.number,
        cluster: PropTypes.bool,
        clusterRadius: PropTypes.number,
        clusterMaxZoom: PropTypes.number,
        lineMetrics: PropTypes.bool,
    }
    static defaultProps = {
        data: {},
    }
    componentDidMount() {
        const { id, ...source } = this.props

        Object.assign(source, {
            type: 'geojson',
        })

        this.map.addSource(id, source)
    }
    componentDidUpdate({ data }) {
        if (data !== this.props.data) {
            this.map.getSource(this.props.id).setData(this.props.data)
        }
    }
    setMap = map => {
        this.map = map

        return null
    }
    render() {
        return <Consumer>{this.setMap}</Consumer>
    }
}
