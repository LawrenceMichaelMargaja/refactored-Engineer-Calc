import {
    ADD_CUSTOM_STEEL_TYPE,
    ADD_INITIAL_MEMBER,
    ADD_NEW_SHEET,
    ADD_SECTION_PROPERTY,
    ADD_SECTION_PROPERTY_ENGLISH,
    ADD_SECTION_PROPERTY_METRIC,
    ADD_SHEET_NAME,
    CHANGE_MATERIAL_CUSTOM_STATUS,
    CLEAR_CALCULATED_DATA,
    CLEAR_METRIC_MATERIAL_PROPERTIES,
    CLEAR_REMOVED_MEMBERS_ARRAY,
    EDIT_SELECTED_ENGLISH_MATERIAL_PROPERTY,
    EDIT_SELECTED_METRIC_MATERIAL_PROPERTIES,
    EDIT_SELECTED_METRIC_MATERIAL_PROPERTY,
    EDIT_SELECTED_SECTION,
    EDIT_SELECTED_SECTION_ENGLISH,
    EDIT_SELECTED_SECTION_METRIC,
    GET_2_L_SHAPES_ENGLISH,
    GET_2_L_SHAPES_METRIC,
    GET_C_SHAPES_ENGLISH,
    GET_C_SHAPES_METRIC,
    GET_DESIGN_MEMBERS_ENGLISH,
    GET_DESIGN_MEMBERS_METRIC,
    GET_I_SHAPES_ENGLISH,
    GET_I_SHAPES_METRIC,
    GET_L_SHAPES_ENGLISH,
    GET_L_SHAPES_METRIC,
    GET_MATERIAL_PROPERTIES_DATA,
    GET_PIPE_SHAPES_ENGLISH,
    GET_PIPE_SHAPES_METRIC,
    GET_REC_HS_SHAPES_ENGLISH,
    GET_REC_HS_SHAPES_METRIC,
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
    REMOVE_ALL_MEMBER_ROWS,
    REMOVE_ALL_SECTION_PROPERTIES,
    REMOVE_MEMBER_ROW,
    REMOVE_METRIC_MATERIAL_PROPERTY_ROW,
    REMOVE_SELECTED_SECTION_PROPERTY,
    REMOVE_SELECTED_SECTION_PROPERTY_ENGLISH,
    REMOVE_SELECTED_SECTION_PROPERTY_METRIC,
    REMOVE_SHEET,
    RESET_ENGLISH_MATERIAL_PROPERTIES,
    RESET_ENGLISH_SECTION_PROPERTIES,
    RESET_MEMBER_FIELDS,
    RESET_METRIC_MATERIAL_PROPERTIES,
    RESET_METRIC_MATERIAL_PROPERTIES_INDEX,
    RESET_METRIC_SECTION_PROPERTIES,
    RESET_SECTION_INDEX,
    RESET_SECTION_INDEX_ENGLISH,
    RESET_SECTION_INDEX_METRIC,
    SET_ARRAY_CHECK,
    SET_AXIAL,
    SET_BENDING_MOMENT_ALONG_X_AXIS,
    SET_BENDING_MOMENT_ALONG_Y_AXIS,
    SET_CALCULATED_DATA,
    SET_CURRENT_ENGLISH_MATERIAL_PROPERTIES_INDEX,
    SET_CURRENT_ENGLISH_SECTION_PROPERTY_INDEX,
    SET_CURRENT_MATERIALS_ARRAY,
    SET_CURRENT_METRIC_MATERIAL_PROPERTIES_INDEX,
    SET_CURRENT_METRIC_SECTION_PROPERTY_INDEX,
    SET_CURRENT_SECTION_PROPERTIES_ARRAY,
    SET_CURRENT_SHAPE,
    SET_CUSTOM_SELECTED_STEEL_TYPE,
    SET_DATA_TO_BE_LOOPED_FOR_DESIGN_MEMBERS_POST_REQUEST,
    SET_DISABLE_MENU_BUTTONS,
    SET_ENGLISH_EMPA,
    SET_ENGLISH_FUMPA,
    SET_ENGLISH_FYMPA,
    SET_ENGLISH_MATERIAL_STEEL_TYPES,
    SET_ERROR_LOCATION,
    SET_ERROR_MESSAGE,
    SET_LATERAL_TORSIONAL_MODIFICATION_FACTOR,
    SET_LATEST_MATERIAL_METRIC_ID,
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
    SET_SECTION_DIMENSIONS_ARRAY,
    SET_SECTION_DIMENSIONS_ARRAY_ENGLISH,
    SET_SECTION_DIMENSIONS_ARRAY_METRIC,
    SET_SECTION_ID,
    SET_SECTION_SHAPE_DESIGN,
    SET_SECTION_SHAPE_DESIGN_ENGLISH,
    SET_SECTION_SHAPE_DESIGN_METRIC,
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
    SHIFT_REMOVED_MEMBER_ROW_ARRAY,
    SET_ALL_MEMBER_VALUES,
    SET_SELECTED_MEMBER_INDEX,
    SET_ALL_MEMBER_INDEX,
    REMOVE_CURRENT_SECTION_PROPERTY_INDEX,
    CLEAR_SECTION_PROPERTIES_INDEX_ARRAY, REMOVE_SELECTED_MATERIALS_ARRAY_INDEX, SET_DESIGN_METHOD_SHAPE
} from "../actions/actionTypes";

