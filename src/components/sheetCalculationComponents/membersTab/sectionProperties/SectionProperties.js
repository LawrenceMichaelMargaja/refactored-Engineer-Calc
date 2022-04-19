import {Button, Card, FormControl, Input, TextField} from "@material-ui/core";
import React, {useEffect, useMemo, useState} from "react";
import MaterialPropertiesRows from "../materialProperties/materialPropertiesRows/metricMaterialPropertiesRows";
import SectionPropertiesRows from "./sectionPropertiesRows/SectionPropertiesRows";
import {useDispatch, useSelector} from "react-redux";
import {
    addSectionPropertyEnglish,
    addSectionPropertyMetric, editSelectedSectionEnglish, editSelectedSectionMetric,
    removeAllSectionProperties,
    removeSelectedSectionPropertyEnglish,
    removeSelectedSectionPropertyMetric, resetSectionIndexEnglish,
    resetSectionIndexMetric, setCurrentEnglishSectionPropertyIndex, setCurrentMetricSectionPropertyIndex,
    setCurrentSectionPropertiesArray,
    setCurrentSectionPropertyIndex
} from "../../../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import {mapKeys, size} from "lodash";
import {
    setEnglishMaterialSteelType,
    setMetricMaterialSteelType
} from "../../../../store/actions/sheets/sheetCalculationComponents/materialProperties/materialProperties";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Autocomplete, Stack, Tooltip} from "@mui/material";
import {
    clearSectionPropertiesIndexArray,
    getCShapeEnglish,
    getSectionPropertiesEnglish,
    getSectionPropertiesMetric,
    getShapes,
    getSteelTypesEnglishAPI,
    getSteelTypesMetricAPI, removeCurrentSectionPropertyIndex, setCurrentShape, setDesignMethodShape,
    setSectionDimensionsArrayEnglish,
    setSectionDimensionsArrayMetric,
    setSectionDimensionsArrray
} from "../../../../store/actions/sheets/sheets";
import {objectChecker} from "../../../../utilities/utilities";
import {setSystemDropdown} from "../../../../store/actions/dashboardDropdowns/systemDropdown";
import SectionPropertiesRowsDesign from "./sectionPropertiesRows/SectionPropertiesRowsDesign";
import {DataGrid} from "@mui/x-data-grid";
import {
    setLateralTorsionalModificationFactor,
    setLLT, setLST,
    setMaterialId,
    setSectionId, setSlendernessRatioInCompression,
    setTotalLengthOfMember, setUnbracedLengthLateralTorsional,
    setYAxisEffectiveLengthFactor,
    setYAxisUnbracedLength,
    setZAxisEffectiveLengthFactor,
    setZAxisUnbracedLength
} from "../../../../store/actions/sheets/sheetCalculationComponents/memberFields/memberFields";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CancelIcon from "@material-ui/icons/Cancel";


