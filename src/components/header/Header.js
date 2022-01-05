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
    const steelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesMetric'])
    const sectionsMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const sectionsEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])
    const materials = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    const tabState = objectChecker(sheets, ['sheets', selectedSheet, 'tabState'])
    const errors = objectChecker(sheets, ['sheets', selectedSheet, 'errorMessage'])
    const englishSections = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesEnglish'])
    const currentSectionPropertyIndex = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'currentSectionPropertyIndex'])
    const arrayCheck = objectChecker(sheets, ['sheets', selectedSheet, 'arrayCheck'])
    const members = objectChecker(sheets, ['sheets', selectedSheet, 'members'])
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])

    /**
     * API Data
     */
    const shapes = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'shapes'])
    const tShapesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'tShapesMetric'])
    const tShapesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'tShapesEnglish'])
    const roundHSShapeMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'roundHSShapesMetric'])
    const roundHSShapeEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'roundHSShapesEnglish'])
    const recHSShapeMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'recHSShapesMetric'])
    const pipeShapeMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'pipeShapesMetric'])
    const pipeShapeEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'pipeShapesEnglish'])
    const lShapeMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'lShapesMetric'])
    const lShapeEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'lShapesEnglish'])
    const cShapeMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'cShapesMetric'])
    const cShapeEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'cShapesEnglish'])
    const twoLShapeMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'twoLShapesMetric'])
    const twoLShapeEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'twoLShapesEnglish'])

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
    // console.log(JSON.stringify(arrayCheck))

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
                    {/*<p>English</p>*/}
                    <p style={{width: '50%', margin: '1em'}}>{JSON.stringify(twoLShapeEnglish)}</p>
            </div>
            {/*<div>*/}
            {/*    <p>Metric</p>*/}
            {/*    <p style={{width: '50%', margin: '1em'}}>{JSON.stringify(sectionsMetric)}</p>*/}
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