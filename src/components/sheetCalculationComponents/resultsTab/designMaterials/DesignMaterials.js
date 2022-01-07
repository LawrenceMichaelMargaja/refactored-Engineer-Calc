import React, {useEffect, useState} from "react";
import DesignMaterialsRows from "./designMaterialsRows/DesignMaterialsRows";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../utilities/utilities";

const DesignMaterials = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])

    const [unit, setUnit] = useState('')

    useEffect(() => {
        if(system === 'Metric') {
            setUnit('(MPa)')
        } else if(system === 'English') {
            setUnit('(ksi)')
        }
    }, [system])

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
                    <p><strong>Design Materials</strong></p>
                </div>

                <div style={{
                    display: 'flex',
                    height: '100%'
                }}>
                    <div style={{
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
                            <strong>ID <sub> </sub></strong>
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
                            <strong>E{unit} <sub> </sub> </strong>
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
                            <strong>F<sub>y</sub>{unit}</strong>
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
                            <strong>F<sub>u</sub>{unit}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <DesignMaterialsRows/>
        </>
    )
}

export default DesignMaterials