import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isToday from 'date-fns/is_today'
import formatDate from 'date-fns/format'
import endOfYesterday from 'date-fns/end_of_yesterday'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import { useForecast } from 'hooks/async/forecast'
import {
    useForecastRegionsMetadata,
    useForecastRegionMetadata,
} from 'hooks/async/features'
import { Page, Content, Header, Main } from 'components/page'
import * as Components from 'layouts/products/forecast'
import * as Footer from 'layouts/products/forecast/Footer'
import { Muted, Loading } from 'components/text'
import { Warning } from 'components/alert'
import { Metadata, Entry } from 'components/metadata'
import { DateElement } from 'components/time'
import Shim from 'components/Shim'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import Pager, { Previous, Next } from 'components/pager'
import externals from 'router/externals'
import {
    PARKS_CANADA,
    CHIC_CHOCS,
    VANCOUVER_ISLAND,
} from 'constants/forecast/owners'
import * as urls from 'utils/url'
import { DateParam } from 'hooks/params'

ArchiveForecast.propTypes = {
    name: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    onParamsChange: PropTypes.func.isRequired,
}

export default function ArchiveForecast({ name, date, onParamsChange }) {
    function handleNameChange(name) {
        onParamsChange({ date, name })
    }
    function handleDateChange(date) {
        onParamsChange({ name, date })
    }

    return (
        <Page>
            <Header title="Forecast Archive" />
            <Content>
                <Main>
                    <Metadata>
                        <Entry>
                            <RegionDropdown
                                value={name}
                                onChange={handleNameChange}
                            />
                        </Entry>
                        {name && (
                            <Entry>
                                <DayPicker
                                    date={date}
                                    placeholder="Select a date"
                                    onChange={handleDateChange}
                                    disabledDays={{
                                        after: endOfYesterday(),
                                    }}
                                />
                            </Entry>
                        )}
                    </Metadata>
                    <ForecastSwitch name={name} date={date} />
                </Main>
            </Content>
        </Page>
    )
}

// Utils
function RegionDropdown({ value, onChange }) {
    const [regions = [], pending] = useForecastRegionsMetadata()

    return (
        <Dropdown
            options={new Map(regions.map(createRegionOption))}
            value={value}
            onChange={onChange}
            disabled={pending}
            placeholder={pending ? 'Loading...' : 'Select a region'}
        />
    )
}
function ForecastSwitch(props) {
    const { name, date } = props
    const [region] = useForecastRegionMetadata(name)

    if (!name) {
        return <Muted>Select a forecast region.</Muted>
    }

    if (!date) {
        return <Muted>Select a forecast date.</Muted>
    }

    const warning =
        region && getWarningUrl(region, date) ? (
            <Shim vertical>
                <a href={getWarningUrl(region, date)} target={region.id}>
                    <Warning>{getWarningText(region)}</Warning>
                </a>
            </Shim>
        ) : null

    if (externals.has(name)) {
        return warning
    }

    return <ForecastContent {...props}>{warning}</ForecastContent>
}
function ForecastContent({ name, date, children }) {
    const [forecast, pending] = useForecast(name, date)

    return (
        <Components.Provider value={forecast}>
            {pending && <Loading>Loading forecast...</Loading>}
            {forecast && <ForecastLayout date={date} />}
            {children}
        </Components.Provider>
    )
}
function createRegionOption({ id, name }) {
    return [id, name]
}
function getWarningText({ name, owner }) {
    switch (owner) {
        case PARKS_CANADA:
            return `Archived forecast bulletins for ${name} region are available on the Parks Canada - Public Avalanche Information website`
        case CHIC_CHOCS:
        case VANCOUVER_ISLAND:
            return `You can get more information for ${name} region on their website`
        default:
            return null
    }
}
function getWarningUrl({ type, url, externalUrl }, date) {
    switch (type) {
        case 'parks': {
            const [path, search] = externalUrl.split('?')
            const params = new URLSearchParams(search)

            params.set('d', formatDate(date, 'YYYY-MM-DD'))

            return [path, params.toString()].join('?')
        }
        case 'link':
            return url.replace('http://avalanche.ca', '')
        default:
            return null
    }
}

/*
    LEGACY LAYOUTS
    - "More details can be found on the Mountain Weather Forecast" got removed on November Xth, 2019
    - "Confidence" has moved the "Danger Ratings" tab to the "Details" tab for the AvCan forecast, so all forecasets we are showing     on the website. 
    - 

    TODO Need a way to implement these rendering strategies nicely. 
*/

function ForecastLayout({ date }) {
    return (
        <Fragment>
            <Components.Metadata />
            <Shim top>
                <Warning>This is an archived avalanche bulletin.</Warning>
            </Shim>
            <Components.Headline />
            <Components.TabSet />
            <ForecastPager date={date} />
            <Components.Footer>
                <Footer.DangerRatings />
                <Footer.Disclaimer />
            </Components.Footer>
        </Fragment>
    )
}

function ForecastPager({ date }) {
    const { region } = Components.useForecast()
    const previous = subDays(date, 1)
    const next = addDays(date, 1)

    return (
        <Pager>
            <Previous to={createLink(region, previous)}>
                <DateElement value={previous} />
            </Previous>
            <Next to={createLink(region, next)}>
                <DateElement value={next} />
            </Next>
        </Pager>
    )
}

function createLink(region, date) {
    if (isToday(date)) {
        return urls.path('/forecasts', region)
    }

    return urls.path('/forecasts', 'archives', region, DateParam.format(date))
}
