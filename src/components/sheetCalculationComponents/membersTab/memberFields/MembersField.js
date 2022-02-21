import Grid from "@material-ui/core/Grid";
import {Button, Card} from "@material-ui/core";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import MaterialProperties from "../materialProperties/MaterialProperties";
import SectionProperties from "../sectionProperties/SectionProperties";
import MemberFieldRows from "./memberFieldRows/MemberFieldRows";
import {useDispatch, useSelector} from "react-redux";
import {ENGLISH, METRIC} from "../../../../config";
import {size} from "lodash";
import {
    addInitialMember,
    clearRemovedMembersArray,
    removeAllMemberRows, removeMemberRow, setAllMemberIndex,
    setAllMemberValues, setLateralTorsionalModificationFactor, setLLT, setLST,
    setMaterialId,
    setMemberId, setRemovedMemberRows,
    setSectionId, setSelectedMemberIndex, setSlendernessRatioInCompression,
    setTotalLengthOfMember, setUnbracedLengthLateralTorsional,
    setYAxisEffectiveLengthFactor,
    setYAxisUnbracedLength,
    setZAxisEffectiveLengthFactor,
    setZAxisUnbracedLength,
    shiftRemovedMemberRows
} from "../../../../store/actions/sheets/sheetCalculationComponents/memberFields/memberFields";
import {
    getSectionPropertiesMetric,
    getSteelTypesEnglishAPI,
    getSteelTypesMetricAPI
} from "../../../../store/actions/sheets/sheets";
import {objectChecker} from "../../../../utilities/utilities";
import {Stack} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import axios from "axios";


