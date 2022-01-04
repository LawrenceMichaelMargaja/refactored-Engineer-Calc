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
    addCustomSteelType,
    clearMetricMaterialProperties, setCurrentMaterialsArray,
    setCurrentMetricMaterialPropertiesIndex,
    setCustomSelectedSteelType,
    setEnglishMaterialSteelType, setMaterialModalCustom,
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
    const insertedCustomSteelTypes = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'customSteelTypes'])
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])

    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        if (method === 'Investigation') {
            setDisableButton(false)
        } else if (method === 'Design') {
            setDisableButton(true)
        }
    }, [method])

    const [openNestedModal, setOpenNestedModal] = React.useState(false);

    const unitHandler = () => {
        if (system === 'Metric') {
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
        const newOptions = steelTypesMetric.map((data) => ({
            value: `${data.steel_type_metric_name}`,
            label: `${data.steel_type_metric_name}`
        }))
        return (
            newOptions
        )
    }

    const displayEnglishApi = () => {
        const newEnglish = steelTypesEnglish.map((data) => ({
            value: `${data.steel_type_english_name}`,
            label: `${data.steel_type_english_name}`
        }))
        return newEnglish
    }

    const systemCheck = () => {
        if (system === 'Metric') {
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
        for (let i in steelTypesMetric) {
            let {
                steel_type_metric_name,
            } = steelTypesMetric[i]
            hash[steel_type_metric_name] = steelTypesMetric[i]
        }
        return hash
    }, [steelTypesMetric])

    const hashEnglish = useMemo(() => {
        let hash = {}
        for (let i in steelTypesEnglish) {
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
    }

    const NestedModal = () => {

        const [nestedModalDisabled, setNestedModalDisabled] = useState(true)
        const [disabledPreselectButton, setDisabledPreselectButton] = useState(false)
        const [customButtonColor, setCustomButtonColor] = useState('primary')
        const [customButtonText, setCustomButtonText] = useState('CUSTOM')
        const [selectedSteelType, setSelectedSteelType] = useState('')
        const [customSteelType, setCustomSteelType] = useState('')

        const customSteelTypeValueSetter = (event) => {
            setCustomSteelType(event.target.value)
        }

        useEffect(() => {
            if (nestedModalDisabled) {
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

        const [theEMPAValue, setTheEMPAValue] = useState('')
        const [theFYMPAValue, setTheFYMPAValue] = useState('')
        const [theFUMPAValue, setTheFUMPAValue] = useState('')

        const EMPAValueSetter = () => {
            if (system === 'Metric') {
                    if (selectedName === '') {
                        return
                    } else {
                        setTheEMPAValue(hashMetric[selectedName].steel_type_metric_e)
                    }
                } else {
                    if (selectedName === '') {
                        return
                    } else {
                        setTheEMPAValue(hashEnglish[selectedName].steel_type_english_e)
                    }
                }
        }

        const FYMPAValueSetter = () => {
            if (system === 'Metric') {
                    if (selectedName === '') {
                        return
                    } else {
                        setTheFYMPAValue(hashMetric[selectedName].steel_type_metric_fy)
                    }
                } else {
                    if (selectedName === '') {
                        return
                    } else {
                        setTheFYMPAValue(hashEnglish[selectedName].steel_type_english_fy)
                    }
                }
        }

        const FUMPAValueSetter = () => {
            if (system === 'Metric') {
                    if (selectedName === '') {
                        return
                    } else {
                        setTheFUMPAValue(hashMetric[selectedName].steel_type_metric_fu)
                    }
                } else {
                    if (selectedName === '') {
                        return
                    } else {
                        setTheFUMPAValue(hashEnglish[selectedName].steel_type_english_fu)
                    }
                }
        }

        const [errorDisplay, setErrorDisplay] = useState(false)

        const displayError = () => {
            if(nestedModalDisabled === false) {
                return
            } else {
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
        }

        const [selectedName, setSelectedName] = useState('')
        const [EMPAValue, setEMPAValue] = useState('')
        const [FYMPAValue, setFYMPAValue] = useState('')
        const [FUMPAValue, setFUMPAValue] = useState('')

        const [selectedNameNoError, setSelectedNameNoError] = useState(true)
        const [empaNoError, setEmpaNoError] = useState(true)
        const [fympaNoError, setFympaNoError] = useState(true)
        const [fumpaNoError, setFumpaNoError] = useState(true)
        const [selectedNameError, setSelectedNameError] = useState(<></>)
        const [empaError, setEmpaError] = useState(<></>)
        const [fympaError, setFympaError] = useState(<></>)
        const [fumpaError, setFumpaError] = useState(<></>)

        const errorCheckRender = () => {
            selectedNameChecker()
            empaValueChecker()
            fympaValueChecker()
            fumpaValueChecker()
        }

        useEffect(() => {
            EMPAValueSetter()
            FYMPAValueSetter()
            FUMPAValueSetter()
        }, [selectedName])

        useEffect(() => {
            if(selectedName !== '') {
                setErrorDisplay(false)
            }
        }, [selectedName])

        const steelTypeHandler = () => {
            return (
                <div style={{width: '80%', margin: '0 auto'}}>
                    <p style={{textAlign: 'initial'}}><strong>Steel Type</strong></p>
                    <Input placeholder='Value will be displayed here...'
                           disabled={nestedModalDisabled}
                           style={{width: '100%', margin: '0 auto', color: 'black'}}
                           onChange={(event) => customSteelTypeValueSetter(event)}
                    />
                    {selectedNameError}
                </div>
            )
        }

        const selectedNameChecker = () => {
            if(nestedModalDisabled === false) {
                if(customSteelType === '') {
                    // setSelectedNameNoError(false)
                    setSelectedNameError(
                        <p style={{margin: '0', padding: '0'}}>
                            <strong style={{color: 'red'}}>This Field cannot be empty.</strong>
                        </p>
                    )
                } else {
                    setSelectedNameNoError(true)
                    setSelectedNameError(
                        <></>
                    )
                }
            }
        }


        const empaValueChecker = () => {
            if(nestedModalDisabled === false) {
                if(EMPAValue === '') {
                    // setEmpaNoError(false)
                    setEmpaError(
                        <p style={{margin: '0', padding: '0'}}>
                            <strong style={{color: 'red'}}>This Field cannot be empty.</strong>
                        </p>
                    )
                } else {
                    setEmpaNoError(true)
                    setEmpaError(
                        <></>
                    )
                }
            } else {
                setEmpaNoError(true)
                setEmpaError(
                    <></>
                )
            }
        }

        const fympaValueChecker = () => {
            if(nestedModalDisabled === false) {
                if (FYMPAValue === '') {
                    // setFympaNoError(false)
                    setFympaError(
                        <p style={{margin: '0', padding: '0'}}>
                            <strong style={{color: 'red'}}>This Field cannot be empty.</strong>
                        </p>
                    )
                } else {
                    setFympaNoError(true)
                    setFympaError(
                        <></>
                    )
                }
            } else {
                setFympaNoError(true)
                setFympaError(
                    <></>
                )
            }
        }

        const fumpaValueChecker = () => {
            if(nestedModalDisabled === false) {
                if(FUMPAValue === '') {
                    // setFumpaNoError(false)
                    setFumpaError(
                        <p style={{margin: '0', padding: '0'}}>
                            <strong style={{color: 'red'}}>This Field cannot be empty.</strong>
                        </p>
                    )
                } else {
                    setFumpaNoError(true)
                    setFumpaError(
                        <></>
                    )
                }
            } else {
                setFumpaNoError(true)
                setFumpaError(
                    <></>
                )
            }
        }

        useEffect(() => {
            if(customButtonText === 'DISCARD') {
                setSelectedNameError(<></>)
                setEmpaError(<></>)
                setFympaError(<></>)
                setFumpaError(<></>)
            }
        }, [nestedModalDisabled])

        const selectedNameHandler = (event) => {
            alert("at handler == " + event.target.textContent)
            setSelectedName(event.target.textContent)
        }

        const empaValueHandler = (event) => {
            setEMPAValue(event.target.value)
        }

        const fympaValueHandler = (event) => {
            setFYMPAValue(event.target.value)
        }

        const fumpaValueHandler = (event) => {
            setFUMPAValue(event.target.value)
        }

        const empaValuePlacer = () => {
            if(disabledPreselectButton) {

            }
        }

        const toggleDisable = () => {
            if(nestedModalDisabled) {
                setNestedModalDisabled(curVal => !curVal)
            } else if(!nestedModalDisabled) {
                const proceed = window.confirm("Are you sure you want to discard your changes?")
                if(proceed) {
                    setNestedModalDisabled(curVal => !curVal)
                    setSelectedName('')
                    // setSelectedCustomName('')
                    setTheEMPAValue('')
                    setTheFYMPAValue('')
                    setTheFUMPAValue('')
                } else {
                    return
                }
            }
        }

        const insertMaterialProperty = () => {
            if(nestedModalDisabled === false) {
                if(size(insertedSteelTypesMetric) === 0) {
                    const customSteelTypeInitial = {}
                    customSteelTypeInitial[0] = {
                        name: customSteelType,
                        EMPA: EMPAValue,
                        FYMPA: FYMPAValue,
                        FUMPA: FUMPAValue,
                        custom: true
                    }
                    dispatch(setMetricMaterialSteelType(customSteelTypeInitial, selectedSheet))
                    dispatch(setEnglishMaterialSteelType(customSteelTypeInitial, selectedSheet))
                    dispatch(setCustomSelectedSteelType(customSteelType, selectedSheet))
                    dispatch(setCurrentMetricMaterialPropertiesIndex(0, selectedSheet))
                    setOpenNestedModal(false)
                } else if(size(insertedSteelTypesMetric) > 0) {
                    const currentCustomSteelTypes = {...insertedSteelTypesMetric}
                    const currentCustomSteelTypesSize = size(insertedSteelTypesMetric)
                    currentCustomSteelTypes[currentCustomSteelTypesSize] = {
                        name: customSteelType,
                        EMPA: EMPAValue,
                        FYMPA: FYMPAValue,
                        FUMPA: FUMPAValue,
                        custom: true
                    }
                    dispatch(setMetricMaterialSteelType(currentCustomSteelTypes, selectedSheet))
                    dispatch(setEnglishMaterialSteelType(currentCustomSteelTypes, selectedSheet))
                    dispatch(setCustomSelectedSteelType(customSteelType, selectedSheet))
                    dispatch(setCurrentMetricMaterialPropertiesIndex(currentCustomSteelTypesSize, selectedSheet))
                    setOpenNestedModal(false)
                }
            } else {
                alert("over here")
                if (size(insertedSteelTypesMetric) === 0) {
                    const initialMaterialEnglish = {}
                    const initialMaterial = {}
                    initialMaterial[0] = {
                        name: selectedName,
                        EMPA: hashMetric[selectedName].steel_type_metric_e,
                        FYMPA: hashMetric[selectedName].steel_type_metric_fy,
                        FUMPA: hashMetric[selectedName].steel_type_metric_fu,
                        custom: false
                    }
                    initialMaterialEnglish[0] = {
                        name: selectedName,
                        EMPA: hashEnglish[selectedName].steel_type_english_e,
                        FYMPA: hashEnglish[selectedName].steel_type_english_fy,
                        FUMPA: hashEnglish[selectedName].steel_type_english_fu,
                        custom: false
                    }
                    const id = 1
                    dispatch(setMetricMaterialSteelType(initialMaterial, selectedSheet))
                    dispatch(setEnglishMaterialSteelType(initialMaterialEnglish, selectedSheet))
                    dispatch(setCurrentMaterialsArray(id, selectedSheet))
                    setOpenNestedModal(false)
                } else {
                    alert("actually here")
                    const newMaterialIndex = size(insertedSteelTypesMetric)
                    const currentMaterialEnglish = {...insertedSteelTypesEnglish}
                    const currentMaterial = {...insertedSteelTypesMetric}
                    currentMaterial[newMaterialIndex] = {
                        name: selectedName,
                        EMPA: hashMetric[selectedName].steel_type_metric_e,
                        FYMPA: hashMetric[selectedName].steel_type_metric_fy,
                        FUMPA: hashMetric[selectedName].steel_type_metric_fu,
                        custom: false
                    }
                    currentMaterialEnglish[newMaterialIndex] = {
                        name: selectedName,
                        EMPA: hashEnglish[selectedName].steel_type_english_e,
                        FYMPA: hashEnglish[selectedName].steel_type_english_fy,
                        FUMPA: hashEnglish[selectedName].steel_type_english_fu,
                        custom: false
                    }
                    // alert("Here I am === " + JSON.stringify(currentMaterial))
                    dispatch(setMetricMaterialSteelType(currentMaterial, selectedSheet))
                    dispatch(setEnglishMaterialSteelType(currentMaterialEnglish, selectedSheet))
                    setOpenNestedModal(false)
                }
            }
        }

        return (
            <div style={{flexGrow: 1}}>
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
                        height: nestedModalDisabled ? 600 : 700,
                        backgroundColor: '#fff',
                        border: '2px solid #000',
                        boxShadow: 24,
                        pt: 2,
                        px: 4,
                        pb: 3,
                        textAlign: 'center',
                        flexGrow: 1
                    }}>
                        <h2 style={{padding: '1em 0'}} id="parent-modal-title">SELECT PROPERTIES FOR MATERIAL</h2>

                        <div style={{
                            width: '80%',
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                {displayError()}
                                <div style={{width: '30%'}}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            // disablePortal
                                            disabled={disabledPreselectButton}
                                            id="combo-box-demo"
                                            options={systemCheck()}
                                            value={selectedName}
                                            // value={selectedSteelType}
                                            onChange={(event) => selectedNameHandler(event)}
                                            // onChange={(event) => autoCompleteOnChangeHandler(event)}
                                            sx={{width: 300}}
                                            renderInput={(params) => <TextField {...params}
                                                                                label="Preset Steel Types"/>}
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
                                    onClick={() => {
                                        toggleDisable()
                                        // setNestedModalDisabled(currVal => !currVal)
                                        dispatch(setMaterialModalCustom(curVal => !curVal, selectedSheet))
                                        setDisabledPreselectButton(currVal => !currVal)
                                    }}
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
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
                                       disabled={nestedModalDisabled}
                                       value={theEMPAValue}
                                       // value={EMPAValueSetter()}
                                       onChange={(event) => empaValueHandler(event)}
                                />
                                {empaError}
                            </div>
                            <div style={{width: '80%', margin: '0 auto'}}>

                                <p style={{textAlign: 'initial'}}><strong>FyMPa</strong></p>
                                <Input placeholder='Value will be displayed here...'
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
                                       disabled={nestedModalDisabled}
                                       value={theFYMPAValue}
                                       // value={FYMPAValueSetter()}
                                       onChange={(event) => fympaValueHandler(event)}
                                />
                                {fympaError}
                            </div>
                            <div style={{width: '80%', margin: '0 auto'}}>

                                <p style={{textAlign: 'initial'}}><strong>FuMPa</strong></p>
                                <Input placeholder='Value will be displayed here...'
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
                                       disabled={nestedModalDisabled}
                                       value={theFUMPAValue}
                                       // value={FUMPAValueSetter()}
                                       onChange={(event) => fumpaValueHandler(event)}
                                />
                                {fumpaError}
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
                                        errorCheckRender()
                                        if(customSteelType === '' && nestedModalDisabled === false) {
                                            alert("Hola")
                                            setErrorDisplay(true)
                                        } else {
                                            if(selectedNameNoError === false && empaNoError === false && fympaNoError === false && fumpaNoError === false) {
                                                alert("I made it here")
                                            } else {
                                                alert("hoo haa")
                                                insertMaterialProperty()
                                            }
                                        }
                                        // insertMaterialProperty()
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
        if (proceed) {
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
                                disabled={disableButton}
                                style={{
                                    margin: '10px'
                                }}
                                onClick={() => handleOpenNestedModal()}
                                variant='contained' color='primary'>
                                Add Material Property
                            </Button>
                            <Button
                                disabled={disableButton}
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
