import {
    ADD_CUSTOM_STEEL_TYPE, CHANGE_MATERIAL_CUSTOM_STATUS,
    CLEAR_METRIC_MATERIAL_PROPERTIES,
    EDIT_SELECTED_METRIC_MATERIAL_PROPERTY,
    REMOVE_METRIC_MATERIAL_PROPERTY_ROW, RESET_ENGLISH_MATERIAL_PROPERTIES, RESET_METRIC_MATERIAL_PROPERTIES,
    RESET_METRIC_MATERIAL_PROPERTIES_INDEX,
    SET_CURRENT_MATERIALS_ARRAY,
    SET_CURRENT_METRIC_MATERIAL_PROPERTIES_INDEX,
    SET_CUSTOM_SELECTED_STEEL_TYPE,
    SET_ENGLISH_MATERIAL_STEEL_TYPES, SET_MATERIAL_MODAL_CUSTOM,
    SET_MATERIAL_PROPERTIES_EMPA,
    SET_MATERIAL_PROPERTIES_FUMPA,
    SET_MATERIAL_PROPERTIES_FYMPA,
    SET_MATERIAL_PROPERTIES_ID,
    SET_MATERIAL_PROPERTIES_SELECTED_MATERIAL,
    SET_METRIC_MATERIAL_STEEL_TYPES
} from "../../../actionTypes";

export const setMaterialPropertiesId = (data, sheetIndex, materialPropertyIndex) => {
    return {
        type: SET_MATERIAL_PROPERTIES_ID,
        payload: {data: data, sheetIndex: sheetIndex, materialPropertyIndex: materialPropertyIndex}
    }
}

export const setCurrentMaterialsArray = (data, sheetIndex) => {
    return {
        type: SET_CURRENT_MATERIALS_ARRAY,
        payload: {data: data, sheetIndex: sheetIndex}
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
    alert("at the action == " + JSON.stringify(data));
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

export const resetMetricMaterialProperties = (sheetIndex) => {
    return {
        type: RESET_METRIC_MATERIAL_PROPERTIES,
        payload: sheetIndex
    }
}

export const resetEnglishMaterialProperties = (sheetIndex) => {
    return {
        type: RESET_ENGLISH_MATERIAL_PROPERTIES,
        payload: sheetIndex
    }
}

export const setCurrentMetricMaterialPropertiesIndex = (data, sheetIndex) => {
    return {
        type: SET_CURRENT_METRIC_MATERIAL_PROPERTIES_INDEX,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const editSelectedMetricMaterialProperty = (name, EMPA, FYMPA, FUMPA, custom, sheetIndex, materialIndex) => {
    return {
        type: EDIT_SELECTED_METRIC_MATERIAL_PROPERTY,
        payload: {name: name, EMPA: EMPA, FYMPA: FYMPA, FUMPA: FUMPA, custom: custom, sheetIndex: sheetIndex, materialIndex: materialIndex}
    }
}

export const changeMaterialCustomStatus = (data, sheetIndex, materialPropertyIndex) => {
    return {
        type: CHANGE_MATERIAL_CUSTOM_STATUS,
        payload: {data: data, sheetIndex: sheetIndex, materialPropertyIndex: materialPropertyIndex}
    }
}

export const clearMetricMaterialProperties = (sheetIndex) => {
    return {
        type: CLEAR_METRIC_MATERIAL_PROPERTIES,
        payload: sheetIndex
    }
}

export const resetMetricMaterialIndex = (data, sheetIndex) => {
    alert("at the action == " + JSON.stringify(data))
    return {
        type: RESET_METRIC_MATERIAL_PROPERTIES_INDEX,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setMaterialModalCustom = (data, sheetIndex) => {
    return {
        type: SET_MATERIAL_MODAL_CUSTOM,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const addCustomSteelType = (data, sheetIndex) => {
    return {
        type: ADD_CUSTOM_STEEL_TYPE,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setCustomSelectedSteelType = (data, sheetIndex) => {
    return {
        type: SET_CUSTOM_SELECTED_STEEL_TYPE,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}
