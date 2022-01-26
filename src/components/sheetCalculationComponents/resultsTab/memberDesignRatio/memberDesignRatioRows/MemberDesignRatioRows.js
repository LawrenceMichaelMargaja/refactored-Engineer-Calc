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
            let combinedBG = '#fff'
            let klrBG = '#fff'
            let statusBG = '#fff'
            let statusText = ''

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
            if (calculatedData[calculatedIndex].combined > 1.0) {
                combinedBG = 'pink'
            }
            if (calculatedData[calculatedIndex].k_lr > 1.0) {
                klrBG = 'pink'
            }
            if (calculatedData[calculatedIndex].pratio > 1.0 || calculatedData[calculatedIndex].mx_ratio > 1.0 || calculatedData[calculatedIndex].my_ratio > 1.0 || calculatedData[calculatedIndex].vx_ratio > 1.0 || calculatedData[calculatedIndex].vy_ratio > 1.0 || calculatedData[calculatedIndex].combined > 1.0 || calculatedData[calculatedIndex].k_lr > 1.0) {
                statusBG = 'pink'
                statusText = 'FAIL'
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
            if (calculatedData[calculatedIndex].combined < 1.0) {
                combinedBG = 'lightGreen'
            }
            if (calculatedData[calculatedIndex].k_lr < 1.0) {
                klrBG = 'lightGreen'
            }
            if (calculatedData[calculatedIndex].pratio > 0.95 || calculatedData[calculatedIndex].mx_ratio > 0.95 || calculatedData[calculatedIndex].my_ratio > 0.95 || calculatedData[calculatedIndex].vx_ratio > 0.95 || calculatedData[calculatedIndex].vy_ratio > 0.95 || calculatedData[calculatedIndex].combined > 0.95 || calculatedData[calculatedIndex].k_lr > 0.95) {
                statusBG = 'yellow'
                statusText = 'WARNING'
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
            if (calculatedData[calculatedIndex].combined == 1.0) {
                combinedBG = '#fff'
            }
            if (calculatedData[calculatedIndex].k_lr == 1.0) {
                klrBG = '#fff'
            }
            if (calculatedData[calculatedIndex].pratio < 0.95 || calculatedData[calculatedIndex].mx_ratio < 0.95 || calculatedData[calculatedIndex].my_ratio < 0.95 || calculatedData[calculatedIndex].vx_ratio < 0.95 || calculatedData[calculatedIndex].vy_ratio < 0.95 || calculatedData[calculatedIndex].combined < 0.95 || calculatedData[calculatedIndex].k_lr < 0.95) {
                statusBG = 'lightGreen'
                statusText = 'PASS'
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
                            width: '11.11%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{parseFloat(calculatedIndex) + 1} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '11.11%',
                            backgroundColor: `${pratioBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{Math.abs(calculatedData[calculatedIndex].pratio).toFixed(2)} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '11.11%',
                            backgroundColor: `${mxRatioBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{Math.abs(calculatedData[calculatedIndex].mx_ratio).toFixed(2)} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '11.11%',
                            backgroundColor: `${myRatioBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{Math.abs(calculatedData[calculatedIndex].my_ratio).toFixed(2)} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '11.11%',
                            backgroundColor: `${vxRatioBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{Math.abs(calculatedData[calculatedIndex].vx_ratio).toFixed(2)} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '11.11%',
                            backgroundColor: `${vyRatioBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{Math.abs(calculatedData[calculatedIndex].vy_ratio).toFixed(2)} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '11.11%',
                            backgroundColor: `${combinedBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{Math.abs(calculatedData[calculatedIndex].combined).toFixed(2)} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '11.11%',
                            backgroundColor: `${klrBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{Math.abs(calculatedData[calculatedIndex].k_lr).toFixed(2)} <sub> </sub></strong>
                        </p>
                        <p style={{
                            width: '11.11%',
                            backgroundColor: `${statusBG}`,
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{statusText}<sub> </sub></strong>
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
