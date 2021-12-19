import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        display: 'flex',
        backgroundColor: "#003980",
    },
    titleContainer: {
        margin: '0 auto',
        textAlign: 'center'
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1.5em'
    }
}))

const Header = () => {
    const theSheetSelected = useSelector(state => state.sheets.selectedSheet)
    const steelTypeMetric = useSelector(state => state.sheets.sheets[theSheetSelected].apiData.steelTypesMetric)
    const selectedSteelType = useSelector(state => state.sheets.sheets[theSheetSelected].apiMap.selectedSteelType)

    const classes = useStyles()

    return (
        <div>
            {/*<div style={{width: '50vw'}}>*/}
            {/*    <p style={{width: '50%'}}>selectedSheet = {JSON.stringify(steelTypeMetric)} hello</p>*/}
            {/*</div>*/}
            <div className={classes.root}>
                <div className={classes.titleContainer}>
                    <p className={classes.title}>TITLE HERE</p>
                </div>
            </div>
        </div>

    )
}

export default Header;