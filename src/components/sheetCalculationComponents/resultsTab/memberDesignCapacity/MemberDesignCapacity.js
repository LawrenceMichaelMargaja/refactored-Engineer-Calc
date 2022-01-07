import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import MemberDesignCapacityRows from "./memberDesignCapacityRows/MemberDesignCapacityRows";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../utilities/utilities";

const MemberDesignCapacity = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])

    const [unit, setUnit] = useState('')

    useEffect(() => {
        if(system === 'Metric') {
            setUnit('kN')
        } else if(system === 'English') {
            setUnit('ft')
        }
    }, [system])

    return (
        <>
            <div style={{
                height: '100%',
                margin: '5% auto 0%',
                padding: '15px 15px 0px 15px',
                textAlign: 'center'
            }}>
                <Card style={{
                    // margin: '0 15px 0 15px',
                    border: '1px solid black',
                    padding: '5px 0',
                    height: '50%',
                    backgroundColor: '#f2f2f2',
                }}>
                    <p style={{margin: '0px'}}><strong>Member Design Capacity</strong></p>
                </Card>
                <div style={{
                    display: 'flex',
                }}>
                    <div style={{
                        padding: '15px 0',
                        width: '14.28%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            backgroundColor: '#fff',
                        }}>
                            <strong> <sub></sub> Member ID</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '14.28%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            backgroundColor: '#fff'
                        }}>
                            <strong>P<sub>n</sub>/Ω<sub>t</sub>(kN)</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '14.28%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            backgroundColor: '#fff'
                        }}>
                            <strong>P<sub>n</sub>/Ω<sub>c</sub>(kN)</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '14.28%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            backgroundColor: '#fff'
                        }}>
                            <strong>M<sub>xn</sub>/Ω<sub>b</sub>(kN)</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '14.28%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            backgroundColor: '#fff'
                        }}>
                            <strong>M<sub>yn</sub>/Ω<sub>b</sub>(kN)</strong>
                        </div>
                    </div>

                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '14.28%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            backgroundColor: '#fff'
                        }}>
                            <strong>V<sub>xn</sub>/Ω<sub>v</sub>(kN)</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '14.28%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            backgroundColor: '#fff'
                        }}>
                            <strong>V<sub>yn</sub>/Ω<sub>v</sub>(kN)</strong>
                        </div>
                    </div>
                </div>
            </div>
            <MemberDesignCapacityRows/>
        </>
    )
}

export default MemberDesignCapacity