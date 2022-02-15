import {
    ADD_SECTION_PROPERTY,
    ADD_SECTION_PROPERTY_ENGLISH,
    ADD_SECTION_PROPERTY_METRIC,
    EDIT_SELECTED_SECTION, EDIT_SELECTED_SECTION_ENGLISH, EDIT_SELECTED_SECTION_METRIC,
    GET_SECTION_PROPERTIES_METRIC,
    REMOVE_ALL_SECTION_PROPERTIES,
    REMOVE_SELECTED_SECTION_PROPERTY, REMOVE_SELECTED_SECTION_PROPERTY_ENGLISH, REMOVE_SELECTED_SECTION_PROPERTY_METRIC,
    RESET_ENGLISH_MATERIAL_PROPERTIES, RESET_ENGLISH_SECTION_PROPERTIES,
    RESET_METRIC_SECTION_PROPERTIES,
    RESET_SECTION_INDEX, RESET_SECTION_INDEX_ENGLISH, RESET_SECTION_INDEX_METRIC,
    SET_CURRENT_ENGLISH_SECTION_PROPERTY_INDEX,
    SET_CURRENT_METRIC_MATERIAL_PROPERTIES_INDEX,
    SET_CURRENT_METRIC_SECTION_PROPERTY_INDEX,
    SET_CURRENT_SECTION_PROPERTIES_ARRAY
} from "../../../actionTypes";

export const addSectionPropertyMetric = (data, sheetIndex) => {
    // alert("at the actions == " + JSON.stringify(data))
    return {
        type: ADD_SECTION_PROPERTY_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const addSectionPropertyEnglish = (data, sheetIndex) => {
    return {
        type: ADD_SECTION_PROPERTY_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getSectionPropertiesMetric = (data, sheetIndex) => {
    return {
        type: GET_SECTION_PROPERTIES_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const removeSelectedSectionPropertyMetric = (data, sheetIndex, sectionIndex) => {
    return {
        type: REMOVE_SELECTED_SECTION_PROPERTY_METRIC,
        payload: {data: data, sheetIndex: sheetIndex, sectionIndex: sectionIndex}
    }
}

export const removeSelectedSectionPropertyEnglish = (data, sheetIndex, sectionIndex) => {
    return {
        type: REMOVE_SELECTED_SECTION_PROPERTY_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex, sectionIndex: sectionIndex}
    }
}

export const removeAllSectionProperties = (sheetIndex) => {
    return {
        type: REMOVE_ALL_SECTION_PROPERTIES,
        payload: sheetIndex
    }
}

export const editSelectedSectionMetric = (sectionShape, sectionName, sheetIndex, sectionIndex) => {
    return {
        type: EDIT_SELECTED_SECTION_METRIC,
        payload: {sectionShape: sectionShape, sectionName: sectionName, sheetIndex: sheetIndex, sectionIndex: sectionIndex}
    }
}

export const editSelectedSectionEnglish = (sectionShape, sectionName, sheetIndex, sectionIndex) => {
    return {
        type: EDIT_SELECTED_SECTION_ENGLISH,
        payload: {sectionShape: sectionShape, sectionName: sectionName, sheetIndex: sheetIndex, sectionIndex: sectionIndex}
    }
}

export const setCurrentMetricSectionPropertyIndex = (data, sheetIndex) => {
    // alert("at the action == " + data)
    return {
        type: SET_CURRENT_METRIC_SECTION_PROPERTY_INDEX,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setCurrentEnglishSectionPropertyIndex = (data, sheetIndex) => {
    // alert("at the action == " + data)
    return {
        type: SET_CURRENT_ENGLISH_SECTION_PROPERTY_INDEX,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const resetSectionIndexMetric = (data, sheetIndex) => {
    return {
        type: RESET_SECTION_INDEX_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const resetSectionIndexEnglish = (data, sheetIndex) => {
    return {
        type: RESET_SECTION_INDEX_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setCurrentSectionPropertiesArray = (data, sheetIndex) => {
    return {
        type: SET_CURRENT_SECTION_PROPERTIES_ARRAY,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const resetMetricSectionProperties = (sheetIndex) => {
    return {
        type: RESET_METRIC_SECTION_PROPERTIES,
        payload: sheetIndex
    }
}

export const resetEnglishSectionProperties = (sheetIndex) => {
    return {
        type: RESET_ENGLISH_SECTION_PROPERTIES,
        payload: sheetIndex
    }
}
