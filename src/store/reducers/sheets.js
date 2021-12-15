import {
    ADD_INITIAL_MEMBER,
    ADD_NEW_SHEET, REMOVE_MEMBER_ROW,
    SET_AXIAL,
    SET_BENDING_MOMENT_ALONG_X_AXIS,
    SET_BENDING_MOMENT_ALONG_Y_AXIS,
    SET_LATERAL_TORSIONAL_MODIFICATION_FACTOR,
    SET_LLT,
    SET_LST,
    SET_MATERIAL_ID,
    SET_MATERIAL_PROPERTIES_EMPA,
    SET_MATERIAL_PROPERTIES_FUMPA,
    SET_MATERIAL_PROPERTIES_FYMPA,
    SET_MATERIAL_PROPERTIES_ID, SET_MATERIAL_PROPERTIES_SELECTED_MATERIAL,
    SET_MEMBER_ID,
    SET_METHOD_DROPDOWN,
    SET_PROJECT_CLIENT,
    SET_PROJECT_COMPANY,
    SET_PROJECT_DESIGNER,
    SET_PROJECT_ID,
    SET_PROJECT_NAME,
    SET_PROJECT_NOTES,
    SET_PROJECT_UNIT,
    SET_PROVISION_DROPDOWN, SET_REMOVED_MEMBER_ROW_ARRAY, SET_ROUTE_URL,
    SET_SAFETY_FACTOR_FOR_COMPRESSION,
    SET_SAFETY_FACTOR_FOR_FLEXURE,
    SET_SAFETY_FACTOR_FOR_SHEAR,
    SET_SAFETY_FACTOR_FOR_TENSILE,
    SET_SECTION_ID,
    SET_SELECTED_SHEET,
    SET_SHEAR_ALONG_X_AXIS,
    SET_SHEAR_ALONG_Y_AXIS,
    SET_SLENDERNESS_RATIO_IN_COMPRESSION,
    SET_SYSTEM_DROPDOWN,
    SET_TAB_STATE,
    SET_TOTAL_LENGTH_OF_MEMBER,
    SET_UNBRACED_LENGTH_LATERAL_TORSIONAL,
    SET_Y_AXIS_EFFECTIVE_LENGTH_FACTOR,
    SET_Y_AXIS_UNBRACED_LENGTH,
    SET_Z_AXIS_EFFECTIVE_LENGTH_FACTOR,
    SET_Z_AXIS_UNBRACED_LENGTH, SHIFT_REMOVED_MEMBER_ROW_ARRAY
} from "../actions/actionTypes";

