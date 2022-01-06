import React from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";

const DesignMaterialsRows = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const sectionsMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const sectionsEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])

    let memberRows = []

    const renderMemberRowsMetric = () => {
        for (let index in sectionsMetric) {

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

            memberRows.push(
                <div style={{
                    textAlign: 'center'
                }}>
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
                            <strong>{parseFloat(index) + 1} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '25%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{materialId} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '25%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{materialId} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '25%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{materialId} <sub> </sub></strong>
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