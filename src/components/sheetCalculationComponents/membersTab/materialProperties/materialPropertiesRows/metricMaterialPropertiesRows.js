import React, {useEffect, useMemo, useState} from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {
    editSelectedMetricMaterialProperty,
    removeMetricMaterialPropertyRow, setCurrentMetricMaterialPropertiesIndex, setEnglishMaterialSteelType,
    setMetricMaterialSteelType
} from "../../../../../store/actions/sheets/sheetCalculationComponents/materialProperties/materialProperties";
import {Button, FormControl, Input, TextField} from "@material-ui/core";
import {size} from "lodash";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Autocomplete} from "@mui/material";
import {objectChecker} from "../../../../../utilities/utilities";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '90%',
        margin: '10px 0',
        fontWeight: 'bold',
        color: 'black'
    }
}));



const MetricMaterialPropertiesRows = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    // const materialPropertiesMetric = useSelector(state => state.sheets.sheets[selectedSheet].apiMap.steelTypeMetricProperties)
    const materialPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    // const steelTypesMetric = useSelector(state => state.sheets.sheets[selectedSheet].apiData.steelTypesMetric)
    const steelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesMetric'])
    // const steelTypesEnglish = useSelector(state => state.sheets.sheets[selectedSheet].apiData.steelTypesEnglish)
    const steelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesEnglish'])
    // const currentMetricMaterialPropertyIndex = useSelector(state => state.sheets.sheets[selectedSheet].apiMap.currentMetricMaterialPropertyIndex)
    const currentMetricMaterialPropertyIndex = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'currentMetricMaterialPropertyIndex'])
    // const insertedSteelTypesMetric = useSelector(state => state.sheets.sheets[selectedSheet].apiMap.steelTypeMetricProperties)
    const insertedSteelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    // const insertedSteelTypesEnglish = useSelector(state => state.sheets.sheets[selectedSheet].apiMap.steelTypeEnglishProperties)
    const insertedSteelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeEnglishProperties'])


    const [edit, setEdit] = useState(false)

    const hashMetric = useMemo(() => {
        let hash = {}
        // alert(JSON.stringify(steelTypesMetric))
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

    const materialPropertiesRows = []

    const [rowsInt, setRowsInt] = useState(0)
    const [openNestedModal, setOpenNestedModal] = React.useState(false);

    const deleteMetricMaterialPropertyRow = (materialPropertiesIndex) => {
        const proceed = window.confirm("Are you sure you want to delete this material property row?")
        if(proceed) {
            // alert("hola!")
            setRowsInt(rowsInt + 1)
            dispatch(removeMetricMaterialPropertyRow(materialPropertiesIndex, selectedSheet))
        } else {
            return
        }
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

    const NestedModal = () => {

        const [nestedModalDisabled, setNestedModalDisabled] = useState(true)
        const [customButtonColor, setCustomButtonColor] = useState('primary')
        const [customButtonText, setCustomButtonText] = useState('CUSTOM')

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

        useEffect(() => {
            setSelectedSteelType(insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name)
        }, [insertedSteelTypesMetric])

        const [selectedSteelType, setSelectedSteelType] = useState('')

        const autoCompleteOnChangeHandler = (event) => {
            setSelectedSteelType(event.target.textContent)
        }

        const EMPAValueSetter = () => {
            if(system === 'Metric') {
                if(selectedSteelType === '') {
                    return
                } else if(selectedSteelType !== '') {
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
                } else {
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



        const editMaterialProperty = () => {
            if(selectedSteelType === '') {
                setErrorDisplay(true)
                return
            } else {
                if(system === 'Metric') {
                    if(size(insertedSteelTypesMetric) === 0) {
                        const initialMaterial = {}
                        initialMaterial[0] = {
                            name: selectedSteelType,
                            EMPA: hashMetric[selectedSteelType].steel_type_metric_e,
                            FYMPA: hashMetric[selectedSteelType].steel_type_metric_fy,
                            FUMPA: hashMetric[selectedSteelType].steel_type_metric_fu
                        }
                        dispatch(editSelectedMetricMaterialProperty(initialMaterial, selectedSheet, currentMetricMaterialPropertyIndex))
                        setOpenNestedModal(false)
                    } else {
                        const proceed = window.confirm("Are you sure you want to keep these changes?")
                        if(proceed) {
                            dispatch(editSelectedMetricMaterialProperty(selectedSteelType, hashMetric[selectedSteelType].steel_type_metric_e, hashMetric[selectedSteelType].steel_type_metric_fy, hashMetric[selectedSteelType].steel_type_metric_fu, selectedSheet, currentMetricMaterialPropertyIndex))
                            setOpenNestedModal(false)
                        } else {
                            return;
                        }
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
                        dispatch(editSelectedMetricMaterialProperty(initialMaterial, selectedSheet, currentMetricMaterialPropertyIndex))
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
                        dispatch(editSelectedMetricMaterialProperty(currentMaterial, selectedSheet, currentMetricMaterialPropertyIndex))
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
                                            disablePortal
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
                                        editMaterialProperty()
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
        if(edit === true) {
            return (
                <NestedModal/>
            )
        } else if(edit === false) {
            return
        }
    }

    for(let materialPropertiesIndex in materialPropertiesMetric) {

        const materialEMPa = materialPropertiesMetric[materialPropertiesIndex].EMPA
        const materialFyMPa = materialPropertiesMetric[materialPropertiesIndex].FYMPA
        const materialFuMPa = materialPropertiesMetric[materialPropertiesIndex].FUMPA
        const materialSelectedMaterial = materialPropertiesMetric[materialPropertiesIndex].name

        materialPropertiesRows.push(
            <div style={{
                display: 'flex',
                height: '100%',
                width: '90%',
                margin: '0 auto',
                // marginBottom: '2%'
            }}
                 key={materialPropertiesIndex}
                 id='ModalContainer'
            >
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '16.66%',
                    // display: 'inline-block',
                    height: '100%',
                    backgroundColor: '#fff'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '7%',
                        textAlign: 'center'
                    }}>
                        {parseFloat(materialPropertiesIndex) + parseFloat(1)}
                    </p>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '16.66%',
                    height: '100%',
                    backgroundColor: '#fff'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '7%',
                        textAlign: 'center'
                    }}>
                        {materialSelectedMaterial}
                    </p>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '16.66%',
                    height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '7%',
                    }}>
                        {materialEMPa}
                    </p>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '16.66%',
                    height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '7%',
                    }}>
                        {materialFyMPa}
                    </p>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '16.66%',
                    height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '7%',
                    }}>
                        {materialFuMPa}
                    </p>
                </div>
                <div
                    style={{
                        margin: '0px',
                        width: '16.66%'
                    }}>
                    <div style={{
                        display: 'flex',
                        margin: '0%',
                    }}>
                        <div style={{
                            width: '100%',
                            margin: '0 auto',
                            textAlign: 'center'
                        }}>
                            <p style={{margin: '7px 0px 5px'}}>
                                <BorderColorIcon
                                    variant='contained'
                                    color='primary'
                                    onClick={() => {
                                        // alert(materialPropertiesIndex)
                                        setEdit(true)
                                        dispatch(setCurrentMetricMaterialPropertiesIndex(materialPropertiesIndex, selectedSheet))
                                        handleOpenNestedModal()
                                    }}
                                >
                                    EDIT
                                </BorderColorIcon>
                                <CancelIcon
                                    variant='contained' color='secondary'
                                    style={{margin: '2px 5px'}}
                                    onClick={() => deleteMetricMaterialPropertyRow(materialPropertiesIndex)}
                                >
                                    REMOVE
                                </CancelIcon>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {materialPropertiesRows}
            {displayModal()}
        </div>
    )
}
export default MetricMaterialPropertiesRows