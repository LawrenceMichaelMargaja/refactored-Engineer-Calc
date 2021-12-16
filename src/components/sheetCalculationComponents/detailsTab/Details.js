import React, {useEffect} from 'react'
import Grid from "@material-ui/core/Grid";
import {Card, MenuItem, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    setProjectClient,
    setProjectCompany,
    setProjectDesigner,
    setProjectId,
    setProjectName,
    setProjectNotes,
    setProjectUnit
} from "../../../store/actions/sheets/sheetCalculationComponents/details/details";
import {getMaterialPropertiesData} from "../../../store/actions/sheets/sheets";

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

const Details = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const projectUnit = useSelector(state => state.sheets.sheets[selectedSheet].details.projectUnit)
    const projectName = useSelector(state => state.sheets.sheets[selectedSheet].details.projectName)
    const projectId = useSelector(state => state.sheets.sheets[selectedSheet].details.projectId)
    const projectCompany = useSelector(state => state.sheets.sheets[selectedSheet].details.projectCompany)
    const projectDesigner = useSelector(state => state.sheets.sheets[selectedSheet].details.projectDesigner)
    const projectClient = useSelector(state => state.sheets.sheets[selectedSheet].details.projectClient)
    const projectNotes = useSelector(state => state.sheets.sheets[selectedSheet].details.projectNotes)

    const projectUnitHandler = (event) => {
        dispatch(setProjectUnit(event.target.value, selectedSheet))
    }

    const projectNameHandler = (event) => {
        dispatch(setProjectName(event.target.value, selectedSheet))
    }

    const projectIdHandler = (event) => {
        dispatch(setProjectId(event.target.value, selectedSheet))
    }

    const projectCompanyHandler = (event) => {
        dispatch(setProjectCompany(event.target.value, selectedSheet))
    }

    const projectDesignerHandler = (event) => {
        dispatch(setProjectDesigner(event.target.value, selectedSheet))
    }

    const projectClientHandler = (event) => {
        dispatch(setProjectClient(event.target.value, selectedSheet))
    }

    const projectNotesHandler = (event) => {
        dispatch(setProjectNotes(event.target.value, selectedSheet))
    }

    const getMaterialProperties = () => {
        fetch("http://127.0.0.1:8080/tshapemetric")
            .then((response) => response.json())
            .then((data) => dispatch(getMaterialPropertiesData(data, selectedSheet)))
            //     .then((data) => alert(JSON.stringify(data)))
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        getMaterialProperties()
        // displayApiData()
    }, [])

    return (
        <Grid>
            <Grid style={{
                width: '100%',
                height: 'fit-content',
                margin: '0 auto',
            }}>
                <Card style={{
                    height: '100%',
                    display: 'flex',
                    padding: '10px',
                    width: '100%'
                }}>
                    <div style={{
                        margin: '0 auto',
                        width: '20%'
                    }}>
                        <form key='projectUnitForm' className={classes.textField} noValidate autoComplete="off">
                            <TextField
                                className={classes.input}
                                label={`Project Unit`}
                                variant="outlined"
                                value={projectUnit}
                                onChange={(event) => projectUnitHandler(event)}
                            />
                        </form>
                        <form key='projectNameForm' className={classes.textField} noValidate autoComplete="off">
                            <TextField
                                className={classes.input}
                                label={`Project Name`}
                                variant="outlined"
                                value={projectName}
                                onChange={(event) => projectNameHandler(event)}
                            />
                        </form>
                        <form className={classes.textField} noValidate autoComplete="off">
                            <TextField
                                className={classes.input}
                                label={`Project ID`}
                                variant="outlined"
                                value={projectId}
                                onChange={(event) => projectIdHandler(event)}
                            />

                        </form>
                    </div>
                    <div style={{
                        margin: '0 auto',
                        width: '20%'
                    }}>
                        <form key='projectCompanyForm' className={classes.textField} noValidate autoComplete="off">
                            <TextField
                                className={classes.input}
                                label={`Project Company`}
                                variant="outlined"
                                value={projectCompany}
                                onChange={(event) => projectCompanyHandler(event)}
                            />
                        </form>
                        <form key='projectDesignerForm' className={classes.textField} noValidate autoComplete="off">
                            <TextField
                                className={classes.input}
                                label={`Project Designer`}
                                variant="outlined"
                                value={projectDesigner}
                                onChange={(event) => projectDesignerHandler(event)}
                            />
                        </form>
                        <form key='projectClientForm' className={classes.textField} noValidate autoComplete="off">
                            <TextField
                                className={classes.input}
                                label={`Project Client`}
                                variant="outlined"
                                value={projectClient}
                                onChange={(event) => projectClientHandler(event)}
                            />
                        </form>
                    </div>
                    <div style={{
                        width: '50%'
                    }}>
                        <p><strong>Project Notes</strong></p>
                        <textarea
                            style={{
                                width: '100%',
                                height: '65%',
                                maxWidth: '80%',
                                minWidth: '80%'
                            }}
                            id='textArea'
                            aria-label='Project Notes'
                            value={projectNotes}
                            onChange={(event) => projectNotesHandler(event)}
                        >

                        </textarea>
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Details
