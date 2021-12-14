import {
    SET_PROJECT_CLIENT,
    SET_PROJECT_COMPANY,
    SET_PROJECT_DESIGNER,
    SET_PROJECT_ID,
    SET_PROJECT_NAME, SET_PROJECT_NOTES,
    SET_PROJECT_UNIT
} from "../../../actionTypes";

export const setProjectUnit = (data, sheetIndex) => {
    return {
        type: SET_PROJECT_UNIT,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setProjectName = (data, sheetIndex) => {
    return {
        type: SET_PROJECT_NAME,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setProjectId = (data, sheetIndex) => {
    return {
        type: SET_PROJECT_ID,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setProjectCompany = (data, sheetIndex) => {
    return {
        type: SET_PROJECT_COMPANY,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setProjectDesigner = (data, sheetIndex) => {
    return {
        type: SET_PROJECT_DESIGNER,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setProjectClient = (data, sheetIndex) => {
    return {
        type: SET_PROJECT_CLIENT,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setProjectNotes = (data, sheetIndex) => {
    return {
        type: SET_PROJECT_NOTES,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}