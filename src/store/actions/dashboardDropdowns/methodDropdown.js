import {SET_METHOD_DROPDOWN} from "../actionTypes";

export const setMethodDropdown = (data, sheetIndex) => {
    return {
        type: SET_METHOD_DROPDOWN,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}