const initialState = {
    selectedSheet: 0,
    menuButtons: false,
    sheets: {
        0: {
            tabState: 'details',
            name: 'sheet',
            provision: 'ASD',
            system: "Metric",
            method: "Investigation",
            currentMaterialsArray: [1],
            currentSectionsArray: [1],
            sectionDimensionsArrayMetric: ['I'],
            sectionDimensionsArrayEnglish: [],
            removedMemberRowArray: [],
            arrayCheck: [],
            dataToBeLoopedForPostRequest: [],
            currentShape: 'I',
            route: '',
            calculatedData: null,
            selectedMemberIndex: 0,
            apiData: {
                designMemberMetric: [],
                designMemberEnglish: [],
                steelSections: [],
                shapes: [],
                sectionDimensionsMetric: [],
                sectionDimensionsEnglish: [],
                tShapesMetric: [],
                tShapesEnglish: [],
                roundHSShapesMetric: [],
                roundHSShapesEnglish: [],
                recHSShapesMetric: [],
                recHSShapesEnglish: [],
                pipeShapesMetric: [],
                pipeShapesEnglish: [],
                lShapesMetric: [],
                lShapesEnglish: [],
                iShapesMetric: [],
                iShapesEnglish: [],
                cShapesMetric: [],
                cShapesEnglish: [],
                twoLShapesMetric: [],
                twoLShapesEnglish: [],
                steelTypesMetric: [],
                steelTypesEnglish: [],
                sectionPropertiesMetric: [],
                sectionPropertiesEnglish: []
            },
            apiMap: {
                latestMaterialMetricId: 1,
                selectedSteelType: '',
                customSteelType: '',
                currentMetricMaterialPropertyIndex: 0,
                currentMetricEnglishPropertyIndex: 0,
                currentMetricSectionPropertyIndex: 0,
                currentEnglishSectionPropertyIndex: 0,
                currentSectionPropertyIndex: 0,
                customMaterialModal: false,
                steelTypeMetricProperties: {
                    0: {
                        id: 1,
                        name: 'A36',
                        EMPA: '200000',
                        FYMPA: '248',
                        FUMPA: '400',
                        custom: false
                    }
                },
                steelTypeEnglishProperties: {
                    0: {
                        id: 1,
                        name: 'A36',
                        EMPA: '29000',
                        FYMPA: '36',
                        FUMPA: '58',
                        custom: false
                    }
                },
                customSteelTypes: {
                    0: {
                        id: 1,
                        name: 'Custom Steel Type',
                        EMPA: '',
                        FYMPA: '',
                        FUMPA: '',
                        custom: false
                    }
                },
                sectionPropertiesMetric: {
                    0: {
                        sectionId: 1,
                        sectionShape: 'I',
                        sectionName: 'W1100X499',
                    }
                },
                sectionPropertiesEnglish: {
                    0: {
                        sectionId: 1,
                        sectionShape: 'I',
                        sectionName: 'W44X335'
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
                    sectionShape: 'W1100X499',
                    sectionName: 'W1100X499',
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
        case SET_DISABLE_MENU_BUTTONS:
            return setDisableMenuButtons(state, action.payload)
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
        case SET_CURRENT_ENGLISH_MATERIAL_PROPERTIES_INDEX:
            return setCurrentEnglishMaterialPropertyIndex(state, action.payload)
        case EDIT_SELECTED_METRIC_MATERIAL_PROPERTY:
            return editSelectedMetricMaterialProperty(state, action.payload)
        case CLEAR_METRIC_MATERIAL_PROPERTIES:
            return clearMetricMaterialProperties(state, action.payload)
        case ADD_SECTION_PROPERTY_METRIC:
            return addSectionPropertyMetric(state, action.payload)
        case ADD_SECTION_PROPERTY_ENGLISH:
            return addSectionPropertyEnglish(state, action.payload)
        case EDIT_SELECTED_SECTION_METRIC:
            return editSelectedSectionMetric(state, action.payload)
        case EDIT_SELECTED_SECTION_ENGLISH:
            return editSelectedSectionEnglish(state, action.payload)
        case GET_SECTION_PROPERTIES_METRIC:
            return getSectionPropertiesMetric(state, action.payload)
        case GET_SECTION_PROPERTIES_ENGLISH:
            return getSectionPropertiesEnglish(state, action.payload)
        case REMOVE_SELECTED_SECTION_PROPERTY_METRIC:
            return removeSelectedSectionPropertyMetric(state, action.payload)
        case REMOVE_SELECTED_SECTION_PROPERTY_ENGLISH:
            return removeSelectedSectionPropertyEnglish(state, action.payload)
        case REMOVE_ALL_SECTION_PROPERTIES:
            return removeAllSectionProperties(state, action.payload)
        case RESET_SECTION_INDEX_METRIC:
            return resetSectionIndexMetric(state, action.payload)
        case RESET_SECTION_INDEX_ENGLISH:
            return resetSectionIndexEnglish(state, action.payload)
        case SET_CURRENT_MATERIALS_ARRAY:
            return setCurrentMaterialsArray(state, action.payload)
        case RESET_METRIC_MATERIAL_PROPERTIES_INDEX:
            return resetMetricMaterialIndex(state, action.payload)
        case SET_CURRENT_SECTION_PROPERTIES_ARRAY:
            return setCurrentSectionPropertiesArray(state, action.payload)
        case SET_ARRAY_CHECK:
            return setArrayCheck(state, action.payload)
        case RESET_MEMBER_FIELDS:
            return resetMemberFields(state, action.payload)
        case RESET_METRIC_MATERIAL_PROPERTIES:
            return resetMetricMaterialProperties(state, action.payload)
        case RESET_ENGLISH_MATERIAL_PROPERTIES:
            return resetEnglishMaterialProperties(state, action.payload)
        case RESET_METRIC_SECTION_PROPERTIES:
            return resetMetricSectionProperties(state, action.payload)
        case RESET_ENGLISH_SECTION_PROPERTIES:
            return resetEnglishSectionProperties(state, action.payload)
        case SET_CURRENT_METRIC_SECTION_PROPERTY_INDEX:
            return setCurrentMetricSectionPropertyIndex(state, action.payload)
        case SET_CURRENT_ENGLISH_SECTION_PROPERTY_INDEX:
            return setCurrentEnglishSectionPropertyIndex(state, action.payload)
        case ADD_CUSTOM_STEEL_TYPE:
            return addCustomSteelType(state, action.payload)
        case SET_CUSTOM_SELECTED_STEEL_TYPE:
            return setCustomSelectedSteelType(state, action.payload)
        case CHANGE_MATERIAL_CUSTOM_STATUS:
            return changeMaterialCustomStatus(state, action.payload)
        case GET_SHAPES:
            return getShapes(state, action.payload)
        case GET_T_SHAPES_METRIC:
            return getTShapesMetric(state, action.payload)
        case GET_T_SHAPES_ENGLISH:
            return getTShapesEnglish(state, action.payload)
        case GET_ROUND_HS_SHAPES_METRIC:
            return getRoundHSShapesMetric(state, action.payload)
        case GET_ROUND_HS_SHAPES_ENGLISH:
            return getRoundHSShapesEnglish(state, action.payload)
        case GET_REC_HS_SHAPES_METRIC:
            return getRecHSShapesMetric(state, action.payload)
        case GET_REC_HS_SHAPES_ENGLISH:
            return getrecHSShapesEnglish(state, action.payload)
        case GET_PIPE_SHAPES_METRIC:
            return getPipeShapesMetric(state, action.payload)
        case GET_PIPE_SHAPES_ENGLISH:
            return getPipeShapesEnglish(state, action.payload)
        case GET_L_SHAPES_METRIC:
            return getLShapesMetric(state, action.payload)
        case GET_L_SHAPES_ENGLISH:
            return getLShapesEnglish(state, action.payload)
        case GET_I_SHAPES_METRIC:
            return getIShapesMetric(state, action.payload)
        case GET_I_SHAPES_ENGLISH:
            return getIShapesEnglish(state, action.payload)
        case GET_C_SHAPES_METRIC:
            return getCShapesMetric(state, action.payload)
        case GET_C_SHAPES_ENGLISH:
            return getCShapesEnglish(state, action.payload)
        case GET_2_L_SHAPES_METRIC:
            return get2LShapesMetric(state, action.payload)
        case GET_2_L_SHAPES_ENGLISH:
            return get2LShapesEnglish(state, action.payload)
        case GET_SECTION_DIMENSIONS_METRIC:
            return getSectionDimensionsMetric(state, action.payload)
        case GET_SECTION_DIMENSIONS_ENGLISH:
            return getSectionDimensionsEnglish(state, action.payload)
        case SET_SECTION_DIMENSIONS_ARRAY_METRIC:
            return setSectionDimensionsArrayMetric(state, action.payload)
        case SET_SECTION_DIMENSIONS_ARRAY_ENGLISH:
            return setSectionDimensionsArrayEnglish(state, action.payload)
        case GET_STEEL_SECTIONS:
            return getSteelSections(state, action.payload)
        case SET_CALCULATED_DATA:
            return setCalculatedData(state, action.payload)
        case SET_SECTION_SHAPE_DESIGN_METRIC:
            return setSectionShapeMetricDesign(state, action.payload)
        case SET_SECTION_SHAPE_DESIGN_ENGLISH:
            return setSectionShapeEnglishDesign(state, action.payload)
        case GET_DESIGN_MEMBERS_METRIC:
            return getDesignMembersMetric(state, action.payload)
        case GET_DESIGN_MEMBERS_ENGLISH:
            return getDesignMembersEnglish(state, action.payload)
        case SET_DATA_TO_BE_LOOPED_FOR_DESIGN_MEMBERS_POST_REQUEST:
            return setDataToBeLoopedForPostRequest(state, action.payload)
        case SET_CURRENT_SHAPE:
            return setCurrentShape(state, action.payload)
        case EDIT_SELECTED_ENGLISH_MATERIAL_PROPERTY:
            return editSelectedEnglishMaterialProperty(state, action.payload)
        case SET_LATEST_MATERIAL_METRIC_ID:
            return setLatestMaterialMetricId(state, action.payload)
        case ADD_SHEET_NAME:
            return addSheetName(state, action.payload)
        case CLEAR_CALCULATED_DATA:
            return clearCalculatedData(state, action.payload)
        case SET_ALL_MEMBER_VALUES:
            return setAllMemberValues(state, action.payload)
        case SET_SELECTED_MEMBER_INDEX:
            return setSelectedMemberIndex(state, action.payload)
        case SET_ALL_MEMBER_INDEX:
            return setAllMemberIndex(state, action.payload)
        case REMOVE_CURRENT_SECTION_PROPERTY_INDEX:
            return removeCurrentSectionPropertyIndex(state, action.payload)
        case CLEAR_SECTION_PROPERTIES_INDEX_ARRAY:
            return clearSectionPropertiesIndexArray(state, action.payload)
        case REMOVE_SELECTED_MATERIALS_ARRAY_INDEX:
            return removeSelectedMaterialArrayIndex(state, action.payload)
        case SET_DESIGN_METHOD_SHAPE:
            return setDesignMethodShape(state, action.payload)
        default:
            return state
    }
}

const setDesignMethodShape = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    sectionPropertiesMetric: {
                        ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesMetric,
                        [payload.sectionIndex]: {
                            ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesMetric[payload.sectionIndex],
                            sectionShape: payload.metricData
                        }
                    },
                    sectionPropertiesEnglish: {
                        ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesEnglish,
                        [payload.sectionIndex]: {
                            ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesEnglish[payload.sectionIndex],
                            sectionShape: payload.englishData
                        }
                    }
                }
            }
        }
    }
}

