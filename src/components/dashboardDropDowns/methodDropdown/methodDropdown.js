import React, {useEffect, useState} from 'react'
import {Card, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setMethodDropdown} from "../../../store/actions/dashboardDropdowns/methodDropdown";
import {objectChecker} from "../../../utilities/utilities";
import {size} from "lodash";
import {
    removeAllSectionProperties, resetEnglishSectionProperties,
    resetMetricSectionProperties
} from "../../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import {resetMemberFields} from "../../../store/actions/sheets/sheetCalculationComponents/memberFields/memberFields";
import {
    resetEnglishMaterialProperties,
    resetMetricMaterialProperties
} from "../../../store/actions/sheets/sheetCalculationComponents/materialProperties/materialProperties";
import {useNavigate} from "react-router";
import {setCalculatedData, setDataToBeLoopedForPostRequest, setTabState} from "../../../store/actions/sheets/sheets";

const useStyles = makeStyles((theme) => ({
    dropDown: {
        padding: '1em',
        borderRadius: '4px',
        margin: '5px',
        width: '10%',
        border: '1px solid black',
        backgroundColor: '#e2e2e2',
    }
}))

const MethodDropdown = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const sheetTabs = useSelector(state => state.sheets.sheets)
    // const methodValue = useSelector(state => state.sheets.sheets[selectedSheet].method)
    const methodValue = objectChecker(sheets, ['sheets', selectedSheet, 'method'])

    const classes = useStyles()
    const navigate = useNavigate()

    const disable = () => {
        if(size(sheetTabs) === 0) {
            return true
        } else {
            return false
        }
    }

    const [dataToBeLooped, setDataToBeLooped] = useState('')
    const [dataName, setDataName] = useState('')
    const [name, setName] = useState('')

    // const dispatch = useDispatch()
    /**
     * Metric Data to be looped
     */
    const iShapeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'iShapesMetric'])
    const cShapeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'cShapesMetric'])
    const anglesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'lShapesMetric'])
    const tShapeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'tShapesMetric'])
    const doubleAnglesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'twoLShapesMetric'])
    const recHSSMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'recHSShapesMetric'])
    const roundHSSMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'roundHSShapesMetric'])
    const pipeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'pipeShapesMetric'])

    /**
     * English Data to be looped
     */
    const iShapeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'iShapesEnglish'])
    const cShapeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'cShapesEnglish'])
    const anglesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'lShapesEnglish'])
    const tShapeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'tShapesEnglish'])
    const doubleAnglesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'twoLShapesEnglish'])
    const recHSSEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'recHSShapesEnglish'])
    const roundHSSEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'roundHSShapesEnglish'])
    const pipeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'pipeShapesEnglish'])

    const insertedSectionMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSteelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeEnglishProperties'])
    const insertedSectionEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])
    const insertedSteelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])


    // useEffect(() => {
    //     if(system === 'Metric') {
    //         for (let index in insertedSectionMetric) {
    //             if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('I-shaped').toUpperCase()) {
    //                 setDataToBeLooped(iShapeMetricData)
    //                 // dispatch(setCurrentShape('I-shaped', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(iShapeMetricData, selectedSheet))
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('C-shaped').toUpperCase()) {
    //                 setDataToBeLooped(cShapeMetricData)
    //                 // dispatch(setCurrentShape('C-shaped', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(cShapeMetricData, selectedSheet))
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Angles').toUpperCase()) {
    //                 setDataToBeLooped(anglesMetricData)
    //                 // dispatch(setCurrentShape('Angles', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(anglesMetricData, selectedSheet))
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('T-shaped').toUpperCase()) {
    //                 setDataToBeLooped(tShapeMetricData)
    //                 // dispatch(setCurrentShape('T-shaped', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(tShapeMetricData, selectedSheet))
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Double Angles').toUpperCase()) {
    //                 setDataToBeLooped(doubleAnglesMetricData)
    //                 // dispatch(setCurrentShape('Double Angles', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(doubleAnglesMetricData, selectedSheet))
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Rectangular HSS').toUpperCase()) {
    //                 setDataToBeLooped(recHSSMetricData)
    //                 // dispatch(setCurrentShape('Rectangular HSS', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(recHSSMetricData, selectedSheet))
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Round HSS').toUpperCase()) {
    //                 setDataToBeLooped(roundHSSMetricData)
    //                 // dispatch(setCurrentShape('Round HSS', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(roundHSSMetricData, selectedSheet))
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Pipe').toUpperCase()) {
    //                 setDataToBeLooped(pipeMetricData)
    //                 // dispatch(setCurrentShape('Pipe', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(pipeMetricData, selectedSheet))
    //             }
    //         }
    //     } else if(system === 'English') {
    //         for (let index in insertedSectionEnglish) {
    //             if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('I-shaped').toUpperCase()) {
    //                 setDataToBeLooped(iShapeEnglishData)
    //                 // dispatch(setCurrentShape('I-shaped', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(iShapeEnglishData, selectedSheet))
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('C-shaped').toUpperCase()) {
    //                 setDataToBeLooped(cShapeEnglishData)
    //                 // dispatch(setCurrentShape('C-shaped', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(cShapeEnglishData, selectedSheet))
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Angles').toUpperCase()) {
    //                 setDataToBeLooped(anglesEnglishData)
    //                 // dispatch(setCurrentShape('Angles', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(anglesEnglishData, selectedSheet))
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('T-shaped').toUpperCase()) {
    //                 setDataToBeLooped(tShapeEnglishData)
    //                 // dispatch(setCurrentShape('T-shaped', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(tShapeEnglishData, selectedSheet))
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Double Angles').toUpperCase()) {
    //                 setDataToBeLooped(doubleAnglesEnglishData)
    //                 // dispatch(setCurrentShape('Double Angles', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(doubleAnglesEnglishData, selectedSheet))
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Rectangular HSS').toUpperCase()) {
    //                 setDataToBeLooped(recHSSEnglishData)
    //                 // dispatch(setCurrentShape('Rectangular HSS', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(recHSSEnglishData, selectedSheet))
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Round HSS').toUpperCase()) {
    //                 setDataToBeLooped(roundHSSEnglishData)
    //                 // dispatch(setCurrentShape('Round HSS', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(roundHSSEnglishData, selectedSheet))
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Pipe').toUpperCase()) {
    //                 setDataToBeLooped(pipeEnglishData)
    //                 // dispatch(setCurrentShape('Pipe', selectedSheet))
    //                 dispatch(setDataToBeLoopedForPostRequest(pipeEnglishData, selectedSheet))
    //             }
    //         }
    //     }
    // }, [methodValue])

    const handleChange = (event) => {
        if(event.target.value === 'Design') {
            const proceed = window.confirm("This will remove all added member field rows, section property rows, and material property rows. Are you sure you want to proceed?")
            // alert("hi")
            if(proceed) {
                dispatch(resetMemberFields(selectedSheet))
                dispatch(setCalculatedData(null, selectedSheet))
                dispatch(resetMetricMaterialProperties(selectedSheet))
                dispatch(resetEnglishMaterialProperties(selectedSheet))
                dispatch(resetMetricSectionProperties(selectedSheet))
                dispatch(resetEnglishSectionProperties(selectedSheet))
                dispatch(setMethodDropdown(event.target.value, selectedSheet))
                dispatch(setTabState('members', selectedSheet))
                navigate('/members')
            } else {
                return
            }
        } else if(event.target.value === 'Investigation') {
            if(methodValue === 'Design') {
                const proceed = window.confirm("This will remove all completed design calculations. Are you sure you want to continue?")
                if(proceed) {
                    dispatch(resetMemberFields(selectedSheet))
                    dispatch(setCalculatedData(null, selectedSheet))
                    dispatch(resetMetricMaterialProperties(selectedSheet))
                    dispatch(resetEnglishMaterialProperties(selectedSheet))
                    dispatch(resetMetricSectionProperties(selectedSheet))
                    dispatch(resetEnglishSectionProperties(selectedSheet))
                    dispatch(setMethodDropdown(event.target.value, selectedSheet))
                    dispatch(setTabState('members', selectedSheet))
                    navigate('/members')
                }
            } else {
                dispatch(setMethodDropdown(event.target.value, selectedSheet))
            }
        }
    };

    return (
        <div sx={{ minWidth: 120 }} className={classes.dropDown}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Method</InputLabel>
                <Select
                    disabled={disable()}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={methodValue}
                    label="Age"
                    defaultValue={methodValue}
                    onChange={(event) => handleChange(event)}
                >
                    <MenuItem value={'Investigation'}>Investigation</MenuItem>
                    <MenuItem value={'Design'}>Design</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default MethodDropdown
