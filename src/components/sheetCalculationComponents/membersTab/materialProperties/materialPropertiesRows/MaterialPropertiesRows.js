import React from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '90%',
        margin: '10px 0',
        fontWeight: 'bold',
        color: 'black'
    }
}));

const MaterialPropertiesRows = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const materialProperties = useSelector(state => state.sheets.sheets[selectedSheet].materialProperties)
    const sheets = useSelector(state => state.sheets)

    const materialPropertiesRows = []

    for(let materialPropertiesIndex in materialProperties) {

        const materialId = materialProperties[materialPropertiesIndex].materialPropertiesId
        const materialEMPa = materialProperties[materialPropertiesIndex].materialPropertiesEMPA
        const materialFyMPa = materialProperties[materialPropertiesIndex].materialPropertiesFYMPA
        const materialFuMPa = materialProperties[materialPropertiesIndex].materialPropertiesFUMPA
        const materialSelectedMaterial = materialProperties[materialPropertiesIndex].materialPropertiesSelectedMaterial

        const materialIdHandler = () => {
            dispatch()
        }

        materialPropertiesRows.push(
            <div style={{
                display: 'flex',
                height: '100%',
                width: '90%',
                margin: '0 auto 2%',
                // marginBottom: '2%'
            }}
                 id='ModalContainer'
            >
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '16.66%',
                    // display: 'inline-block',
                    height: '100%',
                    backgroundColor: '#fff'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '7%',
                        textAlign: 'center'
                    }}>
                        {materialId}
                    </p>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '16.66%',
                    height: '100%',
                    backgroundColor: '#fff'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '7%',
                        textAlign: 'center'
                    }}>
                        {materialSelectedMaterial}
                    </p>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '16.66%',
                    height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '7%',
                    }}>
                        {materialEMPa}
                    </p>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '16.66%',
                    height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '7%',
                    }}>
                        {materialFyMPa}
                    </p>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '16.66%',
                    height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '7%',
                    }}>
                        {materialFuMPa}
                    </p>
                </div>
                <div
                    style={{
                        margin: '0px',
                        width: '16.66%'
                    }}>
                    <div style={{
                        display: 'flex',
                        margin: '0%',
                    }}>
                        <div style={{
                            width: '100%',
                            margin: '0 auto',
                            textAlign: 'center'
                        }}>
                            <p style={{margin: '7px 0px 5px'}}>
                                <BorderColorIcon
                                    variant='contained' color='primary'
                                >
                                    EDIT
                                </BorderColorIcon>
                                <CancelIcon variant='contained' color='secondary'
                                            style={{margin: '2px 5px'}}
                                >REMOVE
                                </CancelIcon>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {materialPropertiesRows}
        </div>
    )
}
export default MaterialPropertiesRows