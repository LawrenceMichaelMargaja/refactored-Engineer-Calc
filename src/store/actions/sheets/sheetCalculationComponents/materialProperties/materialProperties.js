import {
    EDIT_SELECTED_METRIC_MATERIAL_PROPERTY,
    REMOVE_METRIC_MATERIAL_PROPERTY_ROW, SET_CURRENT_METRIC_MATERIAL_PROPERTIES_INDEX,
    SET_ENGLISH_MATERIAL_STEEL_TYPES,
    SET_MATERIAL_PROPERTIES_EMPA, SET_MATERIAL_PROPERTIES_FUMPA,
    SET_MATERIAL_PROPERTIES_FYMPA,
    SET_MATERIAL_PROPERTIES_ID, SET_MATERIAL_PROPERTIES_SELECTED_MATERIAL, SET_METRIC_MATERIAL_STEEL_TYPES
} from "../../../actionTypes";

export const setMaterialPropertiesId = (data, sheetIndex, materialPropertyIndex) => {
    return {
        type: SET_MATERIAL_PROPERTIES_ID,
        payload: {data: data, sheetIndex: sheetIndex, materialPropertyIndex: materialPropertyIndex}
    }
}

export const setMaterialPropertiesEMPA = (data, sheetIndex, materialPropertyIndex) => {
    return {
        type: SET_MATERIAL_PROPERTIES_EMPA,
        payload: {data: data, sheetIndex: sheetIndex, materialPropertyIndex: materialPropertyIndex}
    }
}

export const setMaterialPropertiesFYMPA = (data, sheetIndex, materialPropertyIndex) => {
    return {
        type: SET_MATERIAL_PROPERTIES_FYMPA,
        payload: {data: data, sheetIndex: sheetIndex, materialPropertyIndex: materialPropertyIndex}
    }
}

export const setMaterialPropertiesFUMPA = (data, sheetIndex, materialPropertyIndex) => {
    return {
        type: SET_MATERIAL_PROPERTIES_FUMPA,
        payload: {data: data, sheetIndex: sheetIndex, materialPropertyIndex: materialPropertyIndex}
    }
}

export const setMaterialPropertiesSelectedMaterial = (data, sheetIndex, materialPropertyIndex) => {
    return {
        type: SET_MATERIAL_PROPERTIES_SELECTED_MATERIAL,
        payload: {data: data, sheetIndex: sheetIndex, materialPropertyIndex: materialPropertyIndex}
    }
}

export const setMetricMaterialSteelType = (data, sheetIndex) => {
    return {
        type: SET_METRIC_MATERIAL_STEEL_TYPES,
        payload: {data: data, sheetIndex: sheetIndex}
    }

}

export const setEnglishMaterialSteelType = (data, sheetIndex) => {
    return {
        type: SET_ENGLISH_MATERIAL_STEEL_TYPES,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const removeMetricMaterialPropertyRow = (data, sheetIndex) => {
    return {
        type: REMOVE_METRIC_MATERIAL_PROPERTY_ROW,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setCurrentMetricMaterialPropertiesIndex = (data, sheetIndex) => {
    return {
        type: SET_CURRENT_METRIC_MATERIAL_PROPERTIES_INDEX,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const editSelectedMetricMaterialProperty = (name, EMPA, FYMPA, FUMPA, sheetIndex, materialIndex) => {
    return {
        type: EDIT_SELECTED_METRIC_MATERIAL_PROPERTY,
        payload: {name: name, EMPA: EMPA, FYMPA: FYMPA, FUMPA: FUMPA, sheetIndex: sheetIndex, materialIndex: materialIndex}
    }
}