const clearSectionPropertiesIndexArray = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                currentSectionsArray: []
            }
        }
    }
}

const removeCurrentSectionPropertyIndex = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                currentSectionsArray: payload.data
            }
        }
    }
}

const setSelectedMemberIndex = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                selectedMemberIndex: payload.data
            }
        }
    }
}

const setAllMemberValues = (state, payload) => {
    // alert("payload.data == " + JSON.stringify(payload.data));
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                members: {
                    ...state.sheets[payload.sheetIndex].members,
                    [payload.memberIndex]: payload.data
                }
            }
        }
    }
}

const addSheetName = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                name: payload.data
            }
        }
    }
}

const setLatestMaterialMetricId = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    latestMaterialMetricId: payload.data
                }
            }
        }
    }
}

/**
 * Data to be looped for post request
 */
const setDataToBeLoopedForPostRequest = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                dataToBeLoopedForPostRequest: payload.data
            }
        }
    }
}

const clearCalculatedData = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                calculatedData: null
            }
        }
    }
}

const setCurrentShape = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                currentShape: payload.data
            }
        }
    }
}

/**
 * Design Member
 */
const getDesignMembersMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    designMemberMetric: payload.data
                }
            }
        }
    }
}

const getDesignMembersEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    designMemberEnglish: payload.data
                }
            }
        }
    }
}

