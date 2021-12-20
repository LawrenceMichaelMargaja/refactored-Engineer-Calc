import {ADD_SECTION_PROPERTY, GET_SECTION_PROPERTIES_METRIC} from "../../../actionTypes";

export const addSectionProperty = (data, sheetIndex) => {
    return {
        type: ADD_SECTION_PROPERTY,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}
