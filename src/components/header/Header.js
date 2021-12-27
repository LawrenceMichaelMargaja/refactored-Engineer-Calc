import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {objectChecker} from "../../utilities/utilities";

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
    const sheets = useSelector(state => state.sheets)
    const sheetTabs = useSelector(state => state.sheets.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const sections = objectChecker(sheets, ['sheets', selectedSheet, 'sectionProperties'])
    const materials = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    const tabState = objectChecker(sheets, ['sheets', selectedSheet, 'tabState'])
    const errors = objectChecker(sheets, ['sheets', selectedSheet, 'errorMessage'])

    /**
     * Details Tab
     */
    const projectName = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectName'])
    const projectId = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectId'])
    const projectUnit = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectUnit'])
    const projectCompany = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectCompany'])
    // const projectDesigner = useSelector(state => state.sheets.sheets[selectedSheet].details.projectDesigner)
    const projectDesigner = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectDesigner'])
    // const projectClient = useSelector(state => state.sheets.sheets[selectedSheet].details.projectClient)
    const projectClient = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectClient'])
    // const projectNotes = useSelector(state => state.sheets.sheets[selectedSheet].details.projectNotes)
    const projectNotes = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectNotes'])
    const provisionState = objectChecker(sheets, ['sheets', selectedSheet, 'provision'])
    // const provisionState = useSelector(state => state.sheets.sheets[selectedSheet].provision)

    /**
     * Factors Tab
     */
    // const safetyFactorForTensile = useSelector(state => state.sheets.sheets[selectedSheet].factors.safetyFactorForTensile)
    const safetyFactorForTensile = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForTensile'])
    // const safetyFactorForCompression = useSelector(state => state.sheets.sheets[selectedSheet].factors.safetyFactorForCompression)
    const safetyFactorForCompression = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForCompression'])
    // const safetyFactorForFlexure = useSelector(state => state.sheets.sheets[selectedSheet].factors.safetyFactorForFlexure)
    const safetyFactorForFlexure = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForFlexure'])
    // const safetyFactorForShear = useSelector(state => state.sheets.sheets[selectedSheet].factors.safetyFactorForShear)
    const safetyFactorForShear = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForShear'])

    /**
     * Forces Tab
     */
    const Forces = objectChecker(sheets, ['sheets', selectedSheet, 'forces'])



    let tabs = null

    for(let sheetIndex in sheetTabs) {
        tabs = sheetTabs[sheetIndex]
    }

    const classes = useStyles()

    return (
        <div>
            {/*<div style={{width: '50vw', margin: '1em'}}>*/}
            {/*    <p style={{width: '50%'}}>Project Unit = {JSON.stringify(projectUnit)}</p>*/}
            {/*    <p style={{width: '50%'}}>Project Name = {JSON.stringify(projectName)}</p>*/}
            {/*    <p style={{width: '50%'}}>Project Id = {JSON.stringify(projectId)}</p>*/}
            {/*    <p style={{width: '50%'}}>Project Company = {JSON.stringify(projectCompany)}</p>*/}
            {/*    <p style={{width: '50%'}}>Project Designer = {JSON.stringify(projectDesigner)}</p>*/}
            {/*    <p style={{width: '50%'}}>Project Client = {JSON.stringify(projectClient)}</p>*/}
            {/*    <p style={{width: '50%'}}>Project Notes = {JSON.stringify(projectNotes)}</p>*/}
            {/*</div>*/}
            {/*<div style={{width: '50vw', margin: '1em'}}>*/}
            {/*    <p style={{width: '50%'}}>safetyFactorForTensile = {JSON.stringify(safetyFactorForTensile)}</p>*/}
            {/*    <p style={{width: '50%'}}>safetyFactorForCompression = {JSON.stringify(safetyFactorForCompression)}</p>*/}
            {/*    <p style={{width: '50%'}}>safetyFactorForFlexure = {JSON.stringify(safetyFactorForFlexure)}</p>*/}
            {/*    <p style={{width: '50%'}}>safetyFactorForShear = {JSON.stringify(safetyFactorForShear)}</p>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <p>{JSON.stringify(provisionState)}</p>*/}
            {/*</div>*/}
            <div>
                <p style={{width: '50%', margin: '1em'}}>{JSON.stringify(errors)}</p>
            </div>
            <div className={classes.root}>
                <div className={classes.titleContainer}>
                    <p className={classes.title}>TITLE HERE</p>
                </div>
            </div>
        </div>

    )
}

export default Header;