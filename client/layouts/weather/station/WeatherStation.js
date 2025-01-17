import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    List,
    ListItem,
    Page,
    Content,
    Header,
    Main,
    Headline,
} from 'components/page'
import { Metadata, Station, Footer } from 'components/weather/station'
import { Error, Loading, Warning } from 'components/text'
import * as hooks from 'hooks/async/weather'
import { path } from 'utils/station'
import * as Async from 'contexts/async'

WeatherStation.propTypes = {
    id: PropTypes.string.isRequired,
}

export default function WeatherStation({ id }) {
    return (
        <Async.Provider value={hooks.useStation(id)}>
            <Page>
                <Header title={<Title id={id} />} />
                <Content>
                    <Main>
                        <Async.Pending>
                            <Loading>Loading weather station data...</Loading>
                        </Async.Pending>
                        <Async.Found>
                            <StationLayout />
                        </Async.Found>
                        <Async.FirstError>
                            <Async.NotFound>
                                <NoStation />
                            </Async.NotFound>
                            <Async.HTTPError>
                                <Error>
                                    An error happened while loading weather
                                    station data.
                                </Error>
                            </Async.HTTPError>
                        </Async.FirstError>
                    </Main>
                </Content>
            </Page>
        </Async.Provider>
    )
}

function StationLayout({ payload }) {
    const { utcOffset, stationId: id } = payload

    return (
        <Async.Provider value={hooks.useMeasurements(id)}>
            <Metadata {...payload} id={id} />
            <Async.Pending>
                <Loading>Loading measurements...</Loading>
            </Async.Pending>
            <Async.Found>
                {measurements => (
                    <Station
                        utcOffset={utcOffset}
                        measurements={measurements}
                    />
                )}
            </Async.Found>
            <Footer />
        </Async.Provider>
    )
}
function NoStation() {
    return (
        <Async.Provider value={hooks.useStations()}>
            <Headline>
                Click on a link below to see another weather station.
            </Headline>
            <Async.Pending>
                <Loading>Loading all weather stations...</Loading>
            </Async.Pending>
            <Async.Found>
                {stations => (
                    <List>
                        {stations.map(({ stationId, name }) => (
                            <ListItem key={stationId} to={path(stationId)}>
                                {name}
                            </ListItem>
                        ))}
                    </List>
                )}
            </Async.Found>
        </Async.Provider>
    )
}
function Title({ id }) {
    return (
        <Fragment>
            <Async.Pending>
                <Loading />
            </Async.Pending>
            <Async.Found>{station => station.name}</Async.Found>
            <Async.NotFound>
                <Warning>Weather station #{id} does not exist.</Warning>
            </Async.NotFound>
        </Fragment>
    )
}
