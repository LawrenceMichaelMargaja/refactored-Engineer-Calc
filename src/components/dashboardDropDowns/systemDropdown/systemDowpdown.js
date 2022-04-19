import React, {useEffect, useState} from 'react'
import {Card, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setSystemDropdown} from "../../../store/actions/dashboardDropdowns/systemDropdown";
import {
    clearCalculatedData,
    getSteelTypesEnglishAPI,
    getSteelTypesMetricAPI,
    setCalculatedData,
    setTabState
} from "../../../store/actions/sheets/sheets";
import {objectChecker} from "../../../utilities/utilities";
import {size} from "lodash";
import {resetMemberFields} from "../../../store/actions/sheets/sheetCalculationComponents/memberFields/memberFields";
import {
    resetEnglishMaterialProperties,
    resetMetricMaterialProperties
} from "../../../store/actions/sheets/sheetCalculationComponents/materialProperties/materialProperties";
import {
    resetEnglishSectionProperties,
    resetMetricSectionProperties
} from "../../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import {useNavigate} from "react-router";
import axios from "axios";
import {Tooltip} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    dropDown: {
        padding: '1em',
        borderRadius: '4px',
        margin: '5px',
        width: '10%',
        border: '1px solid black',
        backgroundColor: '#e2e2e2'
    },
    inputLabelRoot: {
        color: 'black',
        fontWeight: 'bold'
    }
}))

const SystemDropdown = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const sheetTabs = useSelector(state => state.sheets.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    // const systemValue = useSelector(state => state.sheets.sheets[selectedSheet].system)
    const systemValue = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const materialModalCustomState = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'customMaterialModal'])
    const classes = useStyles()

    const tabState = objectChecker(sheets, ['sheets', selectedSheet, 'tabState'])
    const navigate = useNavigate()

    const handleChange = (event) => {
        if(tabState === 'results') {
            if(systemValue === 'Metric') {
                const proceed = window.confirm("Changing the system now will result in the loss of all Metric calculations and will navigate you back to the members tab. Do you wish to continue?")
                if(proceed) {
                    dispatch(resetMemberFields(selectedSheet))
                    dispatch(setCalculatedData(null, selectedSheet))
                    dispatch(resetMetricMaterialProperties(selectedSheet))
                    dispatch(resetEnglishMaterialProperties(selectedSheet))
                    dispatch(resetMetricSectionProperties(selectedSheet))
                    dispatch(resetEnglishSectionProperties(selectedSheet))
                    // dispatch(clearCalculatedData(null, selectedSheet))
                    dispatch(setTabState('members', selectedSheet))
                    navigate('/members')
                    dispatch(setSystemDropdown(event.target.value, selectedSheet))
                } else {
                    return
                }
            } else if(systemValue === 'English') {
                const proceed = window.confirm("Changing the system now will result in the loss of all English calculations and will navigate you back to the members tab. Do you wish to continue?")
                if(proceed) {
                    dispatch(resetMemberFields(selectedSheet))
                    dispatch(setCalculatedData(null, selectedSheet))
                    dispatch(resetMetricMaterialProperties(selectedSheet))
                    dispatch(resetEnglishMaterialProperties(selectedSheet))
                    dispatch(resetMetricSectionProperties(selectedSheet))
                    // dispatch(clearCalculatedData(null, selectedSheet))
                    dispatch(resetEnglishSectionProperties(selectedSheet))
                    dispatch(setTabState('members', selectedSheet))
                    navigate('/members')
                    dispatch(setSystemDropdown(event.target.value, selectedSheet))
                } else {
                    return
                }
            }
        } else {
            dispatch(setSystemDropdown(event.target.value, selectedSheet))
        }
    };

    const disable = () => {
        if(size(sheetTabs) === 0) {
            return true
        } else {
            return false
        }
    }

    return (
        <div sx={{ minWidth: 120 }} className={classes.dropDown}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" className={classes.inputLabelRoot}>System</InputLabel>
                {/*<Tooltip title={<p>Click to change system.</p>} placement='right'>*/}
                    <Select
                        disabled={disable()}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={systemValue}
                        label="Age"
                        defaultValue={systemValue}
                        onChange={(event) => {
                            handleChange(event)
                            // getMaterialProperties()
                        }}
                    >
                        <MenuItem value={'Metric'}>Metric</MenuItem>
                        <MenuItem value={'English'}>English</MenuItem>
                    </Select>
                {/*</Tooltip>*/}
            </FormControl>
        </div>
    )
}

export default SystemDropdown
