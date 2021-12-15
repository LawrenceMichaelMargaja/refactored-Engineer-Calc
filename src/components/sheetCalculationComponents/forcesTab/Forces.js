import Grid from "@material-ui/core/Grid";
import {Card, TextField} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    setAxial,
    setBendingMomentAlongXAxis,
    setBendingMomentAlongYAxis, setShearAlongXAxis, setShearAlongYAxis
} from "../../../store/actions/sheets/sheetCalculationComponents/forces/forces";

const useStyles = makeStyles((theme) => ({
    textField: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        width: '20rem'
    }
}));

const Forces = () => {
    const classes = useStyles()

    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = useSelector(state => state.sheets.sheets[selectedSheet].system)
    const dispatch = useDispatch()

    const bendingMomentAlongXAxis = useSelector(state => state.sheets.sheets[selectedSheet].forces.bendingMomentAlongXAxis)
    const bendingMomentAlongYAxis = useSelector(state => state.sheets.sheets[selectedSheet].forces.bendingMomentAlongYAxis)
    const shearAlongXAxis = useSelector(state => state.sheets.sheets[selectedSheet].forces.shearAlongXAxis)
    const shearAlongYAxis = useSelector(state => state.sheets.sheets[selectedSheet].forces.shearAlongYAxis)
    const axial = useSelector(state => state.sheets.sheets[selectedSheet].forces.axial)


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
        if(system === 'Metric') {
            return 'kN-m'
        } else {
            return 'kips-ft'
        }
    }

    const unitHandlerForShearAndAxialFunc = () => {
        if(system === 'Metric') {
            return 'kN'
        } else {
            return 'kips'
        }
    }


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
                }}>
                    <div style={{
                        marginTop: '2em',
                        marginBottom: '2em',
                        marginLeft: '1em',
                        display: 'flex'
                    }}>
                        <form key='bendingMomentAlongXAxis' className={classes.textField} noValidate autoComplete="off">
                            <div style={{margin: '0 8px', width: '20rem', textAlign: 'initial', borderBottom: '1px solid black', paddingLeft: '15px'}}>
                                <strong>Mx({unitHandlerForBendingFunc()})</strong>
                                <sub> </sub>
                            </div>
                            <TextField
                                type='number'
                                className={classes.input}
                                label={`Bending Moment along X-axis`}
                                variant="outlined"
                                type='number'
                                value={bendingMomentAlongXAxis}
                                onChange={(event) => bendingMomentAlongXAxisHandler(event)}
                            />
                        </form>
                        <form key='bendingMomentAlongYAxis' className={classes.textField} noValidate autoComplete="off">
                            <div style={{margin: '0 8px', width: '20rem', textAlign: 'initial', borderBottom: '1px solid black', paddingLeft: '15px'}}>
                                <strong>My({unitHandlerForBendingFunc()})</strong>
                                <sub> </sub>
                            </div>
                            <TextField
                                type='number'
                                className={classes.input}
                                label={`Bending Moment along Y-axis`}
                                variant="outlined"
                                type='number'
                                value={bendingMomentAlongYAxis}
                                onChange={(event) => bendingMomentAlongYAxisHandler(event)}
                            />
                        </form>
                        <form key='shearAlongXAxis' className={classes.textField} noValidate autoComplete="off">
                            <div style={{margin: '0 8px', width: '20rem', textAlign: 'initial', borderBottom: '1px solid black', paddingLeft: '15px'}}>
                                <strong>Vx({unitHandlerForShearAndAxialFunc()})</strong>
                                <sub> </sub>
                            </div>
                            <TextField
                                type='number'
                                className={classes.input}
                                label={`Shear along X-axis`}
                                variant="outlined"
                                type='number'
                                value={shearAlongXAxis}
                                onChange={(event) => shearAlongXAxisHandler(event)}
                            />

                        </form>
                        <form key='shearAlongYAxis' className={classes.textField} noValidate autoComplete="off">
                            <div style={{margin: '0 8px', width: '20rem', textAlign: 'initial', borderBottom: '1px solid black', paddingLeft: '15px'}}>
                                <strong>Vy({unitHandlerForShearAndAxialFunc()})</strong>
                                <sub> </sub>
                            </div>
                            <TextField
                                type='number'
                                className={classes.input}
                                label={`Shear along Y-axis`}
                                variant="outlined"
                                type='number'
                                value={shearAlongYAxis}
                                onChange={(event) => shearAlongYAxisHandler(event)}
                            />
                        </form>
                        <form key='axial' className={classes.textField} noValidate autoComplete="off">
                            <div style={{margin: '0 8px', width: '20rem', textAlign: 'initial', borderBottom: '1px solid black', paddingLeft: '15px'}}>
                                <strong>P({unitHandlerForShearAndAxialFunc()})</strong>
                                <sub> </sub>
                            </div>
                            <TextField
                                type='number'
                                className={classes.input}
                                label={`Axial`}
                                variant="outlined"
                                type='number'
                                value={axial}
                                onChange={(event) => axialHandler(event)}
                            />
                        </form>
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Forces;
