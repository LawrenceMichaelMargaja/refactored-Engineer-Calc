import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";

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
    // alert("I shape english === " + JSON.stringify(iShapeEnglishData))

    let memberRows = []
    const [dataToBeLooped, setDataToBeLooped] = useState('')
    const [dataName, setDataName] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        for (let index in insertedSectionEnglish) {
            if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('I-shaped').toUpperCase()) {
                setDataToBeLooped(iShapeEnglishData)
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('C-shaped').toUpperCase()) {
                setDataToBeLooped(cShapeEnglishData)
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Angles').toUpperCase()) {
                setDataToBeLooped(anglesEnglishData)
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('T-shaped').toUpperCase()) {
                setDataToBeLooped(tShapeEnglishData)
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Double Angles').toUpperCase()) {
                setDataToBeLooped(doubleAnglesEnglishData)
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Rectangular HSS').toUpperCase()) {
                setDataToBeLooped(recHSSEnglishData)
            } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Round HSS').toUpperCase()) {
                setDataToBeLooped(roundHSSEnglishData)
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Pipe').toUpperCase()) {
                setDataToBeLooped(pipeEnglishData)
            }
        }
    }, [system])

    useEffect(() => {
        for (let index in insertedSectionEnglish) {
            if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('I-shaped').toUpperCase()) {
                setDataName('i_shape_english_name')
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('C-shaped').toUpperCase()) {
                setDataName('c_shape_english_name')
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Angles').toUpperCase()) {
                setDataName('l_shape_english_name')
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('T-shaped').toUpperCase()) {
                setDataName('t_shape_english_name')
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Double Angles').toUpperCase()) {
                setDataName('2l_shape_english_name')
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Rectangular HSS').toUpperCase()) {
                setDataName('rec_hs_shape_english_name')
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Round HSS').toUpperCase()) {
                setDataName('round_hs_shape_english_name')
            } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Pipe').toUpperCase()) {
                setDataName('pipe_shape_english_name')
            }
        }
    }, [dataToBeLooped, system])

    const hashData = useMemo(() => {
        let hash = {}
        if (system === 'Metric') {
            for (let i in designMembersMetric) {
                let {
                    design_members_metric_name,
                } = designMembersMetric[i]
                hash[design_members_metric_name] = designMembersMetric[i]
            }
        } else if (system === 'English') {
            for (let i in designMembersEnglish) {
                let {
                    design_members_english_name,
                } = designMembersEnglish[i]
                hash[design_members_english_name] = designMembersEnglish[i]
            }
        }
        return hash
    }, [insertedSteelTypesMetric])

    const hashEnglish = useMemo(() => {
        let hash = {}
        for (let i in designMembersEnglish) {
            let {
                design_members_english_name,
            } = designMembersEnglish[i]
            hash[design_members_english_name] = designMembersEnglish[i]
        }
        return hash
    }, [insertedSteelTypesEnglish])

    const renderMemberRowsMetric = () => {
        for (let index in dataToBeLooped) {
            const nameValueHandlerEnglish = () => {
                if (dataToBeLooped === iShapeEnglishData) {
                    return iShapeEnglishData[index][dataName]
                } else if (dataToBeLooped === cShapeEnglishData) {
                    return cShapeEnglishData[index][dataName]
                } else if (dataToBeLooped === anglesEnglishData) {
                    return anglesEnglishData[index][dataName]
                } else if (dataToBeLooped === tShapeEnglishData) {
                    return tShapeEnglishData[index][dataName]
                } else if (dataToBeLooped === doubleAnglesEnglishData) {
                    return doubleAnglesEnglishData[index][dataName]
                } else if (dataToBeLooped === recHSSEnglishData) {
                    return recHSSEnglishData[index][dataName]
                } else if (dataToBeLooped === roundHSSEnglishData) {
                    return roundHSSEnglishData[index][dataName]
                } else if (dataToBeLooped === pipeEnglishData) {
                    return pipeEnglishData[index][dataName]
                }
            }

            const depthValue = () => {
                return hashData[nameValueHandlerEnglish()].design_members_english_total_depth
            }

            const weightValue = () => {
                return hashData[nameValueHandlerEnglish()].design_members_english_weight
            }

            // design_members_metric_total_depth

            // console.log("the names -- ", insertedSectionEnglish[0].sectionName);
            // console.log("the name == ", JSON.stringify(hashMetric[insertedSectionMetric[0].sectionName]));

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
                            <strong>{nameValueHandlerEnglish()}</strong>
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
                            <strong>Critical Design Ratio</strong>
                        </p>
                        <p style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>KL/r value</strong>
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
