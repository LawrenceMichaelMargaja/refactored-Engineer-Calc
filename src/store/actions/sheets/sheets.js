import {
    ADD_NEW_SHEET, EDIT_SELECTED_METRIC_MATERIAL_PROPERTIES, EDIT_SELECTED_METRIC_MATERIAL_PROPERTY,
    GET_MATERIAL_PROPERTIES_DATA,
    GET_STEEL_TYPES_ENGLISH_API,
    GET_STEEL_TYPES_METRIC_API, REMOVE_SHEET,
    SET_ENGLISH_EMPA,
    SET_ENGLISH_FUMPA,
    SET_ENGLISH_FYMPA,
    SET_MAPPED_STEEL_TYPE_ENGLISH,
    SET_MAPPED_STEEL_TYPE_METRIC,
    SET_METRIC_EMPA,
    SET_METRIC_FUMPA,
    SET_METRIC_FYMPA,
    SET_ROUTE_URL,
    SET_SELECTED_SHEET,
    SET_SELECTED_STEEL_TYPE,
    SET_TAB_STATE
} from "../actionTypes";

export const addNewSheet = (data) => {
    return {
        type: ADD_NEW_SHEET,
        payload: data
    }
}

export const removeSheet = (data) => {
    return {
        type: REMOVE_SHEET,
        payload: data
    }
}

export const setTabState = (data, sheetIndex) => {
    return {
        type: SET_TAB_STATE,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setSelectedSheet = data => {
    // alert("the action = " + data)
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

export const setMetricEMPA = (data, sheetIndex, steelTypeMetricIndex) => {
    return {
        type: SET_METRIC_EMPA,
        payload: {data: data, sheetIndex: sheetIndex, steelTypeMetricIndex: steelTypeMetricIndex}
    }
}

export const setMetricFYMPA = (data, sheetIndex) => {
    return {
        type: SET_METRIC_FYMPA,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setMetricFUMPA = (data, sheetIndex) => {
    return {
        type: SET_METRIC_FUMPA,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setEnglishEMPA = (data, sheetIndex) => {
    return {
        type: SET_ENGLISH_EMPA,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setEnglishFYMPA = (data, sheetIndex) => {
    return {
        type: SET_ENGLISH_FYMPA,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setEnglishFUMPA = (data, sheetIndex) => {
    return {
        type: SET_ENGLISH_FUMPA,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setMappedSteelTypeMetric = (data, sheetIndex) => {
    return {
        type: SET_MAPPED_STEEL_TYPE_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setMappedSteelTypeEnglish = (data, sheetIndex) => {
    return {
        type: SET_MAPPED_STEEL_TYPE_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

