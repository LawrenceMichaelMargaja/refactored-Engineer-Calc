import React from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import BorderColorIcon from '@material-ui/icons/BorderColor';

const MaterialPropertiesRows = () => {

    return (
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
                    100
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
                    100
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
                    100
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
                    100
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
                    100
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
export default MaterialPropertiesRows