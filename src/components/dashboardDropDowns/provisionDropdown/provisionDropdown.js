import React, {useEffect, useState} from 'react'
import {Card, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setProvisionDropdown} from "../../../store/actions/dashboardDropdowns/provisionDropdown";
import {
    setSafetyFactorForCompression, setSafetyFactorForFlexure, setSafetyFactorForShear,
    setSafetyFactorForTensile
} from "../../../store/actions/sheets/sheetCalculationComponents/factors/factors";
import {objectChecker} from "../../../utilities/utilities";
import {size} from "lodash";

const useStyles = makeStyles((theme) => ({
    dropDown: {
        padding: '1em',
        borderRadius: '4px',
        margin: '5px',
        width: '10%',
        border: '1px solid black',
        backgroundColor: '#e2e2e2'
    }
}))

const ProvisionDropdown = () => {

    const dispatch = useDispatch()
    const classes = useStyles()
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const sheets = useSelector(state => state.sheets)
    const sheetTabs = useSelector(state => state.sheets.sheets)
    // const provision = useSelector(state => state.sheets.sheets[selectedSheet].provision)
    const provision = objectChecker(sheets, ['sheets', selectedSheet, 'provision'])

    const disable = () => {
        if(size(sheetTabs) === 0) {
            return true
        } else {
            return false
        }
    }

    const handleChange = (event) => {
        alert("the provision == " + selectedSheet)
        dispatch(setProvisionDropdown(event.target.value, selectedSheet))
        if(event.target.value === 'ASD') {
            dispatch(setSafetyFactorForTensile(1.67, selectedSheet))
            dispatch(setSafetyFactorForCompression(1.67, selectedSheet))
            dispatch(setSafetyFactorForFlexure(1.67, selectedSheet))
            dispatch(setSafetyFactorForShear(1.67, selectedSheet))
        } else if(event.target.value === 'LRFD') {
            dispatch(setSafetyFactorForTensile(0.9, selectedSheet))
            dispatch(setSafetyFactorForCompression(0.9, selectedSheet))
            dispatch(setSafetyFactorForFlexure(0.9, selectedSheet))
            dispatch(setSafetyFactorForShear(0.9, selectedSheet))
        }
    };

    return (
        <div sx={{ minWidth: 120 }} className={classes.dropDown}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Provision</InputLabel>
                <Select
                    disabled={disable()}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={provision}
                    // options{options}
                    onChange={(e) => handleChange(e)}
                >
                    <MenuItem value={"ASD"}>AISC 360-16 ASD</MenuItem>
                    <MenuItem value={"LRFD"}>AISC 360-16 LRFD</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default ProvisionDropdown