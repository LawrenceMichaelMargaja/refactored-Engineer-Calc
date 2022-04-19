import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";

const MemberDesignCapacityRows = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const members = objectChecker(sheets, ['sheets', selectedSheet, 'members'])
    const calculatedData = objectChecker(sheets, ['sheets', selectedSheet, 'calculatedData'])

    let memberRows = []

    const renderMemberRows = () => {

            for(let calculatedIndex in calculatedData) {

                let systemValue = 'Metric'

                if(system === 'Metric') {
                    systemValue = 'Metric'
                } else  if(system === 'English') {
                    systemValue = 'English'
                }

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
                                <strong>{(calculatedData[calculatedIndex].pt).toFixed(3)}</strong>
                                {/*<strong>{systemValue === 'Metric' ? (calculatedData[calculatedIndex].pt).toFixed(3) : (1 / 4.4482216 * (calculatedData[calculatedIndex].pt)).toFixed(3)} <sub> </sub></strong>*/}
                            </p>
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{(calculatedData[calculatedIndex].pc).toFixed(3)}</strong>
                                {/*<strong>{systemValue === 'Metric' ? (calculatedData[calculatedIndex].pc).toFixed(3) : (1 / 4.4482216 * (calculatedData[calculatedIndex].pc)).toFixed(3)} <sub> </sub></strong>*/}
                            </p>
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{(calculatedData[calculatedIndex].mcx).toFixed(3)}</strong>
                                {/*<strong>{systemValue === 'Metric' ? (calculatedData[calculatedIndex].mcx).toFixed(3) : (1 / 1.35581795 * calculatedData[calculatedIndex].mcx).toFixed(3)} <sub> </sub></strong>*/}
                            </p>
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{(calculatedData[calculatedIndex].mcy).toFixed(3)}</strong>
                                {/*<strong>{systemValue === 'Metric' ? (calculatedData[calculatedIndex].mcy).toFixed(3) : (1 / 1.35581795 * calculatedData[calculatedIndex].mcy).toFixed(3)} <sub> </sub></strong>*/}
                            </p>
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{(calculatedData[calculatedIndex].vcx).toFixed(3)}</strong>
                                {/*<strong>{systemValue === 'Metric' ? (calculatedData[calculatedIndex].vcx).toFixed(3) : (1 / 4.4482216 * (calculatedData[calculatedIndex].vcx)).toFixed(3)} <sub> </sub></strong>*/}
                            </p>
                            <p style={{
                                width: '14.28%',
                                backgroundColor: '#fff',
                                margin: '0',
                                border: '1px solid black',
                                padding: '0.5em'
                            }}>
                                <strong>{(calculatedData[calculatedIndex].vcy).toFixed(3)}</strong>
                                {/*<strong>{systemValue === 'Metric' ? (calculatedData[calculatedIndex].vcy).toFixed(3) : (1 / 4.4482216 * (calculatedData[calculatedIndex].vcy)).toFixed(3)} <sub> </sub></strong>*/}
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
