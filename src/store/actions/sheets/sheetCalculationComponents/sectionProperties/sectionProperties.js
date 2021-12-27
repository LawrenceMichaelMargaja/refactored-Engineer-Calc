import {
    ADD_SECTION_PROPERTY, EDIT_SELECTED_SECTION,
    GET_SECTION_PROPERTIES_METRIC,
    REMOVE_SELECTED_SECTION_PROPERTY, RESET_SECTION_INDEX, SET_CURRENT_SECTION_PROPERTIES_ARRAY
} from "../../../actionTypes";

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

export const removeSelectedSectionProperty = (data, sheetIndex, sectionIndex) => {
    return {
        type: REMOVE_SELECTED_SECTION_PROPERTY,
        payload: {data: data, sheetIndex: sheetIndex, sectionIndex: sectionIndex}
    }
}

export const editSelectedSection = (sectionShape, sectionName, sheetIndex, sectionIndex) => {
    return {
        type: EDIT_SELECTED_SECTION,
        payload: {sectionShape: sectionShape, sectionName: sectionName, sheetIndex: sheetIndex, sectionIndex: sectionIndex}
    }
}

export const setCurrentSectionPropertyIndex = (data, sheetIndex) => {
    return {
        type: SET_CURRENT_SECTION_PROPERTIES_ARRAY,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const resetSectionIndex = (data, sheetIndex) => {
    return {
        type: RESET_SECTION_INDEX,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setCurrentSectionPropertiesArray = (data, sheetIndex) => {
    return {
        type: SET_CURRENT_SECTION_PROPERTIES_ARRAY,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}