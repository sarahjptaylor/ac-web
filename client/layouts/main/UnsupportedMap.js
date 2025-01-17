import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { supported } from 'utils/mapbox'
import { Error, Main, Headline } from 'components/page'
import { Mailto } from 'components/anchors'
import { ButtonSet } from 'components/button'
import styles from 'components/page/Page.css'

UnsupportedMap.propTypes = {
    links: PropTypes.instanceOf(Map),
    headline: PropTypes.node,
}

export default function UnsupportedMap({ headline = HEADLINE, links = LINKS }) {
    return (
        <Error>
            <Main>
                <h1>Uh oh! You never thought that would happen...</h1>
                <Headline>
                    {headline}
                    <br />
                    We suggest you{' '}
                    <a href="//outdatedbrowser.com" target="_blank">
                        update your browser
                    </a>{' '}
                    and make sure that WebGL is{' '}
                    <a href="//get.webgl.org/" target="_blank">
                        enabled
                    </a>
                    .
                </Headline>
                <p />
                <ButtonSet>
                    {Array.from(links, ([link, text]) => (
                        <Link key={link} className={styles.Link} to={link}>
                            {text}
                        </Link>
                    ))}
                </ButtonSet>
                <Headline>
                    If you need help or have questions, do not hesitate to send
                    us an{' '}
                    <Mailto
                        email="kguillotte@avalanche.ca,wharding@avalanche.ca"
                        subject="Unsupported map"
                        body={`\n\n\nMapBox GL supported: ${supported()}\nNavigator: ${
                            navigator.userAgent
                        }`}>
                        email
                    </Mailto>
                    .
                </Headline>
            </Main>
        </Error>
    )
}

const HEADLINE =
    'It seems that your browser does not support the technology required (WebGL for the geeks) to show forecasts, advisories and other avalanche - related information on our map.'

const LINKS = new Map([
    ['/forecasts', 'Forecast regions'],
    ['/advisories', 'Avalanche Advisories'],
    ['/weather/stations', 'Weather stations'],
])
