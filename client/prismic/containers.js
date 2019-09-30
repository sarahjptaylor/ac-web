import React, { Component } from 'react'
import PropTypes from 'prop-types'
import identity from 'lodash/identity'
import memoize from 'lodash/memoize'
import Fetch from 'components/fetch'
import { Memory as Cache } from 'components/fetch/Cache'
import ErrorBoundary from 'components/ErrorBoundary'
import * as Text from 'components/text'
import * as urls from './urls'
import * as params from 'prismic/params'
import { status } from 'services/fetch/utils'
// import parse from './parsers'
import { FEED } from 'constants/prismic'
import { FR, EN } from 'constants/locale'

function MasterRef({ children }) {
    return (
        <Fetch cache={REFCACHE} url={urls.api()}>
            {({ data }) =>
                data ? children(data.refs.find(isMasterRef).ref) : null
            }
        </Fetch>
    )
}

Search.propTypes = {
    children: PropTypes.func.isRequired,
    predicates: PropTypes.arrayOf(PropTypes.string).isRequired,
    locale: PropTypes.oneOf([FR, EN]),
}

function Search({ children, predicates, locale, ...options }) {
    // TODO We should not render <ErrorBoundary> here, it should be done outside the container.
    return (
        <ErrorBoundary fallback={<Error />}>
            <MasterRef>
                {ref => {
                    if (LANGUAGES.has(locale)) {
                        Object.assign(options, LANGUAGES.get(locale))
                    }

                    const url = urls.search(ref, predicates, options)

                    return (
                        <Fetch cache={CACHE} url={url}>
                            {children}
                        </Fetch>
                    )
                }}
            </MasterRef>
        </ErrorBoundary>
    )
}

Document.propTypes = {
    children: PropTypes.func,
}

export function Document({ children = identity, ...props }) {
    return (
        <Search {...props}>
            {({ data, ...rest }) =>
                children(
                    Object.assign(rest, {
                        document: data?.results?.[0]
                    })
                )
            }
        </Search>
    )
}

Documents.propTypes = {
    children: PropTypes.func,
}

export function Documents({ children = identity, ...props }) {
    return (
        <Search {...props}>
            {({ data, ...props }) => {
                if (data) {
                    const { results, ...rest } = data

                    Object.assign(props, rest, {
                        documents: results,
                    })
                }

                return children(props)
            }}
        </Search>
    )
}

// TODO: HOOKS & SUSPENSE
// Could implement a "useFetch" but it is preferable to wait for <Suspense>
// With the loop it is a bit too complicated to move to functional component!

export class Tags extends Component {
    static propTypes = {
        type: PropTypes.oneOf(FEED).isRequired,
        children: PropTypes.func.isRequired,
    }
    state = {
        pending: false,
        tags: new Set(),
    }
    async fetch() {
        this.setState({ pending: true }, async () => {
            try {
                const api = await fetch(urls.api()).then(status)
                const { ref } = api.refs.find(isMasterRef)
                const { type } = this.props
                const tags = new Set()
                let page = 1
                let nextPage = null

                do {
                    const { predicates, ...options } = params.tags({
                        type,
                        page,
                    })
                    const url = urls.search(ref, predicates, options)
                    const data = await fetch(url).then(status)

                    page = data.page + 1
                    nextPage = data.next_page

                    for (const result of data.results) {
                        for (const tag of result.tags) {
                            tags.add(tag)
                        }
                    }
                } while (nextPage)

                this.setState({
                    pending: false,
                    tags: new Set(Array.from(tags).sort(sorter)),
                })
            } catch (error) {
                this.setState({ pending: false })

                throw error
            }
        })
    }
    componentDidUpdate({ type }) {
        if (type !== this.props.type) {
            this.fetch()
        }
    }
    componentDidMount() {
        this.fetch()
    }
    render() {
        return this.props.children(this.state)
    }
}

// Utils
function isMasterRef({ isMasterRef }) {
    return isMasterRef
}
function sorter(a, b) {
    return a.localeCompare(b, 'en', { sensitivity: 'base' })
}
function Error({ error }) {
    return (
        <Text.Error component="details">
            <summary>
                An error happened while pending and display content.{' '}
                <a href={document.location}>Retry</a>
            </summary>
            <p>
                An error happened while retrieving data from prismic and
                rendering its content.
            </p>
            <p>
                {error.name}: {error.message}
            </p>
        </Text.Error>
    )
}

// Constants
const LANGUAGES = new Map([[FR, { lang: 'fr-ca' }]])
const REFCACHE = new Cache(60 * 1000)
const CACHE = new Cache()
