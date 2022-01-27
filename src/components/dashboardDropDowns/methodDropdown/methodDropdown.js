import React, {useEffect, useState} from 'react'
import {Card, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setMethodDropdown} from "../../../store/actions/dashboardDropdowns/methodDropdown";
import {objectChecker} from "../../../utilities/utilities";
import {size} from "lodash";
import {
    removeAllSectionProperties, resetEnglishSectionProperties,
    resetMetricSectionProperties
} from "../../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import {resetMemberFields} from "../../../store/actions/sheets/sheetCalculationComponents/memberFields/memberFields";
import {
    resetEnglishMaterialProperties,
    resetMetricMaterialProperties
} from "../../../store/actions/sheets/sheetCalculationComponents/materialProperties/materialProperties";
import {useNavigate} from "react-router";
import {setTabState} from "../../../store/actions/sheets/sheets";

const useStyles = makeStyles((theme) => ({
    dropDown: {
        padding: '1em',
        borderRadius: '4px',
        margin: '5px',
        width: '10%',
        border: '1px solid black',
        backgroundColor: '#e2e2e2',
    }
}))

const MethodDropdown = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const sheetTabs = useSelector(state => state.sheets.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    // const methodValue = useSelector(state => state.sheets.sheets[selectedSheet].method)
    const methodValue = objectChecker(sheets, ['sheets', selectedSheet, 'method'])

    const classes = useStyles()
    const navigate = useNavigate()

    const disable = () => {
        if(size(sheetTabs) === 0) {
            return true
        } else {
            return false
        }
    }

    const handleChange = (event) => {
        if(event.target.value === 'Design') {
            const proceed = window.confirm("This will remove all added member field rows, section property rows, and material property rows. Are you sure you want to proceed?")
            // alert("hi")
            if(proceed) {
                dispatch(resetMemberFields(selectedSheet))
                dispatch(resetMetricMaterialProperties(selectedSheet))
                dispatch(resetEnglishMaterialProperties(selectedSheet))
                dispatch(resetMetricSectionProperties(selectedSheet))
                dispatch(resetEnglishSectionProperties(selectedSheet))
                dispatch(setMethodDropdown(event.target.value, selectedSheet))
                dispatch(setTabState('members', selectedSheet))
                navigate('/members')
            } else {
                return
            }
        } else if(event.target.value === 'Investigation') {
            // alert("nono")
            dispatch(setMethodDropdown(event.target.value, selectedSheet))
        }
    };

    return (
        <div sx={{ minWidth: 120 }} className={classes.dropDown}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Method</InputLabel>
                <Select
                    disabled={disable()}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={methodValue}
                    label="Age"
                    defaultValue={methodValue}
                    onChange={(event) => handleChange(event)}
                >
                    <MenuItem value={'Investigation'}>Investigation</MenuItem>
                    <MenuItem value={'Design'}>Design</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default MethodDropdown
