import React from 'react'
import {Card, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setMethodDropdown} from "../../../store/actions/dashboardDropdowns/methodDropdown";

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

const MethodDropdown = () => {

    const dispatch = useDispatch()
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const methodValue = useSelector(state => state.sheets.sheets[selectedSheet].method)
    const classes = useStyles()

    const handleChange = (event) => {
        dispatch(setMethodDropdown(event.target.value, selectedSheet))
    };

    return (
        <div sx={{ minWidth: 120 }} className={classes.dropDown}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Method</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={methodValue}
                    label="Age"
                    defaultValue={methodValue}
                    onChange={handleChange}
                >
                    <MenuItem value={'Investigation'}>Investigation</MenuItem>
                    <MenuItem value={'Design'}>Design</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default MethodDropdown