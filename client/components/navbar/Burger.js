import React from 'react'
import PropTypes from 'prop-types'
import { memo } from 'utils/react'
import { Menu } from 'components/icons'
import Button, { INCOGNITO } from '../button'
import styles from './Navbar.css'

Burger.propTypes = {
    onClick: PropTypes.func.isRequired,
}

function Burger({ onClick }) {
    return (
        <div className={styles['Burger--Container']}>
            <Button
                kind={INCOGNITO}
                className={styles.Burger}
                onClick={onClick}>
                <Menu width={32} height={32} />
            </Button>
        </div>
    )
}

export default memo.static(Burger)
