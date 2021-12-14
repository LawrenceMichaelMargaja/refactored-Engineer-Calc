import {
    SET_METHOD_DROPDOWN,
} from "../../actions/actionTypes";

const initialState = {
    method: 'Investigation'
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_METHOD_DROPDOWN:
            return setMethodDropdown(state, action.payload)
        default:
            return state
    }
}

const setMethodDropdown = (state, payload) => {
    return {
        method: payload
    }
}

export default Reducer