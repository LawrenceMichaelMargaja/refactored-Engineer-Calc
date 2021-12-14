import React from 'react'
import {Card, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setProvisionDropdown} from "../../../store/actions/dashboardDropdowns/provisionDropdown";

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
    const provision = useSelector(state => state.sheets.sheets[selectedSheet].provision)

    const handleChange = (event) => {
        alert("the provision == " + selectedSheet)
        dispatch(setProvisionDropdown(event.target.value, selectedSheet))
    };

    return (
        <div sx={{ minWidth: 120 }} className={classes.dropDown}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Provision</InputLabel>
                <Select
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