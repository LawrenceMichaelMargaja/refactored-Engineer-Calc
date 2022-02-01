import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";
import {setCurrentShape, setDataToBeLoopedForPostRequest} from "../../../../../store/actions/sheets/sheets";

const DesignMembersRows = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const steelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesMetric'])

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

    const steelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesEnglish'])
    const sectionsMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesMetric'])
    const insertedSectionMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSectionEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])
    const insertedSteelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    const insertedSteelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeEnglishProperties'])

    const designMembersMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'designMemberMetric'])
    const designMembersEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'designMemberEnglish'])

    const calculatedData = objectChecker(sheets, ['sheets', selectedSheet, 'calculatedData'])

    let memberRows = []
    const [dataToBeLooped, setDataToBeLooped] = useState('')
    const [dataName, setDataName] = useState('')
    const [name, setName] = useState('')

    const dispatch = useDispatch()

    const klrValue = () => {

    }

    useEffect(() => {
        for (let index in insertedSectionMetric) {
            if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('I-shaped').toUpperCase()) {
                setDataToBeLooped(iShapeMetricData)
                // dispatch(setCurrentShape('I-shaped', selectedSheet))
                dispatch(setDataToBeLoopedForPostRequest(iShapeMetricData, selectedSheet))
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('C-shaped').toUpperCase()) {
                setDataToBeLooped(cShapeMetricData)
                // dispatch(setCurrentShape('C-shaped', selectedSheet))
                dispatch(setDataToBeLoopedForPostRequest(cShapeMetricData, selectedSheet))
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Angles').toUpperCase()) {
                setDataToBeLooped(anglesMetricData)
                // dispatch(setCurrentShape('Angles', selectedSheet))
                dispatch(setDataToBeLoopedForPostRequest(anglesMetricData, selectedSheet))
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('T-shaped').toUpperCase()) {
                setDataToBeLooped(tShapeMetricData)
                // dispatch(setCurrentShape('T-shaped', selectedSheet))
                dispatch(setDataToBeLoopedForPostRequest(tShapeMetricData, selectedSheet))
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Double Angles').toUpperCase()) {
                setDataToBeLooped(doubleAnglesMetricData)
                // dispatch(setCurrentShape('Double Angles', selectedSheet))
                dispatch(setDataToBeLoopedForPostRequest(doubleAnglesMetricData, selectedSheet))
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Rectangular HSS').toUpperCase()) {
                setDataToBeLooped(recHSSMetricData)
                // dispatch(setCurrentShape('Rectangular HSS', selectedSheet))
                dispatch(setDataToBeLoopedForPostRequest(recHSSMetricData, selectedSheet))
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Round HSS').toUpperCase()) {
                setDataToBeLooped(roundHSSMetricData)
                // dispatch(setCurrentShape('Round HSS', selectedSheet))
                dispatch(setDataToBeLoopedForPostRequest(roundHSSMetricData, selectedSheet))
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Pipe').toUpperCase()) {
                setDataToBeLooped(pipeMetricData)
                // dispatch(setCurrentShape('Pipe', selectedSheet))
                dispatch(setDataToBeLoopedForPostRequest(pipeMetricData, selectedSheet))
            }
        }
    }, [])

    useEffect(() => {
        for (let index in insertedSectionMetric) {
            if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('I-shaped').toUpperCase()) {
                setDataName('i_shape_metric_name')
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('C-shaped').toUpperCase()) {
                setDataName('c_shape_metric_name')
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Angles').toUpperCase()) {
                setDataName('l_shape_metric_name')
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('T-shaped').toUpperCase()) {
                setDataName('t_shape_metric_name')
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Double Angles').toUpperCase()) {
                setDataName('2l_shape_metric_name')
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Rectangular HSS').toUpperCase()) {
                setDataName('rec_hs_shape_metric_name')
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Round HSS').toUpperCase()) {
                setDataName('round_hs_shape_metric_name')
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Pipe').toUpperCase()) {
                setDataName('pipe_shape_metric_name')
            }
        }
    }, [])

    const hashData = useMemo(() => {
        let hash = {}
        for (let i in designMembersMetric) {
            let {
                design_members_metric_name,
            } = designMembersMetric[i]
            hash[design_members_metric_name] = designMembersMetric[i]
        }
        return hash
    }, [insertedSteelTypesMetric])

    const renderMemberRowsMetric = () => {
        for (let index in dataToBeLooped) {
            const nameValueHandler = () => {
                if (dataToBeLooped === iShapeMetricData) {
                    return iShapeMetricData[index][dataName]
                } else if (dataToBeLooped === cShapeMetricData) {
                    return cShapeMetricData[index][dataName]
                } else if (dataToBeLooped === anglesMetricData) {
                    return anglesMetricData[index][dataName]
                } else if (dataToBeLooped === tShapeMetricData) {
                    return tShapeMetricData[index][dataName]
                } else if (dataToBeLooped === doubleAnglesMetricData) {
                    return doubleAnglesMetricData[index][dataName]
                } else if (dataToBeLooped === recHSSMetricData) {
                    return recHSSMetricData[index][dataName]
                } else if (dataToBeLooped === roundHSSMetricData) {
                    return roundHSSMetricData[index][dataName]
                } else if (dataToBeLooped === pipeMetricData) {
                    return pipeMetricData[index][dataName]
                }
            }

            const depthValue = () => {
                return hashData[nameValueHandler()].design_members_metric_total_depth
            }

            const weightValue = () => {
                return hashData[nameValueHandler()].design_members_metric_weight
            }

            // design_members_metric_total_depth

            // console.log("the names -- ", insertedSectionEnglish[0].sectionName);
            // console.log("the name == ", JSON.stringify(hashMetric[insertedSectionMetric[0].sectionName]));

            const criticalDesignRatioValue = () => {
                let value = null
                    // value = calculatedData[calculatedIndex].mx_ratio
                    // console.log("the pratio == ", JSON.stringify(calculatedData[calculatedIndex].pratio));
                    if((calculatedData[index].pratio > calculatedData[index].mx_ratio) && (calculatedData[index].pratio > calculatedData[index].my_ratio) && (calculatedData[index].pratio > calculatedData[index].vx_ratio) && (calculatedData[index].pratio > calculatedData[index].vy_ratio)) {
                        // console.log("hi haat");
                        value = calculatedData[index].pratio
                    } else if(calculatedData[index].mx_ratio > calculatedData[index].pratio && calculatedData[index].mx_ratio > calculatedData[index].my_ratio && calculatedData[index].mx_ratio > calculatedData[index].vx_ratio && calculatedData[index].mx_ratio > calculatedData[index].vy_ratio) {
                        // console.log("ahiuihi");
                        value = calculatedData[index].mx_ratio
                    } else if(calculatedData[index].my_ratio > calculatedData[index].pratio && calculatedData[index].my_ratio > calculatedData[index].mx_ratio && calculatedData[index].my_ratio > calculatedData[index].vx_ratio && calculatedData[index].my_ratio > calculatedData[index].vy_ratio) {
                        // console.log("heshes");
                        value = calculatedData[index].my_ratio
                    } else if(calculatedData[index].vx_ratio > calculatedData[index].pratio && calculatedData[index].vx_ratio > calculatedData[index].mx_ratio && calculatedData[index].vx_ratio > calculatedData[index].my_ratio && calculatedData[index].vx_ratio > calculatedData[index].vy_ratio) {
                        // console.log("atututu");
                        value = calculatedData[index].vx_ratio
                    } else if(calculatedData[index].vy_ratio > calculatedData[index].pratio && calculatedData[index].vy_ratio > calculatedData[index].mx_ratio && calculatedData[index].vy_ratio > calculatedData[index].my_ratio && calculatedData[index].vy_ratio > calculatedData[index].vx_ratio) {
                        // console.log("hihihihi");
                        value = calculatedData[index].vy_ratio
                    } else {
                        // console.log("ho haaa");
                    }
                return value
            }

            memberRows.push(
                <div style={{
                    textAlign: 'center'
                }}
                     key={index}
                >
                    <div style={{
                        display: 'flex',
                    }}
                    >
                        <p style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{parseFloat(index) + 1}</strong>
                        </p>
                        <div style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {/*{JSON.stringify(sectionsMetric)}*/}
                            <strong>{nameValueHandler()}</strong>
                            {/*section name*/}
                            {/*<strong>{hashMetric['W1100X499']}</strong>*/}
                        </div>
                        <p style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{depthValue()}</strong>
                            {/*<strong>{nameValueHandler()}</strong>*/}
                            {/*<strong>{depthValue()}</strong>*/}
                            {/*<strong>{system === 'Metric' ? hashData[nameValueHandler()].design_members_metric_total_depth : hashData[nameValueHandlerEnglish()].design_members_english_total_depth}</strong>*/}
                            {/*<strong>Overall depth(mm)</strong>*/}
                        </p>
                        <p style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{weightValue()}</strong>
                            {/*<strong>{system === 'Metric' ? hashMetric[nameValueHandler()].design_members_metric_weight : hashEnglish[nameValueHandler()].design_members_english_weight}</strong>*/}
                        </p>
                        <p style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {/*<strong>{calculatedData[index].pt}</strong>*/}
                            {/*<strong>{(criticalDesignRatioValue()).toFixed(2)}</strong>*/}
                        </p>
                        <p style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {/*<strong>{(calculatedData[index].k_lr).toFixed(2)}</strong>*/}
                            {/*<strong>KL/r value</strong>*/}
                        </p>
                    </div>
                </div>
            )
        }
        return (
            <div style={{marginBottom: '1em'}}>
                {memberRows}
            </div>
        )
    }
    return renderMemberRowsMetric()
}
export default DesignMembersRows