const Members = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = useSelector(state => state.sheets.sheets[selectedSheet].system)
    const members = useSelector(state => state.sheets.sheets[selectedSheet].members)
    const removedMemberRowsArray = useSelector(state => state.sheets.sheets[selectedSheet].removedMemberRowArray)
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])
    const selectedMemberIndex = objectChecker(sheets, ['sheets', selectedSheet, 'selectedMemberIndex'])

    const [disableButton, setDisableButton] = useState(false)

    const getMemberHash = () => {
        let hash = {}
        for(let index in members) {
            hash[members[index].memberId] = members[index]
        }
        return hash
    }

    useEffect(() => {
        if (method === 'Investigation') {
            setDisableButton(false)
        } else if (method === 'Design') {
            setDisableButton(true)
        }
    }, [method])

    const unitHandler = () => {
        return system === 'Metric' ? METRIC : ENGLISH
    }

    // const getSteelTypesMetric = () => {
    //     axios.get("http://127.0.0.1:8080/steeltypesmetric")
    //         // .then((response) => response.json())
    //         .then((data) => dispatch(getSteelTypesMetricAPI(data, selectedSheet)))
    //         //     .then((data) => alert(JSON.stringify(data)))
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }
    //
    // const getSteelTypesEnglish = () => {
    //     axios.get("http://127.0.0.1:8080/steeltypesenglish")
    //         // .then((response) => response.json())
    //         .then((data) => dispatch(getSteelTypesEnglishAPI(data, selectedSheet)))
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }

    // const fetchSectionPropertiesMetric = () => {
    //     fetch("http://127.0.0.1:8080/sectionpropertiesmetric")
    //         .then((response) => response.json())
    //         .then((data) => dispatch(getSectionPropertiesMetric(data, selectedSheet)))
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }


    // useEffect(() => {
    //     getSteelTypesMetric()
    //     getSteelTypesEnglish()
    //     // fetchSectionPropertiesMetric()
    // }, [])

    // const modelHash =

    const insertNewMember = () => {
        if (size(members) === 0) {
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
        }
        // else if (removedMemberRowsArray.length > 0) {
        //     // alert("I am called")
        //     // const newSizeIndex = Object.keys(members).length - 1
        //     const sortedRemovedMemberRowsArray = removedMemberRowsArray.sort()
        //     const newSizeIndex = sortedRemovedMemberRowsArray.shift()
        //     // alert("the new size " + newSizeIndex)
        //     const currentMembers = {...members}
        //     currentMembers[newSizeIndex] = {
        //         memberId: parseFloat(newSizeIndex) + parseFloat(1),
        //         materialId: 1,
        //         sectionId: 1,
        //         totalLengthOfMember: 1,
        //         yAxisUnbracedLength: 1,
        //         yAxisEffectiveLengthFactor: 1,
        //         zAxisUnbracedLength: 1,
        //         zAxisEffectiveLengthFactor: 1,
        //         LLT: '1.0',
        //         unbracedLengthLateralTorsional: 1.0,
        //         lateralTorsionalModificationFactor: 1.0,
        //         slendernessRatioInCompression: 200,
        //         LST: 300
        //     }
        //     dispatch(addInitialMember(currentMembers, selectedSheet))
        //     // dispatch(shiftRemovedMemberRows(newRemovedMemberRowsArray, selectedSheet))
        // }
        else {
            const newSizeIndex = size(members)
            const currentMembers = {...members}
            alert("the memberId == " + JSON.stringify(members[parseFloat(newSizeIndex) - 1].memberId));
            currentMembers[newSizeIndex] = {
                memberId: parseFloat(members[parseFloat(newSizeIndex) - 1].memberId) + 1,
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

    const removeSelectedMember = (memberIndex) => {
        const proceed = window.confirm("Are you sure you want to delete this member row?")
        if(size(members) === 1 && proceed) {
            dispatch(setRemovedMemberRows(memberIndex, selectedSheet))
            dispatch(removeMemberRow(selectedSheet, memberIndex))
        } else if(proceed) {
            dispatch(setRemovedMemberRows(memberIndex, selectedSheet))
            dispatch(removeMemberRow(selectedSheet, memberIndex))
        }
        console.log('members', members);

        const ordered = Object.keys(members).sort().reduce(
            (obj, key) => {
                obj[key] = members[key];
                return obj;
            },
            {}
        );


        let correct = {}

        let iterator = 0
        for (let i in ordered) {
            correct[iterator.toString()] = ordered[i]
            iterator++
        }

        console.log('ordered', ordered);
        console.log('correct', correct);

        // const ordered = () => {
        //     Object.keys(members).sort().reduce(
        //         (obj, key) => {
        //             // obj[key] = members[key];
        //             alert("the obj == " + JSON.stringify(key));
        //             // return obj;
        //         }
        //     );
        // }
        // ordered()
        dispatch(setAllMemberIndex(correct, selectedSheet))
    }

    const columns = [
        {
            field: 'memberId',
            headerClassName: 'super-app-theme--header',
            headerName: 'Member ID',
            width: 150
        },
        {
            field: 'materialId',
            headerClassName: 'super-app-theme--header',
            headerName: 'Material ID',
            width: 150,
            editable: true,
        },
        {
            field: 'sectionId',
            headerClassName: 'super-app-theme--header',
            headerName: 'Section ID',
            width: 150,
            editable: true,
        },
        {
            field: 'lm',
            headerClassName: 'super-app-theme--header',
            headerName: 'L(m)',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'lx',
            headerClassName: 'super-app-theme--header',
            headerName: 'Lx(m)',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            editable: true,
        },
        {
            field: 'kx',
            headerClassName: 'super-app-theme--header',
            headerName: 'Kx',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            editable: true,
        },
        {
            field: 'ly',
            headerClassName: 'super-app-theme--header',
            headerName: 'Ly',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            editable: true,
        },
        {
            field: 'ky',
            headerClassName: 'super-app-theme--header',
            headerName: 'Ky',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            editable: true,
        },
        {
            field: 'llt',
            headerClassName: 'super-app-theme--header',
            headerName: 'LLT',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            editable: true,
        },
        {
            field: 'cbx',
            headerClassName: 'super-app-theme--header',
            headerName: 'Cbx',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            editable: true,
        },
        {
            field: 'cby',
            headerClassName: 'super-app-theme--header',
            headerName: 'Cby',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            editable: true,
        },
        {
            field: 'lsc',
            headerClassName: 'super-app-theme--header',
            headerName: 'LSC',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            editable: true,
        },
        {
            field: 'lst',
            headerClassName: 'super-app-theme--header',
            headerName: 'LST',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            editable: true,
        },
        {
            field: 'delete',
            headerClassName: 'super-app-theme--header',
            headerName: 'DELETE',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            renderCell: () => {
                return (
                    <Button
                        disabled={disableButton}
                        variant='contained'
                        color='secondary'
                        // onClick={() => removeSelectedMember(selectedMemberIndex)}
                    >
                        REMOVE
                    </Button>
                );
            }
        },
    ];

    const newMembers = []
    for(let index in members) {
        newMembers.push(members[index])
    }
    // alert("the new members == " + JSON.stringify(newMembers))
    const displayApiData = () => {
        const loading = [{
            id: 'Calculating...',
            memberId: 'Calculating...',
            materialId: 'Calculating...',
            sectionId: 'Calculating...',
            lm: 'Calculating...',
            lx: 'Calculating...',
            kx: 'Calculating...',
            ly: 'Calculating...',
            ky: 'Calculating...',
            llt: 'Calculating...',
            cbx: 'Calculating...',
            cby: 'Calculating...',
            lsc: 'Calculating...',
            lst: 'Calculating...',
        }]
        if (newMembers === null) {
            alert("here man");
            // console.log("The new new members === ", JSON.stringify(newMembers));
            return loading
        } else {
            console.log("The new new members === ", JSON.stringify(newMembers));
            let id = 0
            // for(let index in newMembers) {
            //     id = index
            // }
            const newOptions = newMembers.map((data) => ({
                id: id++,
                memberId: data.memberId,
                materialId: data.materialId,
                sectionId: data.sectionId,
                lm: data.totalLengthOfMember,
                lx: data.yAxisUnbracedLength,
                kx: data.yAxisEffectiveLengthFactor,
                ly: data.zAxisUnbracedLength,
                ky: data.zAxisEffectiveLengthFactor,
                llt: data.LLT,
                cbx: data.unbracedLengthLateralTorsional,
                cby: data.lateralTorsionalModificationFactor,
                lsc: data.slendernessRatioInCompression,
                lst: data.LST,
            }))
            // alert("new options == " + JSON.stringify(newOptions));
            return (
                newOptions
            )
        }
    }

    // const addModel = useCallback((model) => {
    //     // console.log("the current model == ", JSON.stringify(model));
    // }, [columns])

    const onChangeHandler = (model) => {
        // alert("the model == " + JSON.stringify(model));
        let modelIndex = null
        for(let index in model) {
            modelIndex = parseFloat(index)
            const modelValue = model[index]
            alert("the index == " + JSON.stringify(index) + " and the diminished index == " + JSON.stringify(modelIndex))
            for(let y in modelValue) {
                if(y === 'materialId') {
                    dispatch(setMaterialId(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'sectionId') {
                    dispatch(setSectionId(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'lm') {
                    dispatch(setTotalLengthOfMember(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'lx') {
                    dispatch(setYAxisUnbracedLength(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'kx') {
                    dispatch(setYAxisEffectiveLengthFactor(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'ly') {
                    dispatch(setZAxisUnbracedLength(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'ky') {
                    dispatch(setZAxisEffectiveLengthFactor(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'llt') {
                    dispatch(setLLT(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'cbx') {
                    dispatch(setUnbracedLengthLateralTorsional(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'cby') {
                    dispatch(setLateralTorsionalModificationFactor(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'lsc') {
                    dispatch(setSlendernessRatioInCompression(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'lst') {
                    dispatch(setLST(modelValue[y].value, selectedSheet, modelIndex))
                }
            }
        }
    }

    const height = 200

    return (
        <div style={{height: '100vh'}}>
            <p style={{
                padding: '2em',
                wordWrap: 'break-word'
                // width: '50vw'
            }}>
                {JSON.stringify(members)}
            </p>
            <div style={{
                height: '10%',
                // backgroundColor: '#fff',
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
            <div style={{height: newMembers.length === 1 ? 200: (height + (newMembers.length * 40)), flexGrow: 1, overFlow: 'hidden', margin: '1em 0'}}>
                <DataGrid
                    sx={{
                        width: '100%%',
                        margin: '0 auto',
                        boxShadow: 2,
                        border: 2,
                        // overFlow: 'hidden',
                        color: '#000',
                        justifyContent: 'center',
                        borderColor: 'primary.dark',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                        '& .super-app-theme--header': {
                            backgroundColor: '#184a8c',
                            color: '#fff',
                            justifyContent: 'center',
                        },
                        '& .MuiDataGrid-cell': {
                            justifyContent: 'center',
                            fontWeight: 'bold'
                        },
                        '& .css-1pans1z-MuiDataGrid-virtualScroller': {
                            overflow: 'overlay'
                        },
                        '& .MuiSvgIcon-root': {
                            opacity: 100,
                            fontWeight: 'bold',
                            fill: "#fff" // or whatever you need
                        },
                        '.MuiDataGrid-row:nth-child(even)': {
                            backgroundColor: '#e1e1e1'
                        },
                        '.MuiDataGrid-row:nth-child(odd)': {
                            backgroundColor: '#fff'
                        },
                    }}
                    components={{
                        NoRowsOverlay: () => (
                            <Stack height="100%" alignItems="center" justifyContent="center">
                                Add a row.
                            </Stack>
                        ),
                    }}
                    // sortModel={false}
                    disableColumnSelector
                    componentsProps={{
                        columnMenu: { background: 'red'},
                    }}
                    //{"model":{"1":{"materialId":{"value":"23"}}},"details":{}}
                    onEditRowsModelChange={(model) => {
                        // alert("model == " + JSON.stringify(model));
                        // let modelIndex = null
                        // for(let index in model) {
                        //     modelIndex = parseFloat(index) - 1
                        // }
                        // dispatch(setSelectedMemberIndex(modelIndex, selectedSheet))
                        for(let memberIndex in members) {
                            // alert("memberIndex == " + JSON.stringify(memberIndex));
                        }
                        onChangeHandler(model)
                    }}
                    onCellClick={(model) => {
                        // alert("please");
                        let modelIndex = null
                        for(let index in model) {
                            // alert("the model == " + JSON.stringify(model) );
                            modelIndex = parseFloat(model.id)
                            // alert("the modal index == " + JSON.stringify(modelIndex));
                            // removeSelectedMember(modelIndex)
                            // const modelValue = model[index]
                            // for(let y in modelValue) {
                            //     // alert("here?");
                            //     if(y === 'delete') {
                            //         alert(JSON.stringify(modelIndex));
                            //         // removeSelectedMember(modelIndex)
                            //     }
                            // }
                        }
                        if(model.field === 'delete') {
                            removeSelectedMember(modelIndex)
                            // alert("model" + JSON.stringify(model));
                        } else {
                            return
                        }
                    }}
                    rows={displayApiData()}
                    // rows={rows}
                    disableExtendRowFullWidth={true}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
                <div style={{
                    display: 'flex',
                }}>
                    <MaterialProperties/>
                    <SectionProperties/>
                </div>
            </div>
        </div>
        // // <div>
        //         {/*<Card style={{*/}
        //         {/*    backgroundColor: '#efefef',*/}
        //         {/*    border: '1px solid black',*/}
        //         {/*}}>*/}
        //         {/*    <div style={{*/}
        //         {/*        padding: '1em'*/}
        //         {/*    }}>*/}
        //         {/*        <div style={{*/}
        //         {/*            display: 'flex',*/}
        //         {/*        }}>*/}
        //         {/*            <Grid item xs style={{*/}
        //         {/*                paddingRight: '0px',*/}
        //         {/*                width: '7.14%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    padding: '5px',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <p>*/}
        //         {/*                        <strong>Member ID<sub></sub></strong>*/}
        //         {/*                    </p>*/}
        //         {/*                </div>*/}
        //         {/*            </Grid>*/}
        //         {/*            <Grid item xs style={{*/}
        //         {/*                paddingRight: '0px',*/}
        //         {/*                paddingLeft: '0px',*/}
        //         {/*                width: '7.14%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    padding: '5px',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <p>*/}
        //         {/*                        <strong>Material ID <sub></sub></strong>*/}
        //         {/*                    </p>*/}
        //         {/*                </div>*/}
        //         {/*            </Grid>*/}
        //         {/*            <Grid item xs style={{*/}
        //         {/*                paddingRight: '0px',*/}
        //         {/*                paddingLeft: '0px',*/}
        //         {/*                width: '7.14%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    padding: '5px',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <p>*/}
        //         {/*                        <strong>Section ID <sub></sub></strong>*/}
        //         {/*                    </p>*/}
        //         {/*                </div>*/}
        //         {/*            </Grid>*/}
        //         {/*            <div style={{*/}
        //         {/*                paddingRight: '0px',*/}
        //         {/*                paddingLeft: '0px',*/}
        //         {/*                width: '7.14%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    padding: '5px',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <p>*/}
        //         {/*                        <strong>L({unitHandler()}) <sub></sub></strong>*/}
        //         {/*                    </p>*/}
        //         {/*                </div>*/}
        //         {/*            </div>*/}
        //
        //
        //         {/*            <div style={{*/}
        //         {/*                paddingRight: '0px',*/}
        //         {/*                paddingLeft: '0px',*/}
        //         {/*                width: '14.28%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <div style={{*/}
        //         {/*                        borderBottom: '1px solid black',*/}
        //         {/*                        padding: '4px'*/}
        //         {/*                    }}>*/}
        //         {/*                        <p style={{margin: '0px 0 0 0', padding: 0, wordBreak: 'break-word'}}>*/}
        //         {/*                            <strong style={{verticalAlign: 'sub'}}>Buckling about X-axis <sub></sub></strong>*/}
        //         {/*                        </p>*/}
        //         {/*                    </div>*/}
        //
        //         {/*                    <div style={{*/}
        //         {/*                        display: 'flex',*/}
        //         {/*                        padding: '2.5px'*/}
        //         {/*                    }}>*/}
        //         {/*                        <div style={{*/}
        //         {/*                            width: '50%',*/}
        //         {/*                        }}>*/}
        //         {/*                            <p style={{margin: 0, padding: '0px', borderRight: '1px solid black'}}>*/}
        //         {/*                                <strong>L<sub>x</sub>({unitHandler()}) <sub></sub></strong>*/}
        //         {/*                            </p>*/}
        //         {/*                        </div>*/}
        //         {/*                        <div style={{*/}
        //         {/*                            width: '50%'*/}
        //         {/*                        }}>*/}
        //         {/*                            <p style={{margin: 0, padding: '0px'}}>*/}
        //         {/*                                <strong>K<sub>x</sub> <sub></sub></strong>*/}
        //         {/*                            </p>*/}
        //         {/*                        </div>*/}
        //         {/*                    </div>*/}
        //         {/*                </div>*/}
        //         {/*            </div>*/}
        //         {/*            <div style={{*/}
        //         {/*                paddingRight: '0px',*/}
        //         {/*                paddingLeft: '0px',*/}
        //         {/*                width: '14.28%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <div style={{*/}
        //         {/*                        borderBottom: '1px solid black',*/}
        //         {/*                        padding: '4px'*/}
        //         {/*                    }}>*/}
        //         {/*                        <p style={{margin: '0px 0 0 0', padding: 0, wordBreak: 'break-word'}}>*/}
        //         {/*                            <strong style={{verticalAlign: 'sub'}}>Buckling about Y-axis <sub></sub></strong>*/}
        //         {/*                        </p>*/}
        //         {/*                    </div>*/}
        //
        //         {/*                    <div style={{*/}
        //         {/*                        display: 'flex',*/}
        //         {/*                        padding: '2.5px'*/}
        //         {/*                    }}>*/}
        //         {/*                        <div style={{*/}
        //         {/*                            width: '50%',*/}
        //         {/*                        }}>*/}
        //         {/*                            <p style={{margin: 0, padding: '0px', borderRight: '1px solid black'}}>*/}
        //         {/*                                <strong>L<sub>y</sub>({unitHandler()}) <sub></sub></strong>*/}
        //         {/*                            </p>*/}
        //         {/*                        </div>*/}
        //         {/*                        <div style={{*/}
        //         {/*                            width: '50%'*/}
        //         {/*                        }}>*/}
        //         {/*                            <p style={{margin: 0, padding: '0px'}}>*/}
        //         {/*                                <strong>K<sub>y</sub> <sub></sub></strong>*/}
        //         {/*                            </p>*/}
        //         {/*                        </div>*/}
        //         {/*                    </div>*/}
        //         {/*                </div>*/}
        //         {/*            </div>*/}
        //         {/*            <div style={{*/}
        //         {/*                paddingRight: '0px',*/}
        //         {/*                paddingLeft: '0px',*/}
        //         {/*                width: '7.14%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    padding: '5px',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <p>*/}
        //         {/*                        <strong>LLT <sub></sub></strong>*/}
        //         {/*                    </p>*/}
        //         {/*                </div>*/}
        //         {/*            </div>*/}
        //         {/*            <div style={{*/}
        //         {/*                paddingRight: '0px',*/}
        //         {/*                paddingLeft: '0px',*/}
        //         {/*                width: '7.14%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    padding: '5px',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <p>*/}
        //         {/*                        <strong>C<sub>bx </sub></strong>*/}
        //         {/*                    </p>*/}
        //         {/*                </div>*/}
        //         {/*            </div>*/}
        //         {/*            <div style={{*/}
        //         {/*                paddingRight: '0px',*/}
        //         {/*                paddingLeft: '0px',*/}
        //         {/*                width: '7.14%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    padding: '5px',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <p>*/}
        //         {/*                        <strong>C<sub>by</sub></strong>*/}
        //         {/*                    </p>*/}
        //         {/*                </div>*/}
        //         {/*            </div>*/}
        //         {/*            <div style={{*/}
        //         {/*                paddingRight: '0px',*/}
        //         {/*                paddingLeft: '0px',*/}
        //         {/*                width: '7.14%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    padding: '5px',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <p>*/}
        //         {/*                        <strong>LSC <sub></sub></strong>*/}
        //         {/*                    </p>*/}
        //         {/*                </div>*/}
        //         {/*            </div>*/}
        //         {/*            <div style={{*/}
        //         {/*                paddingRight: '0px',*/}
        //         {/*                paddingLeft: '0px',*/}
        //         {/*                width: '7.14%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    padding: '5px',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <p>*/}
        //         {/*                        <strong>LST <sub></sub></strong>*/}
        //         {/*                    </p>*/}
        //         {/*                </div>*/}
        //         {/*            </div>*/}
        //         {/*            <div style={{*/}
        //         {/*                paddingLeft: '0px',*/}
        //         {/*                width: '7.14%',*/}
        //         {/*            }}>*/}
        //         {/*                <div style={{*/}
        //         {/*                    marginBottom: '0px',*/}
        //         {/*                    border: '1px solid black',*/}
        //         {/*                    padding: '5px',*/}
        //         {/*                    backgroundColor: '#e2e2e2',*/}
        //         {/*                    textAlign: 'center'*/}
        //         {/*                }}>*/}
        //         {/*                    <p><strong>DELETE <sub></sub></strong></p>*/}
        //         {/*                </div>*/}
        //         {/*            </div>*/}
        //         {/*        </div>*/}
        //         {/*        <MemberFieldRows/>*/}
        //         {/*    </div>*/}
        //
        //         {/*    <div style={{*/}
        //         {/*        display: 'flex',*/}
        //         {/*    }}>*/}
        //         {/*        <MaterialProperties/>*/}
        //         {/*        <SectionProperties/>*/}
        //         {/*    </div>*/}
        //         {/*</Card>*/}
        // // </div>
    )
}
export default Members;
