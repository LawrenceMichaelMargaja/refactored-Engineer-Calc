import {
    SET_LATERAL_TORSIONAL_MODIFICATION_FACTOR,
    SET_LLT, SET_LST,
    SET_MATERIAL_ID,
    SET_MEMBER_ID,
    SET_SECTION_ID, SET_SLENDERNESS_RATIO_IN_COMPRESSION, SET_SLENDERNESS_RATIO_IN_TENSION,
    SET_TOTAL_LENGTH_OF_MEMBER, SET_UNBRACED_LENGTH_LATERAL_TORSIONAL, SET_Y_AXIS_EFFECTIVE_LENGTH_FACTOR,
    SET_Y_AXIS_UNBRACED_LENGTH, SET_Z_AXIS_EFFECTIVE_LENGTH_FACTOR, SET_Z_AXIS_UNBRACED_LENGTH
} from "../../../actionTypes";

export const setMemberId = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_MEMBER_ID,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setMaterialId = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_MATERIAL_ID,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setSectionId = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_SECTION_ID,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setTotalLengthOfMember = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_TOTAL_LENGTH_OF_MEMBER,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setYAxisUnbracedLength = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_Y_AXIS_UNBRACED_LENGTH,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setYAxisEffectiveLengthFactor = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_Y_AXIS_EFFECTIVE_LENGTH_FACTOR,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setZAxisUnbracedLength = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_Z_AXIS_UNBRACED_LENGTH,
        payload: {data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setZAxisEffectiveLengthFactor = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_Z_AXIS_EFFECTIVE_LENGTH_FACTOR,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setLLT = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_LLT,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setUnbracedLengthLateralTorsional = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_UNBRACED_LENGTH_LATERAL_TORSIONAL,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setLateralTorsionalModificationFactor = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_LATERAL_TORSIONAL_MODIFICATION_FACTOR,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setSlendernessRatioInCompression = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_SLENDERNESS_RATIO_IN_COMPRESSION,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setSlendernessRatioInTension = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_SLENDERNESS_RATIO_IN_TENSION,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}

export const setLST = (data, sheetIndex, memberIndex) => {
    return {
        type: SET_LST,
        payload: {data: data, sheetIndex: sheetIndex, memberIndex: memberIndex}
    }
}