/**
 * Design Section Shape
 */
const setSectionShapeMetricDesign = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    sectionPropertiesMetric: {
                        ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesMetric,
                        [payload.sectionIndex]: {
                            sectionId: 1,
                            sectionShape: payload.data,
                            sectionName: ''
                        }
                    }
                }
            }
        }
    }
}

const setSectionShapeEnglishDesign = (state, payload) => {
    // alert("at the reducer == " + JSON.stringify(payload.data))
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    sectionPropertiesEnglish: {
                        ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesEnglish,
                        [payload.sectionIndex]: {
                            sectionId: 1,
                            sectionShape: payload.data,
                            sectionName: ''
                        }
                    }
                }
            }
        }
    }
}

/**
 * Calculated Data
 */
const setCalculatedData = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                calculatedData: payload.data
            }
        }
    }
}

/**
 * Errors
 */
const setArrayCheck = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                arrayCheck: payload.data
            }
        }
    }
}

/**
 * Sheets
 */



const addNewSheet = (state, payload) => {
    // alert("the data == " + payload.data)
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
 * Menu Buttons
 */

const setDisableMenuButtons = (state, payload) => {
    return {
        ...state,
        menuButtons: payload
    }
}

/**
 * API
 */

const getSteelSections = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    steelSections: payload.data
                }
            }
        }
    }
}

