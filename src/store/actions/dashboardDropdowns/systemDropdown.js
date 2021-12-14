import {SET_SYSTEM_DROPDOWN} from "../actionTypes";

export const setSystemDropdown = (data, sheetIndex) => {
    return {
        type: SET_SYSTEM_DROPDOWN,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}