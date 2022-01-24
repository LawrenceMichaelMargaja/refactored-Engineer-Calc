import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";

const MemberDesignRatioRows = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const members = objectChecker(sheets, ['sheets', selectedSheet, 'members'])
    const calculatedData = objectChecker(sheets, ['sheets', selectedSheet, 'calculatedData'])

    const [ptColor, setPtColor] = useState('#fff')
    const [pcColor, setPcColor] = useState('#fff')
    const [mcxColor, setMcxColor] = useState('#fff')
    const [mcyColor, setMcyColor] = useState('#fff')
    const [vcxColor, setVcxColor] = useState('#fff')

    const [pratioColor, setPratioColor] = useState('#fff')
    const [mxRatioColor, setMxRatioColor] = useState('#fff')
    const [myRatioColor, setMyRatioColor] = useState('#fff')
    const [vxRatioColor, setVxRatioColor] = useState('#fff')
    const [vyRatioColor, setVyRatioColor] = useState('#fff')

    // useEffect(() => {
    //     if(calculatedData.pratio > 1.0) {
    //         setPratioColor('light-red')
    //     }
    //     if(calculatedData.mx_ratio > 1.0) {
    //         setMxRatioColor('light-red')
    //     }
    //     if(calculatedData.my_ratio > 1.0) {
    //         setMyRatioColor('light-red')
    //     }
    //     if(calculatedData.vx_ratio > 1.0) {
    //         setVxRatioColor('light-red')
    //     }
    //     if(calculatedData.vy_ratio > 1.0) {
    //         setVyRatioColor('light-red')
    //     }
    // }, [calculatedData])
    //
    // useEffect(() => {
    //     if(calculatedData.pratio < 1.0) {
    //         setPratioColor('yellow')
    //     }
    //     if(calculatedData.mx_ratio < 1.0) {
    //         setMxRatioColor('red')
    //     }
    //     if(calculatedData.my_ratio < 1.0) {
    //         setMyRatioColor('red')
    //     }
    //     if(calculatedData.vx_ratio < 1.0) {
    //         setVxRatioColor('red')
    //     }
    //     if(calculatedData.vy_ratio < 1.0) {
    //         setVyRatioColor('red')
    //     }
    // }, [calculatedData])


    let memberRows = []

    const renderMemberRows = () => {
        for (let calculatedIndex in calculatedData) {

            let pratioBG = '#fff'
            let mxRatioBG = '#fff'
            let myRatioBG = '#fff'
            let vxRatioBG = '#fff'
            let vyRatioBG = '#fff'

            if (calculatedData[calculatedIndex].pratio > 1.0) {
                // setPratioColor('light-red')
                pratioBG = 'pink'
            }
            if (calculatedData[calculatedIndex].mx_ratio > 1.0) {
                // setMxRatioColor('light-pink')
                mxRatioBG = 'pink'
            }
            if (calculatedData[calculatedIndex].my_ratio > 1.0) {
                // setMyRatioColor('light-pink')
                myRatioBG = 'pink'
            }
            if (calculatedData[calculatedIndex].vx_ratio > 1.0) {
                // setVxRatioColor('light-pink')
                vxRatioBG = 'pink'
            }
            if (calculatedData[calculatedIndex].vy_ratio > 1.0) {
                // setVyRatioColor('light-pink')
                vyRatioBG = 'pink'
            }

            if(calculatedData[calculatedIndex].pratio < 1.0) {
                pratioBG = 'lightGreen'
                // setPratioColor('lightGreen')
            }

            if (calculatedData[calculatedIndex].mx_ratio < 1.0) {
                // setMxRatioColor('red')
                mxRatioBG = 'lightGreen'
            }
            if (calculatedData[calculatedIndex].my_ratio < 1.0) {
                // setMyRatioColor('red')
                myRatioBG = 'lightGreen'
            }
            if (calculatedData[calculatedIndex].vx_ratio < 1.0) {
                // setVxRatioColor('red')
                vxRatioBG = 'lightGreen'
            }
            if (calculatedData[calculatedIndex].vy_ratio < 1.0) {
                // setVyRatioColor('red')
                vyRatioBG = 'lightGreen'
            }

            if(calculatedData[calculatedIndex].pratio == 1.0) {
                pratioBG = '#fff'
                // setPratioColor('#fff')
            }
            if (calculatedData[calculatedIndex].mx_ratio == 1.0) {
                // setMxRatioColor('red')
                mxRatioBG = '#fff'
            }
            if (calculatedData[calculatedIndex].my_ratio == 1.0) {
                // setMyRatioColor('red')
                myRatioBG = '#fff'
            }
            if (calculatedData[calculatedIndex].vx_ratio == 1.0) {
                // setVxRatioColor('red')
                vxRatioBG = '#fff'
            }
            if (calculatedData[calculatedIndex].vy_ratio == 1.0) {
                // setVyRatioColor('red')
                vyRatioBG = '#fff'
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
                            width: '8.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{parseFloat(calculatedIndex) + 1} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: `${pratioBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{calculatedData[calculatedIndex].pratio} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: `${mxRatioBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{calculatedData[calculatedIndex].mx_ratio} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: `${myRatioBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{calculatedData[calculatedIndex].my_ratio} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: `${vxRatioBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{calculatedData[calculatedIndex].vx_ratio} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: `${vyRatioBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{calculatedData[calculatedIndex].vy_ratio} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{calculatedData[calculatedIndex].combined} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{calculatedData[calculatedIndex].k_lr} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>PASS<sub> </sub></strong>
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
export default MemberDesignRatioRows
