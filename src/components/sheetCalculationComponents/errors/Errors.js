import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Card, TextField} from "@material-ui/core";
import {objectChecker} from "../../../utilities/utilities";
import {useSelector} from "react-redux";

const Errors = ({errorLocation, important}) => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => sheets.sheets.selectedSheet)
    const errors = objectChecker(sheets, ['sheets', selectedSheet, 'tabState'])

    let errorPlace = ''
    let errorMessage = ''

    console.log(errors)

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
                        width: '50%'
                    }}>
                        <p><strong>Project Notes</strong></p>
                        <ul>
                            <li>{errorPlace}</li>
                            <li>{errorMessage}</li>

                        </ul>
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Errors