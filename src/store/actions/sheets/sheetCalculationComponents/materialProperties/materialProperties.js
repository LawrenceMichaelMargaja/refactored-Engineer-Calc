import {
    SET_MATERIAL_PROPERTIES_EMPA, SET_MATERIAL_PROPERTIES_FUMPA,
    SET_MATERIAL_PROPERTIES_FYMPA,
    SET_MATERIAL_PROPERTIES_ID, SET_MATERIAL_PROPERTIES_SELECTED_MATERIAL
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