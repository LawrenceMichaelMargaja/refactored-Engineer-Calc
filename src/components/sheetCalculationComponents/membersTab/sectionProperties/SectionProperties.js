import {Button, Card, FormControl, Input, TextField} from "@material-ui/core";
import React, {useEffect, useMemo, useState} from "react";
import MaterialPropertiesRows from "../materialProperties/materialPropertiesRows/metricMaterialPropertiesRows";
import SectionPropertiesRows from "./sectionPropertiesRows/SectionPropertiesRows";
import {useDispatch, useSelector} from "react-redux";
import {
    addSectionPropertyEnglish,
    addSectionPropertyMetric, removeAllSectionProperties, setCurrentSectionPropertyIndex
} from "../../../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import {size} from "lodash";
import {
    setEnglishMaterialSteelType,
    setMetricMaterialSteelType
} from "../../../../store/actions/sheets/sheetCalculationComponents/materialProperties/materialProperties";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Autocomplete} from "@mui/material";
import {
    getSectionPropertiesEnglish,
    getSectionPropertiesMetric,
    getSteelTypesEnglishAPI,
    getSteelTypesMetricAPI
} from "../../../../store/actions/sheets/sheets";
import {objectChecker} from "../../../../utilities/utilities";


const SectionProperties = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    // const system = useSelector(state => state.sheets.sheets[selectedSheet].system)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])

    // const sectionPropertiesMetric = useSelector(state => state.sheets.sheets[selectedSheet].apiData.sectionPropertiesMetric)
    const sectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesMetric'])
    // const insertedSectionPropertiesMetric = useSelector(state => state.sheets.sheets[selectedSheet].sectionProperties)
    const sectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesEnglish'])
    const insertedSectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])
    // const steelTypesMetric = useSelector(state => state.sheets.sheets[selectedSheet].apiData.steelTypesMetric)
    const steelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesMetric'])
    // const steelTypesEnglish = useSelector(state => state.sheets.sheets[selectedSheet].apiData.steelTypesEnglish)
    const steelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesEnglish'])
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])

    const [disableButton, setDisableButton] = useState(false)
    const [theCurrentSectionIndex, setTheCurrentSectionIndex] = useState(0)

    useEffect(() => {
        if(method === 'Investigation') {
            setDisableButton(false)
        } else if(method === 'Design') {
            setDisableButton(true)
        }
    }, [method])

    const [openNestedModal, setOpenNestedModal] = useState(false);

    const getMetricSectionProperties = () => {
        fetch("http://127.0.0.1:8080/sectionpropertiesmetric")
            .then((response) => response.json())
            .then((data) => dispatch(getSectionPropertiesMetric(data, selectedSheet)))
            // .then((data) => console.log(sectionPropertiesMetric))
            .catch((error) => {
                console.log(error)
            });
    }

    const getEnglishSectionProperties = () => {
        fetch("http://127.0.0.1:8080/sectionpropertiesenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getSectionPropertiesEnglish(data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            });
    }

    const hashMetric = useMemo(() => {
        let hash = {}
        for(let i in sectionPropertiesMetric) {
            let {
                section_properties_metric_name,
            } = sectionPropertiesMetric[i]
            hash[section_properties_metric_name] = steelTypesMetric[i]
        }
        return hash
    }, [sectionPropertiesMetric])

    const hashEnglish = useMemo(() => {
        let hash = {}
        for(let i in sectionPropertiesEnglish) {
            let {
                section_properties_english_name,
            } = sectionPropertiesEnglish[i]
            hash[section_properties_english_name] = sectionPropertiesEnglish[i]
        }
        return hash
    }, [sectionPropertiesEnglish])

    const deleteAllSectionProperties = () => {
        const proceed = window.confirm("Are you sure you want to delete all section properties?")
        if(proceed) {
            dispatch(removeAllSectionProperties(selectedSheet))
        } else {
            return
        }
    }

    const displayApiData = () => {
        const newOptions = sectionPropertiesMetric.map((data) => ({value: `${data.section_properties_metric_name}`, label: `${data.section_properties_metric_name}`}))
        return (
            newOptions
        )
    }

    const displayEnglishApi = () => {
        const newEnglish = sectionPropertiesEnglish.map((data) => ({value: `${data.section_properties_english_name}`, label: `${data.section_properties_english_name}`}))
        return newEnglish
    }

    const systemCheck = () => {
        if(system === 'Metric') {
            return displayApiData()
        } else if (system === 'English') {
            return displayEnglishApi()
        }
    }

    useEffect(() => {
        getMetricSectionProperties()
        getEnglishSectionProperties()
    }, [])

    const handleOpenNestedModal = () => {
        setOpenNestedModal(true);
    };

    const NestedModal = () => {

        const [errorDisplay, setErrorDisplay] = useState(false)

        const [selectedSectionName, setSelectedSectionName] = useState('')
        const [selectedSectionShape, setSelectedSectionShape] = useState('')

        const [selectListName, setSelectListName] = useState('')
        const [selectListShape, setSelectListShape] = useState('')
        const [requiredShape, setRequiredShape] = useState(false)
        const [requiredName, setRequiredName] = useState(false)

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
            if(selectedSectionShape !== '') {
                setRequiredShape(false)
            }
            if(selectedSectionName !== '') {
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

        /**
         * Used as English Indexes
         */
        const metricNameIndexChecker = () => {
            let checkedIndexMetric = null
            for(let index in sectionPropertiesMetric) {
                if(selectedSectionName === sectionPropertiesMetric[index].section_properties_metric_name) {
                    checkedIndexMetric = index
                }
            }
            return checkedIndexMetric
        }

        const metricShapeIndexChecker = () => {
            let checkedIndexMetric = null
            for(let index in sectionPropertiesMetric) {
                if(selectedSectionName === sectionPropertiesMetric[index].section_properties_metric_name) {
                    checkedIndexMetric = index
                }
            }
            return checkedIndexMetric
        }

        /**
         * Used as Metric Indexes
         */
        const englishNameIndexChecker = () => {
            let checkedIndexEnglish = null
            for(let index in sectionPropertiesEnglish) {
                if(selectedSectionName === sectionPropertiesEnglish[index].section_properties_english_name) {
                    checkedIndexEnglish = index
                }
            }
            return checkedIndexEnglish
        }

        const englishShapeIndexChecker = () => {
            let checkedIndexEnglish = null
            for(let index in sectionPropertiesEnglish) {
                if(selectedSectionName === sectionPropertiesEnglish[index].section_properties_english_name) {
                    checkedIndexEnglish = index
                }
            }
            return checkedIndexEnglish
        }

        const insertSectionProperty = () => {
            if(system === 'Metric') {
                if (size(insertedSectionPropertiesMetric) === 0) {
                    let initialSectionMetric = {}
                    let initialSectionEnglish = {}
                    initialSectionMetric[0] = {
                        sectionId: 0,
                        sectionShape: selectedSectionShape,
                        sectionName: selectedSectionName,
                    }
                    initialSectionEnglish[0] = {
                        sectionId: 0,
                        sectionShape: sectionPropertiesEnglish[metricShapeIndexChecker()].section_properties_english_name,
                        sectionName: sectionPropertiesEnglish[metricNameIndexChecker()].section_properties_english_name
                    }
                    dispatch(addSectionPropertyMetric(initialSectionMetric, selectedSheet))
                    dispatch(addSectionPropertyEnglish(initialSectionEnglish, selectedSheet))
                    setOpenNestedModal(false)
                } else {
                    let currentSectionEnglish = {...insertedSectionPropertiesEnglish}
                    let currentSectionsMetric = {...insertedSectionPropertiesMetric}
                    const newSectionSizeEnglish = size(insertedSectionPropertiesEnglish)
                    const newSectionSizeMetric = size(insertedSectionPropertiesMetric)
                    currentSectionsMetric[newSectionSizeMetric] = {
                        sectionId: newSectionSizeMetric,
                        sectionShape: selectedSectionShape,
                        sectionName: selectedSectionName
                    }
                    currentSectionEnglish[newSectionSizeEnglish] = {
                        sectionId: newSectionSizeEnglish,
                        sectionShape: sectionPropertiesEnglish[metricShapeIndexChecker()].section_properties_english_name,
                        sectionName: sectionPropertiesEnglish[metricNameIndexChecker()].section_properties_english_name
                    }
                    dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                    dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                    setOpenNestedModal(false)
                }
            } else if(system === 'English') {
                if (size(insertedSectionPropertiesEnglish) === 0) {
                    let initialSectionEnglish = {}
                    let initialSectionMetric = {}
                    initialSectionEnglish[0] = {
                        sectionId: 0,
                        sectionShape: selectedSectionShape,
                        sectionName: selectedSectionName,
                    }
                    initialSectionMetric[0] = {
                        sectionId: 0,
                        sectionShape: sectionPropertiesMetric[englishShapeIndexChecker()].section_properties_metric_name,
                        sectionName: sectionPropertiesMetric[englishNameIndexChecker()].section_properties_metric_name
                    }
                    dispatch(addSectionPropertyMetric(initialSectionEnglish, selectedSheet))
                    dispatch(addSectionPropertyEnglish(initialSectionMetric, selectedSheet))
                    setOpenNestedModal(false)
                } else {
                    let currentSectionsEnglish = {...insertedSectionPropertiesEnglish}
                    let currentSectionsMetric = {...insertedSectionPropertiesMetric}
                    const newSectionSizeEnglish = size(insertedSectionPropertiesEnglish)
                    const newSectionSizeMetric = size(insertedSectionPropertiesMetric)
                    currentSectionsEnglish[newSectionSizeEnglish] = {
                        sectionId: newSectionSizeEnglish,
                        sectionShape: selectedSectionShape,
                        sectionName: selectedSectionName
                    }
                    currentSectionsMetric[newSectionSizeMetric] = {
                        sectionId: newSectionSizeMetric,
                        sectionShape: sectionPropertiesMetric[englishShapeIndexChecker()].section_properties_metric_name,
                        sectionName: sectionPropertiesMetric[englishNameIndexChecker()].section_properties_metric_name
                    }
                    dispatch(addSectionPropertyMetric(currentSectionsEnglish, selectedSheet))
                    dispatch(addSectionPropertyEnglish(currentSectionsMetric, selectedSheet))
                    setOpenNestedModal(false)
                }
            }

        }

        const setSectionName = (event) => {
            setSelectedSectionName(event.target.textContent)
        }

        const setSectionShape = (event) => {
            setSelectedSectionShape(event.target.textContent)
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
                                        <p style={{color: '#000', fontWeight: 'bold', width: 'fit-content', float: 'left', margin: '0'}}>Name</p>
                                        <Autocomplete
                                            // disablePortal
                                            id="combo-box-demo"
                                            sx={{width: '100%', overflow: 'visible'}}
                                            // ListboxProps={{ style: { maxHeight: 200, overflow: 'visible', zIndex: 1} }}
                                            options={systemCheck()}
                                            onChange={(event) => setSectionName(event)}
                                            value={selectedSectionName}
                                            renderInput={(params) => <TextField {...params} label="Preset Section Names"/>}
                                        />
                                        {requiredNameMessage()}
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
                                        <p style={{color: '#000', fontWeight: 'bold', width: 'fit-content', float: 'left', margin: '0'}}>Shape</p>
                                        <Autocomplete
                                            // disablePortal
                                            id="combo-box-demo"
                                            sx={{width: '100%'}}
                                            options={systemCheck()}
                                            onChange={(event) => setSectionShape(event)}
                                            value={selectedSectionShape}
                                            renderInput={(params) => <TextField {...params} label="Preset Section Shapes"/>}
                                        />
                                        {requiredShapeMessage()}
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
                                            insertSectionProperty(selectedSectionName, selectedSectionShape)
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
        if(openNestedModal) {
            return (
                <NestedModal/>
            )
        } else {
            return
        }
    }

    return (
        <div style={{
            width: '40%',
            margin: '0 auto'
        }}>
            <div style={{
                // width: '94.5%',
                padding: '1em',
            }}
            >
                <div>
                    <div
                        style={{
                            textAlign: 'right'
                        }}>
                        <Button
                            disabled={disableButton}
                            style={{
                                margin: '10px'
                            }}
                            variant='contained'
                            color='primary'
                            onClick={() => handleOpenNestedModal()}
                        >
                            Add Section
                        </Button>
                        <Button
                            disabled={disableButton}
                            variant='contained'
                            color='secondary'
                            onClick={() => deleteAllSectionProperties()}
                        >
                            Remove All
                        </Button>
                    </div>
                </div>
                <Card style={{
                    marginBottom: '0px',
                    border: '1px solid black',
                    padding: '5px',
                    backgroundColor: '#e2e2e2',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <p style={{margin: '0px'}}><strong>SECTIONS</strong></p>
                </Card>
                <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%'
                }}>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>ID</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '25%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>Shape</strong>
                        </p>
                    </div>

                    <div style={{
                        paddingRight: '0px',
                        width: '25%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>Name</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '10%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>View</strong>
                        </p>
                    </div>

                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>Edit</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div style={{margin: '0 auto', width: '95%'}}>
                <SectionPropertiesRows/>
            </div>
            {displayModal()}
        </div>
    )
}
export default SectionProperties;
