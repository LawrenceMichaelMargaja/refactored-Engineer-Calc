import {Button, Card, FormControl, Input, TextField} from "@material-ui/core";
import React, {useEffect, useMemo, useState} from "react";
import MaterialPropertiesRows from "../materialProperties/materialPropertiesRows/metricMaterialPropertiesRows";
import SectionPropertiesRows from "./sectionPropertiesRows/SectionPropertiesRows";
import {useDispatch, useSelector} from "react-redux";
import {
    addSectionPropertyEnglish,
    addSectionPropertyMetric,
    removeAllSectionProperties,
    setCurrentSectionPropertiesArray,
    setCurrentSectionPropertyIndex
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
    getCShapeEnglish,
    getSectionPropertiesEnglish,
    getSectionPropertiesMetric,
    getShapes,
    getSteelTypesEnglishAPI,
    getSteelTypesMetricAPI,
    setSectionDimensionsArrayEnglish,
    setSectionDimensionsArrayMetric,
    setSectionDimensionsArrray
} from "../../../../store/actions/sheets/sheets";
import {objectChecker} from "../../../../utilities/utilities";
import {setSystemDropdown} from "../../../../store/actions/dashboardDropdowns/systemDropdown";
import SectionPropertiesRowsDesign from "./sectionPropertiesRows/SectionPropertiesRowsDesign";


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

    useEffect(() => {
        if (method === 'Investigation') {
            setDisableButton(false)
        } else if (method === 'Design') {
            setDisableButton(true)
        }
    }, [method])

    const [openNestedModal, setOpenNestedModal] = useState(false);

    const fetchShapes = () => {
        fetch("http://127.0.0.1:8080/shape")
            .then((response) => response.json())
            .then((data) => dispatch(getShapes(data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

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
        for (let i in sectionPropertiesMetric) {
            let {
                section_properties_metric_name,
            } = sectionPropertiesMetric[i]
            hash[section_properties_metric_name] = steelTypesMetric[i]
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

    const deleteAllSectionProperties = () => {
        const proceed = window.confirm("Are you sure you want to delete all section properties?")
        if (proceed) {
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
            let layout = { value: `${data['two_l_shape_metric_name']}`, label: `${data['two_l_shape_metric_name']}` }
            return layout
        })
        return twoLMetricOptions
    }

    // function insertDataFromAPI(item) {
    //     return {
    //         value: `${item[`two_l_shape_metric_name`]}`,
    //         label: `${item[`two_l_shape_metric_name`]}`
    //     }
    // }
    //
    // const display2LShapesMetric = () => {
    //     // alert(JSON.stringify(twoLShapesMetricData))
    //     return twoLShapesMetricData.map(insertDataFromAPI)
    // }

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

    useEffect(() => {
        fetchShapes()
        getMetricSectionProperties()
        getEnglishSectionProperties()
    }, [])

    const handleOpenNestedModal = () => {
        setOpenNestedModal(true);
    };

    const fetchCShapeEnglish = () => {
        fetch("http://127.0.0.1:8080/cshapeenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getCShapeEnglish(data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchCShapeEnglish()
    }, [])


    const NestedModal = () => {

        const [errorDisplay, setErrorDisplay] = useState(false)

        const [selectedSectionName, setSelectedSectionName] = useState('')
        const [selectedSectionShape, setSelectedSectionShape] = useState('')

        const [selectListName, setSelectListName] = useState('')
        const [selectListShape, setSelectListShape] = useState('')
        const [requiredShape, setRequiredShape] = useState(false)
        const [requiredName, setRequiredName] = useState(false)

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

        /**
         * Used as English Indexes
         */
        const metricNameIndexChecker = () => {
            let checkedIndexMetric = null

            if(selectedSectionShape === 'I-shaped') {
                iShapesMetricData.map((data) => {
                    if(selectedSectionName === data.i_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'C-shaped') {
                cShapesMetricData.map((data) => {
                    if(selectedSectionName === data.c_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'Angles') {
                lShapesMetricData.map((data) => {
                    if(selectedSectionName === data.l_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'T-shaped') {
                tShapesMetricData.map((data) => {
                    if(selectedSectionName === data.t_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'Double Angles') {
                twoLShapesMetricData.map((data) => {
                    if(selectedSectionName === data.two_l_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'Rectangular HSS') {
                recHSShapesMetricData.map((data) => {
                    if(selectedSectionName === data.rec_hs_shape_metric_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'Round HSS') {
                roundHSShapesMetricData.map((data) => {
                    if(selectedSectionName === data.round_hs_shape_name) {
                        checkedIndexMetric = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'Pipe') {
                pipeShapesMetricData.map((data) => {
                    if(selectedSectionName === data.pipe_shape_metric_name) {
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

            if(selectedSectionShape === 'I-shaped') {
                iShapesEnglishData.map((data) => {
                    if(selectedSectionName === data.i_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'C-shaped') {
                cShapesEnglishData.map((data) => {
                    if(selectedSectionName === data.c_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'Angles') {
                lShapesEnglishData.map((data) => {
                    if(selectedSectionName === data.l_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'T-shaped') {
                tShapesEnglishData.map((data) => {
                    if(selectedSectionName === data.t_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'Double Angles') {
                twoLShapesEnglishData.map((data) => {
                    if(selectedSectionName === data.two_l_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'Rectangular HSS') {
                recHSShapesEnglishData.map((data) => {
                    if(selectedSectionName === data.rec_hs_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'Round HSS') {
                roundHSShapesEnglishData.map((data) => {
                    if(selectedSectionName === data.round_hs_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else if(selectedSectionShape === 'Pipe') {
                pipeShapesEnglishData.map((data) => {
                    if(selectedSectionName === data.pipe_shape_english_name) {
                        checkedIndexEnglish = parseFloat(data.id) - 1
                    }
                })
            } else {
                return 0
            }
            return checkedIndexEnglish
        }

        const metricShapeIndexChecker = () => {
            let checkedIndexMetric = null
            for (let index in sectionPropertiesMetric) {
                if (selectedSectionShape === sectionPropertiesMetric[index].section_properties_metric_name) {
                    checkedIndexMetric = index
                }
            }
            return checkedIndexMetric
        }


        const insertSectionProperty = () => {
            const counterNameValue = () => {
                if(system === 'Metric') {
                    if(selectedSectionShape === 'I-shaped') {
                        return iShapesEnglishData[metricNameIndexChecker()].i_shape_english_name
                    } else if(selectedSectionShape === 'C-shaped') {
                        return cShapesEnglishData[metricNameIndexChecker()].c_shape_english_name
                    } else if(selectedSectionShape === 'Angles') {
                        return lShapesEnglishData[metricNameIndexChecker()].l_shape_english_name
                    } else if(selectedSectionShape === 'T-shaped') {
                        return tShapesEnglishData[metricNameIndexChecker()].t_shape_english_name
                    } else if(selectedSectionShape === 'Double Angles') {
                        return twoLShapesEnglishData[metricNameIndexChecker()].two_l_shape_english_name
                    } else if(selectedSectionShape === 'Rectangular HSS') {
                        return recHSShapesEnglishData[metricNameIndexChecker()].rec_hs_shape_english_name
                    } else if(selectedSectionShape === 'Round HSS') {
                        return roundHSShapesEnglishData[metricNameIndexChecker()].round_hs_shape_english_name
                    } else if(selectedSectionShape === 'Pipe') {
                        return pipeShapesEnglishData[metricNameIndexChecker()].pipe_shape_english_name
                    } else {
                        // alert("here boi")
                        return null
                    }
                } else if(system === 'English') {
                    if(selectedSectionShape === 'I-shaped') {
                        return iShapesMetricData[englishNameIndexChecker()].i_shape_metric_name
                    } else if(selectedSectionShape === 'C-shaped') {
                        return cShapesMetricData[englishNameIndexChecker()].c_shape_metric_name
                    } else if(selectedSectionShape === 'Angles') {
                        return lShapesMetricData[englishNameIndexChecker()].l_shape_metric_name
                    } else if(selectedSectionShape === 'T-shaped') {
                        return tShapesMetricData[englishNameIndexChecker()].t_shape_metric_name
                    } else if(selectedSectionShape === 'Double Angles') {
                        return twoLShapesMetricData[englishNameIndexChecker()].two_l_shape_metric_name
                    } else if(selectedSectionShape === 'Rectangular HSS') {
                        return recHSShapesMetricData[englishNameIndexChecker()].rec_hs_shape_metric_name
                    } else if(selectedSectionShape === 'Round HSS') {
                        return roundHSShapesMetricData[englishNameIndexChecker()].round_hs_shape_name
                    } else if(selectedSectionShape === 'Pipe') {
                        return pipeShapesMetricData[englishNameIndexChecker()].pipe_shape_metric_name
                    } else {
                        // alert("cheers")
                        return null
                    }
                }

            }
            if (system === 'Metric') {
                if (size(insertedSectionPropertiesMetric) === 0) {
                    // alert("made it inside")
                    let initialSectionMetric = {}
                    let initialSectionEnglish = {}

                    initialSectionMetric[0] = {
                        sectionId: 0,
                        sectionShape: selectedSectionShape,
                        sectionName: selectedSectionName,
                    }
                    initialSectionEnglish[0] = {
                        sectionId: 0,
                        sectionShape: selectedSectionShape,
                        sectionName: counterNameValue()
                    }
                    for(let index in sectionDimensionsArray) {
                        if(selectedSectionShape === sectionDimensionsArray[index]) {
                            // alert("oh no")
                            return
                            break
                        } else {
                            dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                            dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                        }
                    }
                    // alert("shit")
                    dispatch(addSectionPropertyMetric(initialSectionMetric, selectedSheet))
                    dispatch(setCurrentSectionPropertiesArray(1, selectedSheet))
                    dispatch(addSectionPropertyEnglish(initialSectionEnglish, selectedSheet))
                    setOpenNestedModal(false)
                } else {
                    let currentSectionEnglish = {...insertedSectionPropertiesEnglish}
                    let currentSectionsMetric = {...insertedSectionPropertiesMetric}
                    const newSectionSizeEnglish = size(insertedSectionPropertiesEnglish)
                    const newSectionSizeMetric = size(insertedSectionPropertiesMetric)
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

                    // if(selectedSectionShape === 'I-shaped' && sectionDimensionsArray.includes('I-shaped')) {
                    //     alert("I-shaped")
                    // } else if(selectedSectionShape === 'C-shaped' && sectionDimensionsArray.includes('C-shaped')) {
                    //     alert("C-shaped")
                    // } else if(selectedSectionShape === 'Angles' && sectionDimensionsArray.includes('Angles')) {
                    //     alert("Angles")
                    // } else if(selectedSectionShape === 'T-shaped' && sectionDimensionsArray.includes('T-shaped')) {
                    //     alert('T-shaped')
                    // } else if(selectedSectionShape === 'Double Angles' && sectionDimensionsArray.includes('Double Angles')) {
                    //     alert("Double Angles")
                    // } else if(selectedSectionShape === 'Rectangular HSS' && sectionDimensionsArray.includes('Rectangular HSS')) {
                    //     alert("Rectangular HSS")
                    // } else if(selectedSectionShape === 'Round HSS' && sectionDimensionsArray.includes('Round HSS')) {
                    //     alert("Round HSS")
                    // } else if(selectedSectionShape === 'Pipe' && sectionDimensionsArray.includes('Pipe')) {
                    //     alert("Pipe")
                    // }

                    if(sectionDimensionsArray.length <= 0) {
                        // alert("please")
                        dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                        dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                        dispatch(setCurrentSectionPropertiesArray(parseFloat(newSectionSizeMetric) + 1, selectedSheet))
                        dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                        dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                        setOpenNestedModal(false)
                    } else if(sectionDimensionsArray.length >= 1) {
                        // alert("gotcha")
                        let stop = false
                        for(let index in sectionDimensionsArray) {
                            if(sectionDimensionsArray.includes(selectedSectionShape)) {
                                dispatch(setCurrentSectionPropertiesArray(parseFloat(newSectionSizeMetric) + 1, selectedSheet))
                                dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                                dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                                setOpenNestedModal(false)
                                stop = true
                                break
                            } else {
                                dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                                dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                                dispatch(setCurrentSectionPropertiesArray(parseFloat(newSectionSizeMetric) + 1, selectedSheet))
                                dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                                dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                                setOpenNestedModal(false)
                                break
                            }
                        }
                        // alert("ho ho ho")
                        // dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                        // dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                        // dispatch(setCurrentSectionPropertiesArray(parseFloat(newSectionSizeMetric) + 1, selectedSheet))
                        // dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                        // dispatch(addSectionPropertyEnglish(currentSectionEnglish, selectedSheet))
                        // setOpenNestedModal(false)
                    }

                }
            } else if (system === 'English') {
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
                        sectionShape: selectedSectionShape,
                        sectionName: counterNameValue()
                    }
                    for(let index in sectionDimensionsArray) {
                        if(selectedSectionShape === sectionDimensionsArray[index]) {
                            return
                            break
                        } else {
                            dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                            dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                        }
                    }
                    dispatch(setCurrentSectionPropertiesArray(1, selectedSheet))
                    dispatch(addSectionPropertyMetric(initialSectionMetric, selectedSheet))
                    dispatch(addSectionPropertyEnglish(initialSectionEnglish, selectedSheet))
                    setOpenNestedModal(false)
                } else {
                    let currentSectionsEnglish = {...insertedSectionPropertiesEnglish}
                    let currentSectionsMetric = {...insertedSectionPropertiesMetric}
                    const newSectionSizeEnglish = size(insertedSectionPropertiesEnglish)
                    const newSectionSizeMetric = size(insertedSectionPropertiesMetric)
                    currentSectionsEnglish[newSectionSizeEnglish] = {
                        sectionId: parseFloat(newSectionSizeEnglish + 1),
                        sectionShape: selectedSectionShape,
                        sectionName: selectedSectionName
                    }
                    currentSectionsMetric[newSectionSizeMetric] = {
                        sectionId: parseFloat(newSectionSizeMetric + 1),
                        sectionShape: selectedSectionShape,
                        sectionName: counterNameValue()
                    }
                    for(let index in sectionDimensionsArray) {
                        if(selectedSectionShape === sectionDimensionsArray[index]) {
                            // alert("bullshit")
                            // return
                            break
                        } else {
                            dispatch(setSectionDimensionsArrayMetric(selectedSectionShape, selectedSheet))
                            dispatch(setSectionDimensionsArrayEnglish(selectedSectionShape, selectedSheet))
                        }
                    }
                    dispatch(setCurrentSectionPropertiesArray(parseFloat(newSectionSizeMetric) + 1, selectedSheet))
                    dispatch(addSectionPropertyMetric(currentSectionsMetric, selectedSheet))
                    dispatch(addSectionPropertyEnglish(currentSectionsEnglish, selectedSheet))
                    setOpenNestedModal(false)
                }
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
                                            renderInput={(params) => <TextField {...params} label="Preset Section Shapes"/>}
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
                                        if (selectedSectionName === '' && selectedSectionShape === '') {
                                            // alert("I am here")
                                            handleRequiredShape()
                                            handleRequiredName()
                                        } else if (selectedSectionShape === '') {
                                            handleRequiredShape()
                                            // alert("actually here")
                                        } else if (selectedSectionName === '') {
                                            handleRequiredName()
                                            // alert("really here")
                                        } else {
                                            // toggleStop()
                                            // alert("selected section name -- " + selectedSectionShape)
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
        if (openNestedModal) {
            return (
                <NestedModal/>
            )
        } else {
            return
        }
    }

    const displayRows = () => {
        if(method === 'Investigation') {
            return (
                <SectionPropertiesRows/>
            )
        } else if(method === 'Design') {
            return (
                <SectionPropertiesRowsDesign/>
            )
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
                            onClick={() => {
                                // dispatch(setSystemDropdown('Metric', selectedSheet))
                                handleOpenNestedModal()
                            }}
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
                {displayRows()}
                {/*<SectionPropertiesRows/>*/}
            </div>
            {displayModal()}
        </div>
    )
}
export default SectionProperties;
