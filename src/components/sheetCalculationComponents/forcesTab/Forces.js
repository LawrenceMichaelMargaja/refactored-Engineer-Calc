import Grid from "@material-ui/core/Grid";
import {Card, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    setAxial,
    setBendingMomentAlongXAxis,
    setBendingMomentAlongYAxis, setShearAlongXAxis, setShearAlongYAxis
} from "../../../store/actions/sheets/sheetCalculationComponents/forces/forces";
import {objectChecker} from "../../../utilities/utilities";
import {Tooltip} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    textField: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        // width: '20rem'
    }
}));

const Forces = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const sheets = useSelector(state => state.sheets)

    // const system = useSelector(state => state.sheets.sheets[selectedSheet].system)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    // const bendingMomentAlongXAxis = useSelector(state => state.sheets.sheets[selectedSheet].forces.bendingMomentAlongXAxis)
    const bendingMomentAlongXAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'bendingMomentAlongXAxis'])
    // const bendingMomentAlongYAxis = useSelector(state => state.sheets.sheets[selectedSheet].forces.bendingMomentAlongYAxis)
    const bendingMomentAlongYAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'bendingMomentAlongYAxis'])
    // const shearAlongXAxis = useSelector(state => state.sheets.sheets[selectedSheet].forces.shearAlongXAxis)
    const shearAlongXAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'shearAlongXAxis'])
    // const shearAlongYAxis = useSelector(state => state.sheets.sheets[selectedSheet].forces.shearAlongYAxis)
    const shearAlongYAxis = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'shearAlongYAxis'])
    // const axial = useSelector(state => state.sheets.sheets[selectedSheet].forces.axial)
    const axial = objectChecker(sheets, ['sheets', selectedSheet, 'forces', 'axial'])


    const bendingMomentAlongXAxisHandler = (event) => {
        dispatch(setBendingMomentAlongXAxis(event.target.value, selectedSheet))
    }

    const bendingMomentAlongYAxisHandler = (event) => {
        dispatch(setBendingMomentAlongYAxis(event.target.value, selectedSheet))
    }

    const shearAlongXAxisHandler = (event) => {
        dispatch(setShearAlongXAxis(event.target.value, selectedSheet))
    }
    const shearAlongYAxisHandler = (event) => {
        dispatch(setShearAlongYAxis(event.target.value, selectedSheet))
    }

    const axialHandler = (event) => {
        dispatch(setAxial(event.target.value, selectedSheet))
    }

    const unitHandlerForBendingFunc = () => {
        if (system === 'Metric') {
            return 'kN-m'
        } else {
            return 'kips-ft'
        }
    }

    const unitHandlerForShearAndAxialFunc = () => {
        if (system === 'Metric') {
            return 'kN'
        } else {
            return 'kips'
        }
    }

    const bendingMomentAlongXAxisValue = bendingMomentAlongXAxis === 0 || bendingMomentAlongXAxis ? bendingMomentAlongXAxis : ''
    const bendingMomentAlongYAxisValue = bendingMomentAlongYAxis === 0 || bendingMomentAlongYAxis ? bendingMomentAlongYAxis : ''
    const shearAlongXAxisValue = shearAlongXAxis === 0 || shearAlongXAxis ? shearAlongXAxis : ''
    const shearAlongYAxisValue = shearAlongYAxis === 0 || shearAlongYAxis ? shearAlongYAxis : ''
    const axialValue = axial === 0 || axial ? axial : ''


    const focusValueChecker = (event) => {
        if (event.target.value === 0 || event.target.value === '0') {
            if (document.activeElement.id === 'bendingMomentAlongXAxis') {
                dispatch(setBendingMomentAlongXAxis(null, selectedSheet))
            } else if (document.activeElement.id === 'bendingMomentAlongYAxis') {
                dispatch(setBendingMomentAlongYAxis(null, selectedSheet))
            } else if (document.activeElement.id === 'shearAlongXAxis') {
                dispatch(setShearAlongXAxis(null, selectedSheet))
            } else if (document.activeElement.id === 'shearAlongYAxis') {
                dispatch(setShearAlongYAxis(null, selectedSheet))
            } else if (document.activeElement.id === 'axial') {
                dispatch(setAxial(null, selectedSheet))
            }
        } else if (event.target.value !== '0') {
            return
        }
    }

    const blurValueChecker = (event) => {
        if (bendingMomentAlongXAxis === null || bendingMomentAlongXAxis === '') {
            dispatch(setBendingMomentAlongXAxis(0, selectedSheet))
        } else if (bendingMomentAlongYAxis === null || bendingMomentAlongYAxis === '') {
            dispatch(setBendingMomentAlongYAxis(0, selectedSheet))
        } else if (shearAlongXAxis === null || shearAlongXAxis === '') {
            dispatch(setShearAlongXAxis(0, selectedSheet))
        } else if (shearAlongYAxis === null || shearAlongYAxis === '') {
            dispatch(setShearAlongYAxis(0, selectedSheet))
        } else if (axial === null || axial === '') {
            dispatch(setAxial(0, selectedSheet))
        }
    }

    return (
        <Grid style={{
            width: '100%',
            height: 'fit-content',
            margin: '0 auto'
        }}>
            <Card style={{
                height: '100%',
                padding: '10px',
            }}>
                <div style={{
                    marginTop: '2em',
                    marginBottom: '2em',
                    // marginLeft: '1em',
                    display: 'flex'
                }}>
                    <div key='bendingMomentAlongXAxis' className={classes.textField} noValidate autoComplete="off">
                        <Tooltip title={<p>Label for Mx</p>}>
                            <div style={{
                                margin: '0 8px',
                                textAlign: 'initial',
                                borderBottom: '1px solid black',
                                paddingLeft: '15px'
                            }}>
                                <strong>Mx({unitHandlerForBendingFunc()})</strong>
                                <sub> </sub>
                            </div>
                        </Tooltip>
                        <TextField
                            type='number'
                            id='bendingMomentAlongXAxis'
                            className={classes.input}
                            label={`Bending Moment about X-axis`}
                            // onKeyPress={(event) => {
                            //     if(event.key === 'enter') {
                            //         event.preventDefault()
                            //     }
                            // }}
                            // onKeyUp={(event) => {
                            //     if(event.key === 'enter') {
                            //         bendingMomentAlongYAxisHandler(event)
                            //     }
                            // }}
                            variant="outlined"
                            type='number'
                            value={bendingMomentAlongXAxisValue}
                            onFocus={(event) => focusValueChecker(event)}
                            onBlur={(event) => blurValueChecker(event)}
                            onChange={(event) => bendingMomentAlongXAxisHandler(event)}
                        />
                        <p>TEST</p>
                    </div>
                    <div key='bendingMomentAlongYAxis' className={classes.textField} noValidate autoComplete="off">
                        <Tooltip title={<p>Label for My</p>}>
                            <div style={{
                                margin: '0 8px',
                                textAlign: 'initial',
                                borderBottom: '1px solid black',
                                paddingLeft: '15px'
                            }}>
                                <strong>My({unitHandlerForBendingFunc()})</strong>
                                <sub> </sub>
                            </div>
                        </Tooltip>
                        <TextField
                            type='number'
                            id='bendingMomentAlongYAxis'
                            className={classes.input}
                            label={`Bending Moment about Y-axis`}
                            variant="outlined"
                            type='number'
                            onFocus={(event) => focusValueChecker(event)}
                            onBlur={(event) => blurValueChecker(event)}
                            value={bendingMomentAlongYAxisValue}
                            onChange={(event) => bendingMomentAlongYAxisHandler(event)}
                        />
                    </div>
                    <div key='shearAlongXAxis' className={classes.textField} noValidate autoComplete="off">
                        <Tooltip title={<p>Label for Vx</p>}>
                            <div style={{
                                margin: '0 8px',
                                textAlign: 'initial',
                                borderBottom: '1px solid black',
                                paddingLeft: '15px'
                            }}>
                                <strong>Vx({unitHandlerForShearAndAxialFunc()})</strong>
                                <sub> </sub>
                            </div>
                        </Tooltip>
                        <TextField
                            type='number'
                            id='shearAlongXAxis'
                            className={classes.input}
                            label={`Shear along X-axis`}
                            variant="outlined"
                            type='number'
                            onFocus={(event) => focusValueChecker(event)}
                            onBlur={(event) => blurValueChecker(event)}
                            value={shearAlongXAxisValue}
                            onChange={(event) => shearAlongXAxisHandler(event)}
                        />

                    </div>
                    <div key='shearAlongYAxis' className={classes.textField} noValidate autoComplete="off">
                        <Tooltip title={<p>Label for Vy</p>}>
                            <div style={{
                                margin: '0 8px',
                                textAlign: 'initial',
                                borderBottom: '1px solid black',
                                paddingLeft: '15px'
                            }}>
                                <strong>Vy({unitHandlerForShearAndAxialFunc()})</strong>
                                <sub> </sub>
                            </div>
                        </Tooltip>
                        <TextField
                            type='number'
                            id='shearAlongYAxis'
                            className={classes.input}
                            label={`Shear along Y-axis`}
                            variant="outlined"
                            type='number'
                            onFocus={(event) => focusValueChecker(event)}
                            onBlur={(event) => blurValueChecker(event)}
                            value={shearAlongYAxisValue}
                            onChange={(event) => shearAlongYAxisHandler(event)}
                        />
                    </div>
                    <div key='axial' className={classes.textField} noValidate autoComplete="off">
                        <Tooltip title={<p>Label for P</p>}>
                            <div style={{
                                margin: '0 8px',
                                textAlign: 'initial',
                                borderBottom: '1px solid black',
                                paddingLeft: '15px'
                            }}>
                                <strong>P({unitHandlerForShearAndAxialFunc()})</strong>
                                <sub> </sub>
                            </div>
                        </Tooltip>
                        <TextField
                            type='number'
                            id='axial'
                            className={classes.input}
                            label={`Axial`}
                            variant="outlined"
                            type='number'
                            onFocus={(event) => focusValueChecker(event)}
                            onBlur={(event) => blurValueChecker(event)}
                            value={axialValue}
                            onChange={(event) => axialHandler(event)}
                        />
                    </div>
                </div>
            </Card>
        </Grid>
    )
}

export default Forces;
