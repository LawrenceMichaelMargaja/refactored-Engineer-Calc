import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import SectionDimensionResultsRows from "./sectionDimensionRows/SectionDimensionRows";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../utilities/utilities";
import SectionDimensionGraphs from "./sectionDimensionGraphs/SectionDimensionGraphs";

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
            textAlign: 'center',
            overflow: 'scroll'
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
            <SectionDimensionGraphs/>
            <div style={{
                display: 'flex',
                padding: '1em',
                width: '96%',
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
                        <strong>b({unit})</strong>
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
                        <strong>b<sub>f</sub>({unit})</strong>
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
                        <strong>t<sub>f</sub>({unit})</strong>
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
                        <strong>t<sub>b</sub>({unit})</strong>
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
                        <strong>t<sub></sub>({unit})</strong>
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
                        <strong>r<sub></sub>({unit})</strong>
                    </p>
                </div>
            </div>
            <SectionDimensionResultsRows/>
        </Card>
    )
}
export default SectionDimensions;
