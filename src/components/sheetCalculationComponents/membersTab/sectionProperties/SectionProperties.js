import {Button, Card, FormControl, Input, TextField} from "@material-ui/core";
import React, {useEffect, useMemo, useState} from "react";
import MaterialPropertiesRows from "../materialProperties/materialPropertiesRows/metricMaterialPropertiesRows";
import SectionPropertiesRows from "./sectionPropertiesRows/SectionPropertiesRows";
import {useDispatch, useSelector} from "react-redux";
import {addSectionProperty} from "../../../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import {size} from "lodash";
import {
    setEnglishMaterialSteelType,
    setMetricMaterialSteelType
} from "../../../../store/actions/sheets/sheetCalculationComponents/materialProperties/materialProperties";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Autocomplete} from "@mui/material";
import {
    getSectionPropertiesMetric,
    getSteelTypesEnglishAPI,
    getSteelTypesMetricAPI
} from "../../../../store/actions/sheets/sheets";


const SectionProperties = () => {

    const dispatch = useDispatch()
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = useSelector(state => state.sheets.sheets[selectedSheet].system)

    const sectionPropertiesMetric = useSelector(state => state.sheets.sheets[selectedSheet].apiData.sectionPropertiesMetric)
    const insertedSectionPropertiesMetric = useSelector(state => state.sheets.sheets[selectedSheet].sectionProperties)

    const steelTypesMetric = useSelector(state => state.sheets.sheets[selectedSheet].apiData.steelTypesMetric)
    const steelTypesEnglish = useSelector(state => state.sheets.sheets[selectedSheet].apiData.steelTypesEnglish)
    const [openNestedModal, setOpenNestedModal] = useState(false);

    const getSteelTypesMetric = () => {
        fetch("http://127.0.0.1:8080/sectionpropertiesmetric")
            .then((response) => response.json())
            .then((data) => dispatch(getSectionPropertiesMetric(data, selectedSheet)))
            .then((data) => console.log(sectionPropertiesMetric))
            .catch((error) => {
                console.log(error)
            });
    }

    const getSteelTypesEnglish = () => {
        fetch("http://127.0.0.1:8080/steeltypesenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getSteelTypesEnglishAPI(data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            });
    }

    const hashMetric = useMemo(() => {
        let hash = {}
        for(let i in insertedSectionPropertiesMetric) {
            let {
                section_properties_metric_name,
            } = insertedSectionPropertiesMetric[i]
            hash[section_properties_metric_name] = steelTypesMetric[i]
        }
        return hash
    }, [steelTypesMetric])

    const hashEnglish = useMemo(() => {
        let hash = {}
        for(let i in steelTypesEnglish) {
            let {
                steel_type_english_name,
            } = steelTypesEnglish[i]
            hash[steel_type_english_name] = steelTypesEnglish[i]
        }
        return hash
    }, [steelTypesEnglish])



    const displayApiData = () => {
        const newOptions = sectionPropertiesMetric.map((data) => ({value: `${data.section_properties_metric_name}`, label: `${data.section_properties_metric_name}`}))
        return (
            newOptions
        )
    }

    const displayEnglishApi = () => {
        const newEnglish = sectionPropertiesMetric.map((data) => ({value: `${data.section_properties_metric_name}`, label: `${data.section_properties_metric_name}`}))
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
        getSteelTypesMetric()
        getSteelTypesEnglish()
    }, [])

    const handleOpenNestedModal = () => {
        setOpenNestedModal(true);
    };

    const NestedModal = () => {

        const [errorDisplay, setErrorDisplay] = useState(false)

        const [selectedSectionName, setSelectedSectionName] = useState('')
        const [selectedSectionShape, setSelectedSectionShape] = useState('')

        const insertSectionProperty = () => {
            if (size(insertedSectionPropertiesMetric) === 0) {
                let initialSection = {}
                initialSection[0] = {
                    id: 0,
                    sectionShape: 'test',
                    sectionName: 'test2',

                }
                dispatch(addSectionProperty(initialSection, selectedSheet))
                setOpenNestedModal(false)
            } else {
                let currentSections = {...insertedSectionPropertiesMetric}
                const newSectionSize = size(insertedSectionPropertiesMetric)
                currentSections[newSectionSize] = {
                    id: newSectionSize,
                    sectionShape: selectedSectionShape,
                    sectionName: selectedSectionName
                }
                alert(JSON.stringify(selectedSectionName))
                dispatch(addSectionProperty(currentSections, selectedSheet))
                setOpenNestedModal(false)
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
                                    onClick={() => insertSectionProperty()}
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
                width: '94.5%',
                padding: '15px',
            }}
            >
                <div>
                    <div
                        style={{
                            textAlign: 'right'
                        }}>
                        <Button
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
                            variant='contained' color='secondary'>
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
                        width: '20%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>Shape</strong>
                        </p>
                    </div>

                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>Name</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
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
            <div style={{margin: '0 auto', width: '100%'}}>
                <SectionPropertiesRows/>
            </div>
            {displayModal()}
        </div>
    )
}
export default SectionProperties;
