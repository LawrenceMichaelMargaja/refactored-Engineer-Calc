import React, {useEffect, useState} from 'react'
import {Card, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setSystemDropdown} from "../../../store/actions/dashboardDropdowns/systemDropdown";
import {getSteelTypesEnglishAPI, getSteelTypesMetricAPI} from "../../../store/actions/sheets/sheets";
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

const SystemDropdown = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const sheetTabs = useSelector(state => state.sheets.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    // const systemValue = useSelector(state => state.sheets.sheets[selectedSheet].system)
    const systemValue = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const materialModalCustomState = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'customMaterialModal'])
    const classes = useStyles()

    const handleChange = (event) => {
        dispatch(setSystemDropdown(event.target.value, selectedSheet))
    };

    const disable = () => {
        if(size(sheetTabs) === 0) {
            return true
        } else {
            return false
        }
    }

    const getMaterialProperties = () => {
        if(systemValue === 'Metric') {
            fetch("http://127.0.0.1:8080/steeltypesmetric")
                .then((response) => response.json())
                .then((data) => dispatch(getSteelTypesMetricAPI(data, selectedSheet)))
                //     .then((data) => alert(JSON.stringify(data)))
                .catch((error) => {
                    console.log(error)
                });
        } else if(systemValue === 'English') {
            fetch("http://127.0.0.1:8080/steeltypesenglish")
                .then((response) => response.json())
                .then((data) => dispatch(getSteelTypesEnglishAPI(data, selectedSheet)))
                //     .then((data) => alert(JSON.stringify(data)))
                .catch((error) => {
                    console.log(error)
                });
        }
    }


    return (
        <div sx={{ minWidth: 120 }} className={classes.dropDown}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">System</InputLabel>
                <Select
                    disabled={disable()}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={systemValue}
                    label="Age"
                    defaultValue={systemValue}
                    onChange={(event) => {
                        handleChange(event)
                        getMaterialProperties()
                    }}
                >
                    <MenuItem value={'Metric'}>Metric</MenuItem>
                    <MenuItem value={'English'}>English</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SystemDropdown