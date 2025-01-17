import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import * as Icons from 'components/icons'
import { Close } from 'components/button'
import { Control } from 'components/form'
import { GRAY_LIGHT } from 'constants/colors'
import styles from './Search.css'

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
}

export default function Search({ value, onChange, placeholder = 'Search...' }) {
    const input = useRef(null)
    function handleChange({ target }) {
        onChange(target.value)
    }
    function handleReset() {
        const { current } = input

        current.value = ''
        current.focus()

        onChange('')
    }

    return (
        <Control horizontal bordered>
            <i className={styles.Magnify}>
                <Icons.Search color={GRAY_LIGHT} />
            </i>
            <input
                ref={input}
                name="search"
                type="search"
                className={styles.Input}
                placeholder={placeholder}
                defaultValue={value}
                onChange={handleChange}
            />
            {value && <Close onClick={handleReset} />}
        </Control>
    )
}
