import React from "react";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import HelpIcon from '@material-ui/icons/Help';
import CancelIcon from '@material-ui/icons/Cancel';

const SectionPropertiesRows = () => {

    return (
        <div style={{
            display: 'flex',
            width: '94.5%',
            margin: '0 auto'
            // height: '100%'
        }}
             id='ModalContainer'
        >
            <div style={{
                border: '1px solid black',
                margin: '0px',
                width: '20%',
                // height: '100%',
                backgroundColor: '#fff',
                textAlign: 'center'
            }}>
                <p style={{
                    margin: '0%',
                    padding: '10%',
                }}>
                    100
                </p>
            </div>
            <div style={{
                border: '1px solid black',
                margin: '0px',
                width: '20%',
                // height: '100%',
                backgroundColor: '#fff',
                textAlign: 'center'
            }}>
                <p style={{
                    margin: '0%',
                    padding: '10%',
                }}>
                    100
                </p>
            </div>
            <div style={{
                border: '1px solid black',
                margin: '0px',
                width: '20%',
                // height: '100%',
                backgroundColor: '#fff',
                textAlign: 'center'
            }}>
                <p style={{
                    margin: '0%',
                    padding: '10%',
                }}>
                    100
                </p>
            </div>
            <div style={{
                margin: '0px',
                width: '20%',
                // height: '100%'
            }}>
                <div style={{
                    margin: '0%',
                    // height: '100%'
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '7px 0px 2px',
                    }}>
                        <HelpIcon
                            variant='contained'
                            color='primary'
                        >
                        </HelpIcon>
                    </p>
                </div>
            </div>
            <div style={{margin: '1px', width: '20%'}}>
                <div style={{display: 'column'}}>
                    <p style={{
                        margin: '7px 0px 2px',
                        textAlign: 'center'
                    }}>
                        <BorderColorIcon
                            style={{marginRight: '5px'}}
                            color='primary'
                        />
                        <CancelIcon
                            color='secondary'
                        />
                    </p>
                </div>
            </div>
        </div>
    )
}
export default SectionPropertiesRows