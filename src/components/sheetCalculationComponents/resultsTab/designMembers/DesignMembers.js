import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../utilities/utilities";
import DesignMembersRows from "./designMembersRows/DesignMembersRows";
import DesignMemberRowsEnglish from "./designMembersRows/DesignMemberRowsEnglish";

const DesignMembers = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])

    const [unit, setUnit] = useState('')
    const [weight, setWeight] = useState('')

    useEffect(() => {
        if(system === 'Metric') {
            setWeight('kg/m')
        } else {
            setWeight('kg/ft')
        }
    }, [system])

    useEffect(() => {
        if(system === 'Metric') {
            setUnit('(mm)')
        } else if(system === 'English') {
            setUnit('(inch)')
        }
    }, [system])

    const displayDesignMemberRows = () => {
        if(system === 'Metric') {
            return <DesignMembersRows/>
        } else if(system === 'English') {
            return <DesignMemberRowsEnglish/>
        }
    }

    return (
        <>
            <div style={{
                height: '100%',
                marginTop: '1em',
                textAlign: 'center'
            }}
            >
                <div style={{
                    marginBottom: '0px',
                    border: '1px solid black',
                    borderBottom: '0px',
                    height: '50%',
                    padding: '5px',
                    backgroundColor: '#f2f2f2',
                }}>
                    <p><strong>Design Members</strong></p>
                </div>

                <div style={{
                    display: 'flex',
                    height: '100%'
                }}>
                    <div style={{
                        width: '16.66%',
                        height: '100%'
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            height: '50%',
                            backgroundColor: '#fff',
                        }}>
                            <strong>ID</strong>
                        </div>
                    </div>
                    <div style={{
                        width: '16.66%',
                        height: '100%'
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            height: '50%',
                            backgroundColor: '#fff',
                        }}>
                            <strong>Section</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingTop: '0px',
                        paddingLeft: '0px',
                        width: '16.66%',
                        height: '100%'
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            height: '50%',
                            backgroundColor: '#fff',
                        }}>
                            <strong>Overall Depth{unit}</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingTop: '0px',
                        paddingLeft: '0px',
                        width: '16.66%',
                        height: '100%',
                        margin: '0px'
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            height: '50%',
                            backgroundColor: '#fff',
                        }}>
                            <strong>Weight({weight})</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingTop: '0px',
                        paddingLeft: '0px',
                        width: '16.66%',
                        height: '100%',
                        margin: '0px'
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            height: '50%',
                            backgroundColor: '#fff',
                        }}>
                            <strong>Critical Design Ratio</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingTop: '0px',
                        paddingLeft: '0px',
                        width: '16.66%',
                        height: '100%',
                        margin: '0px'
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            height: '50%',
                            backgroundColor: '#fff',
                        }}>
                            <strong>KL/r</strong>
                        </div>
                    </div>
                </div>
            </div>
            {displayDesignMemberRows()}
            {/*<DesignMembersRows/>*/}
            {/*<DesignMaterialsRows/>*/}
        </>
    )
}

export default DesignMembers
