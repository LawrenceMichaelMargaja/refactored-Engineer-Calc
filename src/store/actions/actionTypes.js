/**
 * API
 */
// =================== GET REQUESTS =====================
export const GET_STEEL_TYPES_METRIC_API = '@@sheets/GET_STEEL_TYPES_METRIC_API'
export const GET_STEEL_TYPES_ENGLISH_API = '@@sheets/GET_STEEL_TYPES_ENGLISH_API'
export const GET_SECTION_PROPERTIES_METRIC = '@@sheets/GET_SECTION_PROPERTIES_METRIC'
export const GET_SECTION_PROPERTIES_ENGLISH = '@@sheets/GET_SECTION_PROPERTIES_ENGLISH'
export const GET_SHAPES = '@@sheets/GET_SHAPES'
export const GET_T_SHAPES_METRIC = '@@sheets/GET_T_SHAPES_METRIC'
export const GET_T_SHAPES_ENGLISH = '@@sheets/GET_T_SHAPES_ENGLISH'
export const GET_ROUND_HS_SHAPES_METRIC = '@@sheets/GET_ROUND_HS_SHAPES_METRIC'
export const GET_ROUND_HS_SHAPES_ENGLISH = '@@sheets/GET_ROUND_HS_SHAPES_ENGLISH'
export const GET_REC_HS_SHAPES_METRIC = '@@sheets/GET_REC_HS_SHAPES_METRIC'
export const GET_REC_HS_SHAPES_ENGLISH = '@@sheets/GET_REC_HS_SHAPES_ENGLISH'
export const GET_PIPE_SHAPES_METRIC = '@@sheets/GET_PIPE_SHAPES_METRIC'
export const GET_PIPE_SHAPES_ENGLISH = '@@sheets/GET_PIPE_SHAPES_ENGLISH'
export const GET_L_SHAPES_METRIC = '@@sheets/GET_L_SHAPES_METRIC'
export const GET_L_SHAPES_ENGLISH = '@@sheets/GET_L_SHAPES_ENGLISH'
export const GET_I_SHAPES_METRIC = '@@sheets/GET_I_SHAPES_METRIC'
export const GET_I_SHAPES_ENGLISH = '@@sheets/GET_I_SHAPES_ENGLISH'
export const GET_C_SHAPES_METRIC = '@@sheets/GET_C_SHAPES_METRIC'
export const GET_C_SHAPES_ENGLISH = '@@sheets/GET_C_SHAPES_ENGLISH'
export const GET_2_L_SHAPES_METRIC = '@@sheets/GET_2_L_SHAPES_METRIC'
export const GET_2_L_SHAPES_ENGLISH = '@@sheets/GET_2_L_SHAPES_ENGLISH'
export const GET_SECTION_DIMENSIONS_METRIC = '@@sheets/GET_SECTION_DIMENSIONS_METRIC'
export const GET_SECTION_DIMENSIONS_ENGLISH = '@@sheets/GET_SECTION_DIMENSIONS_ENGLISH'

// ================ END OF GET REQUESTS ==================

export const SET_SELECTED_STEEL_TYPE = '@@sheets/SET_SELECTED_STEEL_TYPE'
export const SET_METRIC_EMPA = '@@sheets/SET_METRIC_EMPA'
export const SET_METRIC_FYMPA = '@@sheets/SET_METRIC_FYMPA'
export const SET_METRIC_FUMPA = '@@sheets/SET_METRIC_FUMPA'

export const SET_ENGLISH_EMPA = '@@sheets/SET_ENGLISH_EMPA'
export const SET_ENGLISH_FYMPA = '@@sheets/SET_ENGLISH_FYMPA'
export const SET_ENGLISH_FUMPA = '@@sheets/SET_ENGLISH_FUMPA'

export const SET_MAPPED_STEEL_TYPE_METRIC = '@@sheets/SET_MAPPED_STEEL_TYPE_METRIC'
export const SET_MAPPED_STEEL_TYPE_ENGLISH = '@@sheets/SET_MAPPED_STEEL_TYPE_ENGLISH'

/**
 * Errors
 */
export const SET_ERROR_LOCATION = '@@sheets/SET_ERROR_LOCATION'
export const SET_ERROR_MESSAGE = '@@sheets/SET_ERROR_MESSAGE'
export const SET_ARRAY_CHECK = '@@sheets/SET_ARRAY_CHECK'

/**
 * Dashboard drop downs
 */
export const SET_PROVISION_DROPDOWN = '@@provisionDropDown/SET_PROVISION_DROPDOWN'
export const SET_SYSTEM_DROPDOWN = '@@systemDropdown/SET_SYSTEM_DROPDOWN'
export const SET_METHOD_DROPDOWN = '@@methodDropdown/SET_METHOD_DROPDOWN'

/**
 * Sheets
 */
export const ADD_NEW_SHEET = '@@sheets/ADD_NEW_SHEET'
export const SET_TAB_STATE = '@@sheets/SET_TAB_STATE'
export const SET_SELECTED_SHEET = '@@sheets/SET_SELECTED_SHEET'
export const SET_ROUTE_URL = '@@sheets/SET_ROUTE_URL'
export const REMOVE_SHEET = '@@sheets/REMOVE_SHEET'

