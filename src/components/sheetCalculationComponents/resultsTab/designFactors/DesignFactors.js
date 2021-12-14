import React from "react";
import {Card} from "@material-ui/core";

const DesignFactors = () => {

    return (
        <Card style={{
            marginBottom: '0px',
            border: '1px solid black',
            backgroundColor: '#efefef',
        }}>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingTop: '10px',
                margin: '0px'
            }}>
                <strong>Project Unit:</strong>
            </p>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                margin: '0px'
            }}>
                <strong>Project Name:</strong>

            </p>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                margin: '0px'
            }}>
                <strong>Project ID:</strong>
            </p>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                margin: '0px'
            }}>
                <strong>Company:</strong>
            </p>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingBottom: '5px',
                margin: '0px'
            }}>
                <strong>Project Designer:</strong>
            </p>
            <p style={{
                textAlign: 'initial',
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingBottom: '5px',
                margin: '0px'
            }}>
                <strong>Project Client:</strong>
            </p>
            <div style={{
                margin: '0px',
                padding: '0px',
                width: '100%'
            }}>
                <p style={{
                    // margin: '0px',
                    padding: '0px',
                    textDecoration: 'underline',
                    fontSize: '1.2rem',
                    textAlign: 'center'
                }}>
                    <strong>Design Input Information</strong>
                </p>
            </div>
            <div style={{
                padding: ' 0 15px 0 15px',
            }}>
                <div style={{
                    marginBottom: '0px',
                    border: '1px solid black',
                    borderBottom: '0px',
                    padding: '5px',
                    height: '50%',
                    // width: '100%',
                    backgroundColor: '#e2e2e2',
                    textAlign: 'center'
                }}>
                    <p><strong>Design Factors</strong></p>
                </div>
            </div>
            <div style={{
                display: 'flex',
                // width: '100%',
                paddingRight: '15px',
                height: '100%',
                textAlign: 'center'
            }}>
                <div style={{
                    padding: ' 0 0px 0 15px',
                    width: '25%',
                    height: '100%'
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        padding: '5px',
                        height: '50%',
                        backgroundColor: '#fff',
                    }}>
                        <strong>Ωt</strong>
                    </div>
                    <div style={{
                        width: '80%',
                        margin: '0 auto',
                        borderBottom: '1px solid black'
                    }}>
                        <p style={{marginBottom: '0px'}}>1.67</p>
                    </div>
                </div>
                <div style={{
                    padding: '15px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingLeft: '0px',
                    width: '25%',
                    height: '100%'
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        padding: '5px',
                        height: '50%',
                        backgroundColor: '#fff',
                    }}>
                        <strong>Ωc</strong>
                    </div>
                    <div style={{
                        width: '80%',
                        margin: '0 auto',
                        borderBottom: '1px solid black'
                    }}>
                        <p style={{marginBottom: '0px'}}>1.67</p>
                    </div>
                </div>
                <div style={{
                    padding: '15px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingLeft: '0px',
                    width: '25%',
                    height: '100%',
                    margin: '0px'
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        padding: '5px',
                        height: '50%',
                        backgroundColor: '#fff',
                    }}>
                        <strong>Ωb</strong>
                    </div>
                    <div style={{
                        width: '80%',
                        margin: '0 auto',
                        borderBottom: '1px solid black'
                    }}>
                        <p style={{marginBottom: '0px'}}>1.67</p>
                    </div>
                </div>
                <div style={{
                    padding: '15px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingLeft: '0px',
                    width: '25%',
                    height: '100%',
                    margin: '0px'
                }}>
                    <div style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        padding: '5px',
                        height: '50%',
                        backgroundColor: '#fff',
                    }}>
                        <strong>Ωv</strong>
                    </div>
                    <div style={{
                        width: '80%',
                        margin: '0 auto',
                        borderBottom: '1px solid black'
                    }}>
                        <p style={{marginBottom: '0px'}}>1.67</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default DesignFactors