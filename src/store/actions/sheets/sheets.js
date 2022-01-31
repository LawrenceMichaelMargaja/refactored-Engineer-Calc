import {
    ADD_NEW_SHEET,
    EDIT_SELECTED_METRIC_MATERIAL_PROPERTIES,
    EDIT_SELECTED_METRIC_MATERIAL_PROPERTY,
    GET_2_L_SHAPES_ENGLISH,
    GET_2_L_SHAPES_METRIC,
    GET_C_SHAPES_ENGLISH,
    GET_C_SHAPES_METRIC, GET_DESIGN_MEMBERS_ENGLISH, GET_DESIGN_MEMBERS_METRIC,
    GET_I_SHAPES_ENGLISH,
    GET_I_SHAPES_METRIC,
    GET_L_SHAPES_ENGLISH,
    GET_L_SHAPES_METRIC,
    GET_MATERIAL_PROPERTIES_DATA,
    GET_PIPE_SHAPES_ENGLISH,
    GET_PIPE_SHAPES_METRIC,
    GET_REC_HS_SHAPES_ENGLISH,
    GET_REC_HS_SHAPES_METRIC,
    GET_ROUND_HS_SHAPES,
    GET_ROUND_HS_SHAPES_ENGLISH,
    GET_ROUND_HS_SHAPES_METRIC,
    GET_SECTION_DIMENSIONS_ENGLISH,
    GET_SECTION_DIMENSIONS_METRIC,
    GET_SECTION_PROPERTIES_ENGLISH,
    GET_SECTION_PROPERTIES_METRIC,
    GET_SHAPES,
    GET_STEEL_SECTIONS,
    GET_STEEL_TYPES_ENGLISH_API,
    GET_STEEL_TYPES_METRIC_API,
    GET_T_SHAPES_ENGLISH,
    GET_T_SHAPES_METRIC,
    REMOVE_SHEET,
    SET_CALCULATED_DATA,
    SET_DISABLE_MENU_BUTTONS,
    SET_ENGLISH_EMPA,
    SET_ENGLISH_FUMPA,
    SET_ENGLISH_FYMPA,
    SET_MAPPED_STEEL_TYPE_ENGLISH,
    SET_MAPPED_STEEL_TYPE_METRIC,
    SET_METRIC_EMPA,
    SET_METRIC_FUMPA,
    SET_METRIC_FYMPA,
    SET_ROUTE_URL,
    SET_SECTION_DIMENSIONS_ARRAY,
    SET_SECTION_DIMENSIONS_ARRAY_ENGLISH,
    SET_SECTION_DIMENSIONS_ARRAY_METRIC,
    SET_SECTION_SHAPE_DESIGN,
    SET_SECTION_SHAPE_DESIGN_ENGLISH,
    SET_SECTION_SHAPE_DESIGN_METRIC,
    SET_SELECTED_SHEET,
    SET_SELECTED_STEEL_TYPE,
    SET_TAB_STATE
} from "../actionTypes";

export const addNewSheet = (data) => {
    return {
        type: ADD_NEW_SHEET,
        payload: data
    }
}

export const removeSheet = (data) => {
    return {
        type: REMOVE_SHEET,
        payload: data
    }
}