/**
 * Sheet Details
 */
export const SET_PROJECT_UNIT = '@@sheets/SET_PROJECT_UNIT'
export const SET_PROJECT_NAME = '@@sheets/SET_PROJECT_NAME'
export const SET_PROJECT_ID = '@@sheets/SET_PROJECT_ID'
export const SET_PROJECT_COMPANY = '@@sheets/SET_PROJECT_COMPANY'
export const SET_PROJECT_DESIGNER = '@@sheets/SET_PROJECT_DESIGNER'
export const SET_PROJECT_CLIENT = '@@sheets/SET_PROJECT_CLIENT'
export const SET_PROJECT_NOTES = '@@sheets/SET_PROJECT_NOTES'

/**
 * Menu Buttons
 */
export const SET_DISABLE_MENU_BUTTONS = '@@sheets/SET_DISABLE_MENU_BUTTONS'

/**
 * Sheet Factors
 */
export const SET_SAFETY_FACTOR_FOR_TENSILE = '@@sheets/SET_SAFETY_FACTOR_FOR_TENSILE'
export const SET_SAFETY_FACTOR_FOR_COMPRESSION = '@@sheets/SET_SAFETY_FACTOR_FOR_COMPRESSION'
export const SET_SAFETY_FACTOR_FOR_FLEXURE = '@@sheets/SET_SAFETY_FACTOR_FOR_FLEXURE'
export const SET_SAFETY_FACTOR_FOR_SHEAR = '@@sheets/SET_SAFETY_FACTOR_FOR_SHEAR'

/**
 * Sheet Forces
 */
export const SET_BENDING_MOMENT_ALONG_X_AXIS = '@@sheets/SET_BENDING_MOMENT_ALONG_X_AXIS'
export const SET_BENDING_MOMENT_ALONG_Y_AXIS = '@@sheets/SET_BENDING_MOMENT_ALONG_Y_AXIS'
export const SET_SHEAR_ALONG_X_AXIS = '@@sheets/SET_SHEAR_ALONG_X_AXIS'
export const SET_SHEAR_ALONG_Y_AXIS = '@@sheets/SET_SHEAR_ALONG_Y_AXIS'
export const SET_AXIAL = '@@sheets/SET_AXIAL'

/**
 * Sheet MemberFields
 */
export const ADD_INITIAL_MEMBER = '@@sheets/ADD_INITIAL_MEMBER'
export const REMOVE_MEMBER_ROW = '@@sheets/REMOVE_MEMBER_ROW'
export const REMOVE_ALL_MEMBER_ROWS = '@@sheets/REMOVE_ALL_MEMBER_ROWS'
export const CLEAR_REMOVED_MEMBERS_ARRAY = '@@sheets/CLEAR_REMOVED_MEMBERS_ARRAY'
export const SET_REMOVED_MEMBER_ROW_ARRAY = '@@sheets/SET_REMOVED_MEMBER_ROW_ARRAY'
export const SHIFT_REMOVED_MEMBER_ROW_ARRAY = '@@sheets/SHIFT_REMOVED_MEMBER_ROW_ARRAY'
export const SET_MEMBER_ID = '@@sheets/SET_MEMBER_ID'
export const SET_MATERIAL_ID = '@@sheets/SET_MATERIAL_ID'
export const SET_SECTION_ID = '@@sheets/SET_SECTION_ID'
export const SET_TOTAL_LENGTH_OF_MEMBER = '@@sheets/SET_TOTAL_LENGTH_OF_MEMBER'
export const SET_Y_AXIS_UNBRACED_LENGTH = '@@sheets/SET_Y_AXIS_UNBRACED_LENGTH'
export const SET_Y_AXIS_EFFECTIVE_LENGTH_FACTOR = '@@sheets/SET_Y_AXIS_EFFECTIVE_LENGTH_FACTOR'
export const SET_Z_AXIS_UNBRACED_LENGTH = '@@sheets/SET_Z_AXIS_UNBRACED_LENGTH'
export const SET_Z_AXIS_EFFECTIVE_LENGTH_FACTOR = '@@sheets/SET_Z_AXIS_EFFECTIVE_LENGTH_FACTOR'
export const SET_LLT = '@@sheets/SET_LLT'
export const SET_UNBRACED_LENGTH_LATERAL_TORSIONAL = '@@sheets/SET_UNBRACED_LENGTH_LATERAL_TORSIONAL'
export const SET_LATERAL_TORSIONAL_MODIFICATION_FACTOR = '@@sheets/SET_LATERAL_TORSIONAL_MODIFICATION_FACTOR'
export const SET_SLENDERNESS_RATIO_IN_COMPRESSION = '@@sheets/SET_SLENDERNESS_RATIO_IN_COMPRESSION'
export const SET_SLENDERNESS_RATIO_IN_TENSION = '@@sheets/SET_SLENDERNESS_RATIO_IN_TENSION'
export const SET_LST = '@@sheets/SET_LST'
export const RESET_MEMBER_FIELDS = '@@sheets/RESET_MEMBER_FIELDS'

