import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import SectionPropertiesRows from "../../membersTab/sectionProperties/sectionPropertiesRows/SectionPropertiesRows";
import SectionPropertiesResultsRows from "./sectionPropertiesRows/SectionPropertiesRows";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../utilities/utilities";

const SectionProperties = () => {

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
        <>
            <div style={{
                margin: '0 auto',
                padding: '15px',
                textAlign: 'center'
            }}
            >
                <Card style={{
                    marginBottom: '0px',
                    border: '1px solid black',
                    padding: '5px',
                    height: '50%',
                    backgroundColor: '#f2f2f2',
                }}>
                    <p style={{margin: '0px'}}><strong>Section Properties</strong></p>
                </Card>
                <div style={{
                    display: 'flex',
                    height: '100%',
                }}>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>ID</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>Name</strong>
                        </p>
                    </div>

                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>A({unit}<sup>4</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>J({unit}<sup>4</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>I<sub>xp</sub>({unit}<sup>4</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>I<sub>yp</sub>({unit}<sup>4</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>I<sub>w</sub>({unit}<sup>6</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>S<sub>xp</sub>({unit}<sup>3</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>S<sub>yp</sub>({unit}<sup>4</sup>)</strong>
                        </p>
                    </div>
                </div>
            </div>
            <SectionPropertiesResultsRows/>
        </>
    )
}

export default SectionProperties