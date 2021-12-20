import {
    ADD_INITIAL_MEMBER,
    ADD_NEW_SHEET, ADD_SECTION_PROPERTY, CLEAR_METRIC_MATERIAL_PROPERTIES,
    CLEAR_REMOVED_MEMBERS_ARRAY, EDIT_SELECTED_METRIC_MATERIAL_PROPERTIES, EDIT_SELECTED_METRIC_MATERIAL_PROPERTY,
    GET_MATERIAL_PROPERTIES_DATA, GET_SECTION_PROPERTIES_METRIC,
    GET_STEEL_TYPES_ENGLISH_API,
    GET_STEEL_TYPES_METRIC_API,
    REMOVE_ALL_MEMBER_ROWS,
    REMOVE_MEMBER_ROW, REMOVE_METRIC_MATERIAL_PROPERTY_ROW, REMOVE_SHEET,
    SET_AXIAL,
    SET_BENDING_MOMENT_ALONG_X_AXIS,
    SET_BENDING_MOMENT_ALONG_Y_AXIS, SET_CURRENT_METRIC_MATERIAL_PROPERTIES_INDEX,
    SET_ENGLISH_EMPA,
    SET_ENGLISH_FUMPA,
    SET_ENGLISH_FYMPA,
    SET_ENGLISH_MATERIAL_STEEL_TYPES,
    SET_LATERAL_TORSIONAL_MODIFICATION_FACTOR,
    SET_LLT,
    SET_LST,
    SET_MAPPED_STEEL_TYPE_ENGLISH,
    SET_MAPPED_STEEL_TYPE_METRIC,
    SET_MATERIAL_ID,
    SET_MATERIAL_PROPERTIES_EMPA,
    SET_MATERIAL_PROPERTIES_FUMPA,
    SET_MATERIAL_PROPERTIES_FYMPA,
    SET_MATERIAL_PROPERTIES_ID,
    SET_MATERIAL_PROPERTIES_SELECTED_MATERIAL,
    SET_MEMBER_ID,
    SET_METHOD_DROPDOWN,
    SET_METRIC_EMPA,
    SET_METRIC_FUMPA,
    SET_METRIC_FYMPA,
    SET_METRIC_MATERIAL_STEEL_TYPES,
    SET_PROJECT_CLIENT,
    SET_PROJECT_COMPANY,
    SET_PROJECT_DESIGNER,
    SET_PROJECT_ID,
    SET_PROJECT_NAME,
    SET_PROJECT_NOTES,
    SET_PROJECT_UNIT,
    SET_PROVISION_DROPDOWN,
    SET_REMOVED_MEMBER_ROW_ARRAY,
    SET_ROUTE_URL,
    SET_SAFETY_FACTOR_FOR_COMPRESSION,
    SET_SAFETY_FACTOR_FOR_FLEXURE,
    SET_SAFETY_FACTOR_FOR_SHEAR,
    SET_SAFETY_FACTOR_FOR_TENSILE,
    SET_SECTION_ID,
    SET_SELECTED_SHEET,
    SET_SELECTED_STEEL_TYPE,
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
    SET_Z_AXIS_UNBRACED_LENGTH,
    SHIFT_REMOVED_MEMBER_ROW_ARRAY
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
            apiData: {
                steelTypesMetric: [],
                steelTypesEnglish: [],
                sectionPropertiesMetric: []
            },
            apiMap: {
                selectedSteelType: '',
                currentMetricMaterialPropertyIndex: 0,
                currentMetricEnglishPropertyIndex: '',
                steelTypeMetricProperties: {
                    0: {
                        name: 'A36',
                        EMPA: 'testEMPAMetric',
                        FYMPA: 'testFYMPAMetric',
                        FUMPA: 'tesstFUMPAMetric'
                    }
                },
                steelTypeEnglishProperties: {
                    0: {
                        name: 'testNameEnglish',
                        EMPA: 'testEMPAEnglish',
                        FYMPA: 'testFYMPAEnglish',
                        FUMPA: 'tesstFUMPAEnglish'
                    }
                },
            },
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
            sectionProperties: {
                0: {
                    sectionId: 1,
                    sectionShape: '',
                    sectionName: '',
                    // sectionView: '',
                    // sectionA: '',
                    // sectionIW: '',
                    // sectionIXP: '',
                    // sectionIYP: '',
                    // sectionJ: '',
                    // sectionSXP: '',
                    // sectionSYP: '',
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
        case REMOVE_SHEET:
            return removeSheet(state, action.payload)
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
        case ADD_INITIAL_MEMBER:
            return addInitialMember(state, action.payload)
        case REMOVE_MEMBER_ROW:
            return removeMemberRow(state, action.payload)
        case REMOVE_ALL_MEMBER_ROWS:
            return removeAllMemberRows(state, action.payload)
        case CLEAR_REMOVED_MEMBERS_ARRAY:
            return clearRemovedMembersArray(state, action.payload)
        case SET_REMOVED_MEMBER_ROW_ARRAY:
            return setRemovedMemberRowArray(state, action.payload)
        case SHIFT_REMOVED_MEMBER_ROW_ARRAY:
            return shiftRemovedMemberRowsArray(state, action.payload)
        case SET_ROUTE_URL:
            return setRouteUrl(state, action.payload)
        case GET_STEEL_TYPES_METRIC_API:
            return getSteelTypesMetricAPI(state, action.payload)
        case GET_STEEL_TYPES_ENGLISH_API:
            return getSteelTypesEnglishAPI(state, action.payload)
        case SET_SELECTED_STEEL_TYPE:
            return setSelectedSteelType(state, action.payload)
        case SET_METRIC_EMPA:
            return setMetricEMPA(state, action.payload)
        case SET_METRIC_FYMPA:
            return setMetricFYMPA(state, action.payload)
        case SET_METRIC_FUMPA:
            return setMetricFUMPA(state, action.payload)
        case SET_ENGLISH_EMPA:
            return setEnglishEMPA(state, action.payload)
        case SET_ENGLISH_FYMPA:
            return setEnglishFYMPA(state, action.payload)
        case SET_ENGLISH_FUMPA:
            return setEnglishFUMPA(state, action.payload)
        case SET_MAPPED_STEEL_TYPE_METRIC:
            return setMappedSteelTypeMetric(state, action.payload)
        case SET_MAPPED_STEEL_TYPE_ENGLISH:
            return setMappedSteelTypeEnglish(state, action.payload)
        case SET_METRIC_MATERIAL_STEEL_TYPES:
            return setMetricMaterialSteelType(state, action.payload)
        case SET_ENGLISH_MATERIAL_STEEL_TYPES:
            return setEnglishMaterialSteelType(state, action.payload)
        case REMOVE_METRIC_MATERIAL_PROPERTY_ROW:
            return removeMetricMaterialPropertyRow(state, action.payload)
        case SET_CURRENT_METRIC_MATERIAL_PROPERTIES_INDEX:
            return setCurrentMetricMaterialPropertyIndex(state, action.payload)
        case EDIT_SELECTED_METRIC_MATERIAL_PROPERTY:
            return editSelectedMetricMaterialProperty(state, action.payload)
        case CLEAR_METRIC_MATERIAL_PROPERTIES:
            return clearMetricMaterialProperties(state, action.payload)
        case ADD_SECTION_PROPERTY:
            return addSectionProperty(state, action.payload)
        case GET_SECTION_PROPERTIES_METRIC:
            return getSectionPropertiesMetric(state, action.payload)
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

const removeSheet = (state, payload) => {
    let newState = {...state}
    delete newState.sheets[payload]
    return newState
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
    // console.log("tooooo")
    return {
        ...state,
        selectedSheet: payload
    }
}

const setRouteUrl = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                route: payload.data
            }
        }
    }
}

