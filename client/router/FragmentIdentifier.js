import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { Location } from '@reach/router'
import { scrollPosition } from 'utils/dom'

export default function FragmentIdentifier(props) {
    return (
        <Location>
            {({ location }) => (
                <FragmentIdentifierWithLocation
                    location={location}
                    {...props}
                />
            )}
        </Location>
    )
}

// TODO: HOOKS

class FragmentIdentifierWithLocation extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        hash: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    }
    anchor = createRef()
    get hash() {
        return `#${this.props.hash}`
    }
    scrollTo() {
        if (this.props.location.hash === this.hash) {
            scrollTo(this.props.hash)
        }
    }
    handleHashchange = event => {
        if (window.location.hash === this.hash) {
            event.preventDefault()

            scrollTo(this.anchor.current)
        }
    }
    shouldComponentUpdate({ location }) {
        return this.props.location !== location
    }
    componentDidMount() {
        window.addEventListener('hashchange', this.handleHashchange, false)

        this.scrollTo()
    }
    componentDidUpdate() {
        this.scrollTo()
    }
    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashchange)
    }
    render() {
        const { location, hash, children, ...props } = this.props

        return (
            <a ref={this.anchor} name={hash} href={this.hash} {...props}>
                {children}
            </a>
        )
    }
}

// Utils
function scrollTo(element) {
    const position = scrollPosition(element)

    if (Array.isArray(position)) {
        requestAnimationFrame(() => {
            window.scrollTo(...position)
        })
    }
}
