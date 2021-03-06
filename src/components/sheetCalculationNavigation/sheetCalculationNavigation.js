import React, {useEffect, useMemo, useState} from 'react'
import {AppBar, Button, Card, FormControl, Tab, Tabs, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {setCalculatedData, setDataToBeLoopedForPostRequest, setTabState} from "../../store/actions/sheets/sheets";
import {makeStyles} from "@material-ui/core/styles";
import {useNavigate} from "react-router";
import {objectChecker} from "../../utilities/utilities";
import {includes, size} from "lodash";
import {addSectionProperty} from "../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Autocomplete} from "@mui/material";
import Errors from "../sheetCalculationComponents/errors/Errors";
import {setArrayCheck, setErrorMessage} from "../../store/actions/sheets/sheetCalculationComponents/errors/errors";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    sheetNavigation: {
        width: "100%",
        backgroundColor: '#4773bf',
        margin: '0 auto'
    }
}))

// axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.baseURL = '/'

const SheetCalculationNavigation = () => {

    const sheets = useSelector(state => state.sheets)
    const sheetTabs = useSelector(state => state.sheets.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    // const system = sheets[selectedSheet].system
    const members = objectChecker(sheets, ['sheets', selectedSheet, 'members'])
    const factors = objectChecker(sheets, ['sheets', selectedSheet, 'factors'])
    const forces = objectChecker(sheets, ['sheets', selectedSheet, 'forces'])
    const analysis = objectChecker(sheets, ['sheets', selectedSheet, 'provision'])
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])
    const units = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    // const materials = objectChecker(sheets, ['sheets', selectedSheet, 'materialProperties'])
    // const sections = objectChecker(sheets, ['sheets', selectedSheet, 'sectionProperties'])
    const sectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const sectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])
    const materialPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    const materialPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeEnglishProperties'])
    const tabState = objectChecker(sheets, ['sheets', selectedSheet, 'tabState'])
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const calculatedData = objectChecker(sheets, ['sheets', selectedSheet, 'calculatedData'])

    const [highlighted, setHighlighted] = useState(0)

    const [showModal, setShowModal] = useState(false)
    const [showResults, setShowResults] = useState(false)
    let arrayCheck = []

    /**
     * Sheet Forces Values
     */
    // const bendingMomentAlongXAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'bendingMomentAlongXAxis'])
    // const bendingMomentAlongYAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'bendingMomentAlongYAxis'])
    // const shearAlongXAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'shearAlongXAxis'])
    // const shearAlongYAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'shearAlongYAxis'])
    // const axial = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'axial'])

    /**
     * Sheet Factors Values
     */
    // const safetyFactorForTensile = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForTensile'])
    // const safetyFactorForCompression = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForCompression'])
    // const safetyFactorForFlexure = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForFlexure'])
    // const safetyFactorForShear = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForShear'])

    /**
     * Sheet Member Field Values
     */


    /**
     * Data from Factors
     */
    const safetyFactorForTensile = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForTensile'])
    const safetyFactorForCompression = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForCompression'])
    const safetyFactorForFlexure = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForFlexure'])
    const safetyFactorForShear = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForShear'])

    /**
     * Data from Forces
     */
    const bendingMomentAlongXAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'bendingMomentAlongXAxis'])
    const bendingMomentAlongYAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'bendingMomentAlongYAxis'])
    const shearAlongXAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'shearAlongXAxis'])
    const shearAlongYAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'shearAlongYAxis'])
    const axial = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'axial'])

    /**
     * Data to be looped for post request
     */
    const dataToBeLoopedForPostRequest = objectChecker(sheets, ['sheets', selectedSheet, 'dataToBeLoopedForPostRequest'])
    const insertedSectionMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSectionEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])

    /**
     * Data from Material Properties
     */
    const ModE = objectChecker(sheets, ['sheets', selectedSheet, ''])

    /**
     * Data from Section Shape
     */
    const sectionHashMetric = useMemo(() => {
        let hash = {}
        for (let i in sectionPropertiesMetric) {
            let {
                sectionId
            } = sectionPropertiesMetric[i]
            hash[sectionId] = sectionPropertiesMetric[i]
        }
        return hash
    }, [sectionPropertiesMetric])

    const sectionHashEnglish = useMemo(() => {
        let hash = {}
        for (let i in sectionPropertiesEnglish) {
            let {
                sectionId
            } = sectionPropertiesEnglish[i]
            hash[sectionId] = sectionPropertiesEnglish[i]
        }
        return hash
    }, [sectionPropertiesEnglish])

    const materialHashMetric = useMemo(() => {
        let hash = {}
        for (let i in materialPropertiesMetric) {
            let {
                id
            } = materialPropertiesMetric[i]
            hash[id] = materialPropertiesMetric[i]
        }
        return hash
    }, [materialPropertiesMetric])

    const materialHashEnglish = useMemo(() => {
        let hash = {}
        for (let i in materialPropertiesEnglish) {
            let {
                id
            } = materialPropertiesEnglish[i]
            hash[id] = materialPropertiesEnglish[i]
        }
        return hash
    }, [materialPropertiesEnglish])

    const currentShape = objectChecker(sheets, ['sheets', selectedSheet, 'currentShape'])

    /**
     * Metric Data to be looped
     */
    const iShapeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'iShapesMetric'])
    const cShapeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'cShapesMetric'])
    const anglesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'lShapesMetric'])
    const tShapeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'tShapesMetric'])
    const doubleAnglesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'twoLShapesMetric'])
    const recHSSMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'recHSShapesMetric'])
    const roundHSSMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'roundHSShapesMetric'])
    const pipeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'pipeShapesMetric'])

    /**
     * English Data to be looped
     */
    const iShapeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'iShapesEnglish'])
    const cShapeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'cShapesEnglish'])
    const anglesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'lShapesEnglish'])
    const tShapeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'tShapesEnglish'])
    const doubleAnglesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'twoLShapesEnglish'])
    const recHSSEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'recHSShapesEnglish'])
    const roundHSSEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'roundHSShapesEnglish'])
    const pipeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'pipeShapesEnglish'])

    useEffect(() => {
        if (system === 'Metric') {
            if ((currentShape).toUpperCase() === ('I').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(iShapeMetricData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('C').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(cShapeMetricData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('L').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(anglesMetricData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('T').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(tShapeMetricData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('2L').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(doubleAnglesMetricData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('recHSS').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(recHSSMetricData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('roundHSS').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(roundHSSMetricData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('Pipe').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(pipeMetricData, selectedSheet))
            }
        } else if (system === 'English') {
            if ((currentShape).toUpperCase() === ('I').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(iShapeEnglishData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('C').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(cShapeEnglishData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('L').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(anglesEnglishData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('T').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(tShapeEnglishData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('2L').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(doubleAnglesEnglishData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('recHSS').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(recHSSEnglishData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('roundHSS').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(roundHSSEnglishData, selectedSheet))
            } else if ((currentShape).toUpperCase() === ('Pipe').toUpperCase()) {
                dispatch(setDataToBeLoopedForPostRequest(pipeEnglishData, selectedSheet))
            }
        }
    }, [system, currentShape, method])

    const beamCalcDataSenderDesign = () => {
        let body = []
        // alert("dataToBeLoopedForPostRequest == " + JSON.stringify(dataToBeLoopedForPostRequest));
        for (let loopedIndex in dataToBeLoopedForPostRequest) {
            // alert("I made it here")
            for (let memberIndex in members) {
                const memberId = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'memberId'])
                const sectionId = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'sectionId'])
                const materialId = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'materialId'])

                let idObject = {
                    analysis: analysis,
                    method: method,
                    units: units
                    // units: 'Metric',
                }

                for (let factorsIndex in factors) {
                    idObject['tensile_factor'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForTensile']))
                    idObject['compress_factor'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForCompression']))
                    idObject['bending_factor'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForFlexure']))
                    idObject['shear_factor'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForShear']))
                }
                for (let forcesIndex in forces) {
                    idObject['vx'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'bendingMomentAlongXAxis']))
                    idObject['vy'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'bendingMomentAlongYAxis']))
                    idObject['mx'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'shearAlongXAxis']))
                    idObject['my'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'shearAlongYAxis']))
                    idObject['p'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'axial']))
                }
                if (system === 'Metric') {
                    if ((currentShape).toUpperCase() === ('I').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].i_shape_metric_name
                    } else if ((currentShape).toUpperCase() === ('C').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].c_shape_metric_name
                    } else if ((currentShape).toUpperCase() === ('L').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].l_shape_metric_name
                    } else if ((currentShape).toUpperCase() === ('T').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].t_shape_metric_name
                    } else if ((currentShape).toUpperCase() === ('2L').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].two_l_shape_metric_name
                    } else if ((currentShape).toUpperCase() === ('recHSS').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].rec_hs_shape_metric_name
                    } else if ((currentShape).toUpperCase() === ('roundHSS').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].round_hs_shape_metric_name
                    } else if ((currentShape).toUpperCase() === ('Pipe').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].pipe_shape_metric_name
                    }
                } else if (system === 'English') {
                    if ((currentShape).toUpperCase() === ('I').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].i_shape_english_name
                    } else if ((currentShape).toUpperCase() === ('C').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].c_shape_english_name
                    } else if ((currentShape).toUpperCase() === ('L').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].l_shape_english_name
                    } else if ((currentShape).toUpperCase() === ('T').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].t_shape_english_name
                    } else if ((currentShape).toUpperCase() === ('2L').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].two_l_shape_english_name
                    } else if ((currentShape).toUpperCase() === ('recHSS').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].rec_hs_shape_english_name
                    } else if ((currentShape).toUpperCase() === ('roundHSS').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].round_hs_shape_english_name
                    } else if ((currentShape).toUpperCase() === ('Pipe').toUpperCase()) {
                        idObject['name'] = dataToBeLoopedForPostRequest[loopedIndex].pipe_shape_english_name
                    }
                }

                idObject['id'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'memberId']))
                idObject['lb'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'totalLengthOfMember']))
                idObject['lx'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'yAxisUnbracedLength']))
                idObject['Kx'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'yAxisEffectiveLengthFactor']))
                idObject['Ly'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'zAxisUnbracedLength']))
                idObject['ky'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'zAxisEffectiveLengthFactor']))
                idObject['llt'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'LLT']))
                idObject['cbx'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'unbracedLengthLateralTorsional']))
                idObject['cby'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'lateralTorsionalModificationFactor']))
                idObject['s_rc'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'slendernessRatioInCompression']))
                idObject['s_rt'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'LST']))
                idObject['mod_e'] = system === 'Metric' ? parseFloat(materialHashMetric[materialId].EMPA) : parseFloat(materialHashEnglish[materialId].EMPA)
                idObject['yield_str'] = system === 'Metric' ? parseFloat(materialHashMetric[materialId].FYMPA) : parseFloat(materialHashEnglish[materialId].FYMPA)
                idObject['ult_str'] = system === 'Metric' ? parseFloat(materialHashMetric[materialId].FUMPA) : parseFloat(materialHashEnglish[materialId].FUMPA)
                idObject['shape'] = sectionHashMetric[sectionId].sectionShape
                body.push(idObject)
            }
        }
        console.log("the shape --- " + JSON.stringify(body));
        if (system === 'Metric') {
            axios.post('/steelArgumentsDesign', body)
                .then(res => dispatch(setCalculatedData(res.data, selectedSheet)))
                .catch(err => console.log(err))
        } else if (system === 'English') {
            axios.post('/steelArgumentsDesignEnglish', body)
                .then(res => dispatch(setCalculatedData(res.data, selectedSheet)))
                .catch(err => console.log(err))
        }
    }

    const hashSections = useMemo(() => {
        let hash = {}
        for (let i in sectionPropertiesMetric) {
            let {
                sectionId
            } = sectionPropertiesMetric[i]
            hash[sectionId] = sectionPropertiesMetric[i]
        }
        return hash
    }, [sectionPropertiesMetric])

    const hashSectionsEnglish = useMemo(() => {
        let hash = {}
        for (let i in sectionPropertiesEnglish) {
            let {
                sectionId
            } = sectionPropertiesEnglish[i]
            hash[sectionId] = sectionPropertiesEnglish[i]
        }
        return hash
    }, [sectionPropertiesEnglish])

    const beamCalcDataSender = () => {
        let body = []


        for (let memberIndex in members) {

            // alert("the name === " + JSON.stringify(hashSections));

            const memberId = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'memberId'])
            const sectionId = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'sectionId'])
            const materialId = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'materialId'])

            let idObject = {}

            idObject['id'] = parseFloat(memberId)
            idObject['name'] = hashSections[parseFloat(sectionId)].sectionName
            idObject['analysis'] = null
            idObject['method'] = analysis
            idObject['units'] = units

            for (let factorsIndex in factors) {
                idObject['tensile_factor'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForTensile']))
                idObject['compress_factor'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForCompression']))
                idObject['bending_factor'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForFlexure']))
                idObject['shear_factor'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForShear']))
            }

            for (let forcesIndex in forces) {
                idObject['vx'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'shearAlongXAxis']))
                idObject['vy'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'shearAlongYAxis']))
                idObject['mx'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'bendingMomentAlongXAxis']))
                idObject['my'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'bendingMomentAlongYAxis']))
                idObject['p'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'axial']))
            }

            idObject['lb'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'totalLengthOfMember']))
            idObject['lx'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'yAxisUnbracedLength']))
            idObject['kx'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'yAxisEffectiveLengthFactor']))
            idObject['ly'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'zAxisUnbracedLength']))
            idObject['ky'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'zAxisEffectiveLengthFactor']))
            idObject['llt'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'LLT']))
            idObject['cbx'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'unbracedLengthLateralTorsional']))
            idObject['cby'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'lateralTorsionalModificationFactor']))
            idObject['s_rc'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'slendernessRatioInCompression']))
            idObject['s_rt'] = parseFloat(objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'LST']))
            idObject['mod_e'] = system === 'Metric' ? parseFloat(materialHashMetric[materialId].EMPA) : parseFloat(materialHashEnglish[materialId].EMPA)
            idObject['yield_str'] = system === 'Metric' ? parseFloat(materialHashMetric[materialId].FYMPA) : parseFloat(materialHashEnglish[materialId].FYMPA)
            idObject['ult_str'] = system === 'Metric' ? parseFloat(materialHashMetric[materialId].FUMPA) : parseFloat(materialHashEnglish[materialId].FUMPA)
            idObject['shape'] = sectionHashMetric[sectionId].sectionShape
            body.push(idObject)
        }
        axios.post('/steelArguments', body)
            .then(res => dispatch(setCalculatedData(res.data, selectedSheet)))
            .catch(err => console.log(err))
    }


    const resultErrorHandler = () => {
        let errorLocation = null
        let important = null

        const insertedSectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])

        for (let memberIndex in members) {
            const memberId = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'memberId'])
            const materialId = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'materialId'])
            const sectionId = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'sectionId'])
            const totalLengthOfMember = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'totalLengthOfMember'])
            const yAxisUnbracedLength = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'yAxisUnbracedLength'])
            const yAxisEffectiveLengthFactor = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'yAxisEffectiveLengthFactor'])
            const zAxisUnbracedLength = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'zAxisUnbracedLength'])
            const zAxisEffectiveLengthFactor = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'zAxisEffectiveLengthFactor'])
            const llt = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'LLT'])
            const unbracedLengthLateralTorsional = objectChecker(sheets, 'sheets', selectedSheet, 'members', memberIndex, 'unbracedLengthLateralTorsional')
            const lateralTorsionalModificationFactor = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'lateralTorsionalModificationFactor'])
            const slendernessRatioInCompression = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'slendernessRatioInCompression'])
            const slendernessRatioInTension = objectChecker(sheets, ['sheets', selectedSheet, 'members', memberIndex, 'slendernessRatioInTension'])
            const currentMaterials = objectChecker(sheets, ['sheets', selectedSheet, 'currentMaterialsArray'])
            const currentSections = objectChecker(sheets, ['sheets', selectedSheet, 'currentSectionsArray'])

            if (size(materialPropertiesMetric) === 0 || size(sectionPropertiesMetric) === 0) {
                arrayCheck.push('material property or section property is null')
            }


            if (materialPropertiesMetric !== null) {
                let found = false
                for (let theMaterial in currentMaterials) {
                    if (parseFloat(materialId) === parseFloat(currentMaterials[theMaterial])) {
                        found = true
                    }
                }
                if (found === false) {
                    arrayCheck.push('Material ID used in membersTab in not found in material properties.')
                }
            }

            if (sectionPropertiesMetric !== null) {
                let found = false
                for (let theSection in currentSections) {
                    if (parseFloat(sectionId) === parseFloat(currentSections[theSection])) {
                        found = true
                    }
                }
                if (found === false) {
                    arrayCheck.push('Section ID used in membersTab in not found in section properties.')
                }
            }

            if ((memberId === '0' || memberId === 0) || (materialId === '0' || materialId === 0 || materialId === '' || materialId < 0 || materialId < '0') || (sectionId === '0' || sectionId === 0 || sectionId === '' || sectionId < 0 || sectionId < '0') || (totalLengthOfMember === '0' || totalLengthOfMember === 0 || totalLengthOfMember === '' || totalLengthOfMember < 0 || totalLengthOfMember < '0') || (yAxisUnbracedLength === '0' || yAxisUnbracedLength === 0 || yAxisUnbracedLength === '' || yAxisUnbracedLength < 0 || yAxisUnbracedLength < '0') || (yAxisEffectiveLengthFactor === '0' || yAxisEffectiveLengthFactor === 0 || yAxisEffectiveLengthFactor === '' || yAxisEffectiveLengthFactor < 0 || yAxisEffectiveLengthFactor < '0') || (zAxisUnbracedLength === '0' || zAxisUnbracedLength === 0 || zAxisUnbracedLength === '' || zAxisUnbracedLength < 0 || zAxisUnbracedLength < '0') || (zAxisEffectiveLengthFactor === '0' || zAxisEffectiveLengthFactor === 0 || zAxisEffectiveLengthFactor === '' || zAxisEffectiveLengthFactor < 0 || zAxisEffectiveLengthFactor < '0') || (unbracedLengthLateralTorsional === '0' || unbracedLengthLateralTorsional === 0 || unbracedLengthLateralTorsional === '' || unbracedLengthLateralTorsional < 0 || unbracedLengthLateralTorsional < '0') || (lateralTorsionalModificationFactor === '0' || lateralTorsionalModificationFactor === 0 || lateralTorsionalModificationFactor === '' || lateralTorsionalModificationFactor < 0 || lateralTorsionalModificationFactor < '0') || (slendernessRatioInCompression === '0' || slendernessRatioInCompression === 0 || slendernessRatioInCompression === '' || slendernessRatioInCompression < 0 || slendernessRatioInCompression < '0') || (slendernessRatioInTension === '0' || slendernessRatioInTension === 0 || slendernessRatioInTension === '' || slendernessRatioInTension < 0 || slendernessRatioInTension < '0')) {
                arrayCheck.push('membersTab error : membersTab value is zero, null, or negative')
            }
        }

        const shapes = ['I', 'C', 'L', 'T', '2L', 'recHSS', 'roundHSS', 'Pipe']

        if (method === 'Design') {
            let shapeState = false
            for (let sectionIndex in insertedSectionPropertiesMetric) {
                for (let shape in shapes) {
                    // alert("the shapes looped == " + shapes[shape].toUpperCase() + " == " + "shape user == " + (insertedSectionPropertiesMetric[sectionIndex].sectionShape).toUpperCase());
                    if (((insertedSectionPropertiesMetric[sectionIndex].sectionShape).toUpperCase()) === shapes[shape].toUpperCase()) {
                        // shapeState = false
                        shapeState = true
                        break
                        // alert("shapeState == " + shapeState)
                        // alert("yes!")
                        // break
                    }
                    // arrayCheck.push("the index if it fails == " + JSON.stringify())
                }
            }
            if (shapeState == false) {
                arrayCheck.push("Invalid section used.")
                arrayCheck.push("Valid Sections: I, C, Angles, T, Double Angles, Rectangular HSS, Pipe, Round HSS")
            }
        }

        if ((bendingMomentAlongXAxis === '0' || bendingMomentAlongXAxis === '' || bendingMomentAlongXAxis === 0) && (bendingMomentAlongYAxis === '0' || bendingMomentAlongYAxis === '' || bendingMomentAlongYAxis === 0) && (shearAlongXAxis === '0' || shearAlongXAxis === '' || shearAlongXAxis === 0) && (shearAlongYAxis === '0' || shearAlongYAxis === '' || shearAlongYAxis === 0) && (axial === '0' || axial === '' || axial === 0)) {
            arrayCheck.push('forcesTab error : value is zero or null')
        }

        if ((safetyFactorForTensile === '0' || safetyFactorForTensile === '' || safetyFactorForTensile === 0) || (safetyFactorForCompression === '0' || safetyFactorForCompression === '' || safetyFactorForCompression === 0) || (safetyFactorForFlexure === '0' || safetyFactorForFlexure === '' || safetyFactorForFlexure === 0) || (safetyFactorForShear === '0' || safetyFactorForShear === '' || safetyFactorForShear === 0)) {
            // alert(safetyFactorForTensile)
            arrayCheck.push('factorsTab error : factorsTab value is zero or null')
        }

        if ((parseFloat(safetyFactorForTensile) < parseFloat(0) || safetyFactorForTensile < '0') || (parseFloat(safetyFactorForCompression) < parseFloat(0) || safetyFactorForCompression < '(0)') || (parseFloat(safetyFactorForFlexure) < parseFloat(0) || safetyFactorForFlexure < '0') || (parseFloat(safetyFactorForShear) < parseFloat(0) || safetyFactorForShear < '0')) {
            arrayCheck.push('factorsTab error : factorsTab value cannot be negative')
        }

        if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('material property or section property is null')) {
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> All values for Factors Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Material Properties and Section Properties must not be null.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> All values for Factors Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.')) {
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> All values for Factors Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> All values for Factors Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value cannot be negative') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('material property or section property is null')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Material Properties and Section Properties must not be null.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value cannot be negative') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value cannot be negative') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value cannot be negative') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('material property or section property is null')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Material Properties and Section Properties must not be null.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value cannot be negative') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value cannot be negative') && arrayCheck.includes('material property or section property is null')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Material Properties and Section Properties must not be null.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('material property or section property is null')) {
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Material Properties and Section Properties must not be null.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative')) {
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('material property or section property is null')) {
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Material Properties and Section Properties must not be null.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.')) {
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Material Properties.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value is zero or null')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Factors Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value cannot be negative')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Forces Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('material property or section property is null')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>MembersTab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Factors Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Material Properties and Section Properties must not be null.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value cannot be negative') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('material property or section property is null')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Material Properties and Section Properties must not be null.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value cannot be negative') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value cannot be negative') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value cannot be negative') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('material property or section property is null')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Factors Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Material Properties and Material Properties must not be null.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('Material ID used in membersTab in not found in material properties.') && arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Factors Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null')) {
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Forces Tab must contain at least one non-zero value.
                    </p>
                </>
        } else if (arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('material property or section property is null')) {
            errorLocation =
                <ul>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Material Properties and Section Properties must not be null.</p>
                </>
        } else if (arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('material property or section property is null') && arrayCheck.includes('Material ID used in membersTab in not found in material properties') && arrayCheck.includes('Section ID used in membersTab in not found in section properties')) {
            errorLocation =
                <ul>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('material property or section property is null') && arrayCheck.includes('Material ID used in membersTab in not found in material properties')) {
            errorLocation =
                <ul>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                </>
        } else if (arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative') && arrayCheck.includes('material property or section property is null') && arrayCheck.includes('Section ID used in membersTab in not found in section properties')) {
            errorLocation =
                <ul>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('Material ID used in membersTab in not found in material properties') && arrayCheck.includes('Section ID used in membersTab in not found in section properties')) {
            errorLocation =
                <ul>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('Material ID used in membersTab in not found in material properties.')) {
            errorLocation =
                <ul>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Material ID must be present in Material Properties.</p>
                </>
        } else if (arrayCheck.includes('Section ID used in membersTab in not found in section properties.')) {
            errorLocation =
                <ul>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Section ID must be present in Section Properties.</p>
                </>
        } else if (arrayCheck.includes('membersTab error : membersTab value is zero, null, or negative')) {
            errorLocation =
                <ul>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Members Tab must be greater than zero.</p>
                </>
        } else if (arrayCheck.includes('material property or section property is null')) {
            errorLocation =
                <ul>
                    <li>Members Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Material Properties and Section Properties must not be null.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value is zero or null') && arrayCheck.includes('factorsTab error : factorsTab value cannot be negative')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Factors Tab must be greater than zero.</p>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value is zero or null')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> All values for Factors Tab must be greater than zero.</p>
                </>
        } else if (arrayCheck.includes('factorsTab error : factorsTab value cannot be negative')) {
            errorLocation =
                <ul>
                    <li>Factors Tab</li>
                </ul>
            important =
                <>
                    <p><strong>IMPORTANT!</strong> Values for Factors Tab must not be negative.</p>
                </>
        } else if (arrayCheck.includes('forcesTab error : value is zero or null')) {
            // console.log("at the includes == ", arrayCheck)
            errorLocation =
                <ul>
                    <li>Forces Tab</li>
                </ul>
            important =
                <p>
                    <strong>IMPORTANT!</strong> Values for Forces Tab must
                    contain at least one
                    non-zero value.
                </p>
        }

        if (arrayCheck.length === 0) {
            // console.log("arrayCheck == ", arrayCheck)
            dispatch(setTabState('results', selectedSheet))
        } else if (arrayCheck.length !== 0) {
            dispatch(setTabState('errors', selectedSheet))
        }
        resultCheckerHandler(errorLocation, important)
        // return resultCheckerHandler(errorLocation, important)
        return (
            <Errors errorLocation={errorLocation} important={important}/>
        )
    }


    const resultCheckerHandler = () => {
        if (tabState === 'results') {
            // beamCalcDataSender()
            resultsNavigationHandler()

        } else if (tabState === 'errors') {
            // alert("to be dispatched arrayCheck == " + arrayCheck)
            // beamCalcDataSender()
            errorsNavigationHandler()
        }
    }

    // useEffect(() => {
    //     if(system === 'Metric') {
    //         if((event.target.value).toUpperCase() === ("I-shaped").toUpperCase()) {
    //             dispatch(setCalculatedData(iShapeMetricData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("C-shaped").toUpperCase()) {
    //             dispatch(setCalculatedData(cShapeMetricData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("Angles").toUpperCase()) {
    //             dispatch(setCalculatedData(anglesMetricData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("T-shaped").toUpperCase()) {
    //             dispatch(setCalculatedData(tShapeMetricData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("Double Angles").toUpperCase()) {
    //             dispatch(setCalculatedData(doubleAnglesMetricData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("Rectangular HSS").toUpperCase()) {
    //             dispatch(setCalculatedData(recHSSMetricData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("Round HSS").toUpperCase()) {
    //             dispatch(setCalculatedData(roundHSSMetricData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("Pipe").toUpperCase()) {
    //             dispatch(setCalculatedData(pipeMetricData, selectedSheet))
    //         }
    //     } else if(system === 'English') {
    //         if((event.target.value).toUpperCase() === ("I-shaped").toUpperCase()) {
    //             dispatch(setCalculatedData(iShapeEnglishData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("C-shaped").toUpperCase()) {
    //             dispatch(setCalculatedData(cShapeEnglishData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("Angles").toUpperCase()) {
    //             dispatch(setCalculatedData(anglesEnglishData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("T-shaped").toUpperCase()) {
    //             dispatch(setCalculatedData(tShapeEnglishData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("Double Angles").toUpperCase()) {
    //             dispatch(setCalculatedData(doubleAnglesEnglishData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("Rectangular HSS").toUpperCase()) {
    //             dispatch(setCalculatedData(recHSSEnglishData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("Round HSS").toUpperCase()) {
    //             dispatch(setCalculatedData(roundHSSEnglishData, selectedSheet))
    //         } else if((event.target.value).toUpperCase() === ("Pipe").toUpperCase()) {
    //             dispatch(setCalculatedData(pipeEnglishData, selectedSheet))
    //         }
    //     }
    // })

    useEffect(() => {
        if (tabState === 'results') {
            if (method === 'Investigation') {
                // alert("investigation done")
                beamCalcDataSender()
            } else if (method === 'Design') {
                // alert("Design done");
                beamCalcDataSenderDesign()
            }
        }
    }, [tabState])

    const renderSheetCalculationNavigation = () => {
        if (size(sheetTabs) < 1) {
            return null
        } else {
            return (
                <div className={classes.sheetNavigation}>
                    <AppBar style={{
                        width: '100%',
                        borderRadius: '4px',
                        margin: '0 auto'
                    }} position="static">
                        <Tabs
                            value={highlighted}
                            indicatorColor="primary"
                            onChange={(event, value) => {
                                setHighlighted(highlighted)
                            }}
                            aria-label="disabled tabs example"
                        >
                            <Tab
                                onClick={() => {
                                    detailsNavigationHandler()
                                    dispatch(setTabState('details', selectedSheet));
                                }}
                                label="Details"
                            />
                            <Tab
                                onClick={() => {
                                    factorsNavigationHandler()
                                    dispatch(setTabState('factors', selectedSheet));
                                }}
                                label="Factors"
                            />
                            <Tab
                                onClick={() => {
                                    membersNavigationHandler()
                                    dispatch(setTabState('members', selectedSheet));
                                }}
                                label="Members"
                            />
                            <Tab
                                onClick={() => {
                                    forcesNavigationHandler()
                                    dispatch(setTabState('forces', selectedSheet));
                                }}
                                label="Forces"
                            />
                            <Tab
                                onClick={() => {
                                    resultErrorHandler()
                                    // beamCalcDataSender()
                                    dispatch(setArrayCheck(arrayCheck, selectedSheet))
                                    // nestedModal()
                                    // displayModal()
                                    // setOpenNestedModal(true)
                                    // setShowResults(true)
                                    // resultsNavigationHandler()
                                    // resultCheckerHandler()
                                    // dispatch(setTabState('results', selectedSheet));
                                }}
                                label="Results"
                            />
                        </Tabs>
                    </AppBar>
                </div>
            )
        }
    }

    useEffect(() => {
        if (tabState === 'details') {
            setHighlighted(0)
            navigate('/details')
        }
        if (tabState === 'factors') {
            setHighlighted(1)
            navigate('/factors')
        }
        if (tabState === 'members') {
            setHighlighted(2)
            navigate('/members')
        }
        if (tabState === 'forces') {
            setHighlighted(3)
            navigate('/forces')
        }
        if (tabState === 'results') {
            setHighlighted(4)
            navigate('/results')
        }
        if (tabState === 'errors') {
            setHighlighted(4)
            navigate('/errors')
        }
    }, [tabState])

    const detailsNavigationHandler = () => {
        navigate('/details')
    }

    const factorsNavigationHandler = () => {
        navigate('/factors')
    }

    const membersNavigationHandler = () => {
        navigate('/members')
    }

    const forcesNavigationHandler = () => {
        navigate('/forces')
    }

    const resultsNavigationHandler = () => {
        navigate('/results')
    }

    const errorsNavigationHandler = () => {
        navigate('/errors')
    }

    return (
        renderSheetCalculationNavigation()
    )
}

export default SheetCalculationNavigation
