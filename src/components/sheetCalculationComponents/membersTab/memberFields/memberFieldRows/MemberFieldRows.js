import React, {useEffect, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    removeMemberRow,
    setLateralTorsionalModificationFactor,
    setLLT, setLST,
    setMaterialId,
    setMemberId, setRemovedMemberRows,
    setSectionId, setSlendernessRatioInCompression, setSlendernessRatioInTension,
    setTotalLengthOfMember, setUnbracedLengthLateralTorsional,
    setYAxisEffectiveLengthFactor,
    setYAxisUnbracedLength, setZAxisEffectiveLengthFactor,
    setZAxisUnbracedLength
} from "../../../../../store/actions/sheets/sheetCalculationComponents/memberFields/memberFields";
import {makeStyles} from "@material-ui/core/styles";
import {size} from "lodash";
import {objectChecker} from "../../../../../utilities/utilities";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '90%',
        margin: '10px 0',
        fontWeight: 'bold',
        color: 'black'
    }
}));

const MemberFieldRows = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const members = useSelector(state => state.sheets.sheets[selectedSheet].members)
    const sheets = useSelector(state => state.sheets)
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])

    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        if(method === 'Investigation') {
            setDisableButton(false)
        } else if(method === 'Design') {
            setDisableButton(true)
        }
    }, [method])

    const memberFieldRows = []

    const removeSelectedMember = (memberIndex) => {
        const proceed = window.confirm("Are you sure you want to delete this member row?")
        if(size(members) === 1 && proceed) {
            dispatch(setRemovedMemberRows(memberIndex, selectedSheet))
            dispatch(removeMemberRow(selectedSheet, memberIndex))
        } else if(proceed) {
            dispatch(setRemovedMemberRows(memberIndex, selectedSheet))
            dispatch(removeMemberRow(selectedSheet, memberIndex))
        }
    }

    for(let memberIndex in members) {

        const memberId = sheets.sheets[selectedSheet].members[memberIndex].memberId
        const materialId = sheets.sheets[selectedSheet].members[memberIndex].materialId
        const sectionId = sheets.sheets[selectedSheet].members[memberIndex].sectionId
        const totalLengthOfMember = sheets.sheets[selectedSheet].members[memberIndex].totalLengthOfMember
        const yAxisUnbracedLength = sheets.sheets[selectedSheet].members[memberIndex].yAxisUnbracedLength
        const yAxisEffectiveLengthFactor = sheets.sheets[selectedSheet].members[memberIndex].yAxisEffectiveLengthFactor
        const zAxisUnbracedLength = sheets.sheets[selectedSheet].members[memberIndex].zAxisUnbracedLength
        const zAxisEffectiveLengthFactor = sheets.sheets[selectedSheet].members[memberIndex].zAxisEffectiveLengthFactor
        const LLT = sheets.sheets[selectedSheet].members[memberIndex].LLT
        const unbracedLengthLateralTorsional = sheets.sheets[selectedSheet].members[memberIndex].unbracedLengthLateralTorsional
        const lateralTorsionalModificationFactor = sheets.sheets[selectedSheet].members[memberIndex].lateralTorsionalModificationFactor
        const slendernessRatioInCompression = sheets.sheets[selectedSheet].members[memberIndex].slendernessRatioInCompression
        const LST = sheets.sheets[selectedSheet].members[memberIndex].LST

        const memberIdHandler = (event) => {
            dispatch(setMemberId(event.target.value, selectedSheet, memberIndex))
        }

        const materialIdHandler = (event) => {
            // alert("at materialID handler -- " + event.target.value)
            dispatch(setMaterialId(event.target.value, selectedSheet, memberIndex))
        }

        const sectionIdHandler = (event) => {
            dispatch(setSectionId(event.target.value, selectedSheet, memberIndex))
        }

        const totalLengthOfMemberHandler = (event) => {
            dispatch(setTotalLengthOfMember(event.target.value, selectedSheet, memberIndex))
        }

        const yAxisUnbracedLengthHandler = (event) => {
            dispatch(setYAxisUnbracedLength(event.target.value, selectedSheet, memberIndex))
        }

        const yAxisEffectiveLengthFactorHandler = (event) => {
            dispatch(setYAxisEffectiveLengthFactor(event.target.value, selectedSheet, memberIndex))
        }

        const zAxisUnbracedLengthHandler = (event) => {
            dispatch(setZAxisUnbracedLength(event.target.value, selectedSheet, memberIndex))
        }

        const zAxisEffectiveLengthFactorHandler = (event) => {
            dispatch(setZAxisEffectiveLengthFactor(event.target.value, selectedSheet, memberIndex))
        }

        const LLTHandler = (event) => {
            dispatch(setLLT(event.target.value, selectedSheet, memberIndex))
        }

        const unbracedLengthLateralTorsionalHandler = (event) => {
            dispatch(setUnbracedLengthLateralTorsional(event.target.value, selectedSheet, memberIndex))
        }

        const lateralTorsionalModificationFactorHandler = (event) => {
            dispatch(setLateralTorsionalModificationFactor(event.target.value, selectedSheet, memberIndex))
        }

        const slendernessRatioInCompressionHandler = (event) => {
            dispatch(setSlendernessRatioInCompression(event.target.value, selectedSheet, memberIndex))
        }

        const slendernessRatioInTensionHandler = (event) => {
            dispatch(setSlendernessRatioInTension(event.target.value, selectedSheet, memberIndex))
        }

        const LSTHandler = (event) => {
            dispatch(setLST(event.target.value, selectedSheet, memberIndex))
        }



        memberFieldRows.push(
            <div style={{
                display: 'flex',
                width: '100%',
            }}
                 key={memberIndex}
            >
                <div style={{
                    paddingRight: '0px',
                    width: '7.14%',
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => memberIdHandler(event)}
                            value={memberId}
                            disabled={true}
                            type='number'
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}

                        />
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
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => materialIdHandler(event)}
                            type='number'
                            value={materialId}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
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
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => sectionIdHandler(event)}
                            type='number'
                            value={sectionId}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
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
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => totalLengthOfMemberHandler(event)}
                            type='number'
                            value={totalLengthOfMember}
                            inputProps={{
                                style: {
                                    textAlign: 'center',
                                }
                            }}
                            // InputProps={{disableUnderline: 'true'}}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
                    </div>
                </div>

                {/*// =================================================================== Ly(m) =============================================================*/}
                <div style={{
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: '7.14%',
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        // padding: '5px',
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => yAxisUnbracedLengthHandler(event)}
                            type='number'
                            value={yAxisUnbracedLength}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
                    </div>
                </div>

                {/*// =================================================================== Ky =============================================================*/}
                <div style={{
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: '7.14%',
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => yAxisEffectiveLengthFactorHandler(event)}
                            type='number'
                            value={yAxisEffectiveLengthFactor}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
                    </div>
                </div>

                {/*// =================================================================== Ly(m) =============================================================*/}
                <div style={{
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: '7.14%',
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => zAxisUnbracedLengthHandler(event)}
                            type='number'
                            value={zAxisUnbracedLength}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
                    </div>
                </div>

                {/*// =================================================================== Ky =============================================================*/}
                <div style={{
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: '7.14%',
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => zAxisEffectiveLengthFactorHandler(event)}
                            type='number'
                            value={zAxisEffectiveLengthFactor}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
                    </div>
                </div>

                {/*// =================================================================== LLT(m) =============================================================*/}
                <div style={{
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: '7.14%',
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => LLTHandler(event)}
                            type='number'
                            value={LLT}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
                    </div>
                </div>

                {/*// =================================================================== Cbx =============================================================*/}
                <div style={{
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: '7.14%',
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => unbracedLengthLateralTorsionalHandler(event)}
                            type='number'
                            value={unbracedLengthLateralTorsional}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
                    </div>
                </div>

                {/*// =================================================================== Cby =============================================================*/}

                <div style={{
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: '7.14%',
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => lateralTorsionalModificationFactorHandler(event)}
                            type='number'
                            value={lateralTorsionalModificationFactor}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
                    </div>
                </div>

                {/*// =================================================================== SRc =============================================================*/}
                <div style={{
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: '7.14%',
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => slendernessRatioInCompressionHandler(event)}
                            type='number'
                            value={slendernessRatioInCompression}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
                    </div>
                </div>

                {/*// =================================================================== LST =============================================================*/}
                <div style={{
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: '7.14%',
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        // height: '100%',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <TextField
                            className={classes.textField}
                            onChange={(event) => LSTHandler(event)}
                            type='number'
                            value={LST}
                            inputProps={{style: {textAlign: 'center'}}}
                            InputProps={{disableUnderline: true}}
                        />
                    </div>
                </div>

                {/*// =================================================================== DELETE =============================================================*/}
                <div style={{
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: '7.14%',
                    textAlign: 'center'
                    // justifyContent: 'center'
                }}>
                    <Button
                        disabled={disableButton}
                        style={{
                            marginTop: '0.5em'
                        }}
                        variant='contained'
                        color='secondary'
                        onClick={() => removeSelectedMember(memberIndex)}
                    >
                        REMOVE
                    </Button>
                </div>
            </div>
        )
    }
    return (
        <div>
            {memberFieldRows}
        </div>
    )
}
export default MemberFieldRows