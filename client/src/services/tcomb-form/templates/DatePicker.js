import React, {PropTypes, Component} from 'react'
import {findDOMNode} from 'react-dom'
import {DayPicker, DateUtils} from 'components/misc'
import Overlay from 'react-overlays/lib/Overlay'
import classnames from 'classnames'
import {Close} from 'components/button'
import controls from 'components/controls/Controls.css'
import Callout, {BOTTOM} from 'components/callout'

const CONTAINER_STYLE = {
    position: 'relative',
}

function defaultFormat(value) {
    return value ? value.toISOString().substring(0, 10) : ''
}

function create(overrides = {}) {
    function template(locals) {
        return template.renderContainer(locals)
    }

    template.getFormat = overrides.getFormat || function getFormat(locals) {
        return locals.format || defaultFormat
    }

    template.renderContainer = overrides.renderContainer || function renderContainer(locals) {
        const {id} = locals.attrs

        return (
            <div id={`container-${id}`} style={CONTAINER_STYLE}>
                {template.renderDate(locals)}
                <Overlay
                    show={locals.isOpen}
                    onHide={locals.close}
                    onBackdropClick={locals.close}
                    onEscapeKeyUp={locals.close}
                    placement='bottom'
                    container={document.querySelector(`#container-${id}`)}
                    target={document.querySelector(`#container-${id} input`)}
                    rootClose
                    backdrop
                    shouldUpdatePosition>
                    <Callout placement='Bottom'>
                        {locals.isOpen && template.renderPicker(locals)}
                    </Callout>
                </Overlay>
            </div>
        )
    }

    template.renderResetButton = overrides.renderResetButton || function renderResetButton(locals) {
        if (!locals.value) {
            return null
        }

        return (
            <div className={controls['Addon--Right']}>
                <Close onClick={locals.onReset} />
            </div>
        )
    }

    template.renderDate = overrides.renderDate || function renderStatic(locals) {
        return locals.disabled ?
            template.renderDisabledDate(locals) :
            template.renderEnabledDate(locals)
    }

    template.renderEnabledDate = overrides.renderEnabledDate || function renderEnabledDate(locals) {
        const format = template.getFormat(locals)

        return (
            <div className={controls.Group}>
                <input
                {...locals.attrs}
                autoComplete='off'
                onClick={() => locals.toggle()}
                onChange={() => {}}
                value={format(locals.value)}
                />
                {template.renderResetButton(locals)}
            </div>
        )
    }

    template.renderDisabledDate = overrides.renderDisabledDate || function renderDisabledDate(locals) {
        const format = template.getFormat(locals)

        return (
            <input
                {...locals.attrs}
                autoComplete='off'
                disabled
                onChange={() => {}}
                value={format(locals.value)}
            />
        )
    }

    template.renderPicker = overrides.renderPicker || function renderPicker(locals) {
        const {value, renderDay, locale, localeUtils, onSelect} = locals
        const props = {
            initialMonth: value || undefined,
            modifiers: {
                selected: date => DateUtils.isSameDay(value, date)
            },
            onDayClick: onSelect,
            value,
            localeUtils,
            locale,
            renderDay
        }

        return <DayPicker {...props} />
    }

    template.clone = function clone(newOverrides = {}) {
        return create({...overrides, ...newOverrides})
    }

    return template
}

export default class Wrapper extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        template: PropTypes.func
    }
    static template = create()
    state = {
        isOpen: false
    }
    get locals() {
        return {
            isOpen: this.state.isOpen,
            open: this.open,
            close: this.close,
            toggle: this.toggle,
            onReset: this.onReset,
            onSelect: this.onSelect,
            ...this.props
        }
    }
    get template() {
        return this.props.template || this.constructor.template
    }
    open = () => {
        this.setState({ isOpen: true })
    }
    close = () => {
        this.setState({ isOpen: false })
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    onReset = () => {
        this.setState({isOpen: false}, () => {
            this.props.onChange(null)
        })
    }
    onSelect = (event, value) => {
        this.setState({isOpen: false}, () => {
            this.props.onChange(value)
        })
    }
    render() {
        return this.template(this.locals)
    }
}
