import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";

const DesignMaterialsRows = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const steelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesMetric'])
    const steelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesEnglish'])
    const sectionsMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    const sectionsEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])
    const insertedSteelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    const insertedSteelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeEnglishProperties'])

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

    let memberRows = []

    const renderMemberRowsMetric = () => {

        for (let index in insertedSteelTypesMetric) {

            const materialId = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'materialId'])
            const sectionId = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'sectionId'])
            const totalLengthOfMember = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'totalLengthOfMember'])
            const yAxisUnbracedLength = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'yAxisUnbracedLength'])
            const yAxisEffectiveLengthFactor = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'yAxisEffectiveLengthFactor'])
            const zAxisUnbracedLength = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'yAxisEffectiveLengthFactor'])
            const zAxisEffectiveLengthFactor = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'zAxisEffectiveLengthFactor'])
            const LLT = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'LLT'])
            const unbracedLengthLateralTorsional = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'unbracedLengthLateralTorsional'])
            const lateralTorsionalModificationFactor = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'lateralTorsionalModificationFactor'])
            const slendernessRatioInCompression = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'slendernessRatioInCompression'])
            const LST = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'LST'])

            const empaValueHandler = () => {
                if(system === 'Metric') {
                    return insertedSteelTypesMetric[index].EMPA
                } else if(system === 'English') {
                    return hashEnglish[insertedSteelTypesEnglish[index].name].steel_type_english_e
                }
            }

            const fympaValueHandler = () => {
                if(system === 'Metric') {
                    return insertedSteelTypesMetric[index].FYMPA
                } else if(system === 'English') {
                    return hashEnglish[insertedSteelTypesEnglish[index].name].steel_type_english_fy
                }
            }

            const fumpaValueHandler = () => {
                if(system === 'Metric') {
                    return insertedSteelTypesMetric[index].FUMPA
                } else if(system === 'English') {
                    return hashEnglish[insertedSteelTypesEnglish[index].name].steel_type_english_fu
                }
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
                            width: '25%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{insertedSteelTypesMetric[index].id} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '25%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {empaValueHandler()}
                        </p>
                        <p style={{
                            width: '25%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {fympaValueHandler()}
                        </p>
                        <p style={{
                            width: '25%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {fumpaValueHandler()}
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
export default DesignMaterialsRows