const initialState = {
    selectedSheet: 0,
    sheets: {
        0: {
            tabState: 'details',
            provision: 'ASD',
            system: "Metric",
            method: "Investigation",
            removedMemberRowArray: [],
            route: '',
            details: {
                projectUnit: '',
                projectName: '',
                projectId: '',
                projectCompany: '',
                projectDesigner: '',
                projectClient: '',
                projectNotes: ''
            },
            members: {
                0: {
                    memberId: 1,
                    materialId: 1,
                    sectionId: 1,
                    totalLengthOfMember: 1,
                    yAxisUnbracedLength: 1,
                    yAxisEffectiveLengthFactor: 1,
                    zAxisUnbracedLength: 1,
                    zAxisEffectiveLengthFactor: 1,
                    LLT: '1.0',
                    unbracedLengthLateralTorsional: 1.0,
                    lateralTorsionalModificationFactor: 1.0,
                    slendernessRatioInCompression: 200,
                    LST: 300
                }
            },
            materialProperties: {
                0: {
                    materialPropertiesId: 1,
                    materialPropertiesEMPA: 'Sugar',
                    materialPropertiesFYMPA: 'Pestle',
                    materialPropertiesFUMPA: 'Bowl',
                    materialPropertiesSelectedMaterial: 'Cabbage'
                }
            },
            factors: {
                safetyFactorForTensile: 1.67,
                safetyFactorForCompression: 1.67,
                safetyFactorForFlexure: 1.67,
                safetyFactorForShear: 1.67
            },
            forces: {
                bendingMomentAlongXAxis: 0,
                bendingMomentAlongYAxis: 0,
                shearAlongXAxis: 0,
                shearAlongYAxis: 0,
                axial: 0,
            }
        }
    }
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TAB_STATE:
            return setTabState(state, action.payload)
        case SET_SELECTED_SHEET:
            return setSelectedSheet(state, action.payload)
        case ADD_NEW_SHEET:
            return addNewSheet(state, action.payload)
        case SET_PROVISION_DROPDOWN:
            return setProvisionDropdown(state, action.payload)
        case SET_SYSTEM_DROPDOWN:
            return setSystemDropdown(state, action.payload)
        case SET_METHOD_DROPDOWN:
            return setMethodDropdown(state, action.payload)
        case SET_PROJECT_UNIT:
            return setProjectUnit(state, action.payload)
        case SET_PROJECT_NAME:
            return setProjectName(state, action.payload)
        case SET_PROJECT_ID:
            return setProjectId(state, action.payload)
        case SET_PROJECT_COMPANY:
            return setProjectCompany(state, action.payload)
        case SET_PROJECT_DESIGNER:
            return setProjectDesigner(state, action.payload)
        case SET_PROJECT_CLIENT:
            return setProjectClient(state, action.payload)
        case SET_PROJECT_NOTES:
            return setProjectNotes(state, action.payload)
        case SET_SAFETY_FACTOR_FOR_TENSILE:
            return setSafetyFactorForTensile(state, action.payload)
        case SET_SAFETY_FACTOR_FOR_COMPRESSION:
            return setSafetyFactorForCompression(state, action.payload)
        case SET_SAFETY_FACTOR_FOR_FLEXURE:
            return setSafetyFactorForFlexure(state, action.payload)
        case SET_SAFETY_FACTOR_FOR_SHEAR:
            return setSafetyFactorForShear(state, action.payload)
        case SET_BENDING_MOMENT_ALONG_X_AXIS:
            return setBendingMomentAlongXAxis(state, action.payload)
        case SET_BENDING_MOMENT_ALONG_Y_AXIS:
            return setBendingMomentAlongYAxis(state, action.payload)
        case SET_SHEAR_ALONG_X_AXIS:
            return setShearAlongXAxis(state, action.payload)
        case SET_SHEAR_ALONG_Y_AXIS:
            return setShearAlongYAxis(state, action.payload)
        case SET_AXIAL:
            return setAxial(state, action.payload)
        case SET_MEMBER_ID:
            return setMemberId(state, action.payload)
        case SET_MATERIAL_ID:
            return setMaterialId(state, action.payload)
        case SET_SECTION_ID:
            return setSectionId(state, action.payload)
        case SET_TOTAL_LENGTH_OF_MEMBER:
            return setTotalLengthOfMember(state, action.payload)
        case SET_Y_AXIS_UNBRACED_LENGTH:
            return setYAxisUnbracedLength(state, action.payload)
        case SET_Y_AXIS_EFFECTIVE_LENGTH_FACTOR:
            return setYAxisEffectiveLengthFactor(state, action.payload)
        case SET_Z_AXIS_UNBRACED_LENGTH:
            return setZAxisUnbracedLength(state, action.payload)
        case SET_Z_AXIS_EFFECTIVE_LENGTH_FACTOR:
            return setZAxisEffectiveLengthFactor(state, action.payload)
        case SET_LLT:
            return setLLT(state, action.payload)
        case SET_UNBRACED_LENGTH_LATERAL_TORSIONAL:
            return setUnbracedLengthLateralTorsional(state, action.payload)
        case SET_LATERAL_TORSIONAL_MODIFICATION_FACTOR:
            return setLateralTorsionalModificationFactor(state, action.payload)
        case SET_SLENDERNESS_RATIO_IN_COMPRESSION:
            return setSlendernessRatioInCompression(state, action.payload)
        case SET_LST:
            return setLST(state, action.payload)
        case SET_MATERIAL_PROPERTIES_ID:
            return setMaterialPropertiesId(state, action.payload)
        case SET_MATERIAL_PROPERTIES_EMPA:
            return setMaterialPropertiesEMPA(state, action.payload)
        case SET_MATERIAL_PROPERTIES_FYMPA:
            return setMaterialPropertiesFYMPA(state, action.payload)
        case SET_MATERIAL_PROPERTIES_FUMPA:
            return setMaterialPropertiesFUMPA(state, action.payload)
        case SET_MATERIAL_PROPERTIES_SELECTED_MATERIAL:
            return setMaterialPropertiesSelectedMaterial(state, action.payload)
        case ADD_INITIAL_MEMBER:
            return addInitialMember(state, action.payload)
        case REMOVE_MEMBER_ROW:
            return removeMemberRow(state, action.payload)
        case SET_REMOVED_MEMBER_ROW_ARRAY:
            return setRemovedMemberRowArray(state, action.payload)
        case SHIFT_REMOVED_MEMBER_ROW_ARRAY:
            return shiftRemovedMemberRowsArray(state, action.payload)
        case SET_ROUTE_URL:
            return setRouteUrl(state, action.payload)
        default:
            return state
    }
}

