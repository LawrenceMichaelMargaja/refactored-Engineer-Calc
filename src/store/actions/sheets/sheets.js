import {
    ADD_NEW_SHEET, SET_ROUTE_URL,
    SET_SELECTED_SHEET,
    SET_TAB_STATE
} from "../actionTypes";

export const addNewSheet = (data) => {
    return {
        type: ADD_NEW_SHEET,
        payload: data
    }
}

export const setTabState = (data, sheetIndex) => {
    return {
        type: SET_TAB_STATE,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setSelectedSheet = (data) => {
    return {
        type: SET_SELECTED_SHEET,
        payload: data
    }
}

export const setRouteUrl = (data, sheetIndex) => {
    return {
        type: SET_ROUTE_URL,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}
