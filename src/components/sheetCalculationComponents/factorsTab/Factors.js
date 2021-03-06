import Grid from "@material-ui/core/Grid";
import {Card, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    setSafetyFactorForCompression, setSafetyFactorForFlexure, setSafetyFactorForShear,
    setSafetyFactorForTensile
} from "../../../store/actions/sheets/sheetCalculationComponents/factors/factors";
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


const Factors = () => {

    const dispatch = useDispatch()
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const sheets = useSelector(state => state.sheets)

    // const provisionState = useSelector(state => state.sheets.sheets[selectedSheet].provision)
    const provisionState = objectChecker(sheets, ['sheets', selectedSheet, 'provision'])
    // const safetyFactorForTensile = useSelector(state => state.sheets.sheets[selectedSheet].factors.safetyFactorForTensile)
    const safetyFactorForTensile = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForTensile'])
    // const safetyFactorForCompression = useSelector(state => state.sheets.sheets[selectedSheet].factors.safetyFactorForCompression)
    const safetyFactorForCompression = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForCompression'])
    // const safetyFactorForFlexure = useSelector(state => state.sheets.sheets[selectedSheet].factors.safetyFactorForFlexure)
    const safetyFactorForFlexure = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForFlexure'])
    // const safetyFactorForShear = useSelector(state => state.sheets.sheets[selectedSheet].factors.safetyFactorForShear)
    const safetyFactorForShear = objectChecker(sheets, ['sheets', selectedSheet, 'factors', 'safetyFactorForShear'])

    const safetyFactorForTensileHandler = (event) => {
        dispatch(setSafetyFactorForTensile(event.target.value, selectedSheet))
    }

    const safetyFactorForCompressionHandler = (event) => {
        dispatch(setSafetyFactorForCompression(event.target.value, selectedSheet))
    }

    const safetyFactorForFlexureHandler = (event) => {
        dispatch(setSafetyFactorForFlexure(event.target.value, selectedSheet))
    }

    const safetyFactorForShearHandler = (event) => {
        dispatch(setSafetyFactorForShear(event.target.value, selectedSheet))
    }

    const factorsSymbolHandler = () => {
        if(provisionState === 'ASD') {
            return (
                '???'
            )
        } else if(provisionState === 'LRFD') {
            return (
                '??'
            )
        }
    }



    const classes = useStyles()

    return (
        <Grid>
            <Grid style={{
                width: '100%',
                height: 'fit-content',
                margin: '0 auto'
            }}>
                <Card style={{
                    height: '100%',
                    padding: '10px',
                    display: 'flex'
                }}>
                    <div style={{
                        marginTop: '2em',
                        marginBottom: '2em',
                        marginLeft: '1em',
                        display: 'flex'
                    }}>
                        <div className={classes.textField} noValidate autoComplete="off">
                            <Tooltip title={<p>Label for Safety factor for tensile</p>}>
                                <p style={{margin: '0 8px', textAlign: 'initial', borderBottom: '1px solid black', paddingLeft: '15px'}}> <strong>{factorsSymbolHandler()}<sub>t</sub></strong></p>
                            </Tooltip>
                            <TextField
                                className={classes.input}
                                label={'Safety factor for tensile'}
                                variant="outlined"
                                type='number'
                                value={safetyFactorForTensile}
                                onChange={(event) => safetyFactorForTensileHandler(event)}
                            />
                        </div>
                        <div className={classes.textField} noValidate autoComplete="off">
                            <Tooltip title={<p>Label for Safety factor for compression</p>}>
                                <p style={{margin: '0 8px', textAlign: 'initial', borderBottom: '1px solid black', paddingLeft: '15px'}}> <strong>{factorsSymbolHandler()}<sub>c</sub></strong></p>
                            </Tooltip>
                            <TextField
                                className={classes.input}
                                label={'Safety factor for compression'}
                                variant="outlined"
                                type='number'
                                value={safetyFactorForCompression}
                                onChange={(event) => safetyFactorForCompressionHandler(event)}
                            />
                        </div>
                        <div className={classes.textField} noValidate autoComplete="off">
                            <Tooltip title={<p>Label for Safety factor for flexure</p>}>
                                <p style={{margin: '0 8px', textAlign: 'initial', borderBottom: '1px solid black', paddingLeft: '15px'}}> <strong>{factorsSymbolHandler()}<sub>b</sub></strong></p>
                            </Tooltip>
                            <TextField
                                className={classes.input}
                                label={'Safety factor for flexure'}
                                variant="outlined"
                                type='number'
                                value={safetyFactorForFlexure}
                                onChange={(event) => safetyFactorForFlexureHandler(event)}
                            />
                        </div>
                        <div className={classes.textField} noValidate autoComplete="off">
                            <Tooltip title={<p>Label for Safety factor for shear</p>}>
                                <p style={{margin: '0 8px', textAlign: 'initial', borderBottom: '1px solid black', paddingLeft: '15px'}}> <strong>{factorsSymbolHandler()}<sub>v</sub></strong></p>
                            </Tooltip>
                            <TextField
                                className={classes.input}
                                label={'Safety factor for shear'}
                                variant="outlined"
                                type='number'
                                value={safetyFactorForShear}
                                onChange={(event) => safetyFactorForShearHandler(event)}
                            />
                        </div>
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}
export default Factors;