const getShapes = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    shapes: payload.data
                }
            }
        }
    }
}

const getSectionDimensionsMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    sectionDimensionsMetric: payload.data
                }
            }
        }
    }
}

const getSectionDimensionsEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    sectionDimensionsEnglish: payload.data
                }
            }
        }
    }
}

const getTShapesMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    tShapesMetric: payload.data
                }
            }
        }
    }
}

const getTShapesEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    tShapesEnglish: payload.data
                }
            }
        }
    }
}

const getRoundHSShapesMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    roundHSShapesMetric: payload.data
                }
            }
        }
    }
}

const getRoundHSShapesEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    roundHSShapesEnglish: payload.data
                }
            }
        }
    }
}

const getRecHSShapesMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    recHSShapesMetric: payload.data
                }
            }
        }
    }
}

const getrecHSShapesEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    recHSShapesEnglish: payload.data
                }
            }
        }
    }
}

const getPipeShapesMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    pipeShapesMetric: payload.data
                }
            }
        }
    }
}

const getPipeShapesEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    pipeShapesEnglish: payload.data
                }
            }
        }
    }
}

const getLShapesMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    lShapesMetric: payload.data
                }
            }
        }
    }
}

const getLShapesEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    lShapesEnglish: payload.data
                }
            }
        }
    }
}

const getIShapesMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    iShapesMetric: payload.data
                }
            }
        }
    }
}

const getIShapesEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    iShapesEnglish: payload.data
                }
            }
        }
    }
}

const getCShapesMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    cShapesMetric: payload.data
                }
            }
        }
    }
}

const getCShapesEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    cShapesEnglish: payload.data
                }
            }
        }
    }
}

const get2LShapesMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    twoLShapesMetric: payload.data
                }
            }
        }
    }
}

const get2LShapesEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    twoLShapesEnglish: payload.data
                }
            }
        }
    }
}

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

const getSectionPropertiesEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiData: {
                    ...state.sheets[payload.sheetIndex].apiData,
                    sectionPropertiesEnglish: payload.data
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
 * end of Sheet Factors
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
                    shearAlongXAxis: payload.data
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
                    shearAlongYAxis: payload.data
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

const setAllMemberIndex = (state, payload) => {
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

const resetMemberFields = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload]: {
                ...state.sheets[payload],
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
                }
            }
        }
    }
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
            [payload]: {
                ...state.sheets[payload],
                removedMemberRowArray: []
            }
        }
    }
}

const setRemovedMemberRowArray = (state, payload) => {
    // alert("at the reducer == " + JSON.stringify(payload.data))
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
    // alert("totalLengthOfMember == " + JSON.stringify(payload.data));
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
    // alert("at the reducer == " + payload.data )
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
    // alert("at the reducer == " + JSON.stringify(payload.data));
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
    // alert("at the reducer == " + payload.data)
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

const setCurrentEnglishMaterialPropertyIndex = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    currentEnglishMaterialPropertyIndex: payload.data
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
                            ...state.sheets[payload.sheetIndex].apiMap.steelTypeMetricProperties[payload.materialIndex],
                            name: payload.name,
                            EMPA: payload.EMPA,
                            FYMPA: payload.FYMPA,
                            FUMPA: payload.FUMPA,
                            custom: payload.custom
                        }
                    }
                }
            }
        }
    }
}

const editSelectedEnglishMaterialProperty = (state, payload) => {
    // alert("the payload == " + payload.EMPA);
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
                        [payload.materialIndex]: {
                            ...state.sheets[payload.sheetIndex].apiMap.steelTypeEnglishProperties[payload.materialIndex],
                            name: payload.name,
                            EMPA: payload.EMPA,
                            FYMPA: payload.FYMPA,
                            FUMPA: payload.FUMPA,
                            custom: payload.custom
                        }
                    }
                }
            }
        }
    }
}

const changeMaterialCustomStatus = (state, payload) => {
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
                        [payload.materialPropertyIndex]: {
                            ...state.sheets[payload.sheetIndex].apiMap.steelTypeMetricProperties[payload.materialPropertyIndex],
                            custom: payload.data
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
                    steelTypeMetricProperties: null,
                    steelTypeEnglishProperties: null,
                }
            }
        }
    }
}

const setCurrentMaterialsArray = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                currentMaterialsArray: [
                    ...state.sheets[payload.sheetIndex].currentMaterialsArray,
                    payload.data
                ]
            }
        }
    }
}

const removeSelectedMaterialArrayIndex = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                currentMaterialsArray: payload.data
            }
        }
    }
}

const resetMetricMaterialIndex = (state, payload) => {
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

const resetMetricMaterialProperties = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload]: {
                ...state.sheets[payload],
                apiMap: {
                    ...state.sheets[payload].apiMap,
                    steelTypeMetricProperties: {
                        0: {
                            id: 1,
                            name: 'A36',
                            EMPA: 200000,
                            FYMPA: 248,
                            FUMPA: 400
                        }
                    }
                }
            }
        }
    }
}

const resetEnglishMaterialProperties = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload]: {
                ...state.sheets[payload],
                apiMap: {
                    ...state.sheets[payload].apiMap,
                    steelTypeEnglishProperties: {
                        0: {
                            id: 1,
                            name: 'A36',
                            EMPA: 29000,
                            FYMPA: 36,
                            FUMPA: 58
                        }
                    }
                }
            }
        }
    }
}

const setMaterialModalCustom = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    customMaterialModal: payload.data
                }
            }
        }
    }
}

const addCustomSteelType = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    customSteelTypes: payload.data
                }
            }
        }
    }
}

const setCustomSelectedSteelType = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    customSteelType: payload.data
                }
            }
        }
    }
}

/**
 * Sheet Section Properties
 */

const addSectionPropertyMetric = (state, payload) => {
    // alert("At the reducer == " + JSON.stringify(payload.data))
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    sectionPropertiesMetric: payload.data
                }
            }
        }
    }
}

const addSectionPropertyEnglish = (state, payload) => {
    // alert("At the reducer == " + JSON.stringify(payload.data))
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    sectionPropertiesEnglish: payload.data
                }
            }
        }
    }
}

const setSectionDimensionsArrayMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                sectionDimensionsArrayMetric: [
                    ...state.sheets[payload.sheetIndex].sectionDimensionsArrayMetric,
                    payload.data
                ]
            }
        }
    }
}

const setSectionDimensionsArrayEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                sectionDimensionsArrayEnglish: [
                    ...state.sheets[payload.sheetIndex].sectionDimensionsArrayEnglish,
                    payload.data
                ]
            }
        }
    }
}

const removeSelectedSectionPropertyMetric = (state, payload) => {
    let newState = {...state}
    delete newState.sheets[payload.sheetIndex].apiMap.sectionPropertiesMetric[payload.sectionIndex]
    return newState
}

const removeSelectedSectionPropertyEnglish = (state, payload) => {
    // alert("I am here")
    let newState = {...state}
    delete newState.sheets[payload.sheetIndex].apiMap.sectionPropertiesEnglish[payload.sectionIndex]
    return newState
}

const removeAllSectionProperties = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload]: {
                ...state.sheets[payload],
                sectionDimensionsArrayMetric: [],
                sectionDimensionsArrayEnglish: [],
                apiMap: {
                    ...state.sheets[payload].apiMap,
                    sectionPropertiesMetric: {},
                    sectionPropertiesEnglish: {},
                }
            }
        }
    }
}

const resetSectionIndexMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    sectionPropertiesMetric: payload.data
                }
            }
        }
    }
}

const resetSectionIndexEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    sectionPropertiesEnglish: payload.data
                }
            }
        }
    }
}

const setCurrentSectionPropertiesArray = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                currentSectionsArray: [
                    ...state.sheets[payload.sheetIndex].currentSectionsArray,
                    payload.data
                ]
            }
        }
    }
}

const editSelectedSectionMetric = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    sectionPropertiesMetric: {
                        ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesMetric,
                        [payload.sectionIndex]: {
                            ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesMetric[payload.sectionIndex],
                            sectionShape: payload.sectionShape,
                            sectionName: payload.sectionName
                        }
                    },
                    // sectionPropertiesEnglish:{
                    //     ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesEnglish,
                    //     [payload.sectionIndex]: {
                    //         ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesEnglish[payload.sectionIndex],
                    //         sectionShape: payload.sectionShape,
                    //         sectionName: payload.sectionName
                    //     }
                    // }
                }
            }
        }
    }
}

const editSelectedSectionEnglish = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    // sectionPropertiesMetric:{
                    //     ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesMetric,
                    //     [payload.sectionIndex]: {
                    //         ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesMetric[payload.sectionIndex],
                    //         sectionShape: payload.sectionShape,
                    //         sectionName: payload.sectionName
                    //     }
                    // },
                    sectionPropertiesEnglish: {
                        ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesEnglish,
                        [payload.sectionIndex]: {
                            ...state.sheets[payload.sheetIndex].apiMap.sectionPropertiesEnglish[payload.sectionIndex],
                            sectionShape: payload.sectionShape,
                            sectionName: payload.sectionName
                        }
                    }
                }
            }
        }
    }
}

const setCurrentSectionPropertyIndex = (state, payload) => {
    // alert("the new index == " + payload.data)
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    currentSectionPropertyIndex: payload.data
                }
            }
        }
    }
}

const resetMetricSectionProperties = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload]: {
                ...state.sheets[payload],
                apiMap: {
                    ...state.sheets[payload].apiMap,
                    sectionPropertiesMetric: {
                        0: {
                            sectionId: 1,
                            sectionShape: 'I',
                            sectionName: 'W1100X499',
                        }
                    }
                }
            }
        }
    }
}

const resetEnglishSectionProperties = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload]: {
                ...state.sheets[payload],
                apiMap: {
                    ...state.sheets[payload].apiMap,
                    sectionPropertiesEnglish: {
                        0: {
                            sectionId: 1,
                            sectionShape: 'I',
                            sectionName: 'W44X335',
                        }
                    }
                }
            }
        }
    }
}

const setCurrentMetricSectionPropertyIndex = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    currentMetricSectionPropertyIndex: payload.data
                }
            }
        }
    }
}

const setCurrentEnglishSectionPropertyIndex = (state, payload) => {
    return {
        ...state,
        sheets: {
            ...state.sheets,
            [payload.sheetIndex]: {
                ...state.sheets[payload.sheetIndex],
                apiMap: {
                    ...state.sheets[payload.sheetIndex].apiMap,
                    currentEnglishSectionPropertyIndex: payload.data
                }
            }
        }
    }
}

export default Reducer
