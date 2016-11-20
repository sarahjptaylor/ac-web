import {createAction} from 'redux-actions'
import {getLayers} from 'getters/drawers'

function changeFilterPayloadCreator(layer, name, value) {
    return {
        layer,
        name,
        value,
    }
}

export const MENU_OPENED = 'MENU_OPENED'
export const MENU_CLOSED = 'MENU_CLOSED'
export const LAYER_TOGGLED = 'LAYER_TOGGLED'
export const LAYER_TURNED_ON = 'LAYER_TURNED_ON'
export const FILTER_CHANGED = 'FILTER_CHANGED'

export const openMenu = createAction(MENU_OPENED)
export const closeMenu = createAction(MENU_CLOSED)
export const toggleLayer = createAction(LAYER_TOGGLED)
export const changeFilter = createAction(FILTER_CHANGED, changeFilterPayloadCreator)

const turnOnLayerActionCreator = createAction(LAYER_TURNED_ON)
export function turnOnLayer(name) {
    return (dispatch, getState) => {
        if (getLayers(getState()).has(name)) {
            return
        }

        dispatch(turnOnLayerActionCreator(name))
    }
}