/**
 * Sheet Material Properties
 */
export const SET_CURRENT_MATERIALS_ARRAY = '@@sheets/SET_CURRENT_MATERIALS_ARRAY'
export const SET_MATERIAL_PROPERTIES_ID = '@@sheets/SET_MATERIAL_PROPERTIES_ID'
export const SET_MATERIAL_PROPERTIES_EMPA = '@@sheets/SET_MATERIAL_PROPERTIES_EMPA'
export const SET_MATERIAL_PROPERTIES_FYMPA = '@@sheets/SET_MATERIAL_PROPERTIES_FYMPA'
export const SET_MATERIAL_PROPERTIES_FUMPA = '@@sheets/SET_MATERIAL_PROPERTIES_FUMPA'
export const SET_MATERIAL_PROPERTIES_SELECTED_MATERIAL = '@@sheets/SET_MATERIAL_PROPERTIES_SELECTED_MATERIAL'
export const SET_METRIC_MATERIAL_STEEL_TYPES = '@@sheets/SET_METRIC_MATERIAL_STEEL_TYPES'
export const SET_ENGLISH_MATERIAL_STEEL_TYPES = '@@sheets/SET_ENGLISH_MATERIAL_STEEL_TYPES'
export const REMOVE_METRIC_MATERIAL_PROPERTY_ROW = '@@sheets/REMOVE_METRIC_MATERIAL_PROPERTY_ROW'
export const SET_CURRENT_METRIC_MATERIAL_PROPERTIES_INDEX = '@@sheets/SET_CURRENT_METRIC_MATERIAL_PROPERTIES_INDEX'
export const EDIT_SELECTED_METRIC_MATERIAL_PROPERTY = '@@sheets/EDIT_SELECTED_METRIC_MATERIAL_PROPERTY'
export const CLEAR_METRIC_MATERIAL_PROPERTIES = '@@sheets/CLEAR_METRIC_MATERIAL_PROPERTIES'
export const RESET_METRIC_MATERIAL_PROPERTIES_INDEX = '@@sheets/RESET_METRIC_MATERIAL_PROPERTIES_INDEX'
export const RESET_METRIC_MATERIAL_PROPERTIES = '@@sheets/RESET_METRIC_MATERIAL_PROPERTIES'
export const RESET_ENGLISH_MATERIAL_PROPERTIES = '@@sheets/RESET_ENGLISH_MATERIAL_PROPERTIES'
export const SET_MATERIAL_MODAL_CUSTOM = '@@sheets/SET_MATERIAL_MODAL_CUSTOM'
export const ADD_CUSTOM_STEEL_TYPE = '@@sheets/ADD_CUSTOM_STEEL_TYPE'
export const SET_CUSTOM_SELECTED_STEEL_TYPE = '@@sheets/SET_CUSTOM_SELECTED_STEEL_TYPE'
export const ADD_SELECTED_STEEL_TYPE = '@@sheets/ADD_SELECTED_STEEL_TYPE'
export const CHANGE_MATERIAL_CUSTOM_STATUS = '@@sheets/CHANGE_MATERIAL_CUSTOM_STATUS'

/**
 * Sheet Section Properties
 */
export const ADD_SECTION_PROPERTY_METRIC = '@@sheets/ADD_SECTION_PROPERTY_METRIC'
export const ADD_SECTION_PROPERTY_ENGLISH = '@@sheets/ADD_SECTION_PROPERTY_ENGLISH'
export const REMOVE_SELECTED_SECTION_PROPERTY = '@@sheets/REMOVE_SELECTED_SECTION_PROPERTY'
export const RESET_SECTION_INDEX = '@@sheets/RESET_SECTION_INDEX'
export const EDIT_SELECTED_SECTION_METRIC = '@@sheets/EDIT_SELECTED_SECTION_METRIC'
export const EDIT_SELECTED_SECTION_ENGLISH = '@@sheets/EDIT_SELECTED_SECTION_ENGLISH'
export const SET_CURRENT_METRIC_SECTION_PROPERTY_INDEX = '@@sheets/SET_CURRENT_METRIC_SECTION_PROPERTY_INDEX'
export const SET_CURRENT_ENGLISH_SECTION_PROPERTY_INDEX = '@@sheets/SET_CURRENT_ENGLISH_SECTION_PROPERTY_INDEX'
export const SET_CURRENT_SECTION_PROPERTIES_ARRAY = '@@sheets/SET_CURRENT_SECTION_PROPERTIES_ARRAY'
export const REMOVE_ALL_SECTION_PROPERTIES = '@@sheets/REMOVE_ALL_SECTION_PROPERTIES'
export const RESET_METRIC_SECTION_PROPERTIES = '@@sheets/RESET_METRIC_SECTION_PROPERTIES'
export const RESET_ENGLISH_SECTION_PROPERTIES = '@@sheets/RESET_ENGLISH_SECTION_PROPERTIES'