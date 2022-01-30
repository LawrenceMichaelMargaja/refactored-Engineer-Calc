import React, {useEffect, useMemo, useState} from "react";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import HelpIcon from '@material-ui/icons/Help';
import CancelIcon from '@material-ui/icons/Cancel';
import {useDispatch, useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";
import size from "lodash/size";
import {
    addSectionProperty,
    editSelectedSection, editSelectedSectionEnglish, editSelectedSectionMetric,
    removeSelectedSectionProperty, removeSelectedSectionPropertyEnglish, removeSelectedSectionPropertyMetric,
    resetSectionIndex, resetSectionIndexEnglish, resetSectionIndexMetric, setCurrentEnglishSectionPropertyIndex,
    setCurrentMetricSectionPropertyIndex,
    setCurrentSectionPropertiesArray,
    setCurrentSectionPropertyIndex
} from "../../../../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import {mapKeys} from "lodash";
import {setSelectedSheet} from "../../../../../store/actions/sheets/sheets";
import {editSelectedMetricMaterialProperty} from "../../../../../store/actions/sheets/sheetCalculationComponents/materialProperties/materialProperties";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Button, Card, FormControl, TextField} from "@material-ui/core";
import {Autocomplete} from "@mui/material";

const SectionPropertiesRows = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const shapes = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'shapes'])
    // const sectionPropertiesMetric = useSelector(state => state.sheets.sheets[selectedSheet].apiData.sectionPropertiesMetric)
    const sectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesMetric'])
    const sectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesEnglish'])
    // const insertedSectionPropertiesMetric = useSelector(state => state.sheets.sheets[selectedSheet].sectionProperties)
    const insertedSectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])
    const currentSectionPropertyIndex = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'currentSectionPropertyIndex'])

    /**
     * API Data per shape
     */
    const tShapesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'tShapesMetric'])
    const tShapesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'tShapesEnglish'])
    const roundHSShapesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'roundHSShapesMetric'])
    const roundHSShapesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'roundHSShapesEnglish'])
    const recHSShapesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'recHSShapesMetric'])
    const recHSShapesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'recHSShapesEnglish'])
    const pipeShapesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'pipeShapesMetric'])
    const pipeShapesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'pipeShapesEnglish'])
    const lShapesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'lShapesMetric'])
    const lShapesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'lShapesEnglish'])
    const iShapesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'iShapesMetric'])
    const iShapesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'iShapesEnglish'])
    const cShapesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'cShapesMetric'])
    const cShapesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'cShapesEnglish'])
    const twoLShapesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'twoLShapesMetric'])
    const twoLShapesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'twoLShapesEnglish'])

    const sectionDimensionsArray = objectChecker(sheets, ['sheets', selectedSheet, 'sectionDimensionsArrayMetric'])

    const [openNestedModal, setOpenNestedModal] = useState(false);
    const [theCurrentSectionIndex, setTheCurrentSectionIndex] = useState(0)

    const handleOpenNestedModal = () => {
        setOpenNestedModal(true);
    };

    const hashMetric = useMemo(() => {
        let hash = {}
        // alert(JSON.stringify(steelTypesMetric))
        for (let i in sectionPropertiesMetric) {
            let {
                section_properties_metric_name,
            } = sectionPropertiesMetric[i]
            hash[section_properties_metric_name] = sectionPropertiesMetric[i]
        }
        return hash
    }, [sectionPropertiesMetric])

    const hashEnglish = useMemo(() => {
        let hash = {}
        for (let i in sectionPropertiesEnglish) {
            let {
                section_properties_english_name,
            } = sectionPropertiesEnglish[i]
            hash[section_properties_english_name] = sectionPropertiesEnglish[i]
        }
        return hash
    }, [sectionPropertiesEnglish])

    const removeSection = (selectedSheet, sectionIndex) => {

        const proceed = window.confirm("Are you sure you want to delete this section row?")

        if (size(insertedSectionPropertiesMetric) === 1 && proceed) {
            console.log("at remove section || if triggered");
            let newNumber = 0

            const objectMapper = (object) => {
                let newObj = mapKeys(object, (value, key) => newNumber++)
                return newObj
            }

            dispatch(removeSelectedSectionPropertyMetric(null, selectedSheet, sectionIndex))
            dispatch(removeSelectedSectionPropertyEnglish(null, selectedSheet, sectionIndex))
            dispatch(resetSectionIndexMetric(objectMapper(insertedSectionPropertiesMetric), selectedSheet))
            dispatch(resetSectionIndexEnglish(objectMapper(insertedSectionPropertiesMetric), selectedSheet))
        } else if (size(insertedSectionPropertiesMetric) !== 1 && proceed) {
            console.log("at remove section || else triggered");

            let newNumber = 0

            const objectMapper = (object) => {
                let newObj = mapKeys(object, (value, key) => newNumber++)
                return newObj
            }

            dispatch(removeSelectedSectionPropertyMetric(null, selectedSheet, sectionIndex))
            dispatch(removeSelectedSectionPropertyEnglish(null, selectedSheet, sectionIndex))
            dispatch(resetSectionIndexMetric(objectMapper(insertedSectionPropertiesMetric), selectedSheet))
            dispatch(resetSectionIndexEnglish(objectMapper(insertedSectionPropertiesMetric), selectedSheet))
        } else {
            return
        }
    }

    const NameValueHandler = (sectionIndex) => {
        if (system === 'Metric') {
            return insertedSectionPropertiesMetric[sectionIndex].sectionName
            // return hashMetric[insertedSectionPropertiesMetric[sectionIndex].sectionName].section_properties_metric_name
        } else if (system === 'English') {
            return insertedSectionPropertiesEnglish[sectionIndex].sectionName
            // return hashEnglish[insertedSectionPropertiesMetric[sectionIndex].sectionName].section_properties_english_name
        }
    }

    const ShapeValueHandler = (sectionIndex) => {
        if (system === 'Metric') {
            return insertedSectionPropertiesMetric[sectionIndex].sectionShape
            // return hashMetric[insertedSectionPropertiesMetric[sectionIndex].sectionShape].section_properties_metric_shape
        } else if (system === 'English') {
            return insertedSectionPropertiesEnglish[sectionIndex].sectionShape
            // return hashEnglish[insertedSectionPropertiesMetric[sectionIndex].sectionShape].section_properties_english_shape
        }
    }

    /**
     * API DATA BULK MAPPING
     */
    const displaySectionPropertiesMetric = () => {
        const sectionPropertiesMetricOptions = sectionPropertiesMetric.map((data) => ({
            value: `${data.section_properties_metric_name}`, label: `${data.section_properties_metric_name}`
        }))
        return sectionPropertiesMetricOptions
    }

    const displaySectionPropertiesEnglish = () => {
        const sectionPropertiesEnglishOptions = sectionPropertiesEnglish.map((data) => ({
            value: `${data.section_properties_english_name}`, label: `${data.section_properties_english_name}`
        }))
        return sectionPropertiesEnglishOptions
    }

    /**
     * API Data Mapping
     */
    const displayTShapesMetric = () => {
        const tShapesMetricOptions = tShapesMetricData.map((data) => ({
            value: `${data.t_shape_metric_name}`,
            label: `${data.t_shape_metric_name}`
        }))
        return tShapesMetricOptions
    }

    const displayTShapesEnglish = () => {
        const tShapesEnglishOptions = tShapesEnglishData.map((data) => ({
            value: `${data.t_shape_english_name}`,
            label: `${data.t_shape_english_name}`
        }))
        return tShapesEnglishOptions
    }

    const displayRoundHSShapesMetric = () => {
        // alert(JSON.stringify(roundHSShapesMetricData))
        const roundHSSMetricOptions = roundHSShapesMetricData.map((data) => {
            let layout = {
                value: `${data.round_hs_shape_name}`,
                label: `${data.round_hs_shape_name}`
            }
            return layout
        })

        return roundHSSMetricOptions
    }

    const displayRoundHSShapesEnglish = () => {
        const roundHSSEnglishOptions = roundHSShapesEnglishData.map((data) => ({
            value: `${data.round_hs_shape_english_name}`,
            label: `${data.round_hs_shape_english_name}`
        }))
        return roundHSSEnglishOptions
    }

    const displayRecHSShapesMetric = () => {
        const recHSMetricOptions = recHSShapesMetricData.map((data) => ({
            value: `${data.rec_hs_shape_metric_name}`,
            label: `${data.rec_hs_shape_metric_name}`
        }))
        return recHSMetricOptions
    }

    const displayRecHSShapesEnglish = () => {
        const recHSEnglishOptions = recHSShapesEnglishData.map((data) => ({
            value: `${data.rec_hs_shape_english_name}`,
            label: `${data.rec_hs_shape_english_name}`
        }))
        return recHSEnglishOptions
    }

    const displayPipeShapesMetric = () => {
        const pipeMetricOptions = pipeShapesMetricData.map((data) => ({
            value: `${data.pipe_shape_metric_name}`,
            label: `${data.pipe_shape_metric_name}`
        }))
        return pipeMetricOptions
    }

    const displayPipeShapesEnglish = () => {
        const pipeEnglishOptions = pipeShapesEnglishData.map((data) => ({
            value: `${data.pipe_shape_english_name}`,
            label: `${data.pipe_shape_english_name}`
        }))
        return pipeEnglishOptions
    }

    const displayLShapesMetric = () => {
        const lMetricOptions = lShapesMetricData.map((data) => ({
            value: `${data.l_shape_metric_name}`,
            label: `${data.l_shape_metric_name}`
        }))
        return lMetricOptions
    }

    const displayLShapesEnglish = () => {
        const lEnglishOptions = lShapesEnglishData.map((data) => ({
            value: `${data.l_shape_english_name}`,
            label: `${data.l_shape_english_name}`
        }))
        return lEnglishOptions
    }

    const displayIShapesMetric = () => {
        const iMetricOptions = iShapesMetricData.map((data) => ({
            value: `${data.i_shape_metric_name}`,
            label: `${data.i_shape_metric_name}`
        }))
        return iMetricOptions
    }

    const displayIShapesEnglish = () => {
        const iEnglishOptions = iShapesEnglishData.map((data) => ({
            value: `${data.i_shape_english_name}`,
            label: `${data.i_shape_english_name}`
        }))
        return iEnglishOptions
    }

    const displayCShapesMetric = () => {
        // alert("here tat === " + JSON.stringify(cShapesMetricData))
        const cMetricOptions = cShapesMetricData.map((data) => ({
            value: `${data.c_shape_metric_name}`,
            label: `${data.c_shape_metric_name}`
        }))
        return cMetricOptions
    }

    const displayCShapesEnglish = () => {
        const cEnglishOptions = cShapesEnglishData.map((data) => ({
            value: `${data.c_shape_english_name}`,
            label: `${data.c_shape_english_name}`
        }))
        return cEnglishOptions
    }

    const display2LShapesMetric = () => {
        const twoLMetricOptions = twoLShapesMetricData.map((data) => {
            let layout = { value: `${data['two_l_shape_metric_name']}`, label: `${data['two_l_shape_metric_name']}` }
            return layout
        })
        return twoLMetricOptions
    }

    const display2LShapesEnglish = () => {
        const twoLEnglishOptions = twoLShapesEnglishData.map((data) => ({
            value: `${data[`two_l_shape_english_name`]}`,
            label: `${data[`two_l_shape_english_name`]}`
        }))
        return twoLEnglishOptions
    }

    const displayApiData = () => {
        const newOptions = sectionPropertiesMetric.map((data) => ({
            value: `${data.section_properties_metric_name}`,
            label: `${data.section_properties_metric_name}`
        }))
        return (
            newOptions
        )
    }

    const displayEnglishApi = () => {
        const newEnglish = sectionPropertiesEnglish.map((data) => ({
            value: `${data.section_properties_english_name}`,
            label: `${data.section_properties_english_name}`
        }))
        return newEnglish
    }



    const displayApiShapes = () => {
        const newOptions = shapes.map((data) => ({value: `${data.shape_name}`, label: `${data.shape_name}`}))
        return newOptions
    }

    const NestedModal = () => {

        const [errorDisplay, setErrorDisplay] = useState(false)
        const [requiredShape, setRequiredShape] = useState(false)
        const [requiredName, setRequiredName] = useState(false)
        const [selectedSectionName, setSelectedSectionName] = useState('')
        const [selectedSectionShape, setSelectedSectionShape] = useState('')

        const systemCheck = () => {
            if (system === 'Metric') {
                if(selectedSectionShape === 'I-shaped') {
                    return displayIShapesMetric()
                } else if(selectedSectionShape === 'C-shaped') {
                    return displayCShapesMetric()
                } else if(selectedSectionShape === 'Angles') {
                    return displayLShapesMetric()
                } else if(selectedSectionShape === 'T-shaped') {
                    return displayTShapesMetric()
                } else if(selectedSectionShape === 'Double Angles') {
                    return display2LShapesMetric()
                } else if(selectedSectionShape === 'Rectangular HSS') {
                    return displayRecHSShapesMetric()
                } else if(selectedSectionShape === 'Round HSS') {
                    return displayRoundHSShapesMetric()
                } else if(selectedSectionShape === 'Pipe') {
                    return displayPipeShapesMetric()
                } else {
                    return displaySectionPropertiesMetric()
                }
            } else if (system === 'English') {
                if(selectedSectionShape === 'I-shaped') {
                    return displayIShapesEnglish()
                } else if(selectedSectionShape === 'C-shaped') {
                    return displayCShapesEnglish()
                } else if(selectedSectionShape === 'Angles') {
                    return displayLShapesEnglish()
                } else if(selectedSectionShape === 'T-shaped') {
                    return displayTShapesEnglish()
                } else if(selectedSectionShape === 'Double Angles') {
                    return display2LShapesEnglish()
                } else if(selectedSectionShape === 'Rectangular HSS') {
                    return displayRecHSShapesEnglish()
                } else if(selectedSectionShape === 'Round HSS') {
                    return displayRoundHSShapesEnglish()
                } else if(selectedSectionShape === 'Pipe') {
                    return displayPipeShapesEnglish()
                } else {
                    return displaySectionPropertiesEnglish()
                }
            }
        }

        useEffect(() => {
            if (system === 'Metric') {
                setSelectedSectionName(insertedSectionPropertiesMetric[theCurrentSectionIndex].sectionName)
            } else if (system === 'English') {
                setSelectedSectionName(insertedSectionPropertiesEnglish[theCurrentSectionIndex].sectionName)
            }
        }, [insertedSectionPropertiesMetric, insertedSectionPropertiesEnglish])

        useEffect(() => {
            if (system === 'Metric') {
                setSelectedSectionShape(insertedSectionPropertiesMetric[theCurrentSectionIndex].sectionShape)
            } else if (system === 'English') {
                setSelectedSectionShape(insertedSectionPropertiesEnglish[theCurrentSectionIndex].sectionShape)
            }
        }, [insertedSectionPropertiesMetric, insertedSectionPropertiesEnglish])

        const editDispatchHandler = () => {

        }

        const editSectionProperty = () => {
            if (system === 'Metric') {
                if (size(insertedSectionPropertiesMetric) === 0) {
                    const initialSection = {}
                    initialSection[0] = {
                        id: 0,
                        sectionShape: 'Test',
                        sectionName: 'Test'
                    }
                    // console.log("sheet index == " + selectedSheet)
                    dispatch(editSelectedSectionMetric('test', 'apple', selectedSheet, theCurrentSectionIndex))
                    // dispatch(editSelectedSectionEnglish(selectedSectionShape, selectedSectionName, selectedSheet, theCurrentSectionIndex))
                    setOpenNestedModal(false)
                } else {
                    const proceed = window.confirm("Are you sure you want to keep these changes?")
                    if (proceed) {
                        // alert("to be dispatched == " + selectedSectionName)
                        dispatch(editSelectedSectionMetric(selectedSectionShape, selectedSectionName, selectedSheet, theCurrentSectionIndex))
                        // dispatch(editSelectedSectionEnglish(selectedSectionShape, selectedSectionName, selectedSheet, theCurrentSectionIndex))
                        setOpenNestedModal(false)
                    } else {
                        return;
                    }
                }
            } else if (system === 'English') {
                if (size(insertedSectionPropertiesMetric) === 0) {
                    const initialSection = {}
                    initialSection[0] = {
                        id: 0,
                        sectionShape: 'Test',
                        sectionName: 'Test'
                    }
                    // console.log("sheet index == " + selectedSheet)
                    dispatch(editSelectedSectionEnglish('test', 'apple', selectedSheet, theCurrentSectionIndex))
                    setOpenNestedModal(false)
                } else {
                    const proceed = window.confirm("Are you sure you want to keep these changes?")
                    if (proceed) {
                        dispatch(editSelectedSectionEnglish(selectedSectionShape, selectedSectionName, selectedSheet, theCurrentSectionIndex))
                        setOpenNestedModal(false)
                    } else {
                        return;
                    }
                }
            }
        }

        const handleRequiredShape = () => {
            setRequiredShape(true)
        }

        const handleRequiredName = () => {
            setRequiredName(true)
        }

        const requiredShapeMessage = () => {
            if (requiredShape) {
                return (
                    <p style={{margin: '0', fontWeight: 'bold', color: 'red'}}>This field is required.</p>
                )
            } else if (!requiredShape) {
                return
            }
        }

        useEffect(() => {
            if (selectedSectionShape !== '') {
                setRequiredShape(false)
            }
            if (selectedSectionName !== '') {
                setRequiredName(false)
            }
        }, [selectedSectionShape, selectedSectionName])

        const requiredNameMessage = () => {
            if (requiredName) {
                return (
                    <p style={{margin: '0', fontWeight: 'bold', color: 'red'}}>This field is required.</p>
                )
            } else if (!requiredName) {
                return
            }
        }

        const setSectionName = (event) => {
            setSelectedSectionName(event.target.textContent)
        }

        const setSectionShape = (event) => {
            setSelectedSectionShape(event.target.textContent)
            setSelectedSectionName("")
        }

        const displayError = () => {
            if (errorDisplay === false) {
                return
            } else if (errorDisplay === true) {
                return (
                    <p style={{margin: '0', padding: '0'}}>
                        <strong style={{color: 'red'}}>SELECTED STEEL TYPE CANNOT BE EMPTY.</strong>
                    </p>
                )
            }
        }



        return (
            <div>
                <Modal
                    open={openNestedModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 1000,
                        height: 600,
                        backgroundColor: '#e2e2e2',
                        border: '2px solid #000',
                        boxShadow: 24,
                        pt: 2,
                        px: 4,
                        pb: 3,
                        textAlign: 'center'
                    }}>
                        <h2 style={{padding: '1em 0'}} id="parent-modal-title">SELECT PROPERTIES FOR SECTION</h2>
                        <Card style={{
                            backgroundColor: '#fff',
                            width: '80%',
                            margin: '0 auto',
                            padding: '2em',
                        }}>
                            <div style={{
                                width: '80%',
                                margin: '0 auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingBottom: '1em'
                            }}>
                                {displayError()}
                                <div style={{width: '100%', padding: '1em'}}>
                                    <FormControl fullWidth>
                                        <p style={{
                                            color: '#000',
                                            fontWeight: 'bold',
                                            width: 'fit-content',
                                            float: 'left',
                                            margin: '0'
                                        }}>Shape</p>
                                        <Autocomplete
                                            // disablePortal
                                            id="combo-box-demo"
                                            sx={{width: '100%', overflow: 'visible'}}
                                            // ListboxProps={{ style: { maxHeight: 200, overflow: 'visible', zIndex: 1} }}
                                            options={displayApiShapes()}
                                            onChange={(event) => setSectionShape(event)}
                                            value={selectedSectionShape}
                                            renderInput={(params) => <TextField {...params}
                                                                                label="Preset Section Shapes"/>}
                                        />
                                        {requiredShapeMessage()}
                                    </FormControl>
                                </div>
                            </div>
                            <div style={{
                                width: '80%',
                                margin: '0 auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                {displayError()}
                                <div style={{width: '100%', padding: '1em'}}>
                                    <FormControl fullWidth>
                                        <p style={{
                                            color: '#000',
                                            fontWeight: 'bold',
                                            width: 'fit-content',
                                            float: 'left',
                                            margin: '0'
                                        }}>Name</p>
                                        <Autocomplete
                                            // disablePortal
                                            id="combo-box-demo"
                                            sx={{width: '100%'}}
                                            options={systemCheck()}
                                            onChange={(event) => setSectionName(event)}
                                            value={selectedSectionName}
                                            renderInput={(params) => <TextField {...params}
                                                                                label="Preset Section Namess"/>}
                                        />
                                        {requiredNameMessage()}
                                    </FormControl>
                                </div>
                            </div>
                        </Card>
                        <div style={{
                            width: '80%',
                            margin: '0 auto',
                            padding: '1em',
                        }}>
                            <div style={{
                                margin: '0 auto',
                            }}>
                                <Button
                                    style={{
                                        width: '20%',
                                        // margin: '1em'
                                    }}
                                    variant='contained'
                                    color='primary'
                                    onClick={() => {
                                        if (selectedSectionName === '' && selectedSectionShape === '') {
                                            handleRequiredShape()
                                            handleRequiredName()
                                        } else if (selectedSectionShape === '') {
                                            handleRequiredShape()
                                        } else if (selectedSectionName === '') {
                                            handleRequiredName()
                                        } else {
                                            // toggleStop()
                                            editSectionProperty()
                                        }
                                    }}
                                    // onClick={() => insertSectionProperty()}
                                >
                                    ADD
                                </Button>
                                <Button
                                    style={{
                                        width: '20%',
                                        margin: '1em'
                                    }}
                                    onClick={() => {
                                        setOpenNestedModal(false)
                                    }}
                                    variant='contained'
                                    color='secondary'>
                                    CANCEL
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    }

    const displayModal = () => {
        if (openNestedModal) {
            return (
                <NestedModal/>
            )
        } else {
            return
        }
    }

    const clearAllSections = () => {

        if (size(insertedSectionPropertiesMetric) === 0) {
            return;
        } else if (size(insertedSectionPropertiesMetric) !== 0) {
            const proceed = window.confirm("Are you sure you want to delete all section rows?");
            if (proceed) {
                // dispatch(clearSectionObject(null, selectedSheet))
                // dispatch(clearRemovedSectionsArray(selectedSheet, null))
            } else {
                return
            }
        }
    }

    const sectionRows = []

    const [sectionNameMetric, setSectionNameMetric] = useState('W1100X499')
    const [sectionShapeMetric, setSectionShapeMetric] = useState('W1100X499')
    const [sectionNameEnglish, setSectionNameEnglish] = useState('')
    const [sectionShapeEnglish, setSectionShapeEnglish] = useState('')

    // useEffect(() => {
    //     if(sectionPropertiesMetric.length > 0) {
    //         // setSectionNameMetric("test")
    //         // setSectionShapeMetric("Test Two")
    //         // alert("at the useEffect == " + sectionNameMetric)
    //         alert("at thee useEffect == " + currentSectionPropertyIndex)
    //         setSectionNameMetric(insertedSectionPropertiesMetric[currentSectionPropertyIndex].sectionName)
    //         setSectionShapeMetric(insertedSectionPropertiesMetric[currentSectionPropertyIndex].sectionShape)
    //     } else {
    //         return 'Hey'
    //     }
    // }, [insertedSectionPropertiesMetric])
    //
    // useEffect(() => {
    //     if(sectionPropertiesEnglish.length > 0) {
    //         // setSectionNameEnglish("New")
    //         // setSectionShapeEnglish("New Two")
    //         setSectionNameEnglish(insertedSectionPropertiesEnglish[currentSectionPropertyIndex].sectionName)
    //         setSectionShapeEnglish(insertedSectionPropertiesEnglish[currentSectionPropertyIndex].sectionShape)
    //     } else {
    //         return
    //     }
    // }, [insertedSectionPropertiesEnglish])

    for (let sectionIndex in insertedSectionPropertiesMetric) {

        sectionRows.push(
            <div style={{
                display: 'flex',
                width: '100%',
                margin: '0 auto',
                // height: '100%'
            }}
                 key={sectionIndex}
                 id='ModalContainer'
            >
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '20%',
                    // height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '5%',
                    }}>
                        {/*{sectionIndex}*/}
                        {parseFloat(sectionIndex) + parseFloat(1)}
                    </p>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '25%',
                    // height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '5%',
                    }}>
                        {ShapeValueHandler(sectionIndex)}
                    </p>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '25%',
                    // height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '5%',
                    }}>
                        {NameValueHandler(sectionIndex)}
                    </p>
                </div>
                <div style={{
                    margin: '0px',
                    width: '10%',
                    // height: '100%'
                }}>
                    <div style={{
                        margin: '0%',
                        // height: '100%'
                        textAlign: 'center'
                    }}>
                        <p style={{
                            margin: '7px 0px 2px',
                        }}>
                            <HelpIcon
                                variant='contained'
                                color='primary'
                            >
                            </HelpIcon>
                        </p>
                    </div>
                </div>
                <div style={{margin: '1px', width: '20%'}}>
                    <div style={{display: 'column'}}>
                        <p style={{
                            margin: '7px 0px 2px',
                            textAlign: 'center'
                        }}>
                            <BorderColorIcon
                                style={{marginRight: '5px'}}
                                color='primary'
                                onClick={() => {
                                    dispatch(setCurrentMetricSectionPropertyIndex(sectionIndex, selectedSheet))
                                    dispatch(setCurrentEnglishSectionPropertyIndex(sectionIndex, selectedSheet))
                                    handleOpenNestedModal()
                                    setTheCurrentSectionIndex(sectionIndex)
                                }}
                            />
                            <CancelIcon
                                color='secondary'
                                onClick={() => removeSection(selectedSheet, sectionIndex)}
                            />
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{marginBottom: '1em'}}>
            {sectionRows}
            {displayModal()}
        </div>
    )
}
export default SectionPropertiesRows
