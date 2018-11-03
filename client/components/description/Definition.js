import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Description.css'

Definition.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    block: PropTypes.bool,
}

function Definition({ className, block, style, children }) {
    className = classNames(className, { Definition: true, Block: block })

    return (
        <dd className={className} style={style}>
            {children}
        </dd>
    )
}

export default memo(Definition)

const classNames = classnames.bind(styles)
