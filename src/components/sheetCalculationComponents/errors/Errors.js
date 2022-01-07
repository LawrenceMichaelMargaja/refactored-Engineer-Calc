import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Card, TextField} from "@material-ui/core";
import {objectChecker} from "../../../utilities/utilities";
import {useSelector} from "react-redux";

const Errors = ({errorLocation, important}) => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const tabState = objectChecker(sheets, ['sheets', selectedSheet, 'tabState'])
    const arrayCheck = objectChecker(sheets, ['sheets', selectedSheet, 'arrayCheck'])

    let errorPlace = ''
    let errorMessage = ''

    let errors = []

    const renderErrors = () => {
        for(let error in arrayCheck) {
            errors.push(
                <p style={{margin: '0', padding: '0 1em'}}
                    key={error}
                >
                    <li>
                        {arrayCheck[error]}
                    </li>
                </p>
            )
        }
        return errors
    }

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
                }}>
                    <div style={{
                        width: '50%',
                        paddingBottom: '1em'
                    }}>
                        <p style={{padding: '0 1em'}}><strong>Errors</strong></p>
                        {renderErrors()}
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Errors