/**
 * Sheets
 */

const addNewSheet = (state, payload) => {
    return {
        ...state,
        sheets: payload
    }
}

const setTabState = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                tabState: payload.data,
            }
        }
    }
}

const setSelectedSheet = (state, payload) => {
    return {
        ...state,
        selectedSheet: payload
    }
}

const setRouteUrl = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets[payload.sheetIndex],
            route: payload.data
        }
    }
}

/**
 * End of Sheets
 */

/**
 * Sheet DropDowns
 */

const setProvisionDropdown = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                provision: payload.data
            }
        }
    }
}

const setSystemDropdown = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                system: payload.data
            }
        }
    }
}

const setMethodDropdown = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                method: payload.data
            }
        }
    }
}

/**
 * End of Sheet DropDowns
 */

/**
 * Sheet Details
 */

const setProjectUnit = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                details: {
                    ...state.sheets[payload.sheetIndex].details,
                    projectUnit: payload.data,
                }
            }
        }
    }
}

const setProjectName = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                details: {
                    ...state.sheets[payload.sheetIndex].details,
                    projectName: payload.data,
                }
            }
        }
    }
}

const setProjectId = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                details: {
                    ...state.sheets[payload.sheetIndex].details,
                    projectId: payload.data,
                }
            }
        }
    }
}

const setProjectCompany = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                details: {
                    ...state.sheets[payload.sheetIndex].details,
                    projectCompany: payload.data,
                }
            }
        }
    }
}

const setProjectDesigner = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                details: {
                    ...state.sheets[payload.sheetIndex].details,
                    projectDesigner: payload.data,
                }
            }
        }
    }
}

const setProjectClient = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                details: {
                    ...state.sheets[payload.sheetIndex].details,
                    projectClient: payload.data,
                }
            }
        }
    }
}

const setProjectNotes = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                details: {
                    ...state.sheets[payload.sheetIndex].details,
                    projectNotes: payload.data
                }
            }
        }
    }
}

/**
 * End of Sheet Details
 */

/**
 * Sheet Factors
 */

const setSafetyFactorForTensile = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                factors: {
                    ...state.sheets[payload.sheetIndex].factors,
                    safetyFactorForTensile: payload.data
                }
            }
        }
    }
}

const setSafetyFactorForCompression = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                factors: {
                    ...state.sheets[payload.sheetIndex].factors,
                    safetyFactorForCompression: payload.data
                }
            }
        }
    }
}

const setSafetyFactorForFlexure = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                factors: {
                    ...state.sheets[payload.sheetIndex].factors,
                    safetyFactorForFlexure: payload.data
                }
            }
        }
    }
}

const setSafetyFactorForShear = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                factors: {
                    ...state.sheets[payload.sheetIndex].factors,
                    safetyFactorForShear: payload.data
                }
            }
        }
    }
}

/**
 * End of Sheet Factors
 */

/**
 * Sheet Forces
 */

const setBendingMomentAlongXAxis = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                forces: {
                    ...state.sheets[payload.sheetIndex].forces,
                    bendingMomentAlongXAxis: payload.data
                }
            }
        }
    }
}

const setBendingMomentAlongYAxis = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                forces: {
                    ...state.sheets[payload.sheetIndex].forces,
                    bendingMomentAlongYAxis: payload.data
                }
            }
        }
    }
}

const setShearAlongXAxis = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                forces: {
                    ...state.sheets[payload.sheetIndex].forces,
                    shearMomentAlongXAxis: payload.data
                }
            }
        }
    }
}

const setShearAlongYAxis = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                forces: {
                    ...state.sheets[payload.sheetIndex].forces,
                    shearMomentAlongYAxis: payload.data
                }
            }
        }
    }
}

const setAxial = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                forces: {
                    ...state.sheets[payload.sheetIndex].forces,
                    axial: payload.data
                }
            }
        }
    }
}

