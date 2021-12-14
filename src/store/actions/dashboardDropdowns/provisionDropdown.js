import {SET_PROVISION_DROPDOWN} from "../actionTypes";

export const setProvisionDropdown = (data, sheetIndex) => {
    return {
        type: SET_PROVISION_DROPDOWN,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}