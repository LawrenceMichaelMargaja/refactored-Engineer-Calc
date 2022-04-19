import {Button, Card, FormControl, Input, TextField} from "@material-ui/core";
import React, {useEffect, useMemo, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import NestedModal from "../../../modal/materialPropertiesModal/MaterialPropertiesModal";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
    getSteelTypesEnglishAPI,
    getSteelTypesMetricAPI,
    removeSelectedMaterialArrayIndex,
    setCurrentEnglishMaterialPropertyIndex,
    setCurrentMetricMaterialPropertyIndex,
    setLatestMaterialMetricId,
} from "../../../../store/actions/sheets/sheets";
import {Autocomplete, Stack, Tooltip} from "@mui/material";
import {
    clearMetricMaterialProperties, removeMetricMaterialPropertyRow, resetMetricMaterialIndex,
    setCurrentMaterialsArray,
    setCustomSelectedSteelType,
    setEnglishMaterialSteelType,
    setMaterialModalCustom,
    setMetricMaterialSteelType
} from "../../../../store/actions/sheets/sheetCalculationComponents/materialProperties/materialProperties";
import {mapKeys, size} from "lodash";
import MetricMaterialPropertiesRows from "./materialPropertiesRows/metricMaterialPropertiesRows";
import EnglishMaterialPropertiesRows from "./materialPropertiesRows/englishMaterialPropertiesRow";
import {objectChecker} from "../../../../utilities/utilities";
import MetricMaterialPropertiesRowsDesign from "./materialPropertiesRows/metricMaterialPropertiesRowsDesign";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CancelIcon from "@material-ui/icons/Cancel";
import {jsx} from "@emotion/react";

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

    const latestMaterialMetricId = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'latestMaterialMetricId'])
    const currentMaterialsArray = objectChecker(sheets, ['sheets', selectedSheet, 'currentMaterialsArray'])

    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        if (method === 'Investigation') {
            setDisableButton(false)
        } else if (method === 'Design') {
            setDisableButton(true)
        }
    }, [method])

    const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0)
    const [openNestedModal, setOpenNestedModal] = useState(false);
    const [editMode, setEditMode] = useState(false)

    const [theModelIndex, setTheModelIndex] = useState(0)
    const [theEditIndex, setTheEditIndex] = useState(0)

    const getTheEditIndex = (theModelId) => {
        if(system === 'Metric') {
            for(let index in insertedSteelTypesMetric) {
                if(insertedSteelTypesMetric[index].id === theModelId) {
                    setEditMode(true)
                    setTheEditIndex(theModelId)
                    setOpenNestedModal(true)
                }
            }
        } else if(system === 'English') {
            // alert("oh yes == " + JSON.stringify(theModelId));
            for(let index in insertedSteelTypesEnglish) {
                if(insertedSteelTypesEnglish[index].id === theModelId) {
                    setEditMode(true)
                    setTheEditIndex(theModelId)
                    // alert("theEditIndex == " + JSON.stringify(theEditIndex));
                    setOpenNestedModal(true)
                }
            }
        }
    }

    // useEffect(() => {
    //     getTheEditIndex()
    // }, [theModelIndex])

    const unitHandler = () => {
        if (system === 'Metric') {
            return 'MPa'
        } else {
            return 'ksi'
        }
    }

    const handleOpenNestedModal = () => {
        setOpenNestedModal(true);
    };

    const newMaterials = []
    if (system === 'Metric') {
        for (let index in insertedSteelTypesMetric) {
            newMaterials.push(insertedSteelTypesMetric[index])
        }
    } else if (system == 'English') {
        for (let index in insertedSteelTypesEnglish) {
            newMaterials.push(insertedSteelTypesEnglish[index])
        }
    }

    const displayMetricApi = () => {
        const newMetric = steelTypesMetric.map((data) => ({
            value: `${data.steel_type_metric_name}`,
            label: `${data.steel_type_metric_name}`
        }))
        return newMetric
    }

    const displayApiData = () => {
        const loading = [{
            id: 'Calculating...',
            name: 'Calculating...',
            empa: 'Calulating...',
            fympa: 'Calculating...',
            fumpa: 'Calculating...',
        }]
        if (newMaterials === null) {
            return loading
        } else {
            // console.log("The new new members === ", JSON.stringify(newMaterials));
            let id = 0
            const newOptions = newMaterials.map((data) => ({
                id: data.id,
                name: data.name,
                empa: data.EMPA,
                fympa: data.FYMPA,
                fumpa: data.FUMPA
            }))
            return (
                newOptions
            )
        }
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
            return displayMetricApi()
        } else if (system === 'English') {
            return displayEnglishApi()
        }
    }

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
            if(system === 'Metric') {
                if(method === 'Investigation') {
                    return (
                        <MetricMaterialPropertiesRows/>
                    )
                } else if(method === 'Design') {
                    return (
                        <MetricMaterialPropertiesRowsDesign/>
                    )
                }
            } else if(system === 'English') {
                if(method === 'Investigation') {
                    return (
                        <EnglishMaterialPropertiesRows/>
                    )
                } else if(method === 'Design') {
                    return (
                        <MetricMaterialPropertiesRowsDesign/>
                    )
                }
            }
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
            // if(system === 'Metric') {
            //     for(let index in insertedSteelTypesMetric) {
            //         if(editMode) {
            //             console.log("the empa value == " + JSON.stringify(EMPAValue));
            //             setTheEMPAValue(insertedSteelTypesMetric[index].EMPA)
            //         } else {
            //             console.log("here i am boi");
            //             if(insertedSteelTypesMetric[index].custom === true) {
            //                 setTheEMPAValue(insertedSteelTypesMetric[index].EMPA)
            //             } else {
            //                 setTheEMPAValue(hashMetric[insertedSteelTypesMetric[index].name].steel_type_metric_e)
            //             }
            //         }
            //     }
            // } else {
            //     for(let index in insertedSteelTypesEnglish) {
            //         if(insertedSteelTypesEnglish[index].custom === true) {
            //             setTheEMPAValue(insertedSteelTypesEnglish[index].EMPA)
            //         } else {
            //             setTheEMPAValue(hashEnglish[insertedSteelTypesEnglish[index].name].steel_type_english_e)
            //         }
            //     }
            // }

            if(!nestedModalDisabled) {
                if (system === 'Metric') {
                    if (selectedName === '') {
                        return
                    } else {
                        for(let index in insertedSteelTypesMetric) {
                            setTheEMPAValue(insertedSteelTypesMetric[index].EMPA)
                            // setTheEMPAValue(hashMetric[selectedName].steel_type_metric_e)
                        }
                    }
                } else {
                    if (selectedName === '') {
                        return
                    } else {
                        setTheEMPAValue(hashEnglish[selectedName].steel_type_english_e)
                    }
                }
            } else {
                if (system === 'Metric') {
                    if (selectedName === '') {
                        return
                    } else {
                        for(let index in insertedSteelTypesMetric) {
                            if(insertedSteelTypesMetric[index].custom === true) {
                                setTheEMPAValue(insertedSteelTypesMetric[index].EMPA)
                            } else {
                                setTheEMPAValue(hashMetric[selectedName].steel_type_metric_e)
                            }
                        }
                        // setTheEMPAValue(hashMetric[selectedName].steel_type_metric_e)
                        // for(let index in insertedSteelTypesMetric) {
                        //     // setTheEMPAValue(insertedSteelTypesMetric[index].EMPA)
                        //     setTheEMPAValue(hashMetric[selectedName].steel_type_metric_e)
                        // }
                    }
                } else {
                    if (selectedName === '') {
                        return
                    } else {
                        setTheEMPAValue(hashEnglish[selectedName].steel_type_english_e)
                    }
                }
            }
        }

        const FYMPAValueSetter = () => {
            // if(system === 'Metric') {
            //     for(let index in insertedSteelTypesMetric) {
            //         if(editMode) {
            //             setTheFYMPAValue(insertedSteelTypesMetric[index].FYMPA)
            //         } else {
            //             // setTheFYMPAValue(hashMetric[insertedSteelTypesMetric[index].name].steel_type_metric_fy)
            //             // setTheFYMPAValue(hashMetric[selectedName].steel_type_metric_fy)
            //         }
            //     }
            // } else {
            //     for(let index in insertedSteelTypesEnglish) {
            //         if(insertedSteelTypesEnglish[index].custom === true) {
            //             setTheFYMPAValue(insertedSteelTypesEnglish[index].FYMPA)
            //         } else {
            //             setTheFYMPAValue(hashEnglish[insertedSteelTypesEnglish[index].name].steel_type_english_fy)
            //             // setTheFYMPAValue(hashEnglish[selectedName].steel_type_english_fy)
            //         }
            //     }
            // }
            if(!nestedModalDisabled) {
                if (system === 'Metric') {
                    if (selectedName === '') {
                        return
                    } else {
                        for(let index in insertedSteelTypesMetric) {
                            setTheFYMPAValue(insertedSteelTypesMetric[index].FYMPA)
                            // setTheFYMPAValue(hashMetric[selectedName].steel_type_metric_fy)
                        }
                        // setTheFYMPAValue(hashMetric[selectedName].steel_type_metric_fy)
                    }
                } else {
                    if (selectedName === '') {
                        return
                    } else {
                        setTheFYMPAValue(hashEnglish[selectedName].steel_type_english_fy)
                    }
                }
            } else {
                if (system === 'Metric') {
                    if (selectedName === '') {
                        return
                    } else {
                        for(let index in insertedSteelTypesMetric) {
                            if(insertedSteelTypesMetric[index].custom === true) {
                                setTheFYMPAValue(insertedSteelTypesMetric[index].FYMPA)
                            } else {
                                setTheFYMPAValue(hashMetric[selectedName].steel_type_metric_fy)
                            }
                        }
                        // setTheEMPAValue(hashMetric[selectedName].steel_type_metric_e)
                        // for(let index in insertedSteelTypesMetric) {
                        //     setTheFYMPAValue(insertedSteelTypesMetric[index].FYMPA)
                        // }
                        // setTheFYMPAValue(hashMetric[selectedName].steel_type_metric_fy)
                    }
                } else {
                    if (selectedName === '') {
                        return
                    } else {
                        for(let index in insertedSteelTypesMetric) {
                            if(insertedSteelTypesEnglish[index].custom === true) {
                                setTheFYMPAValue(insertedSteelTypesEnglish[index].FYMPA)
                            } else {
                                setTheFYMPAValue(hashEnglish[selectedName].steel_type_english_fy)
                            }
                        }
                    }
                }
            }
        }

        const FUMPAValueSetter = () => {
            if(!nestedModalDisabled) {
                if (system === 'Metric') {
                    if (selectedName === '') {
                        return
                    } else {
                        for(let index in insertedSteelTypesMetric) {
                            setTheFUMPAValue(insertedSteelTypesMetric[index].FUMPA)
                            // setTheFUMPAValue(hashMetric[selectedName].steel_type_metric_fu)
                        }
                        // setTheFYMPAValue(hashMetric[selectedName].steel_type_metric_fu)
                    }
                } else {
                    if (selectedName === '') {
                        return
                    } else {
                        setTheFUMPAValue(hashEnglish[selectedName].steel_type_english_fu)
                    }
                }
            } else {
                if (system === 'Metric') {
                    if (selectedName === '') {
                        return
                    } else {
                        for(let index in insertedSteelTypesMetric) {
                            if(insertedSteelTypesMetric[index].custom === true) {
                                setTheFUMPAValue(insertedSteelTypesMetric[index].FUMPA)
                            } else {
                                setTheFUMPAValue(hashMetric[selectedName].steel_type_metric_fu)
                            }
                        }
                        // setTheEMPAValue(hashMetric[selectedName].steel_type_metric_e)
                        // for(let index in insertedSteelTypesMetric) {
                        //     setTheFUMPAValue(insertedSteelTypesMetric[index].FUMPA)
                        // }
                        // setTheFUMPAValue(hashMetric[selectedName].steel_type_metric_fu)
                    }
                } else {
                    if (selectedName === '') {
                        return
                    } else {
                        for(let index in insertedSteelTypesMetric) {
                            if(insertedSteelTypesEnglish[index].custom === true) {
                                setTheFUMPAValue(insertedSteelTypesEnglish[index].FUMPA)
                            } else {
                                setTheFUMPAValue(hashEnglish[selectedName].steel_type_english_fu)
                            }
                        }
                    }
                }
            }
        }



        const [errorDisplay, setErrorDisplay] = useState(false)

        const displayError = () => {
            if (nestedModalDisabled === false) {
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
            selectedNameCheckerMetric()
            empaValueChecker()
            fympaValueChecker()
            fumpaValueChecker()
        }

        // useEffect(() => {
        //     setTheEMPAValue(EMPAValue)
        //     setTheFYMPAValue(FYMPAValue)
        //     setTheFUMPAValue(FUMPAValue)
        // }, [selectedName])

        // useEffect(() => {
        //     if (nestedModalDisabled === false) {
        //         if (selectedName === '') {
        //             return
        //         } else {
        //             setEMPAValue(hashMetric[selectedName].steel_type_metric_e)
        //             setFYMPAValue(hashMetric[selectedName].steel_type_metric_fy)
        //             setFUMPAValue(hashMetric[selectedName].steel_type_metric_fu)
        //         }
        //     }
        // }, [nestedModalDisabled])

        useEffect(() => {
            if(steelTypesMetric.length === 0) {
                return;
            } else {
                EMPAValueSetter()
                FYMPAValueSetter()
                FUMPAValueSetter()
            }
        }, [selectedName])

        useEffect(() => {
            if (selectedName !== '') {
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

        const [nameMatch, setNameMatch] = useState(false)

        const selectedNameCheckerMetric = () => {
            if (nestedModalDisabled === false) {
                for(let name in steelTypesMetric) {
                    if ((customSteelType).toUpperCase() === (steelTypesMetric[name].steel_type_metric_name).toUpperCase()) {
                        setSelectedNameError(
                            <p style={{margin: '0', padding: '0'}}>
                                <strong style={{color: 'red'}}>Custom name cannot match preset values.</strong>
                            </p>
                        )
                        // setErrorDisplay(true)
                        break
                    } else if (customSteelType === '') {
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
        }

        useEffect(() => {
            for(let name in steelTypesMetric) {
                if ((customSteelType).toUpperCase() !== (steelTypesMetric[name].steel_type_metric_name).toUpperCase()) {
                    setSelectedNameError(<></>)
                    setNameMatch(false)
                    setErrorDisplay(false)
                    break
                }
            }
        }, [customSteelType])

        useEffect(() => {
            for(let name in steelTypesMetric) {
                if ((customSteelType).toUpperCase() === (steelTypesMetric[name].steel_type_metric_name).toUpperCase()) {
                    setSelectedNameError(
                        <p style={{margin: '0', padding: '0'}}>
                            <strong style={{color: 'red'}}>Custom name cannot match preset values.</strong>
                        </p>
                    )
                    setNameMatch(true)
                    setErrorDisplay(true)
                    break
                }
            }
        }, [customSteelType])

        useEffect(() => {
            if(theEMPAValue !== '') {
                setEmpaError(<></>)
            }
            if(theFYMPAValue !== '') {
                setFympaError(<></>)
            }
            if(theFUMPAValue !== '') {
                setFumpaError(<></>)
            }
        }, [theEMPAValue, theFYMPAValue, theFUMPAValue])


        const empaValueChecker = () => {
            if (EMPAValue === '') {
                setEmpaNoError(false)
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
            // if (nestedModalDisabled === false) {
            //     if (EMPAValue === '') {
            //         // setEmpaNoError(false)
            //         setEmpaError(
            //             <p style={{margin: '0', padding: '0'}}>
            //                 <strong style={{color: 'red'}}>This Field cannot be empty.</strong>
            //             </p>
            //         )
            //     } else {
            //         setEmpaNoError(true)
            //         setEmpaError(
            //             <></>
            //         )
            //     }
            // } else {
            //     setEmpaNoError(true)
            //     setEmpaError(
            //         <></>
            //     )
            // }
        }

        const fympaValueChecker = () => {
            if (FYMPAValue === '') {
                setFympaNoError(false)
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
            // if (nestedModalDisabled === false) {
            //     if (FYMPAValue === '') {
            //         // setFympaNoError(false)
            //         setFympaError(
            //             <p style={{margin: '0', padding: '0'}}>
            //                 <strong style={{color: 'red'}}>This Field cannot be empty.</strong>
            //             </p>
            //         )
            //     } else {
            //         setFympaNoError(true)
            //         setFympaError(
            //             <></>
            //         )
            //     }
            // } else {
            //     setFympaNoError(true)
            //     setFympaError(
            //         <></>
            //     )
            // }
        }

        const fumpaValueChecker = () => {
            if (FUMPAValue === '') {
                setFumpaNoError(false)
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
            // if (nestedModalDisabled === false) {
            //     if (FUMPAValue === '') {
            //         // setFumpaNoError(false)
            //         setFumpaError(
            //             <p style={{margin: '0', padding: '0'}}>
            //                 <strong style={{color: 'red'}}>This Field cannot be empty.</strong>
            //             </p>
            //         )
            //     } else {
            //         setFumpaNoError(true)
            //         setFumpaError(
            //             <></>
            //         )
            //     }
            // } else {
            //     setFumpaNoError(true)
            //     setFumpaError(
            //         <></>
            //     )
            // }
        }


        const selectedNameHandler = (event) => {
            // setSelectedName(event.target.value)
            setSelectedName(event.target.textContent)
        }

        const empaValueHandler = (event) => {
            setTheEMPAValue(event.target.value)
        }

        const fympaValueHandler = (event) => {
            setTheFYMPAValue(event.target.value)
        }

        const fumpaValueHandler = (event) => {
            setTheFUMPAValue(event.target.value)
        }

        const empaValuePlacer = () => {
            if (disabledPreselectButton) {

            }
        }

        // const toggl/*eDisable = () => {
        //     if (nestedModalDisabled) {
        //         setNestedModalDisabled(curVal => !curVal)
        //     } else if (!nestedModalDisabled) {
        //         const proceed = window.confirm("Are you sure you want to discard your changes?")
        //         if (proceed) {
        //             setNestedModalDisabled(curVal => !curVal)
        //             setSelectedName('')
        //             // setSelectedCustomName('')
        //             setTheEMPAValue('')
        //             setTheFYMPAValue('')
        //             setTheFUMPAValue('')
        //         } else {
        //             return
        //         }
        //     }
        // }*/

        const materialIdChecker = () => {
            let idValue = 0
            for(let id in insertedSteelTypesMetric) {
                if(insertedSteelTypesMetric[id].custom === true && insertedSteelTypesMetric[id].id === 1 && size(insertedSteelTypesMetric) === 1) {
                    idValue = 1
                    break
                } else if(insertedSteelTypesMetric[id].custom === true && insertedSteelTypesMetric[id].id !== 1) {
                    idValue = insertedSteelTypesMetric[id].id
                    break
                } else {
                    idValue = insertedSteelTypesMetric[id].id
                }
                break
            }
            return idValue
        }

        const currentMetricMaterialPropertyIndex = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'currentMetricMaterialPropertyIndex'])

        const hashCustom = useMemo(() => {
            let hash = {}
            for (let i in insertedSteelTypesMetric) {
                let {
                    name
                } = insertedSteelTypesMetric[i]
                hash[name] = insertedSteelTypesMetric[i]
            }
            return hash
        }, [insertedSteelTypesMetric])

        useEffect(() => {
            if(size(insertedSteelTypesMetric) === 0) {
                return
            } else {
                if(editMode) {
                    console.log("the new cl === ", JSON.stringify(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].EMPA));
                    setSelectedName(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].name)
                    setEMPAValue(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].EMPA)
                    setFYMPAValue(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].FYMPA)
                    setFUMPAValue(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].FUMPA)
                }
            }
        }, [])

        const insertMaterialProperty = () => {
            if (nestedModalDisabled === false) {
                if (size(insertedSteelTypesMetric) === 0) {
                    const customSteelTypeInitial = {}
                    customSteelTypeInitial[0] = {
                        id: 1,
                        name: customSteelType,
                        EMPA: theEMPAValue,
                        FYMPA: theFYMPAValue,
                        FUMPA: theFUMPAValue,
                        custom: true
                    }
                    dispatch(setMetricMaterialSteelType(customSteelTypeInitial, selectedSheet))
                    dispatch(setEnglishMaterialSteelType(customSteelTypeInitial, selectedSheet))
                    dispatch(setCustomSelectedSteelType(customSteelType, selectedSheet))
                    dispatch(setCurrentMetricMaterialPropertyIndex(0, selectedSheet))
                    dispatch(setCurrentMaterialsArray(1, selectedSheet))
                    setEditMode(false)
                    setOpenNestedModal(false)
                } else if(materialIdChecker() === 1 && size(insertedSteelTypesMetric) === 1) {
                    // alert("dust in the wind")
                    const currentCustomSteelTypes = {...insertedSteelTypesMetric}
                    const currentCustomSteelTypesSize = editMode ? parseFloat(theEditIndex) - 1 : size(insertedSteelTypesMetric)
                    currentCustomSteelTypes[currentCustomSteelTypesSize] = {
                        id: 2,
                        name: customSteelType,
                        EMPA: theEMPAValue,
                        FYMPA: theFYMPAValue,
                        FUMPA: theFUMPAValue,
                        custom: true
                    }
                    console.log("Herer == ", currentCustomSteelTypes)
                    dispatch(setMetricMaterialSteelType(currentCustomSteelTypes, selectedSheet))
                    dispatch(setEnglishMaterialSteelType(currentCustomSteelTypes, selectedSheet))
                    dispatch(setCustomSelectedSteelType(customSteelType, selectedSheet))
                    dispatch(setCurrentMaterialsArray(parseFloat(currentCustomSteelTypesSize + 1), selectedSheet))
                    dispatch(setLatestMaterialMetricId(parseFloat(materialIdChecker() + 1), selectedSheet))
                    // dispatch(setMetricMaterialSteelType(currentMaterial, selectedSheet))
                    // dispatch(setCurrentMetricMaterialPropertiesIndex(parseFloat(currentCustomSteelTypesSize) + 1, selectedSheet))
                    setEditMode(false)
                    setOpenNestedModal(false)
                } else if (size(insertedSteelTypesMetric) > 0) {
                    // alert("hello my friend!")
                    const newMaterialIndex = editMode ? parseFloat(theEditIndex) - 1 : size(insertedSteelTypesMetric)
                    const currentCustomSteelTypes = {...insertedSteelTypesMetric}
                    // const currentCustomSteelTypesSize = size(insertedSteelTypesMetric)
                    currentCustomSteelTypes[newMaterialIndex] = {
                        id: parseFloat(newMaterialIndex + 1),
                        name: customSteelType,
                        EMPA: theEMPAValue,
                        FYMPA: theFYMPAValue,
                        FUMPA: theFUMPAValue,
                        custom: true
                    }
                    console.log("Herer == ", currentCustomSteelTypes)
                    dispatch(setMetricMaterialSteelType(currentCustomSteelTypes, selectedSheet))
                    dispatch(setEnglishMaterialSteelType(currentCustomSteelTypes, selectedSheet))
                    dispatch(setCustomSelectedSteelType(customSteelType, selectedSheet))
                    // dispatch(setCurrentMaterialsArray(parseFloat(latestMaterialMetricId + 1), selectedSheet))
                    dispatch(setCurrentMaterialsArray(parseFloat(materialIdChecker() + 1), selectedSheet))
                    dispatch(setLatestMaterialMetricId(parseFloat(newMaterialIndex + 1), selectedSheet))
                    // dispatch(setCurrentMetricMaterialPropertiesIndex(parseFloat(currentCustomSteelTypesSize) + 1, selectedSheet))
                    setEditMode(false)
                    setOpenNestedModal(false)
                }
            } else {
                // alert("over here")
                if (size(insertedSteelTypesMetric) === 0) {
                    // alert("oh nossss");
                    const initialMaterialEnglish = {}
                    const initialMaterial = {}
                    initialMaterial[0] = {
                        id: 1,
                        name: selectedName,
                        EMPA: hashMetric[selectedName].steel_type_metric_e,
                        FYMPA: hashMetric[selectedName].steel_type_metric_fy,
                        FUMPA: hashMetric[selectedName].steel_type_metric_fu,
                        custom: false
                    }
                    initialMaterialEnglish[0] = {
                        id: 1,
                        name: selectedName,
                        EMPA: hashEnglish[selectedName].steel_type_english_e,
                        FYMPA: hashEnglish[selectedName].steel_type_english_fy,
                        FUMPA: hashEnglish[selectedName].steel_type_english_fu,
                        custom: false
                    }
                    const id = 1
                    dispatch(setMetricMaterialSteelType(initialMaterial, selectedSheet))
                    dispatch(setCurrentMaterialsArray(1, selectedSheet))
                    dispatch(setEnglishMaterialSteelType(initialMaterialEnglish, selectedSheet))
                    setEditMode(false)
                    setOpenNestedModal(false)
                } else if(materialIdChecker()  === 1 && size(insertedSteelTypesMetric) === 1) {
                    // alert("what's up?")
                    const newMaterialIndex = editMode ? parseFloat(theEditIndex) - 1 : size(insertedSteelTypesMetric)
                    const currentMaterialEnglish = {...insertedSteelTypesEnglish}
                    const currentMaterial = {...insertedSteelTypesMetric}
                    let id = editMode ?  1 : 2
                    currentMaterial[newMaterialIndex] = {
                        id: id,
                        name: selectedName,
                        EMPA: hashMetric[selectedName].steel_type_metric_e,
                        FYMPA: hashMetric[selectedName].steel_type_metric_fy,
                        FUMPA: hashMetric[selectedName].steel_type_metric_fu,
                        custom: false
                    }
                    currentMaterialEnglish[newMaterialIndex] = {
                        id: id,
                        name: selectedName,
                        EMPA: hashEnglish[selectedName].steel_type_english_e,
                        FYMPA: hashEnglish[selectedName].steel_type_english_fy,
                        FUMPA: hashEnglish[selectedName].steel_type_english_fu,
                        custom: false
                    }
                    // alert("the current body == " + JSON.stringify(currentMaterial));
                    dispatch(setLatestMaterialMetricId(2, selectedSheet))
                    dispatch(setMetricMaterialSteelType(currentMaterial, selectedSheet))
                    dispatch(setCurrentMaterialsArray(2, selectedSheet))
                    dispatch(setEnglishMaterialSteelType(currentMaterialEnglish, selectedSheet))
                    setEditMode(false)
                    setOpenNestedModal(false)
                } if(materialIdChecker() !== 1 && size(insertedSteelTypesMetric) === 1) {
                    // alert("oh yeah man == " + editMode)
                    const newMaterialIndex = editMode ? parseFloat(theEditIndex) - 1 : size(insertedSteelTypesMetric)
                    const currentMaterialEnglish = {...insertedSteelTypesEnglish}
                    const currentMaterial = {...insertedSteelTypesMetric}
                    currentMaterial[newMaterialIndex] = {
                        id: parseFloat(materialIdChecker() + 1),
                        name: selectedName,
                        EMPA: hashMetric[selectedName].steel_type_metric_e,
                        FYMPA: hashMetric[selectedName].steel_type_metric_fy,
                        FUMPA: hashMetric[selectedName].steel_type_metric_fu,
                        custom: false
                    }
                    currentMaterialEnglish[newMaterialIndex] = {
                        id: parseFloat(materialIdChecker() + 1),
                        name: selectedName,
                        EMPA: hashEnglish[selectedName].steel_type_english_e,
                        FYMPA: hashEnglish[selectedName].steel_type_english_fy,
                        FUMPA: hashEnglish[selectedName].steel_type_english_fu,
                        custom: false
                    }
                    // alert("newMaterialIndex == " + parseFloat(newMaterialIndex + 1))
                    // alert("Here I am === " + JSON.stringify(currentMaterial))
                    // if(size(insertedSteelTypesMetric) > 1) {
                    //     dispatch(setLatestMaterialMetricId(parseFloat(latestMaterialMetricId + 1), selectedSheet))
                    // } else {
                    //     dispatch(setLatestMaterialMetricId())
                    // }
                    dispatch(setLatestMaterialMetricId(parseFloat(materialIdChecker() + 1), selectedSheet))
                    dispatch(setMetricMaterialSteelType(currentMaterial, selectedSheet))
                    dispatch(setCurrentMaterialsArray(parseFloat(materialIdChecker() + 1), selectedSheet))
                    dispatch(setEnglishMaterialSteelType(currentMaterialEnglish, selectedSheet))
                    setEditMode(false)
                    setOpenNestedModal(false)
                } else if(size(insertedSteelTypesMetric) > 1) {
                    // alert("oh yeah man sss == " + editMode)
                    // alert("the edit index -- " + JSON.stringify(theEditIndex));
                    const newMaterialIndex = editMode ? parseFloat(theEditIndex) - 1 : size(insertedSteelTypesMetric)
                    const currentMaterialEnglish = {...insertedSteelTypesEnglish}
                    const currentMaterial = {...insertedSteelTypesMetric}
                    currentMaterial[newMaterialIndex] = {
                        id: parseFloat(newMaterialIndex + 1),
                        name: selectedName,
                        EMPA: hashMetric[selectedName].steel_type_metric_e,
                        FYMPA: hashMetric[selectedName].steel_type_metric_fy,
                        FUMPA: hashMetric[selectedName].steel_type_metric_fu,
                        custom: false
                    }
                    currentMaterialEnglish[newMaterialIndex] = {
                        id: parseFloat(newMaterialIndex + 1),
                        name: selectedName,
                        EMPA: hashEnglish[selectedName].steel_type_english_e,
                        FYMPA: hashEnglish[selectedName].steel_type_english_fy,
                        FUMPA: hashEnglish[selectedName].steel_type_english_fu,
                        custom: false
                    }
                    dispatch(setLatestMaterialMetricId(parseFloat(latestMaterialMetricId + 1), selectedSheet))
                    dispatch(setMetricMaterialSteelType(currentMaterial, selectedSheet))
                    dispatch(setCurrentMaterialsArray(parseFloat(latestMaterialMetricId + 1), selectedSheet))
                    dispatch(setEnglishMaterialSteelType(currentMaterialEnglish, selectedSheet))
                    setEditMode(false)
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
                                        <Tooltip title={<p>Click to select steel type name.</p>}>
                                            <Autocomplete
                                                // disablePortal
                                                disabled={disabledPreselectButton}
                                                id="combo-box-demo"
                                                options={systemCheck()}
                                                value={selectedName}
                                                // value={selectedSteelType}
                                                onChange={(event) => selectedNameHandler(event)}
                                                onKeyPress={(event) => {
                                                    if (event.key === 'Enter') {
                                                        console.log("key up");
                                                        selectedNameHandler(event)
                                                    }
                                                }}
                                                sx={{width: 300}}
                                                renderInput={(params) => <TextField {...params}
                                                                                    label="Preset Steel Types"/>}
                                            />
                                        </Tooltip>
                                    </FormControl>
                                </div>
                            </div>
                            <div style={{width: '30%',}}>
                                {/*<Button*/}
                                {/*    style={{*/}
                                {/*        width: '100%'*/}
                                {/*    }}*/}
                                {/*    variant='contained'*/}
                                {/*    onClick={() => {*/}
                                {/*        toggleDisable()*/}
                                {/*        // setEditMode(curVal => !curVal)*/}
                                {/*        // setNestedModalDisabled(currVal => !currVal)*/}
                                {/*        // dispatch(setMaterialModalCustom(curVal => !curVal, selectedSheet))*/}
                                {/*        setDisabledPreselectButton(currVal => !currVal)*/}
                                {/*    }}*/}
                                {/*    color={customButtonColor}>*/}
                                {/*    {customButtonText}*/}
                                {/*</Button>*/}
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
                                <Tooltip title={<p>Click to add Material Property row</p>}>
                                    <Button
                                        style={{
                                            width: '20%',
                                            // margin: '1em'
                                        }}
                                        variant='contained'
                                        color='primary'
                                        onClick={() => {
                                            errorCheckRender()
                                            if ((customSteelType === '' || nameMatch === true) && nestedModalDisabled === false) {
                                                // alert("Hola == " + selectedNameNoError)
                                                setErrorDisplay(true)
                                                return;
                                            } else {
                                                if (selectedNameNoError === true || empaNoError === true || fympaNoError === true || fumpaNoError === true) {
                                                    return
                                                    // alert("I made it here")
                                                } else {
                                                    // alert("hoo haa")
                                                    insertMaterialProperty()
                                                }
                                            }
                                            // insertMaterialProperty()
                                        }}
                                    >
                                        ACCEPT
                                    </Button>
                                </Tooltip>
                                <Tooltip title={<p>Click to remove Material Property Row</p>}>
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
                                </Tooltip>
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

    const editMaterialProperty = (theNewIndex) => {
        if(system === 'Metric') {
            for(let index in insertedSteelTypesMetric) {
                // alert("the index == " + JSON.stringify(insertedSteelTypesMetric[index].id) + " " + "the newIndex === " + JSON.stringify(theNewIndex));
                // alert("the model.id == " + JSON.stringify(theNewIndex))
                if(insertedSteelTypesMetric[index].id === theNewIndex) {
                    setEditMode(true)
                    setOpenNestedModal(true)
                    break
                }
            }
        } else if(system === 'English') {
            for(let index in insertedSteelTypesEnglish) {
                if(insertedSteelTypesEnglish[index].id === theNewIndex) {
                    // alert("the index == " + JSON.stringify(insertedSteelTypesEnglish[index].id));
                    setEditMode(true)
                    setOpenNestedModal(true)
                    break
                }
            }
        }

    }

    const deleteAllMetricMaterialProperties = () => {
        // alert(selectedSheet)
        const proceed = window.confirm("Are you sure you want to remove all Material Property rows?")
        if (proceed) {
            dispatch(setLatestMaterialMetricId(1, selectedSheet))
            dispatch(clearMetricMaterialProperties(selectedSheet))
        } else {
            return
        }
    }

    // const [rowsInt, setRowsInt] = useState(0)

    const deleteMetricMaterialPropertyRow = (materialPropertiesIndex) => {
        const proceed = window.confirm("Are you sure you want to delete this material property row?")
        if (proceed) {
            for(let index in insertedSteelTypesMetric) {
                if(insertedSteelTypesMetric[index].id === materialPropertiesIndex) {
                    // setRowsInt(rowsInt + 1)
                    let newNumber = 0

                    const objectMapper = (object) => {
                        let newObj = mapKeys(object, (value, key) => newNumber++)
                        return newObj
                    }
                    let copyCurrent = [...currentMaterialsArray]
                    alert("parseFloat(newSectionIndex) - 1 == " + JSON.stringify(insertedSteelTypesMetric[index].id));
                    const toBeRemoved = copyCurrent.indexOf(insertedSteelTypesMetric[index].id)
                    copyCurrent.splice(toBeRemoved, 1)
                    dispatch(removeSelectedMaterialArrayIndex(copyCurrent, selectedSheet))
                    dispatch(removeMetricMaterialPropertyRow(index, selectedSheet))
                    dispatch(resetMetricMaterialIndex(objectMapper(insertedSteelTypesMetric), selectedSheet))
                }
            }
        } else {
            return
        }
    }

    const columns = [
        {
            field: 'id',
            headerClassName: 'super-app-theme--header',
            headerName: 'ID',
            headerAlign: 'center',
            sortable: true,
            // flex: 1,
            width: 50
        },
        {
            field: 'name',
            headerClassName: 'super-app-theme--header',
            headerName: 'Name',
            headerAlign: 'center',
            sortable: true,
            flex: 1,
            // width: 150
        },
        {
            field: 'empa',
            headerClassName: 'super-app-theme--header',
            headerName: system === 'Metric' ? 'E(MPa)' : 'E(ksi)',
            description: 'Modulus of Elasticity',
            headerAlign: 'center',
            sortable: true,
            flex: 1,
            // width: 150
        },
        {
            field: 'fympa',
            headerClassName: 'super-app-theme--header',
            headerName: system === 'Metric' ? 'Fy(MPa)' : 'Fy(ksi)',
            description: 'Specified minimum yield stress',
            headerAlign: 'center',
            sortable: true,
            flex: 1,
            // width: 150
        },
        {
            field: 'fumpa',
            headerClassName: 'super-app-theme--header',
            headerName: system === 'Metric' ? 'Fu(MPa)' : 'Fu(ksi)',
            description: 'Specified minimum tensile strength coefficient of bending about x',
            headerAlign: 'center',
            sortable: true,
            flex: 1,
            // width: 150
        },
        {
            field: 'edit',
            headerClassName: 'super-app-theme--header',
            headerName: 'Edit',
            headerAlign: 'center',
            sortable: false,
            // flex: 1,
            width: 60,
            renderCell: () => {
                return (
                    <div style={{margin: '1px', width: '20%'}}>
                        <div style={{display: 'column'}}>
                            <p style={{
                                margin: '7px 0px 2px'
                            }}>
                                <Tooltip title={<p>Click to edit Material Property row</p>}>
                                    <BorderColorIcon
                                        style={{marginRight: '5px'}}
                                        index={{color: 'primary'}}
                                        color='primary'
                                        // onClick={() => openSectionEditModal(sectionIndex)}
                                    />
                                </Tooltip>
                            </p>
                        </div>
                    </div>
                );
            }
        },
        {
            field: 'delete',
            headerClassName: 'super-app-theme--header',
            headerName: 'Delete',
            headerAlign: 'center',
            sortable: false,
            // flex: 1,
            width: 70,
            renderCell: () => {
                return (
                    <div style={{margin: '1px', width: '20%'}}>
                        <div style={{display: 'column'}}>
                            <p style={{
                                margin: '7px 0px 2px'
                            }}>
                                <Tooltip title={<p>Click to remove Material Property row</p>}>
                                    <CancelIcon
                                        color='secondary'
                                        // onClick={() => removeSection(selectedSheet, sectionIndex, sectionId)}
                                    />
                                </Tooltip>
                            </p>
                        </div>
                    </div>
                );
            }
        },
    ];

    const height = 200

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
                            <Tooltip title={<p>Click to add Material Property Row</p>}>
                                <Button
                                    disabled={disableButton}
                                    style={{
                                        margin: '10px'
                                    }}
                                    onClick={() => handleOpenNestedModal()}
                                    variant='contained' color='primary'>
                                    Add Material Property
                                </Button>
                            </Tooltip>
                            <Tooltip title={<p>Click to remove all Material Property Rows.</p>}>
                                <Button
                                    disabled={disableButton}
                                    variant='contained'
                                    color='secondary'
                                    onClick={() => deleteAllMetricMaterialProperties()}
                                >
                                    Remove All
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                    <Card style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        padding: '5px',
                        backgroundColor: '#fff',
                        // width: '100%',
                        textAlign: 'center'
                    }}>
                        <p style={{margin: '0px'}}><strong>MATERIAL PROPERTIES</strong></p>
                    </Card>
                    <div style={{
                        height: newMaterials.length === 1 ? 200 : (height + (newMaterials.length * 40)),
                        flexGrow: 1,
                        overFlow: 'hidden',
                        margin: '1em 0'
                    }}>
                        <DataGrid
                            sx={{
                                width: '100%%',
                                margin: '0 auto',
                                boxShadow: 2,
                                border: 2,
                                // overFlow: 'hidden',
                                color: '#000',
                                justifyContent: 'center',
                                borderColor: 'primary.dark',
                                '& .MuiDataGrid-cell:hover': {
                                    color: 'primary.main',
                                },
                                '& .super-app-theme--header': {
                                    backgroundColor: '#184a8c',
                                    color: '#fff',
                                    justifyContent: 'center',
                                },
                                '& .MuiDataGrid-cell': {
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                },
                                '& .css-1pans1z-MuiDataGrid-virtualScroller': {
                                    overflow: 'overlay'
                                },
                                '& .MuiDataGrid-sortIcon': {
                                    opacity: 100,
                                    fontWeight: 'bold',
                                    fill: "#fff" // or whatever you need
                                },
                                '& .MuiSvgIcon-fontSizeSmall': {
                                    fill: "#fff" // or whatever you need
                                },
                                '& .MuiDataGrid-row:nth-child(even)': {
                                    backgroundColor: '#e1e1e1'
                                },
                                '& .MuiDataGrid-row:nth-child(odd)': {
                                    backgroundColor: '#fff'
                                },
                                '& .MuiDataGrid-virtualScroller': {
                                    backgroundColor: '#fff'
                                },
                            }}
                            components={{
                                NoRowsOverlay: () => (
                                    <Stack height="100%" alignItems="center" justifyContent="center">
                                        Add a row.
                                    </Stack>
                                ),
                            }}
                            // sortModel={false}
                            disableColumnSelector
                            componentsProps={{
                                columnMenu: {background: 'red'},
                            }}
                            onCellClick={(model) => {
                                if(system === 'Metric') {
                                    for(let index in insertedSteelTypesMetric) {
                                        if(insertedSteelTypesMetric[index].id === model.id) {
                                            let modelIndex = model.id
                                            setCurrentMaterialIndex(model.id)
                                            if (model.field === 'delete') {
                                                deleteMetricMaterialPropertyRow(modelIndex)
                                            } else if (model.field === 'edit') {
                                                // setTheModelIndex(model.id)
                                                let modelIndex = model.id
                                                getTheEditIndex(modelIndex)
                                                // editMaterialProperty(model.id)
                                                break
                                            }
                                        }
                                    }
                                } else if(system === 'English') {
                                    for(let index in insertedSteelTypesEnglish) {
                                        if(insertedSteelTypesEnglish[index].id === model.id) {
                                            let modelIndex = model.id
                                            setCurrentMaterialIndex(model.id)
                                            if (model.field === 'delete') {
                                                deleteMetricMaterialPropertyRow(modelIndex)
                                            } else if (model.field === 'edit') {
                                                // setTheModelIndex(model.id)
                                                let modelIndex = model.id
                                                getTheEditIndex(modelIndex)
                                                // alert("the model.id " + JSON.stringify(model.id));
                                                // editMaterialProperty(model.id)
                                                break
                                            }
                                        }
                                    }
                                }
                            }}
                            rows={displayApiData()}
                            // rows={rows}
                            disableExtendRowFullWidth={true}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    </div>
                    {/*<div style={{*/}
                    {/*    display: 'flex',*/}
                    {/*    height: '100%',*/}
                    {/*    width: '100%'*/}
                    {/*}}>*/}
                    {/*    <div style={{*/}
                    {/*        paddingRight: '0px',*/}
                    {/*        width: '20%',*/}
                    {/*        textAlign: 'center'*/}
                    {/*    }}>*/}
                    {/*        <p>*/}
                    {/*            <strong>ID</strong>*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*    <div style={{*/}
                    {/*        paddingRight: '0px',*/}
                    {/*        width: '20%',*/}
                    {/*        textAlign: 'center'*/}
                    {/*    }}>*/}
                    {/*        <p>*/}
                    {/*            <strong>Steel Type</strong>*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*    <div style={{*/}
                    {/*        paddingRight: '0px',*/}
                    {/*        width: '20%',*/}
                    {/*        textAlign: 'center'*/}
                    {/*    }}>*/}
                    {/*        <p>*/}
                    {/*            <strong>E({unitHandler()})</strong>*/}
                    {/*        </p>*/}
                    {/*    </div>*/}

                    {/*    <div style={{*/}
                    {/*        paddingRight: '0px',*/}
                    {/*        width: '20%',*/}
                    {/*        textAlign: 'center'*/}
                    {/*    }}>*/}
                    {/*        <p>*/}
                    {/*            <strong>F<sub>y</sub>({unitHandler()})</strong>*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*    <div style={{*/}
                    {/*        paddingRight: '0px',*/}
                    {/*        width: '20%',*/}
                    {/*        textAlign: 'center'*/}
                    {/*    }}>*/}
                    {/*        <p>*/}
                    {/*            <strong>F<sub>u</sub>({unitHandler()})</strong>*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*    <div style={{*/}
                    {/*        paddingRight: '0px',*/}
                    {/*        width: '20%',*/}
                    {/*        textAlign: 'center'*/}
                    {/*    }}>*/}
                    {/*        <p>*/}
                    {/*            <strong>Edit</strong>*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
            {/*<div style={{margin: '0 auto', width: '100%', marginBottom: '2%'}}>*/}
            {/*    {*/}
            {/*        renderRows()*/}
            {/*    }*/}
            {/*</div>*/}
            {
                displayModal()
            }
        </div>
    )
}
export default MaterialProperties
