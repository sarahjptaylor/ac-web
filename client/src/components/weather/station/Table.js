import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {List} from 'immutable'
import format from 'date-fns/format'
import {setUTCOffset} from 'utils/date'
import {Responsive, Table, Header, Row, Cell, HeaderCell, TBody, Caption} from 'components/table'
import styles from './Table.css'
import {DATE} from 'utils/date'

StationTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    headers: PropTypes.arrayOf(PropTypes.object).isRequired,
    measurements: PropTypes.instanceOf(List),
    caption: PropTypes.string,
}

function renderRow({property, name, ...props}, index) {
    if (index === 0) {
        return (
            <HeaderCell key={name}>
                {typeof property === 'function' ? property(this) : this[property]}
            </HeaderCell>
        )
    }

    return (
        <Cell key={name} {...props}>
            {typeof property === 'function' ? property(this) : this[property]}
        </Cell>
    )
}

function StationTable({columns, measurements, headers, caption}) {
    const bodies = measurements.groupBy(({measurementDateTime, utcOffset}) => (
        format(setUTCOffset(measurementDateTime, utcOffset), DATE)
    ))

    return (
        <div styleName='Container'>
            <div styleName='Content'>
                <Table condensed>
                    <Header>
                        {headers.map((headers, index) => (
                        <Row key={index}>
                            <HeaderCell></HeaderCell>
                            {headers.map(({title, name, property, ...header}) => (
                                <HeaderCell key={name}  {...header}>
                                {typeof title === 'function' ? title() : title}
                                </HeaderCell>
                            ))}
                        </Row>
                        ))}
                    </Header>
                    {bodies.entrySeq().map(([title, measurements]) => (
                        <TBody key={title} title={title} featured>
                        {measurements.map((measurement, index) => (
                            <Row key={index}>
                                {columns.map(renderRow, measurement)}
                            </Row>
                        ))}
                        </TBody>
                    ))}
                    <Caption>{caption}</Caption>
                </Table>
            </div>
        </div>
    )
}

export default CSSModules(StationTable, styles)
