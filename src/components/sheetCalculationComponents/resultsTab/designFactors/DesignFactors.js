import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../utilities/utilities";

const DesignFactors = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const provision = objectChecker(sheets, ['sheets', selectedSheet, 'provision'])


    const [unit, setUnit] = useState('')

    useEffect(() => {
        if(provision === 'ASD') {
            setUnit('Ω')
        } else if(provision === 'LRFD') {
            setUnit('Φ')
        }
    }, [provision])

    /**
     * Values from Factors Tab
     */
    const safetyFactorForTensile = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForTensile'])
    const safetyFactorForCompression = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForCompression'])
    const safetyFactorForFlexure = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForFlexure'])
    const safetyFactorForShear = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForShear'])

    /**
     * Values from Details Tab
     */
    const projectUnit = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectUnit'])
    const projectName = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectName'])
    const projectId = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectId'])
    const projectCompany = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectCompany'])
    const projectDesigner = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectDesigner'])
    const projectClient = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectClient'])
    const projectNotes = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectNotes'])


    return (
        <Card style={{
            marginBottom: '0px',
            border: '1px solid black',
            backgroundColor: '#efefef',
        }}>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingTop: '10px',
                margin: '0px'
            }}>
                <strong>Project Unit: </strong> {projectUnit}
            </p>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                margin: '0px'
            }}>
                <strong>Project Name: </strong> {projectName}

            </p>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                margin: '0px'
            }}>
                <strong>Project ID: </strong> {projectId}
            </p>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                margin: '0px'
            }}>
                <strong>Company: </strong> {projectCompany}
            </p>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingBottom: '5px',
                margin: '0px'
            }}>
                <strong>Project Designer: </strong> {projectDesigner}
            </p>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingBottom: '5px',
                margin: '0px'
            }}>
                <strong>Project Client: </strong> {projectClient}
            </p>
            <div style={{
                margin: '0px',
                padding: '0px',
                width: '100%'
            }}>
                <p style={{
                    // margin: '0px',
                    padding: '0px',
                    textDecoration: 'underline',
                    fontSize: '1.2rem',
                    textAlign: 'center'
                }}>
                    <strong>Design Input Information</strong>
                </p>
            </div>
            <div style={{
                padding: ' 0 15px 0 15px',
            }}>
                <div style={{
                    marginBottom: '0px',
                    border: '1px solid black',
                    borderBottom: '0px',
                    padding: '5px',
                    height: '50%',
                    // width: '100%',
                    backgroundColor: '#e2e2e2',
                    textAlign: 'center'
                }}>
                    <p><strong>Design Factors</strong></p>
                </div>
            </div>
            <div style={{
                display: 'flex',
                // width: '100%',
                paddingRight: '15px',
                height: '100%',
                textAlign: 'center'
            }}>
                <div style={{
                    padding: ' 0 0px 0 15px',
                    width: '25%',
                    height: '100%'
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        padding: '5px',
                        height: '50%',
                        backgroundColor: '#fff',
                    }}>
                        <strong>{unit}t</strong>
                    </div>
                    <div style={{
                        width: '80%',
                        margin: '0 auto',
                        borderBottom: '1px solid black'
                    }}>
                        <p style={{marginBottom: '0px'}}>{safetyFactorForTensile}</p>
                    </div>
                </div>
                <div style={{
                    padding: '15px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingLeft: '0px',
                    width: '25%',
                    height: '100%'
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        padding: '5px',
                        height: '50%',
                        backgroundColor: '#fff',
                    }}>
                        <strong>{unit}c</strong>
                    </div>
                    <div style={{
                        width: '80%',
                        margin: '0 auto',
                        borderBottom: '1px solid black'
                    }}>
                        <p style={{marginBottom: '0px'}}>{safetyFactorForCompression}</p>
                    </div>
                </div>
                <div style={{
                    padding: '15px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingLeft: '0px',
                    width: '25%',
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
                        <strong>{unit}b</strong>
                    </div>
                    <div style={{
                        width: '80%',
                        margin: '0 auto',
                        borderBottom: '1px solid black'
                    }}>
                        <p style={{marginBottom: '0px'}}>{safetyFactorForFlexure}</p>
                    </div>
                </div>
                <div style={{
                    padding: '15px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingLeft: '0px',
                    width: '25%',
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
                        <strong>{unit}v</strong>
                    </div>
                    <div style={{
                        width: '80%',
                        margin: '0 auto',
                        borderBottom: '1px solid black'
                    }}>
                        <p style={{marginBottom: '0px'}}>{safetyFactorForShear}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default DesignFactors