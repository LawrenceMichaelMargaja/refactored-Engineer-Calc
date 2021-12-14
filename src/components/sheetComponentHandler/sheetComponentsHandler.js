import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Card} from "@material-ui/core";
import {useSelector} from "react-redux";
import Details from "../sheetCalculationComponents/detailsTab/Details";
import Factors from "../sheetCalculationComponents/factorsTab/Factors";
import Members from "../sheetCalculationComponents/membersTab/memberFields/MembersField";
import Forces from "../sheetCalculationComponents/forcesTab/Forces";
import ResultsTab from "../sheetCalculationComponents/resultsTab/Results";

const useStyles = makeStyles((theme) => ({
    sheetTabBackground: {
        width: '100%',
        backgroundColor: '#e3e3e3',
    },
    sheetTabContainer: {
        width: '100%',
        backgroundColor: '#e3e3e3',
        margin: '0 auto'
    }
}))

const SheetComponentsHandler = () => {
    const classes = useStyles()
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const tabState = useSelector(state => state.sheets.sheets[selectedSheet].tabState)

    const display = () => {
        if(tabState === 'details') {
            return <Details/>
        } else if(tabState === 'factors') {
            return <Factors/>
        } else if(tabState === 'members') {
            return <Members/>
        } else if(tabState === 'forces') {
            return <Forces/>
        } else if(tabState === 'results') {
            return <ResultsTab/>
        }
    }

    return (
        <div className={classes.sheetTabBackground}>
            <Card className={classes.sheetTabContainer}>
                {display()}
            </Card>
        </div>
    )
}

export default SheetComponentsHandler