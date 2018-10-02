import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import formatDate from 'date-fns/format'
import { resource } from 'api/requests/static'
import { status } from 'services/fetch/utils'
import { LocalStorage } from 'services/storage'

export class Provider extends Component {
    static propTypes = {
        children: PropTypes.element,
    }
    storage = LocalStorage.create()
    state = this.storage.get('sponsors', {
        About: 'rmr',
        BlogIndex: 'toyotastacked',
        BlogPage: 'mec',
        EventIndex: 'varda',
        EventPage: 'scarpa',
        Forecast: 'acf',
        Gear: 'toyotastacked',
        MIN: 'rmr',
        NewsIndex: 'northface',
        NewsPage: 'marmot',
        Training: 'revelstoke-tourism',
        Weather: 'toyotastacked',
        Youth: 'cbt',
    })
    async fetch() {
        const response = await fetch(resource('sponsors'))
        const data = await status(response)
        const date = formatDate(new Date(), 'YYYY-MM-DD')
        const sponsors = Object.assign({}, data.default, data[date])

        this.storage.set('sponsors', sponsors)

        this.setState(sponsors)
    }
    componentWillUnmount() {
        clearTimeout(this.timeoutId)
    }
    componentDidMount() {
        console.warn(this.state)
        // TODO Could also use requestIdleCallback
        this.timeoutId = setTimeout(this.fetch.bind(this), 9999)
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

const Context = createContext()

export default Context.Consumer
