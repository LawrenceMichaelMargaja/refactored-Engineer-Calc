import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import ProvisionDropdown from "./provisionDropdown/provisionDropdown";
import MethodDropdown from "./methodDropdown/methodDropdown";
import SystemDropdown from "./systemDropdown/systemDowpdown";

const useStyles = makeStyles((theme) => ({
    dashboardDropdownContainer: {
        display: 'flex',
        padding: '0 1em',
        backgroundColor: '#e3e3e3'
    }
}))

const DashboardDropdownContainer = () => {
    const classes = useStyles()

    return (
        <div className={classes.dashboardDropdownContainer}>
            <ProvisionDropdown/>
            <SystemDropdown/>
            <MethodDropdown/>
        </div>
    )
}

export default DashboardDropdownContainer;