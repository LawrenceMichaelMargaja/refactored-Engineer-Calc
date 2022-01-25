import React, {useEffect, useMemo, useRef, useState} from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {
    changeMaterialCustomStatus,
    editSelectedMetricMaterialProperty,
    removeMetricMaterialPropertyRow,
    resetMetricMaterialIndex, setCurrentMaterialsArray,
    setCurrentMetricMaterialPropertiesIndex, setCustomSelectedSteelType,
    setEnglishMaterialSteelType,
    setMetricMaterialSteelType
} from "../../../../../store/actions/sheets/sheetCalculationComponents/materialProperties/materialProperties";
import {Button, FormControl, Input, TextField} from "@material-ui/core";
import {mapKeys, size} from "lodash";
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
    const materialPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeEnglishProperties'])
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
    // const selectedSteelType = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'selectedSteelType'])
    const customSelectedSteelType = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'customSteelType'])
    const currentMaterialPropertyIndex = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'currentMetricMaterialPropertyIndex'])


    const [edit, setEdit] = useState(false)

    const hashMetric = useMemo(() => {
        let hash = {}
        for (let i in steelTypesMetric) {
            let {
                steel_type_metric_name,
            } = steelTypesMetric[i]
            hash[steel_type_metric_name] = steelTypesMetric[i]
        }
        return hash
    }, [insertedSteelTypesMetric])

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

    const hashEnglish = useMemo(() => {
        let hash = {}
        for (let i in steelTypesEnglish) {
            let {
                steel_type_english_name,
            } = steelTypesEnglish[i]
            hash[steel_type_english_name] = steelTypesEnglish[i]
        }
        return hash
    }, [insertedSteelTypesEnglish])

    const materialPropertiesRows = []

    const [rowsInt, setRowsInt] = useState(0)
    const [openNestedModal, setOpenNestedModal] = React.useState(false);

    const deleteMetricMaterialPropertyRow = (materialPropertiesIndex) => {
        const proceed = window.confirm("Are you sure you want to delete this material property row?")
        if (proceed) {
            setRowsInt(rowsInt + 1)
            let newNumber = 0

            const objectMapper = (object) => {
                let newObj = mapKeys(object, (value, key) => newNumber++)
                return newObj
            }
            dispatch(removeMetricMaterialPropertyRow(materialPropertiesIndex, selectedSheet))
            dispatch(resetMetricMaterialIndex(objectMapper(insertedSteelTypesMetric), selectedSheet))
        } else {
            return
        }
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

    const NestedModal = () => {

        const [nestedModalDisabled, setNestedModalDisabled] = useState(true)
        const [customButtonColor, setCustomButtonColor] = useState('primary')
        const [customButtonText, setCustomButtonText] = useState('CUSTOM')

        const [selectedNameNoError, setSelectedNameNoError] = useState(true)
        const [empaNoError, setEmpaNoError] = useState(true)
        const [fympaNoError, setFympaNoError] = useState(true)
        const [fumpaNoError, setFumpaNoError] = useState(true)
        const [selectedNameError, setSelectedNameError] = useState(null)
        const [empaError, setEmpaError] = useState(null)
        const [fympaError, setFympaError] = useState(null)
        const [fumpaError, setFumpaError] = useState(null)
        const [nameMatch, setNameMatch] = useState(false)

        const steelTypeHandler = () => {
            return (
                <div style={{width: '80%', margin: '0 auto'}}>
                    <p style={{textAlign: 'initial'}}><strong>Steel Type</strong></p>
                    <Input placeholder='Value will be displayed here...'
                           disabled={nestedModalDisabled}
                           style={{width: '100%', margin: '0 auto', color: 'black'}}
                           value={selectedCustomName}
                           onChange={(event) => customNameHandler(event)}
                    />
                    {selectedNameError}
                </div>
            )
        }

        const selectedNameChecker = () => {
            if (nestedModalDisabled === false) {
                for (let name in steelTypesMetric) {
                    if ((selectedCustomName).toUpperCase() === (steelTypesMetric[name].steel_type_metric_name).toUpperCase()) {
                        // alert("what do i know")
                        setSelectedNameError(
                            <p style={{margin: '0', padding: '0'}}>
                                <strong style={{color: 'red'}}>Custom name cannot match preset values.</strong>
                            </p>
                        )
                        // setErrorDisplay(true)
                        break
                    } else if (selectedCustomName === '') {
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

        const empaValueChecker = () => {
            if (nestedModalDisabled === false) {
                if (EMPAValue === '') {
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
            if (nestedModalDisabled === false) {
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
            if (nestedModalDisabled === false) {
                if (FUMPAValue === '') {
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

        // useEffect(() => {
        //     if (customButtonText === 'DISCARD') {
        //         setSelectedNameError(<></>)
        //         setEmpaError(<></>)
        //         setFympaError(<></>)
        //         setFumpaError(<></>)
        //     }
        // }, [nestedModalDisabled])

        useEffect(() => {
            if (nestedModalDisabled) {
                setCustomButtonColor('primary')
                setCustomButtonText('CUSTOM')
            } else {
                setCustomButtonColor('secondary')
                setCustomButtonText('DISCARD')
            }
        }, [nestedModalDisabled])

        // useEffect(() => {
        //     if(insertedSteelTypesMetric.length > 0) {
        //         setSelectedSteelType(insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name)
        //     }
        // }, [insertedSteelTypesMetric])
        //
        // useEffect(() => {
        //     if(insertedSteelTypesMetric.length !== 0) {
        //         setSelectedSteelType(insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name)
        //     }
        // }, [])

        const [disablePreselectDropDown, setDisablePreselectDropDown] = useState(false)
        const [selectedCustomName, setSelectedCustomName] = useState('')
        const [selectedName, setSelectedName] = useState('')
        const [EMPAValue, setEMPAValue] = useState('')
        const [FYMPAValue, setFYMPAValue] = useState('')
        const [FUMPAValue, setFUMPAValue] = useState('')

        useEffect(() => {
            if (EMPAValue !== '') {
                setEmpaError(null)
            }
            if (FYMPAValue !== '') {
                setFympaError(null)
            }
            if (FUMPAValue !== '') {
                setFumpaError(null)
            }
        }, [EMPAValue, FYMPAValue, FUMPAValue])

        useEffect(() => {
            for (let name in steelTypesMetric) {
                if ((selectedCustomName).toUpperCase() !== (steelTypesMetric[name].steel_type_metric_name).toUpperCase()) {
                    setSelectedNameError(null)
                    setNameMatch(false)
                    setErrorDisplay(false)
                    break
                }
            }
        }, [selectedCustomName])

        useEffect(() => {
            for (let name in steelTypesMetric) {
                if ((selectedCustomName).toUpperCase() === (steelTypesMetric[name].steel_type_metric_name).toUpperCase()) {
                    // alert("You can do it lawrence!")
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
        }, [selectedCustomName])

        const selectedNameHandler = (event) => {
            setSelectedName(event.target.textContent)
        }

        const customNameHandler = (event) => {
            setSelectedCustomName(event.target.value)
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

        // const autoCompleteOnChangeHandler = (event) => {
        //     setSelectedSteelType(event.target.textContent)
        // }

        useEffect(() => {
            setSelectedName(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].name)
            setEMPAValue(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].EMPA)
            setFYMPAValue(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].FYMPA)
            setFUMPAValue(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].FUMPA)
        }, [])

        // useEffect(() => {
        //     setEMPAValue(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].EMPA)
        //     setFYMPAValue(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].FYMPA)
        //     setFUMPAValue(hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].FUMPA)
        // }, [selectedName])

        useEffect(() => {
            EMPAValueSetter()
            FYMPAValueSetter()
            FUMPAValueSetter()
        }, [selectedName])

        const EMPAValueSetter = () => {
            if (steelTypesMetric.length < 1) {
                return 'something went wrong with database connection.'
            } else if (steelTypesMetric.length > 0) {
                if (system === 'Metric') {
                    /**
                     * This is for when the used material property is not a custom one.
                     */
                    if (hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].custom === false) {
                        if (!hashMetric[selectedName]) {
                            // setEMPAValue(null)
                        } else {
                            // return "EMPAValue"
                            setEMPAValue(hashMetric[selectedName].steel_type_metric_e)
                        }
                    } else {
                        /**
                         * This is for when the used material property is a custom one.
                         */
                        // setEMPAValue(EMPAValue)
                        for (let name in steelTypesMetric) {
                            if (selectedName === steelTypesMetric[name].steel_type_metric_name) {
                                // alert("hey hey")
                                if (!hashMetric[selectedName]) {
                                    setEMPAValue(null)
                                } else {
                                    setEMPAValue(hashMetric[selectedName].steel_type_metric_e)
                                    break
                                }
                            } else {
                                setEMPAValue(insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].EMPA)
                            }
                        }
                    }
                } else {
                    if (hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].custom === false) {
                        if (!hashEnglish[selectedName]) {
                            // setEMPAValue(null)
                        } else {
                            // alert("hoho")
                            setEMPAValue(hashEnglish[selectedName].steel_type_english_e)
                        }
                    } else {
                        for (let name in steelTypesEnglish) {
                            if (selectedName === steelTypesEnglish[name].steel_type_english_name) {
                                if (!hashEnglish[selectedName]) {
                                    setEMPAValue(null)
                                } else {
                                    setEMPAValue(hashEnglish[selectedName].steel_type_english_e)
                                    break
                                }
                            } else {
                                setEMPAValue(insertedSteelTypesEnglish[currentMetricMaterialPropertyIndex].EMPA)
                            }
                        }
                    }
                }
            }
        }

        const FYMPAValueSetter = () => {
            if (steelTypesMetric.length < 1) {
                return 'something went wrong with database connection.'
            } else if (steelTypesMetric.length > 0) {
                if (system === 'Metric') {
                    if (hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].custom === false) {
                        if (!hashMetric[selectedName]) {
                            // setFYMPAValue(null)
                        } else {
                            // alert("hoho")
                            setFYMPAValue(hashMetric[selectedName].steel_type_metric_fy)
                        }
                    } else {
                        for (let name in steelTypesMetric) {
                            if (selectedName === steelTypesMetric[name].steel_type_metric_name) {
                                // alert("hey hey")
                                if (!hashMetric[selectedName]) {
                                    // setFYMPAValue(null)
                                } else {
                                    setFYMPAValue(hashMetric[selectedName].steel_type_metric_fy)
                                    break
                                }
                            } else {
                                setFYMPAValue(insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].FYMPA)
                            }
                        }
                    }
                } else {
                    if (hashCustom[insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].name].custom === false) {
                        if (!hashEnglish[selectedName]) {
                            // setFYMPAValue(null)
                        } else {
                            // alert("hoho")
                            setFYMPAValue(hashEnglish[selectedName].steel_type_english_fy)
                        }
                    } else {
                        for (let name in steelTypesEnglish) {
                            if (selectedName === steelTypesEnglish[name].steel_type_english_name) {
                                if (!hashEnglish[selectedName]) {
                                    setEMPAValue(null)
                                } else {
                                    setEMPAValue(hashMetric[selectedName].steel_type_english_fy)
                                    break
                                }
                            } else {
                                setFYMPAValue(insertedSteelTypesEnglish[currentMetricMaterialPropertyIndex].FYMPA)
                            }
                        }
                    }
                }
            }
        }

        const FUMPAValueSetter = () => {
            if (steelTypesMetric.length < 1) {
                return 'something went wrong with database connection.'
            } else if (steelTypesMetric.length > 0) {
                if (system === 'Metric') {
                    if (hashCustom[insertedSteelTypesMetric[currentMaterialPropertyIndex].name].custom === false) {
                        if (!hashMetric[selectedName]) {
                            // setFUMPAValue(null)
                        } else {
                            // alert("hoho")
                            setFUMPAValue(hashMetric[selectedName].steel_type_metric_fu)
                        }
                    } else {
                        for (let name in steelTypesMetric) {
                            if (selectedName === steelTypesMetric[name].steel_type_metric_name) {
                                // alert("hey hey")
                                if (!hashMetric[selectedName]) {
                                    // setFUMPAValue(null)
                                } else {
                                    setFUMPAValue(hashMetric[selectedName].steel_type_metric_fu)
                                    break
                                }
                            } else {
                                setFUMPAValue(insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].FUMPA)
                            }
                        }
                    }
                } else {
                    if (hashCustom[insertedSteelTypesMetric[currentMaterialPropertyIndex].name].custom === false) {
                        if (!hashEnglish[selectedName]) {
                            // setFUMPAValue(null)
                        } else {
                            // alert("hoho")
                            setFUMPAValue(hashEnglish[selectedName].steel_type_english_fu)
                        }
                    } else {
                        for (let name in steelTypesEnglish) {
                            if (selectedName === steelTypesEnglish[name].steel_type_english_name) {
                                if (!hashEnglish[selectedName]) {
                                    // setFUMPAValue(null)
                                } else {
                                    setFUMPAValue(hashEnglish[selectedName].steel_type_english_fu)
                                    break
                                }
                            } else {
                                setFUMPAValue(insertedSteelTypesEnglish[currentMetricMaterialPropertyIndex].FUMPA)
                            }
                        }
                    }
                }
            }
        }

        // useEffect(() => {
        //     EMPAValueSetter()
        //     FYMPAValueSetter()
        //     FUMPAValueSetter()
        // }, [selectedName])

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

        function usePrevious(value) {
            const ref = useRef();
            useEffect(() => {
                ref.current = value;
            });
            return ref.current;
        }

        let thePrevEMPa = usePrevious(insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].EMPA)
        let thePrevFyMPa = usePrevious(insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].FYMPA)
        let thePrevFuMPa = usePrevious(insertedSteelTypesMetric[currentMetricMaterialPropertyIndex].FUMPA)

        const [stop, setStop] = useState(false)
        const selectedCustomNameMetricHandler = () => {
            // alert("thePrevEMPa == " + thePrevEMPa + ' ' + "EMPAValue === " + EMPAValue)
            if (stop === false) {
                if (thePrevEMPa !== EMPAValue || thePrevFyMPa !== FYMPAValue || thePrevFuMPa !== FUMPAValue) {
                    setSelectedCustomName('Custom Steel Type')
                    // break
                } else {
                    setSelectedCustomName('Custom Steel Type')
                    setSelectedNameNoError(true)
                    setStop(true)
                    // break
                }
            }
        }

        const toggleDisable = () => {
            if (nestedModalDisabled) {
                setSelectedCustomName(selectedName)
                // dispatch(changeMaterialCustomStatus(true, selectedSheet, currentMetricMaterialPropertyIndex))
                setNestedModalDisabled(curVal => !curVal)
            } else if (!nestedModalDisabled) {
                const proceed = window.confirm("Are you sure you want to discard your changes?")
                if (proceed) {
                    setNestedModalDisabled(curVal => !curVal)
                    setSelectedName('')
                    setSelectedCustomName('')
                    setEMPAValue('')
                    setFYMPAValue('')
                    setFUMPAValue('')
                } else {
                    return
                }
            }
        }

        const errorCheckRender = () => {
            selectedNameChecker()
            empaValueChecker()
            fympaValueChecker()
            fumpaValueChecker()
        }

        // useEffect(() => {
        //     if(EMPAValue !== '') {
        //         setEmpaError(<></>)
        //     }
        //     if(FYMPAValue !== '') {
        //         setFympaError(<></>)
        //     }
        //     if(FUMPAValue !== '') {
        //         setFumpaError(<></>)
        //     }
        // }, [EMPAValue, FYMPAValue, FUMPAValue])


        // const editMaterialProperty = () => {
        //     if (nestedModalDisabled === false) {
        //         if (size(insertedSteelTypesMetric) === 0) {
        //             const initialMaterial = {}
        //             initialMaterial[0] = {
        //                 name: selectedCustomName,
        //                 EMPA: EMPAValue,
        //                 FYMPA: FYMPAValue,
        //                 FUMPA: FUMPAValue,
        //                 custom: true
        //             }
        //             dispatch(editSelectedMetricMaterialProperty(initialMaterial, selectedSheet, currentMetricMaterialPropertyIndex))
        //             setOpenNestedModal(false)
        //         } else if (size(insertedSteelTypesMetric) > 0) {
        //             dispatch(editSelectedMetricMaterialProperty(selectedCustomName, EMPAValue, FYMPAValue, FUMPAValue, true, selectedSheet, currentMetricMaterialPropertyIndex))
        //             // const currentCustomSteelTypes = {...insertedSteelTypesEnglish}
        //             // const currentCustomSteelTypesSize = size(insertedSteelTypesMetric)
        //             // currentCustomSteelTypes[currentCustomSteelTypesSize] = {
        //             //     name: selectedCustomName,
        //             //     EMPA: EMPAValue,
        //             //     FYMPA: FYMPAValue,
        //             //     FUMPA: FUMPAValue,
        //             //     custom: true
        //             // }
        //             // dispatch(setMetricMaterialSteelType(currentCustomSteelTypes, selectedSheet))
        //             // dispatch(setEnglishMaterialSteelType(currentCustomSteelTypes, selectedSheet))
        //             // dispatch(setCustomSelectedSteelType(selectedCustomName, selectedSheet))
        //             // dispatch(setCurrentMaterialsArray(currentCustomSteelTypesSize, selectedSheet))
        //             // dispatch(setCurrentMetricMaterialPropertiesIndex(parseFloat(currentCustomSteelTypesSize) + 1, selectedSheet))
        //             setOpenNestedModal(false)
        //         }
        //     } else {
        //         alert("over here")
        //         if (size(insertedSteelTypesMetric) === 0) {
        //             const initialMaterialEnglish = {}
        //             const initialMaterial = {}
        //             initialMaterial[0] = {
        //                 id: 1,
        //                 name: selectedName,
        //                 EMPA: hashMetric[selectedName].steel_type_metric_e,
        //                 FYMPA: hashMetric[selectedName].steel_type_metric_fy,
        //                 FUMPA: hashMetric[selectedName].steel_type_metric_fu,
        //                 custom: false
        //             }
        //             initialMaterialEnglish[0] = {
        //                 id: 1,
        //                 name: selectedName,
        //                 EMPA: hashEnglish[selectedName].steel_type_english_e,
        //                 FYMPA: hashEnglish[selectedName].steel_type_english_fy,
        //                 FUMPA: hashEnglish[selectedName].steel_type_english_fu,
        //                 custom: false
        //             }
        //             const id = 1
        //             dispatch(setMetricMaterialSteelType(initialMaterial, selectedSheet))
        //             dispatch(setCurrentMaterialsArray(1, selectedSheet))
        //             dispatch(setEnglishMaterialSteelType(initialMaterialEnglish, selectedSheet))
        //             dispatch(setCurrentMaterialsArray(id, selectedSheet))
        //             setOpenNestedModal(false)
        //         } else {
        //             alert("actually here")
        //             const newMaterialIndex = size(insertedSteelTypesMetric)
        //             const currentMaterialEnglish = {...insertedSteelTypesEnglish}
        //             const currentMaterial = {...insertedSteelTypesMetric}
        //             currentMaterial[newMaterialIndex] = {
        //                 id: parseFloat(newMaterialIndex + 1),
        //                 name: selectedName,
        //                 EMPA: hashMetric[selectedName].steel_type_metric_e,
        //                 FYMPA: hashMetric[selectedName].steel_type_metric_fy,
        //                 FUMPA: hashMetric[selectedName].steel_type_metric_fu,
        //                 custom: false
        //             }
        //             currentMaterialEnglish[newMaterialIndex] = {
        //                 id: parseFloat(newMaterialIndex + 1),
        //                 name: selectedName,
        //                 EMPA: hashEnglish[selectedName].steel_type_english_e,
        //                 FYMPA: hashEnglish[selectedName].steel_type_english_fy,
        //                 FUMPA: hashEnglish[selectedName].steel_type_english_fu,
        //                 custom: false
        //             }
        //             // alert("newMaterialIndex == " + parseFloat(newMaterialIndex + 1))
        //             // alert("Here I am === " + JSON.stringify(currentMaterial))
        //             dispatch(setMetricMaterialSteelType(currentMaterial, selectedSheet))
        //             dispatch(setCurrentMaterialsArray(parseFloat(newMaterialIndex) + 1, selectedSheet))
        //             dispatch(setEnglishMaterialSteelType(currentMaterialEnglish, selectedSheet))
        //             setOpenNestedModal(false)
        //         }
        //     }
        // }

        const editMaterialProperty = () => {
            /**
             * This means that the property to be edited is not a custom one
             */
            if (hashCustom[insertedSteelTypesMetric[currentMaterialPropertyIndex].name].custom === false) {
                if (selectedName === '') {
                    // setErrorDisplay(currVal => !currVal)
                    return
                } else {
                    if (system === 'Metric') {
                        if (size(insertedSteelTypesMetric) === 0) {
                            const initialMaterial = {}
                            initialMaterial[0] = {
                                name: selectedName,
                                EMPA: hashMetric[selectedName].steel_type_metric_e,
                                FYMPA: hashMetric[selectedName].steel_type_metric_fy,
                                FUMPA: hashMetric[selectedName].steel_type_metric_fu,
                                custom: false
                            }
                            // console.log("sheet index == " + selectedSheet)
                            dispatch(editSelectedMetricMaterialProperty(initialMaterial, selectedSheet, currentMetricMaterialPropertyIndex))
                            setOpenNestedModal(false)
                        } else {
                            const proceed = window.confirm("Are you sure you want to keep these changes?")
                            if (proceed) {
                                // alert("here I am 2")
                                dispatch(editSelectedMetricMaterialProperty(
                                    selectedName,
                                    hashMetric[selectedName].steel_type_metric_e,
                                    hashMetric[selectedName].steel_type_metric_fy,
                                    hashMetric[selectedName].steel_type_metric_fu,
                                    false,
                                    selectedSheet,
                                    currentMetricMaterialPropertyIndex
                                ))
                                setOpenNestedModal(false)
                            } else {
                                return;
                            }
                        }
                    } else if (system === 'English') {
                        if (size(insertedSteelTypesMetric) === 0) {
                            const initialMaterial = {}
                            initialMaterial[0] = {
                                name: selectedName,
                                EMPA: hashEnglish[selectedName].steel_type_english_e,
                                FYMPA: hashEnglish[selectedName].steel_type_english_fy,
                                FUMPA: hashEnglish[selectedName].steel_type_english_fu,
                                custom: false
                            }
                            dispatch(editSelectedMetricMaterialProperty(initialMaterial, selectedSheet, currentMetricMaterialPropertyIndex))
                            setOpenNestedModal(false)
                        } else {
                            // alert("I made it here")
                            const newMaterialIndex = size(insertedSteelTypesEnglish)
                            const currentMaterial = {...insertedSteelTypesEnglish}
                            currentMaterial[newMaterialIndex] = {
                                name: selectedName,
                                EMPA: hashEnglish[selectedName].steel_type_english_e,
                                FYMPA: hashEnglish[selectedName].steel_type_english_fy,
                                FUMPA: hashEnglish[selectedName].steel_type_english_fu,
                                custom: false
                            }
                            dispatch(editSelectedMetricMaterialProperty(currentMaterial, selectedSheet, currentMetricMaterialPropertyIndex))
                            setOpenNestedModal(false)
                        }
                    }
                }
            } else {
                /**
                 * The properties edited here are customs
                 */
                if (selectedName === '') {
                    // setErrorDisplay(currVal => !currVal)
                    return;
                } else {
                    if (nestedModalDisabled) {
                        if (system === 'Metric') {
                            if (size(insertedSteelTypesMetric) === 0) {
                                const initialMaterial = {}
                                initialMaterial[0] = {
                                    name: selectedName,
                                    EMPA: EMPAValue,
                                    FYMPA: FYMPAValue,
                                    FUMPA: FUMPAValue,
                                    custom: true
                                }
                                dispatch(editSelectedMetricMaterialProperty(initialMaterial, selectedSheet, currentMetricMaterialPropertyIndex))
                                setOpenNestedModal(false)
                            } else {
                                const proceed = window.confirm("Are you sure you want to keep these changes?")
                                if (proceed) {
                                    // alert("mama mia")
                                    dispatch(editSelectedMetricMaterialProperty(
                                        selectedName,
                                        EMPAValue,
                                        FYMPAValue,
                                        FUMPAValue,
                                        // selectedSteelType,
                                        // hashMetric[selectedSteelType].steel_type_metric_e,
                                        // hashMetric[selectedSteelType].steel_type_metric_fy,
                                        // hashMetric[selectedSteelType].steel_type_metric_fu,
                                        true,
                                        selectedSheet,
                                        currentMetricMaterialPropertyIndex
                                    ))
                                    setOpenNestedModal(false)
                                } else {
                                    return;
                                }
                            }
                        } else if (system === 'English') {
                            if (size(insertedSteelTypesMetric) === 0) {
                                const initialMaterial = {}
                                initialMaterial[0] = {
                                    name: selectedName,
                                    EMPA: EMPAValue,
                                    FYMPA: FYMPAValue,
                                    FUMPA: FUMPAValue,
                                    // name: selectedSteelType,
                                    // EMPA: hashEnglish[selectedSteelType].steel_type_english_e,
                                    // FYMPA: hashEnglish[selectedSteelType].steel_type_english_fy,
                                    // FUMPA: hashEnglish[selectedSteelType].steel_type_english_fu,
                                    custom: true
                                }
                                dispatch(editSelectedMetricMaterialProperty(initialMaterial, selectedSheet, currentMetricMaterialPropertyIndex))
                                setOpenNestedModal(false)
                            } else {
                                const proceed = window.confirm("Are you sure you want to keep these changes?")
                                if (proceed) {
                                    dispatch(editSelectedMetricMaterialProperty(
                                        selectedName,
                                        EMPAValue,
                                        FYMPAValue,
                                        FUMPAValue,
                                        true,
                                        selectedSheet,
                                        currentMetricMaterialPropertyIndex
                                    ))
                                    setOpenNestedModal(false)
                                }
                            }
                        }
                    } else if (nestedModalDisabled === false) {
                        if (system === 'Metric') {
                            if (size(insertedSteelTypesMetric) === 0) {
                                const initialMaterial = {}
                                initialMaterial[0] = {
                                    name: selectedCustomName,
                                    EMPA: EMPAValue,
                                    FYMPA: FYMPAValue,
                                    FUMPA: FUMPAValue,
                                    custom: true
                                }
                                // console.log("sheet index == " + selectedSheet)
                                dispatch(editSelectedMetricMaterialProperty(initialMaterial, selectedSheet, currentMetricMaterialPropertyIndex))
                                setOpenNestedModal(false)
                            } else {
                                const proceed = window.confirm("Are you sure you want to keep these changes?")
                                if (proceed) {
                                    // alert("no here")
                                    dispatch(editSelectedMetricMaterialProperty(
                                        selectedCustomName,
                                        EMPAValue,
                                        FYMPAValue,
                                        FUMPAValue,
                                        // selectedSteelType,
                                        // hashMetric[selectedSteelType].steel_type_metric_e,
                                        // hashMetric[selectedSteelType].steel_type_metric_fy,
                                        // hashMetric[selectedSteelType].steel_type_metric_fu,
                                        true,
                                        selectedSheet,
                                        currentMetricMaterialPropertyIndex
                                    ))
                                    setOpenNestedModal(false)
                                } else {
                                    return;
                                }
                            }
                        } else if (system === 'English') {
                            if (size(insertedSteelTypesMetric) === 0) {
                                const initialMaterial = {}
                                initialMaterial[0] = {
                                    name: selectedCustomName,
                                    EMPA: EMPAValue,
                                    FYMPA: FYMPAValue,
                                    FUMPA: FUMPAValue,
                                    // name: selectedSteelType,
                                    // EMPA: hashEnglish[selectedSteelType].steel_type_english_e,
                                    // FYMPA: hashEnglish[selectedSteelType].steel_type_english_fy,
                                    // FUMPA: hashEnglish[selectedSteelType].steel_type_english_fu,
                                    custom: true
                                }
                                dispatch(editSelectedMetricMaterialProperty(initialMaterial, selectedSheet, currentMetricMaterialPropertyIndex))
                                setOpenNestedModal(false)
                            } else {
                                const proceed = window.confirm("Are you sure you want to keep these changes?")
                                if (proceed) {
                                    dispatch(editSelectedMetricMaterialProperty(
                                        selectedCustomName,
                                        EMPAValue,
                                        FYMPAValue,
                                        FUMPAValue,
                                        true,
                                        selectedSheet,
                                        currentMetricMaterialPropertyIndex
                                    ))
                                    setOpenNestedModal(false)
                                }
                            }
                        }
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
                        height: nestedModalDisabled ? 600 : 700,
                        backgroundColor: '#fff',
                        border: '2px solid #000',
                        boxShadow: 24,
                        pt: 2,
                        px: 4,
                        pb: 3,
                        textAlign: 'center'
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
                                            disabled={disablePreselectDropDown}
                                            disablePortal
                                            id="combo-box-demo"
                                            options={systemCheck()}
                                            value={selectedName}
                                            onChange={(event) => selectedNameHandler(event)}
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
                                        setDisablePreselectDropDown(currVal => !currVal)
                                        toggleDisable()
                                        // setNestedModalDisabled(currVal => !currVal)
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
                                       disabled={nestedModalDisabled}
                                       value={EMPAValue}
                                    // value={EMPAValueSetter()}
                                       onChange={(event) => {
                                           empaValueHandler(event)
                                           selectedCustomNameMetricHandler()
                                       }}
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
                                />
                                {empaError}
                            </div>
                            <div style={{width: '80%', margin: '0 auto'}}>
                                <p style={{textAlign: 'initial'}}><strong>FyMPa</strong></p>
                                <Input placeholder='Value will be displayed here...'
                                       disabled={nestedModalDisabled}
                                       value={FYMPAValue}
                                    // value={FYMPAValueSetter()}
                                       onChange={(event) => {
                                           fympaValueHandler(event)
                                           selectedCustomNameMetricHandler()
                                       }}
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
                                />
                                {fympaError}
                            </div>
                            <div style={{width: '80%', margin: '0 auto'}}>
                                <p style={{textAlign: 'initial'}}><strong>FuMPa</strong></p>
                                <Input placeholder='Value will be displayed here...'
                                       disabled={nestedModalDisabled}
                                       value={FUMPAValue}
                                    // value={FUMPAValueSetter()}
                                       onChange={(event) => {
                                           fumpaValueHandler(event)
                                           selectedCustomNameMetricHandler()
                                       }}
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
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
                                        if (nameMatch === true && nestedModalDisabled === false) {
                                            // alert("Hola")
                                            setErrorDisplay(true)
                                            return
                                        } else {
                                            if (selectedNameError !== null || empaError !== null || fympaError !== null || fumpaError !== null) {
                                                // alert("selectedNameError == " + JSON.stringify(selectedNameError))
                                                // alert("I made it here")
                                                return
                                            } else {
                                                // alert("somebody like me")
                                                editMaterialProperty()
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
        if (edit === true) {
            return (
                <NestedModal/>
            )
        } else if (edit === false) {
            return
        }
    }

    const EMPAValueSetter = (materialPropertyIndex) => {
        if (steelTypesMetric.length < 1) {
            return 'something went wrong with database connection.'
        } else if (steelTypesMetric.length > 0) {
            if (system === 'Metric') {
                /**
                 * This is for when the used material property is a not custom one.
                 */
                if (hashCustom[insertedSteelTypesMetric[materialPropertyIndex].name].custom === false) {
                    if (!hashMetric[insertedSteelTypesMetric[materialPropertyIndex].name]) {
                        return "null"
                    } else {
                        return hashMetric[insertedSteelTypesMetric[materialPropertyIndex].name].steel_type_metric_e
                    }
                } else {
                    for (let name in steelTypesMetric) {
                        if (customSelectedSteelType === steelTypesMetric[name].steel_type_metric_name) {
                            if (!hashMetric[[insertedSteelTypesMetric[materialPropertyIndex].name]]) {
                                return null
                            } else {
                                return hashMetric[insertedSteelTypesMetric[materialPropertyIndex].name].steel_type_metric_e
                            }
                        } else {
                            return insertedSteelTypesMetric[materialPropertyIndex].EMPA
                        }
                    }
                }
            } else {
                if (hashCustom[insertedSteelTypesMetric[materialPropertyIndex].name].custom === false) {
                    if (!hashEnglish[insertedSteelTypesEnglish[materialPropertyIndex].name]) {
                        return null
                    } else {
                        // alert("hoho")
                        return hashEnglish[insertedSteelTypesEnglish[materialPropertyIndex].name].steel_type_english_e
                    }
                } else {
                    for (let name in steelTypesEnglish) {
                        if (customSelectedSteelType === steelTypesEnglish[name].steel_type_english_name) {
                            // alert("hey hey")
                            return hashEnglish[[insertedSteelTypesEnglish[materialPropertyIndex].name]].steel_type_english_e
                        } else {
                            return insertedSteelTypesEnglish[materialPropertyIndex].EMPA
                        }
                    }
                }
            }
        }
    }

    const FYMPAValueSetter = (materialPropertyIndex) => {
        if (steelTypesMetric.length < 1) {
            return 'something went wrong with database connection.'
        } else if (steelTypesMetric.length > 0) {
            if (system === 'Metric') {
                if (hashCustom[insertedSteelTypesMetric[materialPropertyIndex].name].custom === false) {
                    if (!hashMetric[insertedSteelTypesMetric[materialPropertyIndex].name]) {
                        return null
                    } else {
                        // alert("hoho")
                        return hashMetric[insertedSteelTypesMetric[materialPropertyIndex].name].steel_type_metric_fy
                    }
                } else {
                    for (let name in steelTypesMetric) {
                        if (customSelectedSteelType === steelTypesMetric[name].steel_type_metric_name) {
                            // alert("hey hey")
                            if (!hashMetric[[insertedSteelTypesMetric[materialPropertyIndex].name]]) {
                                return null
                            } else {
                                return hashMetric[[insertedSteelTypesMetric[materialPropertyIndex].name]].steel_type_metric_fy
                            }
                        } else {
                            return insertedSteelTypesMetric[materialPropertyIndex].FYMPA
                        }
                    }
                }
            } else {
                if (hashCustom[insertedSteelTypesMetric[materialPropertyIndex].name].custom === false) {
                    if (!hashEnglish[insertedSteelTypesEnglish[materialPropertyIndex].name]) {
                        return null
                    } else {
                        // alert("hoho")
                        return hashEnglish[insertedSteelTypesEnglish[materialPropertyIndex].name].steel_type_english_fy
                    }
                } else {
                    for (let name in steelTypesEnglish) {
                        if (customSelectedSteelType === steelTypesEnglish[name].steel_type_english_name) {
                            // alert("hey hey")
                            return hashEnglish[[insertedSteelTypesEnglish[materialPropertyIndex].name]].steel_type_english_fy
                        } else {
                            return insertedSteelTypesEnglish[materialPropertyIndex].FYMPA
                        }
                    }
                }
            }
        }
    }

    const FUMPAValueSetter = (materialPropertyIndex) => {
        if (steelTypesMetric.length < 1) {
            return 'something went wrong with database connection.'
        } else if (steelTypesMetric.length > 0) {
            if (system === 'Metric') {
                if (hashCustom[insertedSteelTypesMetric[materialPropertyIndex].name].custom === false) {
                    if (!hashMetric[insertedSteelTypesMetric[materialPropertyIndex].name]) {
                        return null
                    } else {
                        // alert("hoho")
                        return hashMetric[insertedSteelTypesMetric[materialPropertyIndex].name].steel_type_metric_fu
                    }
                } else {
                    for (let name in steelTypesMetric) {
                        if (customSelectedSteelType === steelTypesMetric[name].steel_type_metric_name) {
                            // alert("hey hey")
                            if (!hashMetric[[insertedSteelTypesMetric[materialPropertyIndex].name]]) {
                                return null
                            } else {
                                return hashMetric[[insertedSteelTypesMetric[materialPropertyIndex].name]].steel_type_metric_fu
                            }
                        } else {
                            return insertedSteelTypesMetric[materialPropertyIndex].FUMPA
                        }
                    }
                }
            } else {
                if (hashCustom[insertedSteelTypesMetric[materialPropertyIndex].name].custom === false) {
                    if (!hashEnglish[insertedSteelTypesEnglish[materialPropertyIndex].name]) {
                        return null
                    } else {
                        // alert("hoho")
                        return hashEnglish[insertedSteelTypesEnglish[materialPropertyIndex].name].steel_type_english_fu
                    }
                } else {
                    for (let name in steelTypesEnglish) {
                        if (customSelectedSteelType === steelTypesEnglish[name].steel_type_english_name) {
                            // alert("hey hey")
                            return hashEnglish[[insertedSteelTypesEnglish[materialPropertyIndex].name]].steel_type_english_fu
                        } else {
                            return insertedSteelTypesEnglish[materialPropertyIndex].FUMPA
                        }
                    }
                }
            }
        }
    }

    const renderRows = () => {
        for (let materialPropertiesIndex in materialPropertiesMetric) {

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
                            textAlign: 'center',
                        }}>
                            {/*{materialPropertiesIndex}*/}
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
                            {/* {materialEMPa} */}
                            {EMPAValueSetter(materialPropertiesIndex)}
                            {/* {EMPAValueSetterValue()} */}
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
                            {/* {materialFyMPa} */}
                            {FYMPAValueSetter(materialPropertiesIndex)}
                            {/* {FYMPAValueSetterValue()} */}
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
                            {/* {materialFuMPa} */}
                            {FUMPAValueSetter(materialPropertiesIndex)}
                            {/* {FUMPAValueSetterValue()} */}
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
                                            setEdit(curVal => !curVal)
                                            dispatch(changeMaterialCustomStatus(true, selectedSheet, materialPropertiesIndex))
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
        return materialPropertiesRows
    }
    //
    // useEffect(() => {
    //     renderRows()
    // }, [])

    const callRender = () => {
        // return null
        // console.log("steelTypesMetric == ", steelTypesMetric)
        if (typeof steelTypesMetric === "undefined") {
            console.log("heyhey")
            return null
        }
        return (
            <div>
                {/*{materialPropertiesRows}*/}
                {renderRows()}
                {displayModal()}
            </div>
        )
    }

    return callRender()
}
export default MetricMaterialPropertiesRows
