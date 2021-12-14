import React from 'react'
import {Card, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setSystemDropdown} from "../../../store/actions/dashboardDropdowns/systemDropdown";

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
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const systemValue = useSelector(state => state.sheets.sheets[selectedSheet].system)
    const classes = useStyles()

    const handleChange = (event) => {
        dispatch(setSystemDropdown(event.target.value, selectedSheet))
    };

    return (
        <div sx={{ minWidth: 120 }} className={classes.dropDown}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">System</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={systemValue}
                    label="Age"
                    defaultValue={systemValue}
                    onChange={handleChange}
                >
                    <MenuItem value={'Metric'}>Metric</MenuItem>
                    <MenuItem value={'English'}>English</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SystemDropdown