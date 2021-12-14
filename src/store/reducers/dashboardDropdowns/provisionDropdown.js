import {
    SET_PROVISION_DROPDOWN
} from "../../actions/actionTypes";

const initialState = {
    provision: 'ASD',
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PROVISION_DROPDOWN:
            return setProvisionDropdown(state, action.payload)
        default:
            return state
    }
}

const setProvisionDropdown = (state, payload) => {
    return {
        provision: payload
    }
}

export default Reducer