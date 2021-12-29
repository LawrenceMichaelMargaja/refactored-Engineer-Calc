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
import {
    getMaterialPropertiesData, getSectionPropertiesEnglish, getSectionPropertiesMetric,
    getSteelTypesEnglishAPI,
    getSteelTypesMetricAPI
} from "../../../store/actions/sheets/sheets";
import {objectChecker} from "../../../utilities/utilities";

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
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)

    // const projectUnit = useSelector(state => state.sheets.sheets[selectedSheet].details.projectUnit)
    const projectUnit = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectUnit'])
    // const projectName = useSelector(state => state.sheets.sheets[selectedSheet].details.projectName)
    const projectName = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectName'])
    // const projectId = useSelector(state => state.sheets.sheets[selectedSheet].details.projectId)
    const projectId = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectId'])
    // const projectCompany = useSelector(state => state.sheets.sheets[selectedSheet].details.projectCompany)
    const projectCompany = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectCompany'])
    // const projectDesigner = useSelector(state => state.sheets.sheets[selectedSheet].details.projectDesigner)
    const projectDesigner = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectDesigner'])
    // const projectClient = useSelector(state => state.sheets.sheets[selectedSheet].details.projectClient)
    const projectClient = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectClient'])
    // const projectNotes = useSelector(state => state.sheets.sheets[selectedSheet].details.projectNotes)
    const projectNotes = objectChecker(sheets, ['sheets', selectedSheet, 'details', 'projectNotes'])

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

    // const getSteelTypesMetric = () => {
    //     fetch("http://127.0.0.1:8080/steeltypesmetric")
    //         .then((response) => response.json())
    //         .then((data) => dispatch(getSteelTypesMetricAPI(data, selectedSheet)))
    //         //     .then((data) => alert(JSON.stringify(data)))
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }
    //
    // const getSteelTypesEnglish = () => {
    //     fetch("http://127.0.0.1:8080/steeltypesenglish")
    //         .then((response) => response.json())
    //         .then((data) => dispatch(getSteelTypesEnglishAPI(data, selectedSheet)))
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }
    //
    // useEffect(() => {
    //     getSteelTypesMetric()
    //     getSteelTypesEnglish()
    // }, [])

    const getMetricSectionProperties = () => {
        fetch("http://127.0.0.1:8080/sectionpropertiesmetric")
            .then((response) => response.json())
            .then((data) => dispatch(getSectionPropertiesMetric(data, selectedSheet)))
            // .then((data) => console.log(sectionPropertiesMetric))
            .catch((error) => {
                console.log(error)
            });
    }

    const getEnglishSectionProperties = () => {
        fetch("http://127.0.0.1:8080/sectionpropertiesenglish")
            .then((response) => response.json())
            .then((data) => dispatch(getSectionPropertiesEnglish(data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        getMetricSectionProperties()
        getEnglishSectionProperties()
    }, [])

    return (
        <Grid>
            <Grid style={{
                height: 'fit-content',
                margin: '0 auto',
            }}>
                <Card style={{
                    height: '100%',
                    display: 'flex',
                    padding: '10px',
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
