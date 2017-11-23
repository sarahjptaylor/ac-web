import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Drawer.css'
import SIDE, { LEFT, RIGHT } from './constants/sides'

const STYLE_NAMES = new Map([[LEFT, 'Drawer--Left'], [RIGHT, 'Drawer--Right']])

export default class Drawer extends PureComponent {
    static propTypes = {
        side: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
        open: PropTypes.bool.isRequired,
        position: PropTypes.number.isRequired,
        width: PropTypes.number,
        children: PropTypes.node.isRequired,
    }
    static defaultProps = {
        side: SIDE,
    }
    constructor(props) {
        super(props)

        this.classNames = classnames.bind(styles)
    }
    get className() {
        const { side, open } = this.props

        return this.classNames({
            [STYLE_NAMES.get(side)]: true,
            Open: open,
        })
    }
    get style() {
        const { position, width } = this.props
        const transform = `translateX(${position * 100}%)`

        return {
            transform,
            WebkitTransform: transform,
            width,
        }
    }
    render() {
        return (
            <div style={this.style} className={this.className}>
                {this.props.children}
            </div>
        )
    }
}
