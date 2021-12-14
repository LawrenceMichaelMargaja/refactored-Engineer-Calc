import {
    SET_AXIAL,
    SET_SAFETY_FACTOR_FOR_COMPRESSION,
    SET_SAFETY_FACTOR_FOR_FLEXURE,
    SET_SAFETY_FACTOR_FOR_SHEAR,
    SET_SAFETY_FACTOR_FOR_TENSILE
} from "../../../actionTypes";

export const setSafetyFactorForTensile = (data, sheetIndex) => {
    return {
        type: SET_SAFETY_FACTOR_FOR_TENSILE,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setSafetyFactorForCompression = (data, sheetIndex) => {
    return {
        type: SET_SAFETY_FACTOR_FOR_COMPRESSION,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setSafetyFactorForFlexure = (data, sheetIndex) => {
    return {
        type: SET_SAFETY_FACTOR_FOR_FLEXURE,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setSafetyFactorForShear = (data, sheetIndex) => {
    return {
        type: SET_SAFETY_FACTOR_FOR_SHEAR,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setAxial = (data, sheetIndex) => {
    return {
        type: SET_AXIAL,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}