const SectionProperties = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const shapes = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'shapes'])
    const insertedSectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])

    /**
     * API Data Bulk
     */
    const steelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesMetric'])
    const steelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesEnglish'])
    const sectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesMetric'])
    const sectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesEnglish'])

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

    const [disableButton, setDisableButton] = useState(false)
    const [theCurrentSectionIndex, setTheCurrentSectionIndex] = useState(0)
    const [editMode, setEditMode] = useState(false)
    const [theModelIndex, setTheModelIndex] = useState(1)
    const [theEditIndex, setTheEditIndex] = useState(1)

    const getTheEditIndex = (theModelId) => {
        if(system === 'Metric') {
            for(let index in insertedSectionPropertiesMetric) {
                if(insertedSectionPropertiesMetric[index].sectionId === theModelId) {
                    setEditMode(true)
                    setTheEditIndex(theModelId)
                    setOpenNestedModal(true)
                }
            }
        } else if(system === 'English') {
            // alert("oh yes == " + JSON.stringify(theModelId));
            for(let index in insertedSectionPropertiesEnglish) {
                if(insertedSectionPropertiesEnglish[index].sectionId === theModelId) {
                    setEditMode(true)
                    setTheEditIndex(theModelId)
                    // alert("theEditIndex == " + JSON.stringify(theEditIndex));
                    setOpenNestedModal(true)
                }
            }
        }
    }

    // useEffect(() => {
    //     alert("called me");
    //     getTheEditIndex()
    // }, [theModelIndex])

    useEffect(() => {
        if (method === 'Investigation') {
            setDisableButton(false)
        } else if (method === 'Design') {
            setDisableButton(true)
        }
    }, [method])

    const [openNestedModal, setOpenNestedModal] = useState(false);

    const hashMetric = useMemo(() => {
        let hash = {}
        for (let i in sectionPropertiesMetric) {
            let {
                section_properties_metric_name,
            } = sectionPropertiesMetric[i]
            hash[section_properties_metric_name] = steelTypesMetric[i]
        }
        return hash
    }, [sectionPropertiesMetric])

    const hashMetricId = useMemo(() => {
        let hash = {}
        // alert(JSON.stringify(steelTypesMetric))
        for (let i in sectionPropertiesMetric) {
            let {
                id,
            } = sectionPropertiesMetric[i]
            hash[id] = sectionPropertiesMetric[i]
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

    const hashEnglishId = useMemo(() => {
        let hash = {}
        for (let i in sectionPropertiesEnglish) {
            let {
                id,
            } = sectionPropertiesEnglish[i]
            hash[id] = sectionPropertiesEnglish[i]
        }
        return hash
    }, [sectionPropertiesEnglish])

    const deleteAllSectionProperties = () => {
        const proceed = window.confirm("Are you sure you want to delete all section properties?")
        if (proceed) {
            dispatch(clearSectionPropertiesIndexArray(null, selectedSheet))
            dispatch(removeAllSectionProperties(selectedSheet))
        } else {
            return
        }
    }

    const displayApiShapes = () => {
        const newOptions = shapes.map((data) => ({value: `${data.shape_name}`, label: `${data.shape_name}`}))
        return newOptions
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
            let layout = {value: `${data['two_l_shape_metric_name']}`, label: `${data['two_l_shape_metric_name']}`}
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
    /**
     * end of API Data per shape.
     */

    const handleOpenNestedModal = () => {
        setOpenNestedModal(true);
    };

    const NestedModal = () => {

        const [errorDisplay, setErrorDisplay] = useState(false)

        const [selectedSectionName, setSelectedSectionName] = useState('')
        const [selectedSectionShape, setSelectedSectionShape] = useState('')
        const [requiredShape, setRequiredShape] = useState(false)
        const [requiredName, setRequiredName] = useState(false)

        const systemCheck = () => {
            if (system === 'Metric') {
                if (selectedSectionShape === 'I') {
                    return displayIShapesMetric()
                } else if (selectedSectionShape === 'C') {
                    return displayCShapesMetric()
                } else if (selectedSectionShape === 'L') {
                    return displayLShapesMetric()
                } else if (selectedSectionShape === 'T') {
                    return displayTShapesMetric()
                } else if (selectedSectionShape === '2L') {
                    return display2LShapesMetric()
                } else if (selectedSectionShape === 'recHSS') {
                    return displayRecHSShapesMetric()
                } else if (selectedSectionShape === 'roundHSS') {
                    return displayRoundHSShapesMetric()
                } else if (selectedSectionShape === 'Pipe') {
                    return displayPipeShapesMetric()
                } else {
                    return displaySectionPropertiesMetric()
                }
            } else if (system === 'English') {
                if (selectedSectionShape === 'I') {
                    return displayIShapesEnglish()
                } else if (selectedSectionShape === 'C') {
                    return displayCShapesEnglish()
                } else if (selectedSectionShape === 'L') {
                    return displayLShapesEnglish()
                } else if (selectedSectionShape === 'T') {
                    return displayTShapesEnglish()
                } else if (selectedSectionShape === '2L') {
                    return display2LShapesEnglish()
                } else if (selectedSectionShape === 'recHSS') {
                    return displayRecHSShapesEnglish()
                } else if (selectedSectionShape === 'roundHSS') {
                    return displayRoundHSShapesEnglish()
                } else if (selectedSectionShape === 'Pipe') {
                    return displayPipeShapesEnglish()
                } else {
                    return displaySectionPropertiesEnglish()
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
            if (selectedSectionName !== '' || method === 'Design') {
                setRequiredName(false)
            }
        }, [selectedSectionShape, selectedSectionName, method])

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

            if (selectedSectionShape === 'I') {
                iShapesMetricData.map((data) => {
                    if (selectedSectionName === data.i_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'C') {
                cShapesMetricData.map((data) => {
                    if (selectedSectionName === data.c_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'L') {
                lShapesMetricData.map((data) => {
                    if (selectedSectionName === data.l_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'T') {
                tShapesMetricData.map((data) => {
                    if (selectedSectionName === data.t_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === '2L') {
                twoLShapesMetricData.map((data) => {
                    if (selectedSectionName === data.two_l_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'recHSS') {
                recHSShapesMetricData.map((data) => {
                    if (selectedSectionName === data.rec_hs_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'roundHSS') {
                roundHSShapesMetricData.map((data) => {
                    if (selectedSectionName === data.round_hs_shape_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'Pipe') {
                pipeShapesMetricData.map((data) => {
                    if (selectedSectionName === data.pipe_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else {
                return 0
            }
            return checkedIndexMetric
        }

        const englishNameIndexChecker = () => {
            let checkedIndexEnglish = null

            if (selectedSectionShape === 'I') {
                iShapesEnglishData.map((data) => {
                    if (selectedSectionName === data.i_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'C') {
                cShapesEnglishData.map((data) => {
                    if (selectedSectionName === data.c_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'L') {
                lShapesEnglishData.map((data) => {
                    if (selectedSectionName === data.l_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'T') {
                tShapesEnglishData.map((data) => {
                    if (selectedSectionName === data.t_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === '2L') {
                twoLShapesEnglishData.map((data) => {
                    if (selectedSectionName === data.two_l_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'recHSS') {
                recHSShapesEnglishData.map((data) => {
                    if (selectedSectionName === data.rec_hs_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'roundHSS') {
                roundHSShapesEnglishData.map((data) => {
                    if (selectedSectionName === data.round_hs_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if (selectedSectionShape === 'Pipe') {
                pipeShapesEnglishData.map((data) => {
                    if (selectedSectionName === data.pipe_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else {
                return 0
            }
            return checkedIndexEnglish
        }

        const insertSectionProperty = () => {
            const counterNameValue = () => {
                if (system === 'Metric') {
                    if (selectedSectionShape === 'I') {
                        return iShapesEnglishData[metricNameIndexChecker()].i_shape_english_name
                    } else if (selectedSectionShape === 'C') {
                        return cShapesEnglishData[metricNameIndexChecker()].c_shape_english_name
                    } else if (selectedSectionShape === 'L') {
                        return lShapesEnglishData[metricNameIndexChecker()].l_shape_english_name
                    } else if (selectedSectionShape === 'T') {
                        return tShapesEnglishData[metricNameIndexChecker()].t_shape_english_name
                    } else if (selectedSectionShape === '2L') {
                        return twoLShapesEnglishData[metricNameIndexChecker()].two_l_shape_english_name
                    } else if (selectedSectionShape === 'recHSS') {
                        return recHSShapesEnglishData[metricNameIndexChecker()].rec_hs_shape_english_name
                    } else if (selectedSectionShape === 'roundHSS') {
                        return roundHSShapesEnglishData[metricNameIndexChecker()].round_hs_shape_english_name
                    } else if (selectedSectionShape === 'Pipe') {
                        return pipeShapesEnglishData[metricNameIndexChecker()].pipe_shape_english_name
                    } else {
                        // alert("here boi")
                        return null
                    }
                } else if (system === 'English') {
                    if (selectedSectionShape === 'I') {
                        return iShapesMetricData[englishNameIndexChecker()].i_shape_metric_name
                    } else if (selectedSectionShape === 'C') {
                        return cShapesMetricData[englishNameIndexChecker()].c_shape_metric_name
                    } else if (selectedSectionShape === 'L') {
                        return lShapesMetricData[englishNameIndexChecker()].l_shape_metric_name
                    } else if (selectedSectionShape === 'T') {
                        return tShapesMetricData[englishNameIndexChecker()].t_shape_metric_name
                    } else if (selectedSectionShape === '2L') {
                        return twoLShapesMetricData[englishNameIndexChecker()].two_l_shape_metric_name
                    } else if (selectedSectionShape === 'recHSS') {
                        return recHSShapesMetricData[englishNameIndexChecker()].rec_hs_shape_metric_name
                    } else if (selectedSectionShape === 'roundHSS') {
                        return roundHSShapesMetricData[englishNameIndexChecker()].round_hs_shape_name
                    } else if (selectedSectionShape === 'Pipe') {
                        return pipeShapesMetricData[englishNameIndexChecker()].pipe_shape_metric_name
                    } else {
                        // alert("cheers")
                        return null
                    }
                }
            }

            if (system === 'Metric') {
                // alert("babababa");
                if (size(insertedSectionPropertiesMetric) === 0) {
                    // alert("made it inside")
                    let initialSectionMetric = {}
                    let initialSectionEnglish = {}

                    initialSectionMetric[0] = {
                        sectionId: 1,
                        sectionShape: selectedSectionShape,
                        sectionName: selectedSectionName,
                    }
                    initialSectionEnglish[0] = {
                        sectionId: 1,
                        sectionShape: selectedSectionShape,
                        sectionName: counterNameValue()
                    }
                    for (let index in sectionDimensionsArray) {
                        if (selectedSectionShape === sectionDimensionsArray[index]) {
                            // alert("oh no")
                            return
                            break
                        } else {
                            dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                            dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                        }
                    }
                    // alert("shit")
                    dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                    dispatch(addSectionPropertyMetric(initialSectionMetric, selectedSheet))
                    dispatch(setCurrentSectionPropertiesArray(1, selectedSheet))
                    dispatch(addSectionPropertyEnglish(initialSectionEnglish, selectedSheet))
                    setOpenNestedModal(false)
                } else {
                    // alert("Here I am in materials insert");
                    let currentSectionEnglish = {...insertedSectionPropertiesEnglish}
                    let currentSectionsMetric = {...insertedSectionPropertiesMetric}
                    const newSectionSizeEnglish = editMode ? parseFloat(theEditIndex) - 1 : size(insertedSectionPropertiesEnglish)
                    const newSectionSizeMetric = editMode ? parseFloat(theEditIndex) - 1 : size(insertedSectionPropertiesMetric)
                    const currentSectionPropertiesArrayValueForEdit = parseFloat(newSectionSizeMetric) + 2
                    const currentSectionPropertiesArrayValueInsert = parseFloat(newSectionSizeMetric) + 1
                    let currentSectionPropertiesArrayValue = null
                    if(editMode) {
                        currentSectionPropertiesArrayValue = currentSectionPropertiesArrayValueForEdit
                    } else {
                        currentSectionPropertiesArrayValue = currentSectionPropertiesArrayValueInsert
                    }
                    currentSectionsMetric[newSectionSizeMetric] = {
                        sectionId: parseFloat(newSectionSizeMetric + 1),
                        sectionShape: selectedSectionShape,
                        sectionName: selectedSectionName
                    }
                    currentSectionEnglish[newSectionSizeEnglish] = {
                        sectionId: parseFloat(newSectionSizeEnglish + 1),
                        sectionShape: selectedSectionShape,
                        sectionName: counterNameValue()
                    }

                    if (sectionDimensionsArray.length <= 0) {
                        dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                        dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                        dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                        dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                        dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                        dispatch(setCurrentSectionPropertiesArray(currentSectionPropertiesArrayValue, selectedSheet))
                        dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                        dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                        setOpenNestedModal(false)
                    } else if (sectionDimensionsArray.length >= 1) {
                        // alert("gotcha")
                        let stop = false
                        for (let index in sectionDimensionsArray) {
                            if (sectionDimensionsArray.includes(selectedSectionShape)) {
                                if(!editMode) {
                                    dispatch(setCurrentSectionPropertiesArray(currentSectionPropertiesArrayValue, selectedSheet))
                                }
                                dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                                dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                                setOpenNestedModal(false)
                                stop = true
                                break
                            } else {
                                // const newShapesArray = sectionDimensionsArray.slice(selectedSectionShape, 1)
                                if(editMode) {
                                    // alert("New shapes array == " + JSON.stringify(newShapesArray));
                                    if(!sectionDimensionsArray.includes(selectedSectionShape)) {
                                        dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                                        dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                                    }
                                    dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                                    dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                                    dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                                    dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                                    dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                                } else {
                                    dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                                    dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                                    dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                                    dispatch(setCurrentSectionPropertiesArray(currentSectionPropertiesArrayValue, selectedSheet))
                                    dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                                    dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                                }
                                setOpenNestedModal(false)
                                break
                            }
                        }
                    }
                }
            } else if (system === 'English') {
                if (size(insertedSectionPropertiesEnglish) === 0) {
                    // alert("made it inside")
                    let initialSectionMetric = {}
                    let initialSectionEnglish = {}

                    initialSectionMetric[0] = {
                        sectionId: 1,
                        sectionShape: selectedSectionShape,
                        sectionName: counterNameValue(),
                    }
                    initialSectionEnglish[0] = {
                        sectionId: 1,
                        sectionShape: selectedSectionShape,
                        sectionName: selectedSectionName
                    }
                    for (let index in sectionDimensionsArray) {
                        if (selectedSectionShape === sectionDimensionsArray[index]) {
                            return
                            break
                        } else {
                            dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                            dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                            dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                        }
                    }
                    // alert("shit")
                    dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                    dispatch(addSectionPropertyMetric(initialSectionMetric, selectedSheet))
                    dispatch(setCurrentSectionPropertiesArray(1, selectedSheet))
                    dispatch(addSectionPropertyEnglish(initialSectionEnglish, selectedSheet))
                    setOpenNestedModal(false)
                } else {
                    // alert("the edit index == " + JSON.stringify(theEditIndex) + " " + "the edit index - 1 === " + JSON.stringify(parseFloat(theEditIndex) - 1));
                    let currentSectionEnglish = {...insertedSectionPropertiesEnglish}
                    let currentSectionsMetric = {...insertedSectionPropertiesMetric}
                    // const newSectionSizeEnglish = size(insertedSectionPropertiesEnglish) - 1
                    // const newSectionSizeMetric = size(insertedSectionPropertiesMetric) - 1
                    const newSectionSizeEnglish = editMode ? parseFloat(theEditIndex) - 1 : size(insertedSectionPropertiesEnglish)
                    const newSectionSizeMetric = editMode ? parseFloat(theEditIndex) - 1 : size(insertedSectionPropertiesMetric)
                    const currentSectionPropertiesArrayValueForEdit = parseFloat(newSectionSizeEnglish) + 2
                    const currentSectionPropertiesArrayValueInsert = parseFloat(newSectionSizeEnglish) + 1
                    let currentSectionPropertiesArrayValue = null
                    if(editMode) {
                        currentSectionPropertiesArrayValue = currentSectionPropertiesArrayValueForEdit
                    } else {
                        currentSectionPropertiesArrayValue = currentSectionPropertiesArrayValueInsert
                    }
                    // alert("the endglish size == " + JSON.stringify(newSectionSizeEnglish));
                    currentSectionsMetric[newSectionSizeMetric] = {
                        sectionId: parseFloat(newSectionSizeMetric + 1),
                        sectionShape: selectedSectionShape,
                        sectionName: counterNameValue()
                    }
                    currentSectionEnglish[newSectionSizeEnglish] = {
                        sectionId: parseFloat(newSectionSizeEnglish + 1),
                        sectionShape: selectedSectionShape,
                        sectionName: selectedSectionName
                    }

                    if (sectionDimensionsArray.length <= 0) {
                        dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                        dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                        dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                        dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                        dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                        dispatch(setCurrentSectionPropertiesArray(parseFloat(newSectionSizeMetric) + 1, selectedSheet))
                        dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                        dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                        setOpenNestedModal(false)
                    } else if (sectionDimensionsArray.length >= 1) {
                        // alert("gotcha")
                        let stop = false
                        for (let index in sectionDimensionsArray) {
                            if (sectionDimensionsArray.includes(selectedSectionShape)) {
                                if(!editMode) {
                                    dispatch(setCurrentSectionPropertiesArray(currentSectionPropertiesArrayValue, selectedSheet))
                                }
                                dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                                dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                                dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                                setOpenNestedModal(false)
                                stop = true
                                break
                            } else {
                                // const newShapesArray = sectionDimensionsArray.slice(selectedSectionShape, 1)
                                if(editMode) {
                                    // alert("New shapes array == " + JSON.stringify(newShapesArray));
                                    if(!sectionDimensionsArray.includes(selectedSectionShape)) {
                                        dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                                        dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                                        dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                                    }
                                    dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                                    dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                                    dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                                    dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                                    dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                                } else {
                                    dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                                    dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                                    dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                                    dispatch(setCurrentSectionPropertiesArray(currentSectionPropertiesArrayValue, selectedSheet))
                                    dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                                    dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                                }
                                setOpenNestedModal(false)
                                break
                            }
                        }
                    }
                }
            }

        }

        useEffect(() => {
            if (editMode) {
                if (system === 'Metric') {
                    setSelectedSectionName(insertedSectionPropertiesMetric[parseFloat(theCurrentSectionIndex) - 1].sectionName)
                } else if (system === 'English') {
                    setSelectedSectionName(insertedSectionPropertiesEnglish[parseFloat(theCurrentSectionIndex) - 1].sectionName)
                }
            }
        }, [insertedSectionPropertiesMetric, insertedSectionPropertiesEnglish])

        useEffect(() => {
            if (editMode) {
                if (system === 'Metric') {
                    if (insertedSectionPropertiesMetric[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'I') {
                        setSelectedSectionShape('I')
                    } else if (insertedSectionPropertiesMetric[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'C') {
                        setSelectedSectionShape('C')
                    } else if (insertedSectionPropertiesMetric[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'L') {
                        setSelectedSectionShape('Angles')
                    } else if (insertedSectionPropertiesMetric[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'T') {
                        setSelectedSectionShape('T')
                    } else if (insertedSectionPropertiesMetric[parseFloat(theCurrentSectionIndex) - 1].sectionShape === '2L') {
                        setSelectedSectionShape('Double Angles')
                    } else if (insertedSectionPropertiesMetric[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'recHSS') {
                        setSelectedSectionShape('Rectangular HSS')
                    } else if (insertedSectionPropertiesMetric[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'roundHSS') {
                        setSelectedSectionShape('Round HSS')
                    } else if (insertedSectionPropertiesMetric[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'Pipe') {
                        setSelectedSectionShape('Pipe')
                    }
                    // setSelectedSectionShape(insertedSectionPropertiesMetric[parseFloat(theCurrentSectionIndex - 1)].sectionShape)
                } else if (system === 'English') {
                    if (insertedSectionPropertiesEnglish[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'I') {
                        setSelectedSectionShape('I')
                    } else if (insertedSectionPropertiesEnglish[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'C') {
                        setSelectedSectionShape('C')
                    } else if (insertedSectionPropertiesEnglish[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'L') {
                        setSelectedSectionShape('Angles')
                    } else if (insertedSectionPropertiesEnglish[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'T') {
                        setSelectedSectionShape('T')
                    } else if (insertedSectionPropertiesEnglish[parseFloat(theCurrentSectionIndex) - 1].sectionShape === '2L') {
                        setSelectedSectionShape('Double Angles')
                    } else if (insertedSectionPropertiesEnglish[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'recHSS') {
                        setSelectedSectionShape('Rectangular HSS')
                    } else if (insertedSectionPropertiesEnglish[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'roundHSS') {
                        setSelectedSectionShape('Round HSS')
                    } else if (insertedSectionPropertiesEnglish[parseFloat(theCurrentSectionIndex) - 1].sectionShape === 'Pipe') {
                        setSelectedSectionShape('Pipe')
                    }
                }
            }
        }, [insertedSectionPropertiesMetric, insertedSectionPropertiesEnglish])

        /**
         * The System is currently in METRIC and we edit the value of the shape. Used to provide a counter value for english
         */
        const shapeEnglishCounterValue = () => {
            // alert("the selected section name == " + JSON.stringify(hashMetric[selectedSectionName].id));
            // alert("the hash english == " + JSON.stringify(hashEnglishId[hashMetric[selectedSectionName].id].section_properties_english_name));
            // alert(JSON.stringify(hashMetric[selectedSectionName]));
            // return hashEnglishId[hashMetric[selectedSectionName].id].section_properties_english_name
        }

        /**
         * The System is currently in ENGLISH and we edit the value of the shape. Used to provide a counter value for metric
         */
        const shapeMetricCounterValue = () => {
            // alert(JSON.stringify(hashMetric[hashEnglish[selectedSectionName].id].section_properties_metric_name));
            // return hashMetricId[hashEnglish[selectedSectionName].id].section_properties_metric_name
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
                    const shapeValue = () => {
                        if (selectedSectionShape === 'I') {
                            return 'I'
                        } else if (selectedSectionShape === 'C') {
                            return 'C'
                        } else if (selectedSectionShape === 'Angles') {
                            return 'L'
                        } else if (selectedSectionShape === 'T') {
                            return 'T'
                        } else if (selectedSectionShape === 'Double Angles') {
                            return '2L'
                        } else if (selectedSectionShape === 'Rectangular HSS') {
                            return 'recHSS'
                        } else if (selectedSectionShape === 'Round HSS') {
                            return 'roundHSS'
                        } else if (selectedSectionShape === 'Pipe') {
                            return 'Pipe'
                        }
                    }
                    const proceed = window.confirm("Are you sure you want to keep these changes?")
                    if (proceed) {
                        // alert("to be dispatched == " + selectedSectionName)
                        dispatch(editSelectedSectionMetric(shapeValue(), selectedSectionName, selectedSheet, theCurrentSectionIndex))
                        dispatch(editSelectedSectionEnglish(shapeValue(), shapeEnglishCounterValue(), selectedSheet, theCurrentSectionIndex))
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
                    const shapeValue = () => {
                        if (selectedSectionShape === 'I') {
                            return 'I'
                        } else if (selectedSectionShape === 'C') {
                            return 'C'
                        } else if (selectedSectionShape === 'Angles') {
                            return 'L'
                        } else if (selectedSectionShape === 'T') {
                            return 'T'
                        } else if (selectedSectionShape === 'Double Angles') {
                            return '2L'
                        } else if (selectedSectionShape === 'Rectangular HSS') {
                            return 'recHSS'
                        } else if (selectedSectionShape === 'Round HSS') {
                            return 'roundHSS'
                        } else if (selectedSectionShape === 'Pipe') {
                            return 'Pipe'
                        }
                    }
                    const proceed = window.confirm("Are you sure you want to keep these changes?")
                    if (proceed) {
                        shapeMetricCounterValue()
                        dispatch(editSelectedSectionEnglish(shapeValue(), selectedSectionName, selectedSheet, theCurrentSectionIndex))
                        dispatch(editSelectedSectionMetric(shapeValue(), shapeMetricCounterValue(), selectedSheet, theCurrentSectionIndex))
                        setOpenNestedModal(false)
                    } else {
                        return;
                    }
                }
            }
        }

        const setSectionName = (event) => {
            setSelectedSectionName(event.target.textContent)
        }

        const setSectionShape = (event) => {
            if (event.target.textContent === 'I') {
                setSelectedSectionShape('I')
                // dispatch(setCurrentShape('I', selectedSheet))
            } else if (event.target.textContent === 'C') {
                setSelectedSectionShape('C')
                // dispatch(setCurrentShape('C', selectedSheet))
            } else if (event.target.textContent === 'Angles') {
                setSelectedSectionShape('L')
                // dispatch(setCurrentShape('L', selectedSheet))
            } else if (event.target.textContent === 'T') {
                setSelectedSectionShape('T')
                // dispatch(setCurrentShape('T', selectedSheet))
            } else if (event.target.textContent === 'Double Angles') {
                setSelectedSectionShape('2L')
                // dispatch(setCurrentShape('2L', selectedSheet))
            } else if (event.target.textContent === 'Rectangular HSS') {
                setSelectedSectionShape('recHSS')
                // dispatch(setCurrentShape('recHSS', selectedSheet))
            } else if (event.target.textContent === 'Round HSS') {
                setSelectedSectionShape('roundHSS')
                // dispatch(setCurrentShape('roundHSS', selectedSheet))
            } else if (event.target.textContent === 'Pipe') {
                setSelectedSectionShape('Pipe')
                // dispatch(setCurrentShape('Pipe', selectedSheet))
            }
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
                                    {/*<FormControl fullWidth>*/}
                                        <p style={{
                                            color: '#000',
                                            fontWeight: 'bold',
                                            width: 'fit-content',
                                            float: 'left',
                                            margin: '0'
                                        }}>Shape</p>
                                        <Autocomplete
                                            // disablePortal
                                            freeSolo={true}
                                            id="combo-box-demo"
                                            sx={{width: '100%', overflow: 'visible'}}
                                            // ListboxProps={{ style: { maxHeight: 200, overflow: 'visible', zIndex: 1} }}
                                            options={displayApiShapes()}
                                            onKeyPress={(event) => {
                                                if (event.key === 'Enter' || event.key === 'enter') {
                                                    console.log("key up");
                                                    // setSelectedSectionShape('I')
                                                    // setSectionShape(event)
                                                }
                                            }}
                                            onChange={(event) => setSectionShape(event)}
                                            value={selectedSectionShape}
                                            renderInput={(params) => <TextField {...params} label="Preset Section Shapes"/>}
                                        />
                                        {requiredShapeMessage()}
                                    {/*</FormControl>*/}
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
                                            disabled={disableButton}
                                            id="combo-box-demo"
                                            sx={{width: '100%'}}
                                            options={systemCheck()}
                                            onChange={(event) => setSectionName(event)}
                                            value={method === 'Design' ? 'N/A' : selectedSectionName}
                                            renderInput={(params) => <TextField {...params} label="Preset Section Names"/>}
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
                                        if(method === 'Investigation') {
                                            if (selectedSectionName === '' && selectedSectionShape === '') {
                                                handleRequiredShape()
                                                handleRequiredName()
                                            } else if (selectedSectionShape === '') {
                                                handleRequiredShape()
                                            } else if (selectedSectionName === '') {
                                                handleRequiredName()
                                            } else {
                                                insertSectionProperty(selectedSectionName, selectedSectionShape)
                                            }
                                        } else if(method === 'Design') {
                                            if (selectedSectionShape === '') {
                                                handleRequiredShape()
                                            } else {
                                                dispatch(setDesignMethodShape(selectedSectionShape, selectedSectionShape, selectedSheet, 0))
                                                dispatch(setCurrentShape(selectedSectionShape, selectedSheet))
                                                setOpenNestedModal(false)
                                            }
                                        }
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
        if (openNestedModal) {
            return (
                <NestedModal/>
            )
        } else {
            return
        }
    }

    const displayRows = () => {
        if (method === 'Investigation') {
            return (
                <SectionPropertiesRows/>
            )
        } else if (method === 'Design') {
            return (
                <SectionPropertiesRowsDesign/>
            )
        }
    }

    const currentSectionPropertiesArray = objectChecker(sheets, ['sheets', selectedSheet, 'currentSectionsArray'])

    const removeSection = (modelIndex) => {
        const proceed = window.confirm("Are you sure you want to delete this section row?")
        if(proceed) {
            if(system === 'Metric') {
                for(let newSectionIndex in insertedSectionPropertiesMetric) {
                    if(insertedSectionPropertiesMetric[newSectionIndex].sectionId === modelIndex) {
                        let newNumber = 0
                        const objectMapper = (object) => {
                            let newObj = mapKeys(object, (value, key) => newNumber++)
                            return newObj
                        }
                        let copyCurrent = [...currentSectionPropertiesArray]
                        // alert("parseFloat(newSectionIndex) - 1 == " + JSON.stringify(newSectionIndex));
                        const toBeRemoved = copyCurrent.indexOf(insertedSectionPropertiesMetric[newSectionIndex].sectionId)
                        copyCurrent.splice(toBeRemoved, 1)
                        dispatch(removeCurrentSectionPropertyIndex(copyCurrent, selectedSheet))
                        dispatch(removeSelectedSectionPropertyMetric(null, selectedSheet, newSectionIndex))
                        dispatch(removeSelectedSectionPropertyEnglish(null, selectedSheet, newSectionIndex))
                        dispatch(resetSectionIndexMetric(objectMapper(insertedSectionPropertiesMetric), selectedSheet))
                        dispatch(resetSectionIndexEnglish(objectMapper(insertedSectionPropertiesMetric), selectedSheet))
                        break
                    }
                }
            } else if(system === 'English') {
                // alert("what da fakssss");
                for(let newSectionIndex in insertedSectionPropertiesEnglish) {
                    if(insertedSectionPropertiesEnglish[newSectionIndex].sectionId === modelIndex) {
                        let newNumber = 0
                        const objectMapper = (object) => {
                            let newObj = mapKeys(object, (value, key) => newNumber++)
                            return newObj
                        }
                        let copyCurrent = [...currentSectionPropertiesArray]
                        alert("parseFloat(newSectionIndex) - 1 == " + JSON.stringify(newSectionIndex));
                        const toBeRemoved = copyCurrent.indexOf(insertedSectionPropertiesEnglish[newSectionIndex].sectionId)
                        copyCurrent.splice(toBeRemoved, 1)
                        dispatch(removeCurrentSectionPropertyIndex(copyCurrent, selectedSheet))
                        dispatch(removeSelectedSectionPropertyMetric(null, selectedSheet, newSectionIndex))
                        dispatch(removeSelectedSectionPropertyEnglish(null, selectedSheet, newSectionIndex))
                        dispatch(resetSectionIndexMetric(objectMapper(insertedSectionPropertiesEnglish), selectedSheet))
                        dispatch(resetSectionIndexEnglish(objectMapper(insertedSectionPropertiesEnglish), selectedSheet))
                        break
                    }
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
            field: 'shape',
            headerClassName: 'super-app-theme--header',
            headerName: 'Shape',
            headerAlign: 'center',
            sortable: true,
            flex: 1,
            // width: 150
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
                                <Tooltip title={<p>Click to edit Section Property row.</p>}>
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
            isSelectable: method === 'Investigation' ? true : false,
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
                                <Tooltip title={<p>Click to remover Section Property row.</p>}>
                                    <CancelIcon
                                        color={method === 'Investigation' ? 'secondary' : 'none'}
                                    />
                                </Tooltip>
                            </p>
                        </div>
                    </div>
                );
            }
        },
    ];

    const newSections = []

    if (system === 'Metric') {
        for (let index in insertedSectionPropertiesMetric) {
            newSections.push(insertedSectionPropertiesMetric[index])
        }
    } else if (system === 'English') {
        for (let index in insertedSectionPropertiesEnglish) {
            newSections.push(insertedSectionPropertiesEnglish[index])
        }
    }
    // alert("the new sections == " + JSON.stringify(newSections));

    const displayApiData = () => {
        const loading = [{
            id: 'Calculating...',
            shape: 'Calculating...',
            name: 'Calculating...',
        }]
        if (newSections === null) {
            return loading
        } else {
            const newOptions = newSections.map((data) => ({
                id: data.sectionId,
                shape: data.sectionShape,
                name: method === 'Investigation' ? data.sectionName : 'N/A'
            }));
            return newOptions
        }
    }

    const height = 200

    const onChangeHandler = (model) => {
        let modelIndex = null
        for (let index in model) {
            modelIndex = parseFloat(index)
            const modelValue = model[index]
            for (let y in modelValue) {
            }
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
                        <Tooltip title={<p>Click to add Section Property row.</p>}>
                            <Button
                                disabled={disableButton}
                                style={{
                                    margin: '10px'
                                }}
                                variant='contained'
                                color='primary'
                                onClick={() => {
                                    // dispatch(setSystemDropdown('Metric', selectedSheet))
                                    setEditMode(false)
                                    handleOpenNestedModal()
                                }}
                            >
                                Add Section
                            </Button>
                        </Tooltip>
                        <Tooltip title={<p>Click to remove all Section Property rows.</p>}>
                            <Button
                                disabled={disableButton}
                                variant='contained'
                                color='secondary'
                                onClick={() => deleteAllSectionProperties()}
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
                    textAlign: 'center'
                }}>
                    <p style={{margin: '0px'}}><strong>SECTIONS</strong></p>
                </Card>
                <div style={{
                    height: newSections.length === 1 ? 200 : (height + (newSections.length * 40)),
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
                            }
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
                        onEditRowsModelChange={(model) => {
                            onChangeHandler(model)
                        }}
                        onCellClick={(model) => {
                            if(system === 'Metric') {
                                for(let index in insertedSectionPropertiesMetric) {
                                    if(insertedSectionPropertiesMetric[index].sectionId === model.id) {
                                        let modelIndex = model.id
                                        setTheCurrentSectionIndex(model.id)
                                        if (model.field === 'delete') {
                                            if(method === 'Investigation') {
                                                alert("the model index == " + JSON.stringify(modelIndex));
                                                removeSection(modelIndex)
                                            } else if(method === 'Design') {
                                                return
                                            }

                                        } else if (model.field === 'edit') {
                                            let modelIndex = model.id
                                            getTheEditIndex(modelIndex)
                                            // editSection(model, model.id)
                                            break
                                        }
                                    }
                                }
                            } else if(system === 'English') {
                                for(let index in insertedSectionPropertiesEnglish) {
                                    if(insertedSectionPropertiesEnglish[index].sectionId === model.id) {
                                        let modelIndex = model.id
                                        setTheCurrentSectionIndex(model.id)
                                        if (model.field === 'delete') {
                                            if(method === 'Investigation') {
                                                // alert("the model index == " + JSON.stringify(modelIndex));
                                                removeSection(modelIndex)
                                            } else if(method === 'Design') {
                                                return
                                            }

                                        } else if (model.field === 'edit') {
                                            let modelIndex = model.id
                                            getTheEditIndex(modelIndex)
                                            // editSection(model, model.id)
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
            </div>
            {/*<div style={{margin: '0 auto', width: '95%'}}>*/}
            {/*    {displayRows()}*/}
            {/*    /!*<SectionPropertiesRows/>*!/*/}
            {/*</div>*/}
            {displayModal()}
        </div>
    )
}
export default SectionProperties;
