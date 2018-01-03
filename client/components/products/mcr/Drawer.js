import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {
    Header,
    Container,
    Body,
    Navbar,
    Close,
    Banner,
    Content,
} from 'components/page/drawer'
import Footer from './Footer'
import Submitter from './Submitter'
import DateSet from './DateSet'
import Location from './Location'
import Media from './Media'
import { InnerHTML, Status } from 'components/misc'

const NAVBAR_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
}

const BODY_STYLE = {
    padding: 0,
}

Drawer.propTypes = {
    report: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function Drawer({
    report = new Immutable.Map(),
    status,
    onCloseClick,
    onLocateClick,
}) {
    const subject = "Arc'Teryx Mountain Conditions Report"
    const { isLoaded } = status
    const {
        locationDescription,
        permalink,
        body,
        title,
        images,
        user,
        dates,
        groups,
    } = report.toJSON()

    return (
        <Container>
            <Body style={BODY_STYLE}>
                <Navbar style={NAVBAR_STYLE}>
                    <Close shadow onClick={onCloseClick} />
                </Navbar>
                <Banner>
                    <Media images={images} />
                </Banner>
                <Header subject={subject}>
                    {title && (
                        <h1>
                            <a href={permalink} target={permalink}>
                                {title}
                            </a>
                        </h1>
                    )}
                    {Array.isArray(dates) && <DateSet values={dates} />}
                    <Location
                        description={locationDescription}
                        onLocateClick={onLocateClick}
                    />
                    {user && <Submitter {...user} groups={groups} />}
                </Header>
                <Content>
                    <Status {...status} />
                    {body && <InnerHTML>{body}</InnerHTML>}
                    {isLoaded && <Footer />}
                </Content>
            </Body>
        </Container>
    )
}