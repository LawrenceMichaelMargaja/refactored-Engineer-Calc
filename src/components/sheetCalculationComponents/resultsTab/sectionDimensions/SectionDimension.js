import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import SectionDimensionResultsRows from "./sectionDimensionRows/SectionDimensionRows";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../utilities/utilities";

const SectionDimensions = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])

    const [unit, setUnit] = useState('')

    useEffect(() => {
        if(system === 'Metric') {
            setUnit('mm')
        } else if(system === 'English') {
            setUnit('inch')
        }
    }, [system])

    return (
        <Card style={{
            // height: '80vh',
            flexGrow: 1,
            padding: '1em 0',
            marginBottom: '50px',
            border: '1px solid black',
            backgroundColor: '#efefef',
            paddingTop: '1%',
            textAlign: 'center'
        }}
        >
            <Card style={{
                margin: '20px 20px 0px 20px',
                padding: '10px',
                border: '1px solid black',
                backgroundColor: '#e2e2e2',
            }}>
                <strong>Section Dimension</strong>
            </Card>
            <div style={{
                height: '40vh'
            }}>
                <p>Add Graph Here</p>
            </div>
            <div style={{
                display: 'flex',
                padding: '1em',
                width: '90%',
                margin: '0 auto'
            }}>
                <div style={{
                    margin: '0px',
                    border: '1px solid black',
                    padding: '5px',
                    backgroundColor: '#fff',
                    width: '14.28%'
                }}>
                    <p style={{
                        margin: '0px'
                    }}>
                        <strong>ID</strong>
                    </p>
                </div>
                <div style={{
                    margin: '0px',
                    border: '1px solid black',
                    padding: '5px',
                    backgroundColor: '#fff',
                    width: '14.28%'
                }}>
                    <p style={{
                        margin: '0px'
                    }}>
                        <strong>Names</strong>
                    </p>
                </div>
                <div style={{
                    margin: '0px',
                    border: '1px solid black',
                    padding: '5px',
                    backgroundColor: '#fff',
                    width: '14.28%'
                }}>
                    <p style={{
                        margin: '0px'
                    }}>
                        <strong>d({unit})</strong>
                    </p>
                </div>
                <div style={{
                    margin: '0px',
                    border: '1px solid black',
                    padding: '5px 0px 2px 0',
                    backgroundColor: '#fff',
                    width: '14.28%'
                }}>
                    <p style={{
                        margin: '0px'
                    }}>
                        <strong>t<sub>w</sub>({unit})</strong>
                    </p>
                </div>
                <div style={{
                    margin: '0px',
                    border: '1px solid black',
                    padding: '5px 0px 2px 0',
                    backgroundColor: '#fff',
                    width: '14.28%'
                }}>
                    <p style={{
                        margin: '0px'
                    }}>
                        <strong><sub></sub>additional</strong>
                    </p>
                </div>
                <div style={{
                    margin: '0px',
                    border: '1px solid black',
                    padding: '5px 0px 2px 0',
                    backgroundColor: '#fff',
                    width: '14.28%'
                }}>
                    <p style={{
                        margin: '0px'
                    }}>
                        <strong><sub></sub>additional</strong>
                    </p>
                </div>
                <div style={{
                    margin: '0px',
                    border: '1px solid black',
                    padding: '5px 0px 2px 0',
                    backgroundColor: '#fff',
                    width: '14.28%'
                }}>
                    <p style={{
                        margin: '0px'
                    }}>
                        <strong><sub></sub>additional</strong>
                    </p>
                </div>
            </div>
            <SectionDimensionResultsRows/>
        </Card>
    )
}
export default SectionDimensions;