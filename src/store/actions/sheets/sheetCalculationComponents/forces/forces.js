import {
    SET_AXIAL,
    SET_BENDING_MOMENT_ALONG_X_AXIS,
    SET_BENDING_MOMENT_ALONG_Y_AXIS,
    SET_SHEAR_ALONG_X_AXIS,
    SET_SHEAR_ALONG_Y_AXIS
} from "../../../actionTypes";

export const setBendingMomentAlongXAxis = (data, sheetIndex) => {
    return {
        type: SET_BENDING_MOMENT_ALONG_X_AXIS,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setBendingMomentAlongYAxis = (data, sheetIndex) => {
    return {
        type: SET_BENDING_MOMENT_ALONG_Y_AXIS,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setShearAlongXAxis = (data, sheetIndex) => {
    return {
        type: SET_SHEAR_ALONG_X_AXIS,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setShearAlongYAxis = (data, sheetIndex) => {
    return {
        type: SET_SHEAR_ALONG_Y_AXIS,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setAxial = (data, sheetIndex) => {
    return {
        type: SET_AXIAL,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}