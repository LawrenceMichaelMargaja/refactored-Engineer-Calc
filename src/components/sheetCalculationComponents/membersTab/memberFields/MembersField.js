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
import {Stack, Tooltip} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import axios from "axios";
import {setCurrentSectionPropertiesArray} from "../../../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import AddIcon from "@material-ui/icons/Add";


const Members = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = useSelector(state => state.sheets.sheets[selectedSheet].system)
    const members = useSelector(state => state.sheets.sheets[selectedSheet].members)
    const sectionsMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const sectionsEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])
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
    //     axios.get("www.adm-steel.com/steeltypesmetric")
    //         // .then((response) => response.json())
    //         .then((response) => dispatch(getSteelTypesMetricAPI(response.data, selectedSheet)))
    //         //     .then((data) => alert(JSON.stringify(data)))
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }
    //
    // const getSteelTypesEnglish = () => {
    //     axios.get("www.adm-steel.com/steeltypesenglish")
    //         // .then((response) => response.json())
    //         .then((response) => dispatch(getSteelTypesEnglishAPI(response.data, selectedSheet)))
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }
    //
    // const fetchSectionPropertiesMetric = () => {
    //     fetch("www.adm-steel.com/sectionpropertiesmetric")
    //         .then((response) => dispatch(getSectionPropertiesMetric(response.data, selectedSheet)))
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    //
    //
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
        } else {
            const newSizeIndex = size(members)
            const currentMembers = {...members}
            // alert("the memberId == " + JSON.stringify(members[parseFloat(newSizeIndex) - 1].memberId));
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
        dispatch(setAllMemberIndex(correct, selectedSheet))
    }

    const tip = () => {
        return (
            <Tooltip title={<p>the tool tip</p>}><AddIcon/></Tooltip>
        )
    }

    const columns = [
        {
            field: 'memberId',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Member ID',
            sortable: true,
            width: 200
        },
        {
            field: 'materialId',
            headerClassName: 'super-app-theme--header',
            headerName: 'Material ID',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'sectionId',
            headerClassName: 'super-app-theme--header',
            headerName: 'Section ID',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'lm',
            headerClassName: 'super-app-theme--header',
            headerName: system === 'Metric' ? 'L(m)' : 'L(ft)',
            description: 'Total length of the design member',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'lx',
            headerClassName: 'super-app-theme--header',
            headerName: system === 'Metric' ? 'Lx(m)' : 'Lx(ft)',
            description: 'unbraced length for buckling about the weak axis',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'kx',
            headerClassName: 'super-app-theme--header',
            headerName: 'Kx',
            description: 'effective length factor for flexural buckling about x-axis',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'ly',
            headerClassName: 'super-app-theme--header',
            headerName: system === 'Metric' ? 'Ly(m)' : 'Ly(ft)',
            description: 'unbraced length for buckling about the strong axis',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'ky',
            headerClassName: 'super-app-theme--header',
            headerName: 'Ky',
            description: 'effective length factor for flexural buckling about y-axis',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'llt',
            headerClassName: 'super-app-theme--header',
            headerName: system === 'Metric' ? 'LLT(m)' : 'LLT(ft)',
            description: 'unbraced length for laternal torsional buckling',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'cbx',
            headerClassName: 'super-app-theme--header',
            headerName: 'Cbx',
            description: 'coefficient of bending about x',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'cby',
            headerClassName: 'super-app-theme--header',
            headerName: 'Cby',
            description: 'coefficient of bending about y',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'lsc',
            headerClassName: 'super-app-theme--header',
            headerName: 'LSC',
            description: 'slenderness ratio in compression',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'lst',
            headerClassName: 'super-app-theme--header',
            headerName: 'LST',
            description: 'slenderness ratio in tension',
            headerAlign: 'center',
            sortable: true,
            width: 200,
            editable: true,
        },
        {
            field: 'delete',
            headerClassName: 'super-app-theme--header',
            headerName: 'DELETE',
            headerAlign: 'center',
            sortable: false,
            width: 200,
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
            // alert("here man");
            // console.log("The new new members === ", JSON.stringify(newMembers));
            return loading
        } else {
            console.log("The new new members === ", JSON.stringify(newMembers));
            let id = 0
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
            // alert("the index == " + JSON.stringify(index) + " and the diminished index == " + JSON.stringify(modelIndex))
            for(let y in modelValue) {
                if(y === 'materialId') {
                    dispatch(setMaterialId(modelValue[y].value, selectedSheet, modelIndex))
                } else if(y === 'sectionId') {
                    dispatch(setSectionId(modelValue[y].value, selectedSheet, modelIndex))
                    // dispatch(setCurrentSectionPropertiesArray(modelValue[y].value, selectedSheet))
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
    const currentSections = objectChecker(sheets, ['sheets', selectedSheet, 'currentSectionsArray'])
    const insertedSteelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    const insertedSteelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeEnglishProperties'])
    const currentMaterials = objectChecker(sheets, ['sheets', selectedSheet, 'currentMaterialsArray'])
    const sectionDimensionsArray = objectChecker(sheets, ['sheets', selectedSheet, 'sectionDimensionsArrayMetric'])
    const currentSectionPropertiesArray = objectChecker(sheets, ['sheets', selectedSheet, 'currentSectionsArray'])

    return (
        <div style={{height: '100vh'}}>
            <div style={{
                // height: '10%',
                // backgroundColor: '#fff',
                textAlign: 'right',
                padding: '1em 1em 0 1em'
            }}>
                <Tooltip title={<p>Click to add Member Row</p>}>
                    <Button
                        disabled={disableButton}
                        style={{margin: '5px'}}
                        variant='contained'
                        color='primary'
                        onClick={() => insertNewMember()}
                    >
                        ADD MEMBER
                    </Button>
                </Tooltip>
                <Tooltip title={<p>Click to Remove all Member Rows</p>}>
                    <Button
                        disabled={disableButton}
                        style={{margin: '5px'}}
                        variant='contained'
                        color='secondary'
                        onClick={deleteAllMemberRows}
                    >
                        REMOVE ALL
                    </Button>
                </Tooltip>
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
                        '& .MuiDataGrid-row:nth-child(even)': {
                            backgroundColor: '#e1e1e1'
                        },
                        '& .MuiDataGrid-row:nth-child(odd)': {
                            backgroundColor: '#fff'
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            backgroundColor: '#fff'
                        }
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
                    onEditRowsModelChange={(model) => {
                        onChangeHandler(model)
                    }}
                    onCellClick={(model) => {
                        let modelIndex = null
                        for(let index in model) {
                            modelIndex = parseFloat(model.id)
                        }
                        if(model.field === 'delete') {
                            removeSelectedMember(modelIndex)
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
    )
}
export default Members;
