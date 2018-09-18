import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import { status } from 'services/fetch/utils'
import Cache, { None } from './Cache'

export default class Fetch extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
            .isRequired,
        request: PropTypes.instanceOf(Request).isRequired,
        cache: PropTypes.instanceOf(Cache),
    }
    static defaultProps = {
        cache: new None(),
    }
    static Loading = class Loading extends Component {
        static propTypes = {
            children: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
                .isRequired,
        }
        children = ({ loading }) => {
            const { children } = this.props

            return typeof children === 'function'
                ? children(loading)
                : loading
                    ? children
                    : null
        }
        render() {
            return <Consumer>{props => this.children(props)}</Consumer>
        }
    }
    static Data = class Data extends Component {
        static propTypes = {
            children: PropTypes.func.isRequired,
            strict: PropTypes.bool,
        }
        children = ({ data }) => {
            const { children, strict } = this.props

            return strict ? (data ? children(data) : null) : children(data)
        }
        render() {
            return <Consumer>{props => this.children(props)}</Consumer>
        }
    }
    state = {
        loading: false,
        data: this.cache.get(this.url),
    }
    get cache() {
        return this.props.cache
    }
    get url() {
        return this.props.request.url
    }
    fulfill = data => {
        this.setState({ loading: false, data }, () => {
            this.cache.set(this.url, data)
        })
    }
    reject = error => {
        this.setState({ loading: false, data: undefined })

        throw error
    }
    fetch() {
        if (this.cache.has(this.url)) {
            this.setState({
                loading: false,
                data: this.cache.get(this.url),
            })
        } else {
            this.setState({ loading: true, data: undefined }, () => {
                const { url } = this
                let fetching

                if (FETCHING.has(url)) {
                    fetching = FETCHING.get(url)
                } else {
                    fetching = fetch(this.props.request).then(status)

                    FETCHING.set(url, fetching)
                }

                fetching.then(this.fulfill, this.reject).finally(() => {
                    FETCHING.delete(url)
                })
            })
        }
    }
    componentDidUpdate({ request }) {
        if (this.url !== request.url) {
            this.fetch()
        }
    }
    componentDidMount() {
        this.fetch()
    }
    render() {
        const { children } = this.props

        return (
            <Provider value={this.state}>
                {typeof children === 'function'
                    ? children(this.state)
                    : children}
            </Provider>
        )
    }
}

const { Provider, Consumer } = createContext()
const FETCHING = new Map()