export const setTabState = (data, sheetIndex) => {
    return {
        type: SET_TAB_STATE,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setSelectedSheet = data => {
    // alert("the action = " + data)
    return {
        type: SET_SELECTED_SHEET,
        payload: data
    }
}

export const setRouteUrl = (data, sheetIndex) => {
    return {
        type: SET_ROUTE_URL,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

/**
 * Menu Buttons
 */

export const setDisableMenuButtons = data => {
    return {
        type: SET_DISABLE_MENU_BUTTONS,
        payload: data
    }
}

/**
 * Calculated Data
 */
export const setCalculatedData = (data, sheetIndex) => {
    return {
        type: SET_CALCULATED_DATA,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

/**
 * API
 */

export const getSteelSections = (data, sheetIndex) => {
    return {
        type: GET_STEEL_SECTIONS,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getShapes = (data, sheetIndex) => {
    return {
        type: GET_SHAPES,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getSectionDimensionsMetric = (data, sheetIndex) => {
    return {
        type: GET_SECTION_DIMENSIONS_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getSectionDimensionsEnglish = (data, sheetIndex) => {
    return {
        type: GET_SECTION_DIMENSIONS_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getTShapesMetric = (data, sheetIndex) => {
    return {
        type: GET_T_SHAPES_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getTShapesEnglish = (data, sheetIndex) => {
    return {
        type: GET_T_SHAPES_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getRoundHsShapesMetric = (data, sheetIndex) => {
    return {
        type: GET_ROUND_HS_SHAPES_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getRoundHsShapesEnglish = (data, sheetIndex) => {
    return {
        type: GET_ROUND_HS_SHAPES_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getRecHsShapesMetric = (data, sheetIndex) => {
    return {
        type: GET_REC_HS_SHAPES_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getRecHsShapesEnglish = (data, sheetIndex) => {
    return {
        type: GET_REC_HS_SHAPES_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getPipeShapesMetric = (data, sheetIndex) => {
    return {
        type: GET_PIPE_SHAPES_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getPipeShapesEnglish = (data, sheetIndex) => {
    return {
        type: GET_PIPE_SHAPES_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getLShapesMetric = (data, sheetIndex) => {
    return {
        type: GET_L_SHAPES_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getLShapesEnglish = (data, sheetIndex) => {
    return {
        type: GET_L_SHAPES_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getIShapesMetric = (data, sheetIndex) => {
    return {
        type: GET_I_SHAPES_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getIShapesEnglish = (data, sheetIndex) => {
    return {
        type: GET_I_SHAPES_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getCShapeMetric = (data, sheetIndex) => {
    return {
        type: GET_C_SHAPES_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getCShapeEnglish = (data, sheetIndex) => {
    return {
        type: GET_C_SHAPES_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const get2LShapeMetric = (data, sheetIndex) => {
    return {
        type: GET_2_L_SHAPES_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const get2LShapeEnglish = (data, sheetIndex) => {
    return {
        type: GET_2_L_SHAPES_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getSteelTypesMetricAPI = (data, sheetIndex) => {
    return {
        type: GET_STEEL_TYPES_METRIC_API,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getSteelTypesEnglishAPI = (data, sheetIndex) => {
    return {
        type: GET_STEEL_TYPES_ENGLISH_API,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setSelectedSteelType = (data, sheetIndex) => {
    return {
        type: SET_SELECTED_STEEL_TYPE,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setSectionDimensionsArrayMetric = (data, sheetIndex) => {
    return {
        type: SET_SECTION_DIMENSIONS_ARRAY_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setSectionDimensionsArrayEnglish = (data, sheetIndex) => {
    return {
        type: SET_SECTION_DIMENSIONS_ARRAY_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getSectionPropertiesMetric = (data, sheetIndex) => {
    return {
        type: GET_SECTION_PROPERTIES_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getSectionPropertiesEnglish = (data, sheetIndex) => {
    return {
        type: GET_SECTION_PROPERTIES_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setMetricEMPA = (data, sheetIndex, steelTypeMetricIndex) => {
    return {
        type: SET_METRIC_EMPA,
        payload: {data: data, sheetIndex: sheetIndex, steelTypeMetricIndex: steelTypeMetricIndex}
    }
}

export const setMetricFYMPA = (data, sheetIndex) => {
    return {
        type: SET_METRIC_FYMPA,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setMetricFUMPA = (data, sheetIndex) => {
    return {
        type: SET_METRIC_FUMPA,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setEnglishEMPA = (data, sheetIndex) => {
    return {
        type: SET_ENGLISH_EMPA,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setEnglishFYMPA = (data, sheetIndex) => {
    return {
        type: SET_ENGLISH_FYMPA,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setEnglishFUMPA = (data, sheetIndex) => {
    return {
        type: SET_ENGLISH_FUMPA,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setMappedSteelTypeMetric = (data, sheetIndex) => {
    return {
        type: SET_MAPPED_STEEL_TYPE_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setMappedSteelTypeEnglish = (data, sheetIndex) => {
    return {
        type: SET_MAPPED_STEEL_TYPE_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const setSectionShapeMetricDesign = (data, sheetIndex, sectionIndex) => {
    return {
        type: SET_SECTION_SHAPE_DESIGN_METRIC,
        payload: {data: data, sheetIndex: sheetIndex, sectionIndex: sectionIndex}
    }
}

export const setSectionShapeEnglishDesign = (data, sheetIndex, sectionIndex) => {
    return {
        type: SET_SECTION_SHAPE_DESIGN_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex, sectionIndex: sectionIndex}
    }
}

export const getDesignMembersMetric = (data, sheetIndex) => {
    return {
        type: GET_DESIGN_MEMBERS_METRIC,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}

export const getDesignMembersEnglish = (data, sheetIndex) => {
    return {
        type: GET_DESIGN_MEMBERS_ENGLISH,
        payload: {data: data, sheetIndex: sheetIndex}
    }
}
