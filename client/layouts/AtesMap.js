import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map, NavigationControl } from 'components/map'
import Url from 'url'
import Alert, { WARNING } from 'components/alert'
import { Generic } from 'prismic/components'
import styles from './AtesMap.css'

const ZOOM = 5.1
const CENTER = [-122, 53]

function createLayer(map) {
    const { offsetWidth, offsetHeight } = map.getContainer()
    const bounds = map.getBounds()
    const west = bounds.getWest()
    const south = bounds.getSouth()
    const east = bounds.getEast()
    const north = bounds.getNorth()

    return {
        id: 'ATES',
        type: 'raster',
        source: {
            type: 'image',
            url: Url.format({
                protocol: 'http',
                host: 'delivery.maps.gov.bc.ca',
                pathname: 'arcgis/rest/services/ates/ates/MapServer/export',
                query: {
                    bbox: `${west},${south},${east},${north}`,
                    bboxSR: 4326,
                    layers: 'show:1,2,3,4',
                    size: [offsetWidth, offsetHeight].join(','),
                    imageSR: 900913,
                    format: 'png32',
                    transparent: true,
                    dpi: 96,
                    f: 'image',
                },
            }),
            coordinates: [
                [west, north],
                [east, north],
                [east, south],
                [west, south],
            ],
        },
    }
}

function updateLayer(map) {
    const layer = createLayer(map)

    map.removeSource(layer.id)
    map.removeLayer(layer.id)
    map.addLayer(layer)
}

export default class AtesMap extends PureComponent {
    static propTypes = {
        onLoad: PropTypes.func.isRequired,
    }
    handleLoad = event => {
        const map = event.target
        const update = updateLayer.bind(null, map)

        map.on('zoomend', update)
        map.on('resize', update)
        map.on('moveend', update)

        map.addLayer(createLayer(map))
    }
    render() {
        return (
            <div className={styles.Container}>
                <div className={styles.Disclaimer}>
                    <Alert type={WARNING}>
                        <Generic uid="ates-map-disclaimer" />
                    </Alert>
                </div>
                <Map
                    zoom={ZOOM}
                    center={CENTER}
                    style="default"
                    onLoad={this.handleLoad}>
                    <NavigationControl />
                </Map>
            </div>
        )
    }
}
