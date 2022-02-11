import Grid from "@material-ui/core/Grid";
import {Button, Card} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MaterialProperties from "../materialProperties/MaterialProperties";
import SectionProperties from "../sectionProperties/SectionProperties";
import MemberFieldRows from "./memberFieldRows/MemberFieldRows";
import {useDispatch, useSelector} from "react-redux";
import {ENGLISH, METRIC} from "../../../../config";
import {size} from "lodash";
import {
    addInitialMember, clearRemovedMembersArray, removeAllMemberRows,
    shiftRemovedMemberRows
} from "../../../../store/actions/sheets/sheetCalculationComponents/memberFields/memberFields";
import {
    getSectionPropertiesMetric,
    getSteelTypesEnglishAPI,
    getSteelTypesMetricAPI
} from "../../../../store/actions/sheets/sheets";
import {objectChecker} from "../../../../utilities/utilities";


const Members = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = useSelector(state => state.sheets.sheets[selectedSheet].system)
    const members = useSelector(state => state.sheets.sheets[selectedSheet].members)
    const removedMemberRowsArray = useSelector(state => state.sheets.sheets[selectedSheet].removedMemberRowArray)
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])

    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        if(method === 'Investigation') {
            setDisableButton(false)
        } else if(method === 'Design') {
            setDisableButton(true)
        }
    }, [method])

    const unitHandler = () => {
        return system === 'Metric' ? METRIC : ENGLISH
    }

    const getSteelTypesMetric = () => {
        fetch("http://127.0.0.1:8080/steeltypesmetric")
            .then((response) => response.json())
            .then((data) => dispatch(getSteelTypesMetricAPI(data, selectedSheet)))
            //     .then((data) => alert(JSON.stringify(data)))
            .catch((error) => {
                console.log(error)
            });
    }

    const getSteelTypesEnglish = () => {
        fetch("http://127.0.0.1:8080/steeltypesenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getSteelTypesEnglishAPI(data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            });
    }

    // const fetchSectionPropertiesMetric = () => {
    //     fetch("http://127.0.0.1:8080/sectionpropertiesmetric")
    //         .then((response) => response.json())
    //         .then((data) => dispatch(getSectionPropertiesMetric(data, selectedSheet)))
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }


    useEffect(() => {
        getSteelTypesMetric()
        getSteelTypesEnglish()
        // fetchSectionPropertiesMetric()
    }, [])

    const insertNewMember = () => {
        if(size(members) === 0) {
            let initialMember = {}
            initialMember[0] = {
                memberId: 1,
                materialId: 1,
                sectionId: 1,
                totalLengthOfMember: 1,
                yAxisUnbracedLength: 1,
                yAxisEffectiveLengthFactor: 1,
                zAxisUnbracedLength: 1,
                zAxisEffectiveLengthFactor: 1,
                LLT: '1.0',
                unbracedLengthLateralTorsional: 1.0,
                lateralTorsionalModificationFactor: 1.0,
                slendernessRatioInCompression: 200,
                LST: 300
            }
            dispatch(addInitialMember(initialMember, selectedSheet))
        } else if(removedMemberRowsArray.length > 0) {
            // alert("I am called")
            // const newSizeIndex = Object.keys(members).length - 1
            const sortedRemovedMemberRowsArray = removedMemberRowsArray.sort()
            const newSizeIndex = sortedRemovedMemberRowsArray.shift()
            // alert("the new size " + newSizeIndex)
            const currentMembers = {...members}
            currentMembers[newSizeIndex] = {
                memberId: parseFloat(newSizeIndex) + parseFloat(1),
                materialId: 1,
                sectionId: 1,
                totalLengthOfMember: 1,
                yAxisUnbracedLength: 1,
                yAxisEffectiveLengthFactor: 1,
                zAxisUnbracedLength: 1,
                zAxisEffectiveLengthFactor: 1,
                LLT: '1.0',
                unbracedLengthLateralTorsional: 1.0,
                lateralTorsionalModificationFactor: 1.0,
                slendernessRatioInCompression: 200,
                LST: 300
            }
            dispatch(addInitialMember(currentMembers, selectedSheet))
            // dispatch(shiftRemovedMemberRows(newRemovedMemberRowsArray, selectedSheet))
        } else {
            const newSizeIndex = size(members)
            const currentMembers = {...members}
            currentMembers[newSizeIndex] = {
                memberId: size(members) + 1,
                materialId: 1,
                sectionId: 1,
                totalLengthOfMember: 1,
                yAxisUnbracedLength: 1,
                yAxisEffectiveLengthFactor: 1,
                zAxisUnbracedLength: 1,
                zAxisEffectiveLengthFactor: 1,
                LLT: '1.0',
                unbracedLengthLateralTorsional: 1.0,
                lateralTorsionalModificationFactor: 1.0,
                slendernessRatioInCompression: 200,
                LST: 300
            }
            dispatch(addInitialMember(currentMembers, selectedSheet))
        }
    }

    const deleteAllMemberRows = () => {

        if (size(members) === 0) {
            return;
        } else if (size(members) !== 0) {
            const proceed = window.confirm("Are you sure you want to delete all member rows?");
            if (proceed) {
                dispatch(removeAllMemberRows(selectedSheet))
                dispatch(clearRemovedMembersArray(selectedSheet))
            } else {
                return
            }
        }
    }

    return (
            <Grid style={{
                margin: '0 auto',
            }}>
                <div style={{
                    height: '10%',
                    backgroundColor: '#fff',
                    textAlign: 'right',
                    padding: '1em 1em 0 1em'
                }}>
                    <Button
                        disabled={disableButton}
                        style={{margin: '5px'}}
                        variant='contained'
                        color='primary'
                        onClick={() => insertNewMember()}
                    >
                        ADD MEMBER
                    </Button>
                    <Button
                        disabled={disableButton}
                        style={{margin: '5px'}}
                        variant='contained'
                        color='secondary'
                        onClick={deleteAllMemberRows}
                    >
                        REMOVE ALL
                    </Button>
                </div>
                <div style={{
                    backgroundColor: '#fff',
                    padding: '1em'
                }}>
                    <Card style={{
                        backgroundColor: '#efefef',
                        border: '1px solid black',
                    }}>
                        <div style={{
                            padding: '1em'
                        }}>
                            <div style={{
                                display: 'flex',
                            }}>
                                <div style={{
                                    paddingRight: '0px',
                                    width: '7.14%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        padding: '5px',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <p>
                                            <strong>Member ID <sub></sub></strong>
                                        </p>
                                    </div>
                                </div>
                                <div style={{
                                    paddingRight: '0px',
                                    paddingLeft: '0px',
                                    width: '7.14%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        padding: '5px',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <p>
                                            <strong>Material ID <sub></sub></strong>
                                        </p>
                                    </div>
                                </div>
                                <div style={{
                                    paddingRight: '0px',
                                    paddingLeft: '0px',
                                    width: '7.14%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        padding: '5px',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <p>
                                            <strong>Section ID <sub></sub></strong>
                                        </p>
                                    </div>
                                </div>
                                <div style={{
                                    paddingRight: '0px',
                                    paddingLeft: '0px',
                                    width: '7.14%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        padding: '5px',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <p>
                                            <strong>L({unitHandler()}) <sub></sub></strong>
                                        </p>
                                    </div>
                                </div>


                                <div style={{
                                    paddingRight: '0px',
                                    paddingLeft: '0px',
                                    width: '14.28%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{
                                            borderBottom: '1px solid black',
                                            padding: '4px'
                                        }}>
                                            <p style={{margin: '0px 0 0 0', padding: 0, wordBreak: 'break-word'}}>
                                                <strong style={{verticalAlign: 'sub'}}>Buckling about X-axis <sub></sub></strong>
                                            </p>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            padding: '2.5px'
                                        }}>
                                            <div style={{
                                                width: '50%',
                                            }}>
                                                <p style={{margin: 0, padding: '0px', borderRight: '1px solid black'}}>
                                                    <strong>L<sub>x</sub>({unitHandler()}) <sub></sub></strong>
                                                </p>
                                            </div>
                                            <div style={{
                                                width: '50%'
                                            }}>
                                                <p style={{margin: 0, padding: '0px'}}>
                                                    <strong>K<sub>x</sub> <sub></sub></strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    paddingRight: '0px',
                                    paddingLeft: '0px',
                                    width: '14.28%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{
                                            borderBottom: '1px solid black',
                                            padding: '4px'
                                        }}>
                                            <p style={{margin: '0px 0 0 0', padding: 0, wordBreak: 'break-word'}}>
                                                <strong style={{verticalAlign: 'sub'}}>Buckling about Y-axis <sub></sub></strong>
                                            </p>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            padding: '2.5px'
                                        }}>
                                            <div style={{
                                                width: '50%',
                                            }}>
                                                <p style={{margin: 0, padding: '0px', borderRight: '1px solid black'}}>
                                                    <strong>L<sub>y</sub>({unitHandler()}) <sub></sub></strong>
                                                </p>
                                            </div>
                                            <div style={{
                                                width: '50%'
                                            }}>
                                                <p style={{margin: 0, padding: '0px'}}>
                                                    <strong>K<sub>y</sub> <sub></sub></strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    paddingRight: '0px',
                                    paddingLeft: '0px',
                                    width: '7.14%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        padding: '5px',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <p>
                                            <strong>LLT <sub></sub></strong>
                                        </p>
                                    </div>
                                </div>
                                <div style={{
                                    paddingRight: '0px',
                                    paddingLeft: '0px',
                                    width: '7.14%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        padding: '5px',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <p>
                                            <strong>C<sub>bx </sub></strong>
                                        </p>
                                    </div>
                                </div>
                                <div style={{
                                    paddingRight: '0px',
                                    paddingLeft: '0px',
                                    width: '7.14%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        padding: '5px',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <p>
                                            <strong>C<sub>by</sub></strong>
                                        </p>
                                    </div>
                                </div>
                                <div style={{
                                    paddingRight: '0px',
                                    paddingLeft: '0px',
                                    width: '7.14%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        padding: '5px',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <p>
                                            <strong>LSC <sub></sub></strong>
                                        </p>
                                    </div>
                                </div>
                                <div style={{
                                    paddingRight: '0px',
                                    paddingLeft: '0px',
                                    width: '7.14%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        padding: '5px',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <p>
                                            <strong>LST <sub></sub></strong>
                                        </p>
                                    </div>
                                </div>
                                <div style={{
                                    paddingLeft: '0px',
                                    width: '7.14%',
                                }}>
                                    <div style={{
                                        marginBottom: '0px',
                                        border: '1px solid black',
                                        padding: '5px',
                                        backgroundColor: '#e2e2e2',
                                        textAlign: 'center'
                                    }}>
                                        <p><strong>DELETE <sub></sub></strong></p>
                                    </div>
                                </div>
                            </div>
                            <MemberFieldRows/>
                        </div>

                        <div style={{
                            display: 'flex',
                        }}>
                            <MaterialProperties/>
                            <SectionProperties/>
                        </div>
                    </Card>
                </div>
            </Grid>
    )
}
export default Members;
