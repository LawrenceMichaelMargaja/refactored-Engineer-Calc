import {
    SET_SYSTEM_DROPDOWN
} from "../../actions/actionTypes";

const initialState = {
    system: 'Metric'
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SYSTEM_DROPDOWN:
            return setSystemDropdown(state, action.payload)
        default:
            return state
    }
}

const setSystemDropdown = (state, payload) => {
    return {
        system: payload
    }
}

export default Reducer