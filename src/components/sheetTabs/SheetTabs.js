import React, {useEffect} from "react";
import {Button, Paper, Tab, Tabs} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from '@material-ui/icons/Add';
import {useDispatch, useSelector} from "react-redux";
import {mapKeys, size} from "lodash";
import {
    addNewSheet, addSheetName, get2LShapeEnglish, get2LShapeMetric, getCShapeEnglish,
    getCShapeMetric,
    getIShapesEnglish,
    getIShapesMetric,
    getLShapesEnglish,
    getLShapesMetric,
    getPipeShapesEnglish,
    getPipeShapesMetric,
    getRecHsShapesEnglish,
    getRecHsShapesMetric,
    getRoundHsShapesEnglish,
    getRoundHsShapesMetric,
    getSectionDimensionsEnglish,
    getSectionDimensionsMetric, getSectionPropertiesEnglish, getSectionPropertiesMetric,
    getShapes, getSteelTypesEnglishAPI, getSteelTypesMetricAPI,
    getTShapesEnglish,
    getTShapesMetric,
    removeSheet,
    setDisableMenuButtons,
    setRouteUrl,
    setSelectedSheet,
    setTabState
} from "../../store/actions/sheets/sheets";
import {useNavigate} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import {objectChecker} from "../../utilities/utilities";

const useStyles = makeStyles((theme) => ({
    indicator: {
        backgroundColor: '#f1f1f1',
        // transition: 'linear',
        height: '100%',
        zIndex: 0,
        // opacity: 0.7
    },
}));

