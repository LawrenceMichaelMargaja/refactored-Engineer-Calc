import React from "react";

const DesignMaterials = () => {

    return (
        <div style={{
            height: '100%',
            padding: '1em',
            textAlign: 'center'
        }}
        >
            <div style={{
                marginBottom: '0px',
                border: '1px solid black',
                borderBottom: '0px',
                height: '50%',
                padding: '5px',
                backgroundColor: '#f2f2f2',
            }}>
                <p><strong>Design Materials</strong></p>
            </div>

            <div style={{
                display: 'flex',
                height: '100%'
            }}>
                <div style={{
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
                        <strong>ID <sub> </sub></strong>
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
                        <strong>E(MPa) <sub> </sub> </strong>
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
                        <strong>F<sub>y</sub>(MPa)</strong>
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
                        <strong>F<sub>u</sub>(MPa)</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesignMaterials