import {Button, Card, FormControl, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MaterialPropertiesRows from "./materialPropertiesRows/metricMaterialPropertiesRows";
import {ENGLISH, METRIC} from "../../../../config";
import {useDispatch, useSelector} from "react-redux";
import MaterialPropertiesModal from "../../../modal/materialPropertiesModal/MaterialPropertiesModal";
import MaterialSelectModal from "../../../modal/materialPropertiesModal/MaterialPropertiesModal";
import SpringModal from "../../../modal/materialPropertiesModal/MaterialPropertiesModal";
import NestedModal from "../../../modal/materialPropertiesModal/MaterialPropertiesModal";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {setMethodDropdown} from "../../../../store/actions/dashboardDropdowns/methodDropdown";
import axios from "axios";
import {
    getMaterialPropertiesData,
    getSteelTypesEnglishAPI,
    getSteelTypesMetricAPI,
    setEnglishEMPA, setEnglishFUMPA,
    setEnglishFYMPA, setMappedSteelTypeEnglish, setMappedSteelTypeMetric,
    setMetricEMPA,
    setMetricFUMPA,
    setMetricFYMPA,
    setSelectedSteelType
} from "../../../../store/actions/sheets/sheets";
import {Autocomplete} from "@mui/material";
import {
    clearMetricMaterialProperties, setCurrentMaterialsArray,
    setEnglishMaterialSteelType,
    setMetricMaterialSteelType
} from "../../../../store/actions/sheets/sheetCalculationComponents/materialProperties/materialProperties";
import {size} from "lodash";
import MetricMaterialPropertiesRows from "./materialPropertiesRows/metricMaterialPropertiesRows";
import EnglishMaterialPropertiesRows from "./materialPropertiesRows/englishMaterialPropertiesRow";
import {objectChecker} from "../../../../utilities/utilities";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    },
}));

const MaterialProperties = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    // const system = useSelector(state => state.sheets.sheets[selectedSheet].system)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    // const steelTypesMetric = useSelector(state => state.sheets.sheets[selectedSheet].apiData.steelTypesMetric)
    const steelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesMetric'])
    // const steelTypesEnglish = useSelector(state => state.sheets.sheets[selectedSheet].apiData.steelTypesEnglish)
    const steelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesEnglish'])
    // const insertedSteelTypesMetric = useSelector(state => state.sheets.sheets[selectedSheet].apiMap.steelTypeMetricProperties)
    const insertedSteelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    // const insertedSteelTypesEnglish = useSelector(state => state.sheets.sheets[selectedSheet].apiMap.steelTypeEnglishProperties)
    const insertedSteelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeEnglishProperties'])

    const [openNestedModal, setOpenNestedModal] = React.useState(false);

    const unitHandler = () => {
        if(system === 'Metric') {
            return 'MPa'
        } else {
            return 'ksi'
        }
    }

    const getSteelTypesMetric = () => {
        fetch("http://127.0.0.1:8080/steeltypesmetric")
            .then((response) => response.json())
            .then((data) => dispatch(getSteelTypesMetricAPI(data, selectedSheet)))
            //     .then((data) => alert(JSON.stringify(data)))
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

    const handleOpenNestedModal = () => {
        setOpenNestedModal(true);
    };

    const displayApiData = () => {
        const newOptions = steelTypesMetric.map((data) => ({value: `${data.steel_type_metric_name}`, label: `${data.steel_type_metric_name}`}))
        return (
            newOptions
        )
    }

    const displayEnglishApi = () => {
        const newEnglish = steelTypesEnglish.map((data) => ({value: `${data.steel_type_english_name}`, label: `${data.steel_type_english_name}`}))
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

    const hashMetric = useMemo(() => {
        let hash = {}
        for(let i in steelTypesMetric) {
            let {
                steel_type_metric_name,
            } = steelTypesMetric[i]
            hash[steel_type_metric_name] = steelTypesMetric[i]
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



    const renderRows = () => {
        return (
            <MetricMaterialPropertiesRows/>
        )
        // if(system === 'Metric') {
        //     return (
        //         <MetricMaterialPropertiesRows/>
        //     )
        // } else if(system === 'English') {
        //     return (
        //         <EnglishMaterialPropertiesRows/>
        //     )
        // }
    }

    const NestedModal = () => {

        const [nestedModalDisabled, setNestedModalDisabled] = useState(true)
        const [customButtonColor, setCustomButtonColor] = useState('primary')
        const [customButtonText, setCustomButtonText] = useState('CUSTOM')
        const [selectedSteelType, setSelectedSteelType] = useState('')

        const steelTypeHandler = () => {
            return (
                <div style={{width: '80%', margin: '0 auto'}}>
                    <p style={{textAlign: 'initial'}}><strong>Steel Type</strong></p>
                    <Input placeholder='Value will be displayed here...'
                           disabled={nestedModalDisabled}
                           style={{width: '100%', margin: '0 auto', color: 'black'}}
                    />
                </div>
            )
        }

        useEffect(() => {
            if(nestedModalDisabled) {
                setCustomButtonColor('primary')
                setCustomButtonText('CUSTOM')
            } else {
                setCustomButtonColor('secondary')
                setCustomButtonText('DISCARD')
            }
        }, [nestedModalDisabled])



        const autoCompleteOnChangeHandler = (event) => {
            setSelectedSteelType(event.target.textContent)
        }

        const EMPAValueSetter = () => {
            if(system === 'Metric') {
                if(selectedSteelType === '') {
                    return
                } else  {
                    return hashMetric[selectedSteelType].steel_type_metric_e
                }
            } else {
                if(selectedSteelType === '') {
                    return
                } else {
                    return hashEnglish[selectedSteelType].steel_type_english_e
                }
            }
        }

        const FYMPAValueSetter = () => {
            if(system === 'Metric') {
                if(selectedSteelType === '') {
                    return
                } else  {
                    return hashMetric[selectedSteelType].steel_type_metric_fy
                }
            } else {
                if(selectedSteelType === '') {
                    return
                } else {
                    return hashEnglish[selectedSteelType].steel_type_english_fy
                }
            }
        }

        const FUMPAValueSetter = () => {
            if(system === 'Metric') {
                if(selectedSteelType === '') {
                    return
                } else  {
                    return hashMetric[selectedSteelType].steel_type_metric_fu
                }
            } else {
                if(selectedSteelType === '') {
                    return
                } else {
                    return hashEnglish[selectedSteelType].steel_type_english_fu
                }
            }
        }

        const [errorDisplay, setErrorDisplay] = useState(false)

        const displayError = () => {
            if(errorDisplay === false) {
                return
            } else if(errorDisplay === true) {
                return (
                    <p style={{margin: '0', padding: '0'}}>
                        <strong style={{color: 'red'}}>SELECTED STEEL TYPE CANNOT BE EMPTY.</strong>
                    </p>
                )
            }
        }

        const insertMaterialProperty = () => {
            if(selectedSteelType === '') {
                setErrorDisplay(true)
                return
            } else {
                if(system === 'Metric') {
                    if(size(insertedSteelTypesMetric) === 0) {
                        const initialMaterialEnglish = {}
                        const initialMaterial = {}
                        initialMaterial[0] = {
                            name: selectedSteelType,
                            EMPA: hashMetric[selectedSteelType].steel_type_metric_e,
                            FYMPA: hashMetric[selectedSteelType].steel_type_metric_fy,
                            FUMPA: hashMetric[selectedSteelType].steel_type_metric_fu
                        }
                        initialMaterialEnglish[0] = {
                            name: selectedSteelType,
                            EMPA: hashEnglish[selectedSteelType].steel_type_english_e,
                            FYMPA: hashEnglish[selectedSteelType].steel_type_english_fy,
                            FUMPA: hashEnglish[selectedSteelType].steel_type_english_fu,
                        }
                        const id = 1
                        dispatch(setMetricMaterialSteelType(initialMaterial, selectedSheet))
                        dispatch(setEnglishMaterialSteelType(initialMaterialEnglish, selectedSheet))
                        dispatch(setCurrentMaterialsArray(id, selectedSheet))
                        setOpenNestedModal(false)
                    } else {
                        const newMaterialIndex = size(insertedSteelTypesMetric)
                        const currentMaterialEnglish = {...insertedSteelTypesEnglish}
                        const currentMaterial = {...insertedSteelTypesMetric}
                        currentMaterial[newMaterialIndex] = {
                            name: selectedSteelType,
                            EMPA: hashMetric[selectedSteelType].steel_type_metric_e,
                            FYMPA: hashMetric[selectedSteelType].steel_type_metric_fy,
                            FUMPA: hashMetric[selectedSteelType].steel_type_metric_fu
                        }
                        currentMaterialEnglish[newMaterialIndex] = {
                            name: selectedSteelType,
                            EMPA: hashEnglish[selectedSteelType].steel_type_english_e,
                            FYMPA: hashEnglish[selectedSteelType].steel_type_english_fy,
                            FUMPA: hashEnglish[selectedSteelType].steel_type_english_fu
                        }
                        dispatch(setMetricMaterialSteelType(currentMaterial, selectedSheet))
                        dispatch(setEnglishMaterialSteelType(currentMaterialEnglish, selectedSheet))
                        setOpenNestedModal(false)
                    }
                } else if(system === 'English') {
                    if(size(insertedSteelTypesMetric) === 0) {
                        const initialMaterial = {}
                        initialMaterial[0] = {
                            name: selectedSteelType,
                            EMPA: hashEnglish[selectedSteelType].steel_type_english_e,
                            FYMPA: hashEnglish[selectedSteelType].steel_type_english_fy,
                            FUMPA: hashEnglish[selectedSteelType].steel_type_english_fu
                        }
                        dispatch(setEnglishMaterialSteelType(initialMaterial, selectedSheet))
                        setOpenNestedModal(false)
                    } else {
                        const newMaterialIndex = size(insertedSteelTypesEnglish)
                        const currentMaterial = {...insertedSteelTypesEnglish}
                        currentMaterial[newMaterialIndex] = {
                            name: selectedSteelType,
                            EMPA: hashEnglish[selectedSteelType].steel_type_english_e,
                            FYMPA: hashEnglish[selectedSteelType].steel_type_english_fy,
                            FUMPA: hashEnglish[selectedSteelType].steel_type_english_fu
                        }
                        dispatch(setEnglishMaterialSteelType(currentMaterial, selectedSheet))
                        setOpenNestedModal(false)
                    }
                }
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
                        backgroundColor: '#fff',
                        border: '2px solid #000',
                        boxShadow: 24,
                        pt: 2,
                        px: 4,
                        pb: 3,
                        textAlign: 'center'
                    }}>
                        <h2 style={{padding: '1em 0'}} id="parent-modal-title">SELECT PROPERTIES FOR MATERIAL</h2>

                        <div style={{width: '80%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                {displayError()}
                                <div style={{width: '30%'}}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            // disablePortal
                                            id="combo-box-demo"
                                            options={systemCheck()}
                                            value={selectedSteelType}
                                            onChange={(event) => autoCompleteOnChangeHandler(event)}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Preset Steel Types" />}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div style={{width: '30%',}}>
                                <Button
                                    style={{
                                        width: '100%'
                                    }}
                                    variant='contained'
                                    onClick={() => setNestedModalDisabled(currVal => !currVal)}
                                    color={customButtonColor}>
                                        {customButtonText}
                                </Button>
                            </div>
                        </div>
                        <div style={{
                            padding: '1em 0'
                        }}>
                            {nestedModalDisabled ? null : steelTypeHandler()}
                            <div style={{width: '80%', margin: '0 auto'}}>
                                <p style={{textAlign: 'initial'}}><strong>E(MPa)</strong></p>
                                <Input placeholder='Value will be displayed here...'
                                       disabled={nestedModalDisabled}
                                       value={EMPAValueSetter()}
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
                                />
                            </div>
                            <div style={{width: '80%', margin: '0 auto'}}>
                                <p style={{textAlign: 'initial'}}><strong>FyMPa</strong></p>
                                <Input placeholder='Value will be displayed here...'
                                       disabled={nestedModalDisabled}
                                       value={FYMPAValueSetter()}
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
                                />
                            </div>
                            <div style={{width: '80%', margin: '0 auto'}}>
                                <p style={{textAlign: 'initial'}}><strong>FuMPa</strong></p>
                                <Input placeholder='Value will be displayed here...'
                                       disabled={nestedModalDisabled}
                                       value={FUMPAValueSetter()}
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
                                />
                            </div>
                        </div>
                        <div style={{
                            width: '80%',
                            margin: '0 auto',
                            // padding: '1em',
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
                                        insertMaterialProperty()
                                        // if(errorDisplay) {
                                        //     return
                                        // } else if(errorDisplay === false) {
                                        //     setOpenNestedModal(false)
                                        // }
                                    }}
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
        return (
            <NestedModal/>
        )
    }

    const deleteAllMetricMaterialProperties = () => {
        // alert(selectedSheet)
        const proceed = window.confirm("Are you sure you want to remove all Material Property rows?")
        if(proceed) {
            dispatch(clearMetricMaterialProperties(selectedSheet))
        } else {
            return
        }
    }

    return (
        <div style={{
            width: '60%'
        }}>
            <div style={{
                margin: '0 auto'
            }}>
                <div style={{
                    width: '90%',
                    margin: '0 auto',
                    padding: '15px',
                }}
                >
                    <div>
                        <div
                            style={{
                                textAlign: 'right'
                            }}
                        >
                            <Button
                                style={{
                                    margin: '10px'
                                }}
                                onClick={() => handleOpenNestedModal()}
                                variant='contained' color='primary'>
                                Add Material Property
                            </Button>
                            <Button
                                 variant='contained'
                                 color='secondary'
                                 onClick={() => deleteAllMetricMaterialProperties()}
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
                        <p style={{margin: '0px'}}><strong>MATERIAL PROPERTIES</strong></p>
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
                                <strong>Steel Type</strong>
                            </p>
                        </div>
                        <div style={{
                            paddingRight: '0px',
                            width: '20%',
                            textAlign: 'center'
                        }}>
                            <p>
                                <strong>E({unitHandler()})</strong>
                            </p>
                        </div>

                        <div style={{
                            paddingRight: '0px',
                            width: '20%',
                            textAlign: 'center'
                        }}>
                            <p>
                                <strong>F<sub>y</sub>({unitHandler()})</strong>
                            </p>
                        </div>
                        <div style={{
                            paddingRight: '0px',
                            width: '20%',
                            textAlign: 'center'
                        }}>
                            <p>
                                <strong>F<sub>u</sub>({unitHandler()})</strong>
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
            </div>
            <div style={{margin: '0 auto', width: '100%', marginBottom: '2%'}}>
                {
                    renderRows()
                }
            </div>
            {
                displayModal()
            }
        </div>
    )
}
export default MaterialProperties
