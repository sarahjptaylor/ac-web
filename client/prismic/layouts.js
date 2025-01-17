import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as params from 'prismic/params'
import { STATIC_PAGE, SPONSOR } from 'constants/prismic'
import {
    Page,
    Content,
    Header,
    Headline,
    Main,
    Banner,
    Aside,
} from 'components/page'
import { Loading, Error } from 'components/text'
import { StructuredText, SliceZone } from 'prismic/components/base'
import Sidebar from 'components/sidebar'
import { useDocument } from './hooks'
import * as Async from 'contexts/async'
import { ErrorDetails } from 'components/application'

StaticPage.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export function StaticPage({ uid, title }) {
    const summary = `An error happened while getting document ${title || uid}.`
    const props = {
        ...params.uid(STATIC_PAGE, uid),
        fetchLinks: `${SPONSOR}.name,${SPONSOR}.url,${SPONSOR}.image-229`,
    }

    // classes are defined in prismic.css, kind of a hack to have full control
    // styling pages.

    return (
        <Async.Provider value={useDocument(props)}>
            <Page className={`${STATIC_PAGE}-${uid}`}>
                <Async.Found>
                    <PageBanner />
                </Async.Found>
                <Header title={<Title>{title}</Title>} />
                <Content>
                    <Pending title={title} />
                    <Main>
                        <Async.Empty>
                            <Error>Document {title || uid} not found.</Error>
                        </Async.Empty>
                        <Async.Found>
                            <StaticPageBody />
                        </Async.Found>
                    </Main>
                    <Async.Found>
                        <PageAside />
                    </Async.Found>
                    <Async.FirstError>
                        <Async.HTTPError>
                            <ErrorDetails summary={summary}></ErrorDetails>
                        </Async.HTTPError>
                        <Async.Throw />
                    </Async.FirstError>
                </Content>
            </Page>
        </Async.Provider>
    )
}

GenericPage.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export function GenericPage({ uid, title }) {
    return (
        <Async.Provider value={useDocument(params.generic(uid))}>
            <Page>
                <Header title={<Title>{title}</Title>} />
                <Content>
                    <Pending title={title} />
                    <Main>
                        <Async.Found>
                            <GenericBody />
                        </Async.Found>
                        <Async.FirstError>
                            <Async.Empty>
                                <Error>
                                    Document {title || uid} not found.
                                </Error>
                            </Async.Empty>
                            <Async.Throw />
                        </Async.FirstError>
                    </Main>
                </Content>
            </Page>
        </Async.Provider>
    )
}

Generic.propTypes = {
    uid: PropTypes.string.isRequired,
}

export function Generic({ uid }) {
    return (
        <Async.Provider value={useDocument(params.generic(uid))}>
            <Async.Pending>
                <Loading />
            </Async.Pending>
            <Async.Found>
                <GenericBody />
            </Async.Found>
        </Async.Provider>
    )
}

// Util components
function GenericBody({ payload }) {
    return <StructuredText value={payload.data.body} />
}
function StaticPageBody({ payload }) {
    const { headline, content } = payload.data

    return (
        <Fragment>
            {headline && <Headline>{headline}</Headline>}
            {Array.isArray(content) && <SliceZone value={content} />}
        </Fragment>
    )
}
function Title({ children = null }) {
    return (
        <Fragment>
            <Async.Pending>{children || 'Loading...'}</Async.Pending>
            <Async.Found>
                {document => document.data.title || children}
            </Async.Found>
            <Async.Empty>Document not found</Async.Empty>
            <Async.Error>{children}</Async.Error>
        </Fragment>
    )
}
function Pending({ title }) {
    return (
        <Async.Pending>
            <Loading>
                {title ? `Loading ${title} page...` : 'Loading page...'}
            </Loading>
        </Async.Pending>
    )
}
function PageAside({ payload }) {
    let { sharing, following, contacting, sidebar = [], contact } = payload.data

    sharing = sharing === 'Yes'
    following = following === 'Yes'
    contacting = contacting === 'Yes'

    if (sharing || following || contacting || sidebar.length) {
        contact = contacting
            ? typeof contact === 'string'
                ? contact.replace(/^mailto:/, '')
                : true
            : false

        return (
            <Aside>
                <Sidebar share={sharing} follow={following} contact={contact}>
                    <SliceZone value={sidebar} />
                </Sidebar>
            </Aside>
        )
    } else {
        return null
    }
}
function PageBanner({ payload }) {
    const { banner } = payload.data

    return banner?.url ? <Banner {...banner} /> : null
}