/**
 * API
 */

const getSteelTypesMetricAPI = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    steelTypesMetric: payload.data
                }
            }
        }
    }
}

const getSteelTypesEnglishAPI = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    steelTypesEnglish: payload.data
                }
            }
        }
    }
}

const setSelectedSteelType = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    selectedSteelType: payload.data
                }
            }
        }
    }
}

const getSectionPropertiesMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    sectionPropertiesMetric: payload.data
                }
            }
        }
    }
}

const setMetricEMPA = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    steelTypeMetricProperties: {
                        ...state.sheets[payload.sheetIndex].apiMap.steelTypeMetricProperties,
                        EMPA: payload.data
                    }
                }
            }
        }
    }
}

const setMetricFYMPA = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    steelTypeMetricProperties: {
                        ...state.sheets[payload.sheetIndex].apiMap.steelTypeMetricProperties,
                        FYMPA: payload.data
                    }
                }
            }
        }
    }
}

const setMetricFUMPA = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    steelTypeMetricProperties: {
                        ...state.sheets[payload.sheetIndex].apiMap.steelTypeMetricProperties,
                        FUMPA: payload.data
                    }
                }
            }
        }
    }
}

const setEnglishEMPA = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    steelTypeEnglishProperties: {
                        ...state.sheets[payload.sheetIndex].apiMap.steelTypeEnglishProperties,
                        EMPA: payload.data
                    }
                }
            }
        }
    }
}