const SheetTabs = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)

    const navigate = useNavigate()

    const toBeAddedSheetNumber = parseFloat(size(sheets) - 1)

    // console.log("the new sheet index -- ", parseFloat(size(sheets)))

    const fetchShapes = () => {
        fetch("http://127.0.0.1:8080/shape")
            .then((response) => response.json())
            .then((data) => dispatch(getShapes(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchSectionDimensionsMetric = () => {
        fetch("http://127.0.0.1:8080/sectiondimensionmetric")
            .then((response) => response.json())
            .then((data) => dispatch(getSectionDimensionsMetric(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchSectionDimensionsEnglish = () => {
        fetch("http://127.0.0.1:8080/sectiondimensionenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getSectionDimensionsEnglish(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    /**
     * Start of T-Shape
     */
    const fetchTShapeMetric = () => {
        fetch("http://127.0.0.1:8080/tshapemetric")
            .then((response) => response.json())
            .then((data) => dispatch(getTShapesMetric(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchTShapeEnglish = () => {
        fetch("http://127.0.0.1:8080/tshapeenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getTShapesEnglish(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }
    /**
     * End of T-Shape
     */

    /**
     * Start of Round HS - Shape
     */
    const fetchRoundHSShapeMetric = () => {
        fetch("http://127.0.0.1:8080/roundhsshapemetric")
            .then((response) => response.json())
            .then((data) => dispatch(getRoundHsShapesMetric(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchRoundHSShapeEnglish = () => {
        fetch("http://127.0.0.1:8080/roundhsshapeenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getRoundHsShapesEnglish(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchRecHSShapeMetric = () => {
        fetch("http://127.0.0.1:8080/rechsshapemetric")
            .then((response) => response.json())
            .then((data) => dispatch(getRecHsShapesMetric(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchRecHSShapeEnglish = () => {
        fetch("http://127.0.0.1:8080/rechsshapeenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getRecHsShapesEnglish(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchPipeShapeMetric = () => {
        fetch("http://127.0.0.1:8080/pipeshapemetric")
            .then((response) => response.json())
            .then((data) => dispatch(getPipeShapesMetric(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchPipeShapeEnglish = () => {
        fetch("http://127.0.0.1:8080/pipeshapeenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getPipeShapesEnglish(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchLShapeMetric = () => {
        fetch("http://127.0.0.1:8080/lshapemetric")
            .then((response) => response.json())
            .then((data) => dispatch(getLShapesMetric(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchLShapeEnglish = () => {
        fetch("http://127.0.0.1:8080/lshapeenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getLShapesEnglish(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchIShapeMetric = () => {
        fetch("http://127.0.0.1:8080/ishapemetric")
            .then((response) => response.json())
            .then((data) => dispatch(getIShapesMetric(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchIShapeEnglish = () => {
        fetch("http://127.0.0.1:8080/ishapeenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getIShapesEnglish(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchCShapeMetric = () => {
        fetch("http://127.0.0.1:8080/cshapemetric")
            .then((response) => response.json())
            .then((data) => dispatch(getCShapeMetric(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchCShapeEnglish = () => {
        fetch("http://127.0.0.1:8080/cshapeenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getCShapeEnglish(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetch2LShapeMetric = () => {
        fetch("http://127.0.0.1:8080/2lshapemetric")
            .then((response) => response.json())
            .then((data) => dispatch(get2LShapeMetric(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetch2LShapeEnglish = () => {
        fetch("http://127.0.0.1:8080/2lshapeenglish")
            .then((response) => response.json())
            .then((data) => dispatch(get2LShapeEnglish(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            })
    }

    const getSteelTypesMetric = () => {
        fetch("http://127.0.0.1:8080/steeltypesmetric")
            .then((response) => response.json())
            .then((data) => dispatch(getSteelTypesMetricAPI(data, parseFloat(size(sheets)))))
            //     .then((data) => alert(JSON.stringify(data)))
            .catch((error) => {
                console.log(error)
            });
    }

    const getSteelTypesEnglish = () => {
        fetch("http://127.0.0.1:8080/steeltypesenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getSteelTypesEnglishAPI(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            });
    }

    const getMetricSectionProperties = () => {
        fetch("http://127.0.0.1:8080/sectionpropertiesmetric")
            .then((response) => response.json())
            .then((data) => dispatch(getSectionPropertiesMetric(data, parseFloat(size(sheets)))))
            // .then((data) => console.log(sectionPropertiesMetric))
            .catch((error) => {
                console.log(error)
            });
    }

    const getEnglishSectionProperties = () => {
        fetch("http://127.0.0.1:8080/sectionpropertiesenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getSectionPropertiesEnglish(data, parseFloat(size(sheets)))))
            .catch((error) => {
                console.log(error)
            });
    }

    const insertSheet = () => {
        if (size(sheets) === 0) {
            const newSheet = {}
            newSheet[0] = {
                tabState: 'details',
                name: 'sheets',
                provision: 'ASD',
                system: "Metric",
                method: "Investigation",
                currentMaterialsArray: [1],
                currentSectionsArray: [1],
                sectionDimensionsArrayMetric: ['I-shaped'],
                sectionDimensionsArrayEnglish: [],
                removedMemberRowArray: [],
                arrayCheck: [],
                dataToBeLoopedForPostRequest: [],
                currentShape: 'I-shaped',
                route: '',
                calculatedData: null,
                apiData: {
                    steelSections: [],
                    shapes: [],
                    sectionDimensionsMetric: [],
                    sectionDimensionsEnglish: [],
                    tShapesMetric: [],
                    tShapesEnglish: [],
                    roundHSShapesMetric: [],
                    roundHSShapesEnglish: [],
                    recHSShapesMetric: [],
                    recHSShapesEnglish: [],
                    pipeShapeMetric: [],
                    pipeShapesEnglish: [],
                    lShapesMetric: [],
                    lShapesEnglish: [],
                    iShapesMetric: [],
                    iShapesEnglish: [],
                    cShapesMetric: [],
                    cShapesEnglish: [],
                    twoLShapesMetric: [],
                    twoLShapesEnglish: [],
                    steelTypesMetric: [],
                    steelTypesEnglish: [],
                    sectionPropertiesMetric: [],
                    sectionPropertiesEnglish: []
                },
                apiMap: {
                    selectedSteelType: '',
                    customSteelType: '',
                    currentMetricMaterialPropertyIndex: 0,
                    currentMetricEnglishPropertyIndex: '',
                    currentMetricSectionPropertyIndex: 0,
                    currentEnglishSectionPropertyIndex: 0,
                    currentSectionPropertyIndex: 0,
                    customMaterialModal: false,
                    steelTypeMetricProperties: {
                        0: {
                            id: 1,
                            name: 'A36',
                            EMPA: '200000',
                            FYMPA: '248',
                            FUMPA: '400',
                            custom: false
                        }
                    },
                    steelTypeEnglishProperties: {
                        0: {
                            id: 1,
                            name: 'A36',
                            EMPA: '200000',
                            FYMPA: '248',
                            FUMPA: '400',
                            custom: false
                        }
                    },
                    customSteelTypes: {
                        0: {
                            id: 1,
                            name: 'Custom Steel Type',
                            EMPA: '',
                            FYMPA: '',
                            FUMPA: '',
                        }
                    },
                    sectionPropertiesMetric: {
                        0: {
                            sectionId: 1,
                            sectionShape: 'W44X335',
                            sectionName: 'W44X335',
                        }
                    },
                    sectionPropertiesEnglish: {
                        0: {
                            sectionId: 1,
                            sectionShape: 'W44X335',
                            sectionName: 'W44X335'
                        }
                    },
                },
                details: {
                    projectUnit: '',
                    projectName: '',
                    projectId: '',
                    projectCompany: '',
                    projectDesigner: '',
                    projectClient: '',
                    projectNotes: ''
                },
                members: {
                    0: {
                        memberId: 1,
                        materialId: 1,
                        sectionId: 1,
                        totalLengthOfMember: 1,
                        yAxisUnbracedLength: 1,
                        yAxisEffectiveLengthFactor: 1,
                        zAxisUnbracedLength: 1,
                        zAxisEffectiveLengthFactor: 1,
                        LLT: '1.0',
                        unbracedLengthLateralTorsional: 1.0,
                        lateralTorsionalModificationFactor: 1.0,
                        slendernessRatioInCompression: 200,
                        LST: 300
                    }
                },
                materialProperties: {
                    0: {
                        materialPropertiesId: 1,
                        materialPropertiesEMPA: 'Sugar',
                        materialPropertiesFYMPA: 'Pestle',
                        materialPropertiesFUMPA: 'Bowl',
                        materialPropertiesSelectedMaterial: 'Cabbage'
                    }
                },
                sectionProperties: {
                    0: {
                        sectionId: 1,
                        sectionShape: 'W1100X499',
                        sectionName: 'W1100X499',
                        // sectionView: '',
                        // sectionA: '',
                        // sectionIW: '',
                        // sectionIXP: '',
                        // sectionIYP: '',
                        // sectionJ: '',
                        // sectionSXP: '',
                        // sectionSYP: '',
                    }
                },
                factors: {
                    safetyFactorForTensile: 1.67,
                    safetyFactorForCompression: 1.67,
                    safetyFactorForFlexure: 1.67,
                    safetyFactorForShear: 1.67
                },
                forces: {
                    bendingMomentAlongXAxis: 0,
                    bendingMomentAlongYAxis: 0,
                    shearAlongXAxis: 0,
                    shearAlongYAxis: 0,
                    axial: 0,
                }
            }
            dispatch(addNewSheet(newSheet))
            navigate('/details')
            // getSheetTabSelected(0)
            dispatch(setDisableMenuButtons(false))
            dispatch(setSelectedSheet(0))
            fetchSectionDimensionsMetric()
            fetchSectionDimensionsEnglish()
            fetch2LShapeEnglish()
            fetch2LShapeMetric()
            fetchCShapeEnglish()
            fetchCShapeMetric()
            fetchIShapeEnglish()
            fetchIShapeMetric()
            fetchLShapeEnglish()
            fetchLShapeMetric()
            fetchPipeShapeEnglish()
            fetchPipeShapeMetric()
            fetchRecHSShapeEnglish()
            fetchRecHSShapeMetric()
            fetchRoundHSShapeEnglish()
            fetchRoundHSShapeMetric()
            fetchTShapeEnglish()
            fetchTShapeMetric()
            fetchShapes()
            getSteelTypesMetric()
            getSteelTypesEnglish()
            getMetricSectionProperties()
            getEnglishSectionProperties()
        } else {
            const newSizeIndex = size(sheets)
            const currentSheets = {...sheets}

            currentSheets[newSizeIndex] = {
                tabState: 'details',
                name: 'sheets',
                provision: 'ASD',
                system: "Metric",
                method: "Investigation",
                currentMaterialsArray: [1],
                currentSectionsArray: [1],
                sectionDimensionsArrayMetric: ['I-shaped'],
                sectionDimensionsArrayEnglish: [],
                removedMemberRowArray: [],
                arrayCheck: [],
                dataToBeLoopedForPostRequest: [],
                currentShape: 'I-shaped',
                route: '',
                calculatedData: null,
                apiData: {
                    steelSections: [],
                    shapes: [],
                    sectionDimensionsMetric: [],
                    sectionDimensionsEnglish: [],
                    tShapesMetric: [],
                    tShapesEnglish: [],
                    roundHSShapesMetric: [],
                    roundHSShapesEnglish: [],
                    recHSShapesMetric: [],
                    recHSShapesEnglish: [],
                    pipeShapeMetric: [],
                    pipeShapesEnglish: [],
                    lShapesMetric: [],
                    lShapesEnglish: [],
                    iShapesMetric: [],
                    iShapesEnglish: [],
                    cShapesMetric: [],
                    cShapesEnglish: [],
                    twoLShapesMetric: [],
                    twoLShapesEnglish: [],
                    steelTypesMetric: [],
                    steelTypesEnglish: [],
                    sectionPropertiesMetric: [],
                    sectionPropertiesEnglish: []
                },
                apiMap: {
                    latestMaterialMetricId: 1,
                    selectedSteelType: '',
                    customSteelType: '',
                    currentMetricMaterialPropertyIndex: 0,
                    currentMetricEnglishPropertyIndex: '',
                    currentMetricSectionPropertyIndex: 0,
                    currentEnglishSectionPropertyIndex: 0,
                    currentSectionPropertyIndex: 0,
                    customMaterialModal: false,
                    steelTypeMetricProperties: {
                        0: {
                            id: 1,
                            name: 'A36',
                            EMPA: '200000',
                            FYMPA: '248',
                            FUMPA: '400',
                            custom: false
                        }
                    },
                    steelTypeEnglishProperties: {
                        0: {
                            id: 1,
                            name: 'A36',
                            EMPA: '200000',
                            FYMPA: '248',
                            FUMPA: '400',
                            custom: false
                        }
                    },
                    customSteelTypes: {
                        0: {
                            id: 1,
                            name: 'Custom Steel Type',
                            EMPA: '',
                            FYMPA: '',
                            FUMPA: '',
                        }
                    },
                    sectionPropertiesMetric: {
                        0: {
                            sectionId: 1,
                            sectionShape: 'I',
                            sectionName: 'W1100X499',
                        }
                    },
                    sectionPropertiesEnglish: {
                        0: {
                            sectionId: 1,
                            sectionShape: 'I',
                            sectionName: 'W44X335'
                        }
                    },
                },
                details: {
                    projectUnit: '',
                    projectName: '',
                    projectId: '',
                    projectCompany: '',
                    projectDesigner: '',
                    projectClient: '',
                    projectNotes: ''
                },
                members: {
                    0: {
                        memberId: 1,
                        materialId: 1,
                        sectionId: 1,
                        totalLengthOfMember: 1,
                        yAxisUnbracedLength: 1,
                        yAxisEffectiveLengthFactor: 1,
                        zAxisUnbracedLength: 1,
                        zAxisEffectiveLengthFactor: 1,
                        LLT: '1.0',
                        unbracedLengthLateralTorsional: 1.0,
                        lateralTorsionalModificationFactor: 1.0,
                        slendernessRatioInCompression: 200,
                        LST: 300
                    }
                },
                materialProperties: {
                    0: {
                        materialPropertiesId: 1,
                        materialPropertiesEMPA: 'Sugar',
                        materialPropertiesFYMPA: 'Pestle',
                        materialPropertiesFUMPA: 'Bowl',
                        materialPropertiesSelectedMaterial: 'Cabbage'
                    }
                },
                sectionProperties: {
                    0: {
                        sectionId: 1,
                        sectionShape: 'W1100X499',
                        sectionName: 'W1100X499',
                        // sectionView: '',
                        // sectionA: '',
                        // sectionIW: '',
                        // sectionIXP: '',
                        // sectionIYP: '',
                        // sectionJ: '',
                        // sectionSXP: '',
                        // sectionSYP: '',
                    }
                },
                factors: {
                    safetyFactorForTensile: 1.67,
                    safetyFactorForCompression: 1.67,
                    safetyFactorForFlexure: 1.67,
                    safetyFactorForShear: 1.67
                },
                forces: {
                    bendingMomentAlongXAxis: 0,
                    bendingMomentAlongYAxis: 0,
                    shearAlongXAxis: 0,
                    shearAlongYAxis: 0,
                    axial: 0,
                }
            }
            dispatch(addNewSheet(currentSheets))
            dispatch(setDisableMenuButtons(false))
            navigate('/details')
            // getSheetTabSelected(newSizeIndex)
            dispatch(setSelectedSheet(newSizeIndex))
            fetchSectionDimensionsMetric()
            fetchSectionDimensionsEnglish()
            fetch2LShapeEnglish()
            fetch2LShapeMetric()
            fetchCShapeEnglish()
            fetchCShapeMetric()
            fetchIShapeEnglish()
            fetchIShapeMetric()
            fetchLShapeEnglish()
            fetchLShapeMetric()
            fetchPipeShapeEnglish()
            fetchPipeShapeMetric()
            fetchRecHSShapeEnglish()
            fetchRecHSShapeMetric()
            fetchRoundHSShapeEnglish()
            fetchRoundHSShapeMetric()
            fetchTShapeEnglish()
            fetchTShapeMetric()
            fetchShapes()
            getSteelTypesMetric()
            getSteelTypesEnglish()
            getMetricSectionProperties()
            getEnglishSectionProperties()
        }
    }

    const tabState = objectChecker(sheets, ['sheets', selectedSheet, 'tabState'])

    // useEffect(() => {
    //     if(tabState === 'forces') {
    //         navigate('/details')
    //     }
    // }, [])

    const removeSelectedSheet = (sheetIndex, event) => {
        if (event.button === 0) {
            const proceed = window.confirm("Are you sure you want to remove this sheet?")
            if (proceed) {
                if (parseFloat(selectedSheet) === 0 && parseFloat(Math.max(size(sheets) - 1)) === 0) {
                    alert("condition 1: We want this condition to run when there is only 1 sheet and we delete it.");
                    dispatch(removeSheet(sheetIndex))
                    dispatch(setSelectedSheet(null))
                    dispatch(setDisableMenuButtons(true))
                    navigate('/no-sheet')
                    // return;
                } else if (parseFloat(selectedSheet) === 0 && size(sheets) !== 1 && Math.max(size(sheets)) > parseFloat(sheetIndex) && parseFloat(sheetIndex) === 0) {
                    alert("Condition 2: We want this condition to run when we are deleting the primary sheet and there is more than one sheet open.");
                    dispatch(removeSheet(sheetIndex))

                    let newNumber = 0

                    const objectMapper = (object) => {
                        let newObj = mapKeys(object, (value, key) => newNumber++)
                        return newObj
                    }
                    dispatch(addNewSheet(objectMapper(sheets)))
                    dispatch(setDisableMenuButtons(false))
                    dispatch(setSelectedSheet(parseFloat(sheetIndex)))
                } else if (parseFloat(selectedSheet) > 0 && parseFloat(sheetIndex) === 0 && Math.max(size(sheets) - 1) > 1) {
                    alert("Condition 3: We want this condition to run when we are removing the primary sheet and there are more than one sheet open and the selected sheet is not the primary sheet.");
                    dispatch(removeSheet(sheetIndex))

                    let newNumber = 0

                    const objectMapper = (object) => {
                        let newObj = mapKeys(object, (value, key) => newNumber++)
                        return newObj
                    }
                    dispatch(addNewSheet(objectMapper(sheets)))
                    dispatch(setDisableMenuButtons(false))
                    dispatch(setSelectedSheet(parseFloat(selectedSheet) - 1))
                } else if (parseFloat(sheetIndex) > 0 && parseFloat(sheetIndex) < parseFloat(Math.max(size(sheets)) - 1) && parseFloat(selectedSheet) <= Math.max(size(sheets) - 1)) {
                    alert("Condition 4: We want this condition to run when we are removing a sheet that is not the primary sheet, there is more than one sheet open and the selected sheet is not the last sheet.");
                    // const tabInSheet = sheets.sheets[parseFloat(currentSheetIndex) - 1].newTabsState
                    dispatch(removeSheet(sheetIndex))
                    let newNumber = 0

                    const objectMapper = (object) => {
                        let newObj = mapKeys(object, (value, key) => newNumber++)
                        return newObj
                    }
                    dispatch(addNewSheet(objectMapper(sheets)))
                    dispatch(setDisableMenuButtons(false))
                    if (parseFloat(sheetIndex) > parseFloat(selectedSheet)) {
                        // dispatch(setSelectedSheet(parseFloat(selectedSheet)))
                        // dispatch(setSelectedTool(parseFloat(selectedSheet)))
                    } else if (parseFloat(sheetIndex) < parseFloat(selectedSheet)) {
                        dispatch(setSelectedSheet(parseFloat(selectedSheet) - 1))
                    }
                } else if (parseFloat(sheetIndex) === Math.max(size(sheets) - 1) && parseFloat(selectedSheet) === Math.max(size(sheets) - 1)) {
                    // alert("sheet Index = " + selectedSheet)
                    dispatch(removeSheet(sheetIndex))
                    alert("Condition 5: We want this condition to run when we are removing the last sheet and the selected sheet is the last sheet.");
                    let newNumber = 0

                    const objectMapper = (object) => {
                        let newObj = mapKeys(object, (value, key) => newNumber++)
                        return newObj
                    }
                    dispatch(addNewSheet(objectMapper(sheets)))
                    dispatch(setDisableMenuButtons(false))
                    dispatch(setSelectedSheet(parseFloat(Math.max(size(sheets) - 1))))
                } else if (parseFloat(selectedSheet) < Math.max(size(sheets) - 1) && size(sheets) > 1) {
                    // const tabInSheet = dashboard.sheets[parseFloat(currentSheetIndex) - 1].newTabsState
                    dispatch(removeSheet(sheetIndex))
                    alert("Condition 6: We want this condition run when are removing the last sheet, there is more than one sheet open, and the selected sheet is not the last sheet.");
                    let newNumber = 0

                    const objectMapper = (object) => {
                        let newObj = mapKeys(object, (value, key) => newNumber++)
                        return newObj
                    }
                    dispatch(addNewSheet(objectMapper(sheets)))
                    dispatch(setDisableMenuButtons(false))
                    dispatch(setSelectedSheet(parseFloat(selectedSheet)))

                    // if(tabInSheet === 'details') {
                    //     dispatch(setTabsState('details'))
                    // } else if(tabInSheet === 'factors') {
                    //     dispatch(setTabsState('factors'))
                    // } else if(tabInSheet === 'members') {
                    //     dispatch(setTabsState('members'))
                    // } else if(tabInSheet === 'forces') {
                    //     dispatch(setTabsState('forces'))
                    // } else if(tabInSheet === 'results') {
                    //     dispatch(setTabsState('results'))
                    // }
                }
            }
        }
    }

    const changeName = () => {
        let newName = prompt("change the name of this member row")
        const alphaExp = /^[a-z0-9]+$/i
        alert("the changed name === " + newName)
        if(newName) {
            if(newName === null || !newName.match(alphaExp)) {
                prompt("Name cannot be white space or blank.sss")
            } else if(newName.length !== 0 && newName.match(alphaExp)) {
                dispatch(addSheetName(newName, selectedSheet))
            }
        } else {
            return;
        }
    }

    const renderSheets = () => {

        const tabs = []

        for (let currentSheetIndex in sheets) {
            const {
                name,
            } = sheets[currentSheetIndex]
            tabs.push(
                <Tab
                    style={{borderRight: '1px solid grey', fontWeight: 'bold', flexGrow: 1}}
                    onClick={() => {
                        // alert("the index  =  " + currentSheetIndex)
                        dispatch(setSelectedSheet(currentSheetIndex))
                        // getSheetTabSelected(currentSheetIndex)
                    }}
                    onDoubleClick={() => changeName()}
                    key={currentSheetIndex}
                    // value={currentSheetIndex}
                    label={
                        <span style={{width: '100%', zIndex: 1}}>
                            {name}
                            {/*{name}*/}
                            <CancelIcon
                                color='primary'
                                style={{
                                    width: '20%',
                                    marginRight: '-5px',
                                    float: 'right'
                                }}
                                onMouseDown={(event) => removeSelectedSheet(currentSheetIndex, event)}
                            />
                        </span>
                    }>
                </Tab>
            )
        }

        return (
            <Paper style={{backgroundColor: '#d3d3d3'}}>
                <Tabs
                    // style={{fontWeight: 'bold', color: 'white'}}
                    value={parseFloat(selectedSheet)}
                    // indicatorColor="secondary"
                    // textColor="secondary"
                    // color='white'
                    // inkBarStyle={{background: 'blue'}}
                    classes={{
                        indicator: classes.indicator
                    }}
                    onChange={(event, value) => {
                        dispatch(setSelectedSheet(parseFloat(value)))
                    }}
                    aria-label="disabled tabs example"
                >
                    {tabs}
                </Tabs>
            </Paper>
        )
    }

    return (
        <div style={{display: 'flex', backgroundColor: '#d1d1d1'}}>
            {renderSheets()}
            <Button onClick={() => insertSheet()}>
                <AddIcon/>
            </Button>
        </div>
    )
}
export default SheetTabs
