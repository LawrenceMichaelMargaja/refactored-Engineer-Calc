import {SET_ERROR_LOCATION, SET_ERROR_MESSAGE, SET_ERRORS} from "../../../actionTypes";

export const setErrorLocation = (data, sheetIndex) => {
    return {
        type: SET_ERROR_LOCATION,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setErrorMessage = (data, sheetIndex) => {
    return {
        type: SET_ERROR_MESSAGE,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}