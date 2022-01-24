import React from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";

const MemberDesignCapacityRows = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const members = objectChecker(sheets, ['sheets', selectedSheet, 'members'])
    const calculatedData = objectChecker(sheets, ['sheets', selectedSheet, 'calculatedData'])

    let memberRows = []

    const renderMemberRows = () => {

            // const materialId = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'materialId'])
            // const sectionId = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'sectionId'])
            // const totalLengthOfMember = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'totalLengthOfMember'])
            // const yAxisUnbracedLength = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'yAxisUnbracedLength'])
            // const yAxisEffectiveLengthFactor = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'yAxisEffectiveLengthFactor'])
            // const zAxisUnbracedLength = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'yAxisEffectiveLengthFactor'])
            // const zAxisEffectiveLengthFactor = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'zAxisEffectiveLengthFactor'])
            // const LLT = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'LLT'])
            // const unbracedLengthLateralTorsional = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'unbracedLengthLateralTorsional'])
            // const lateralTorsionalModificationFactor = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'lateralTorsionalModificationFactor'])
            // const slendernessRatioInCompression = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'slendernessRatioInCompression'])
            // const LST = objectChecker(sheets, ['sheets', selectedSheet, 'members', index, 'LST'])

            // const result = calculatedData.map(data => ({ pt: data.pt, pc: data.pc, mcx: data.mcx, mcy: data.mcy, vcx: data.vcx, vcy: data.vcy }));
            // console.log("the calculated result == ", result);

            for(let calculatedIndex in calculatedData) {
                memberRows.push(
                    <div style={{
                        textAlign: 'center'
                    }}
                         key={calculatedIndex}
                    >
                        <div style={{
                            display: 'flex',
                            padding: '0 15px 0 15px',
                        }}
                        >
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{parseFloat(calculatedIndex) + 1} <sub> </sub></strong>
                            </p>
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{calculatedData[calculatedIndex].pt} <sub> </sub></strong>
                            </p>
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{calculatedData[calculatedIndex].pc} <sub> </sub></strong>
                            </p>
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{calculatedData[calculatedIndex].mcx} <sub> </sub></strong>
                            </p>
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{calculatedData[calculatedIndex].mcy} <sub> </sub></strong>
                            </p>
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{calculatedData[calculatedIndex].vcx} <sub> </sub></strong>
                            </p>
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{calculatedData[calculatedIndex].vcy} <sub> </sub></strong>
                            </p>
                        </div>
                    </div>
                )
            }
        return (
            <div>
                {memberRows}
            </div>
        )
    }
    return renderMemberRows()
}
export default MemberDesignCapacityRows
