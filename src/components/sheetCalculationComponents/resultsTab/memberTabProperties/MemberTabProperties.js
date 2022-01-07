import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../utilities/utilities";
import MemberRows from "./memberRows/MemberRows";

const MemberTabProperties = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])

    const [unit, setUnit] = useState('')

    useEffect(() => {
        if(system === 'Metric') {
            setUnit('m')
        } else if(system === 'English') {
            setUnit('ft')
        }
    }, [system])

    return (
        <>
            <div style={{
                marginTop: '5%',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    padding: '0 15px 0 15px',
                    marginBottom: '1%'
                }}
                >
                    <div style={{
                        width: '14.28%',
                    }}>
                        <div style={{
                            margin: '0 auto',
                            border: '1px solid black',
                            backgroundColor: '#fff'
                        }}>
                            <p><strong>Member ID <sub> </sub></strong></p>
                        </div>
                    </div>
                    <div style={{
                        width: '14.28%',
                    }}>
                        <div style={{
                            margin: '0 auto',
                            border: '1px solid black',
                            backgroundColor: '#fff'
                        }}>
                            <p><strong>Material ID <sub> </sub></strong></p>
                        </div>
                    </div>
                    <div style={{
                        width: '14.28%',
                        margin: '0px'
                    }}>
                        <div style={{
                            margin: '0 auto',
                            border: '1px solid black',
                            backgroundColor: '#fff'
                        }}>
                            <p><strong>Section ID <sub> </sub> </strong></p>
                        </div>
                    </div>
                    <div style={{
                        width: '14.28%',
                        margin: '0px'
                    }}>
                        <div style={{
                            width: '100%',
                            margin: '0 auto',
                            border: '1px solid black',
                            backgroundColor: '#fff'
                        }}>
                            <p><strong>K<sub>x</sub>L({unit})</strong></p>
                        </div>
                    </div>
                    <div style={{
                        width: '14.28%',
                        margin: '0px'
                    }}>
                        <div style={{
                            width: '100%',
                            margin: '0 auto',
                            border: '1px solid black',
                            backgroundColor: '#fff'
                        }}>
                            <p><strong>K<sub>y</sub>L({unit})</strong></p>
                        </div>
                    </div>
                    <div style={{
                        width: '14.28%',
                        margin: '0px'
                    }}>
                        <div style={{
                            width: '100%',
                            margin: '0 auto',
                            border: '1px solid black',
                            backgroundColor: '#fff'
                        }}>
                            <p><strong>L<sub>b</sub>({unit})</strong></p>
                        </div>
                    </div>
                    <div style={{
                        width: '14.28%',
                        margin: '0px'
                    }}>
                        <div style={{
                            width: '100%',
                            margin: '0 auto',
                            border: '1px solid black',
                            backgroundColor: '#fff'
                        }}>
                            <p><strong>C<sub>bx</sub></strong></p>
                        </div>
                    </div>
                    <div style={{
                        width: '14.28%',
                        margin: '0px'
                    }}>
                        <div style={{
                            width: '100%',
                            margin: '0 auto',
                            border: '1px solid black',
                            backgroundColor: '#fff'
                        }}>
                            <p><strong>C<sub>by</sub></strong></p>
                        </div>
                    </div>
                </div>
            </div>
            <MemberRows/>
        </>
    )
}

export default MemberTabProperties