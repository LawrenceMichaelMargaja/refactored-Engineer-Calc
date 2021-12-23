import {ADD_SECTION_PROPERTY, GET_SECTION_PROPERTIES_METRIC} from "../../../actionTypes";

export const addSectionProperty = (data, sheetIndex) => {
    alert("at the actions == " + JSON.stringify(data))
    return {
        type: ADD_SECTION_PROPERTY,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getSectionPropertiesMetric = (data, sheetIndex) => {
    return {
        type: GET_SECTION_PROPERTIES_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}
