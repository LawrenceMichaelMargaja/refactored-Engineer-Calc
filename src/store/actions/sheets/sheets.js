import {
    ADD_NEW_SHEET, GET_MATERIAL_PROPERTIES_DATA, GET_STEEL_TYPES_ENGLISH_API, GET_STEEL_TYPES_METRIC_API, SET_ROUTE_URL,
    SET_SELECTED_SHEET, SET_SELECTED_STEEL_TYPE,
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

/**
 * API
 */

export const getSteelTypesMetricAPI = (data, sheetIndex) => {
    return {
        type: GET_STEEL_TYPES_METRIC_API,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getSteelTypesEnglishAPI = (data, sheetIndex) => {
    return {
        type: GET_STEEL_TYPES_ENGLISH_API,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setSelectedSteelType = (data, sheetIndex) => {
    return {
        type: SET_SELECTED_STEEL_TYPE,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}