const setEnglishFYMPA = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    steelTypeEnglishProperties: {
                        ...state.sheets[payload.sheetIndex].apiMap.steelTypeEnglishProperties,
                        FYMPA: payload.data
                    }
                }
            }
        }
    }
}

const setEnglishFUMPA = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    steelTypeEnglishProperties: {
                        ...state.sheets[payload.sheetIndex].apiMap.steelTypeEnglishProperties,
                        FUMPA: payload.data
                    }
                }
            }
        }
    }
}

const setMappedSteelTypeMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    mappedSteelTypeMetric: payload.data
                }
            }
        }
    }
}

const setMappedSteelTypeEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    mappedSteelTypeEnglish: payload.data
                }
            }
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

const removeAllMemberRows = (state, payload) => {
    // alert(payload)
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload]: {
                ...state.sheets[payload],
                members: {}
            }
        }
    }
}

const clearRemovedMembersArray = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                removedMemberRowArray: []
            }
        }
    }
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

const setMetricMaterialSteelType = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    steelTypeMetricProperties: payload.data
                }
            }
        }
    }
}

const setEnglishMaterialSteelType = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    steelTypeEnglishProperties: payload.data
                }
            }
        }
    }
}

const removeMetricMaterialPropertyRow = (state, payload) => {
    // alert("HOW")
    // alert("at the reducer == " + payload.sheetIndex)
    let newState = {...state}
    delete newState.sheets[payload.sheetIndex].apiMap.steelTypeMetricProperties[payload.data]
    return newState
}

const setCurrentMetricMaterialPropertyIndex = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    currentMetricMaterialPropertyIndex: payload.data
                }
            }
        }
    }
}

const editSelectedMetricMaterialProperty = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    steelTypeMetricProperties: {
                        ...state.sheets[payload.sheetIndex].apiMap.steelTypeMetricProperties,
                        [payload.materialIndex]: {
                            name: payload.name,
                            EMPA: payload.EMPA,
                            FYMPA: payload.FYMPA,
                            FUMPA: payload.FUMPA
                        }
                    }
                }
            }
        }
    }
}

const clearMetricMaterialProperties = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload]: {
                ...state.sheets[payload],
                apiMap: {
                    ...state.sheets[payload].apiMap,
                    steelTypeMetricProperties: null
                }
            }
        }
    }
}

/**
 * Sheet Section Properties
 */

const addSectionProperty = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                sectionProperties: payload.data
            }
        }
    }
}

export default Reducer