/**
 * End of Sheet Forces
 */

/**
 * Sheet MemberFields
 */

const addInitialMember = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: payload.data
            }
        }
    }
}

const removeMemberRow = (state, payload) => {
    let newState = {...state}
    delete newState.sheets[payload.sheetIndex].members[payload.memberIndex]
    return newState
}

const setRemovedMemberRowArray = (state, payload) => {
    alert("at the reducer == " + JSON.stringify(payload.data))
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                removedMemberRowArray: [...state.sheets[payload.sheetIndex].removedMemberRowArray, payload.data]
            }
        }
    }
}

const shiftRemovedMemberRowsArray = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                removedMemberRowArray: [payload.data]
            }
        }
    }
}

const setMemberId = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        memberId: payload.data
                    }
                }
            }
        }
    }
}

const setMaterialId = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        materialId: payload.data
                    }
                }
            }
        }
    }
}

const setSectionId = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        sectionId: payload.data
                    }
                }
            }
        }
    }
}

const setTotalLengthOfMember = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        totalLengthOfMember: payload.data
                    }
                }
            }
        }
    }
}

const setYAxisUnbracedLength = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        yAxisUnbracedLength: payload.data
                    }
                }
            }
        }
    }
}

const setYAxisEffectiveLengthFactor = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        yAxisEffectiveLengthFactor: payload.data
                    }
                }
            }
        }
    }
}

const setZAxisUnbracedLength = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        zAxisUnbracedLength: payload.data
                    }
                }
            }
        }
    }
}

const setZAxisEffectiveLengthFactor = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        zAxisEffectiveLengthFactor: payload.data
                    }
                }
            }
        }
    }
}

const setLLT = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        LLT: payload.data
                    }
                }
            }
        }
    }
}

const setUnbracedLengthLateralTorsional = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        unbracedLengthLateralTorsional: payload.data
                    }
                }
            }
        }
    }
}

const setLateralTorsionalModificationFactor = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        lateralTorsionalModificationFactor: payload.data
                    }
                }
            }
        }
    }
}

const setSlendernessRatioInCompression = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        slendernessRatioInCompression: payload.data
                    }
                }
            }
        }
    }
}

const setLST = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: {
                        ...state.sheets[payload.sheetIndex].members[payload.memberIndex],
                        LST: payload.data
                    }
                }
            }
        }
    }
}

/**
 * End of Sheet MemberFields
 */

/**
 * Sheet Material Properties
 */

const setMaterialPropertiesId = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                materialProperties: {
                    ...state.sheets[payload.sheetIndex].materialProperties,
                    [payload.materialPropertyIndex]: {
                        ...state.sheets[payload.sheetIndex].materialProperties[payload.materialPropertyIndex],
                        materialPropertiesId: payload.data
                    }
                }
            }
        }
    }
}

const setMaterialPropertiesEMPA = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                materialProperties: {
                    ...state.sheets[payload.sheetIndex].materialProperties,
                    [payload.materialPropertyIndex]: {
                        ...state.sheets[payload.sheetIndex].materialProperties[payload.materialPropertyIndex],
                        materialPropertiesEMPA: payload.data
                    }
                }
            }
        }
    }
}

const setMaterialPropertiesFYMPA = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                materialProperties: {
                    ...state.sheets[payload.sheetIndex].materialProperties,
                    [payload.materialPropertyIndex]: {
                        ...state.sheets[payload.sheetIndex].materialProperties[payload.materialPropertyIndex],
                        materialPropertiesFYMPA: payload.data
                    }
                }
            }
        }
    }
}

const setMaterialPropertiesFUMPA = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                materialProperties: {
                    ...state.sheets[payload.sheetIndex].materialProperties,
                    [payload.materialPropertyIndex]: {
                        ...state.sheets[payload.sheetIndex].materialProperties[payload.materialPropertyIndex],
                        materialPropertiesFUMPA: payload.data
                    }
                }
            }
        }
    }
}

const setMaterialPropertiesSelectedMaterial = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                materialProperties: {
                    ...state.sheets[payload.sheetIndex].materialProperties,
                    [payload.materialPropertyIndex]: {
                        ...state.sheets[payload.sheetIndex].materialProperties[payload.materialPropertyIndex],
                        materialPropertiesSelectedMaterial: payload.data
                    }
                }
            }
        }
    }
}

export default Reducer