import React from "react";
import {Card} from "@material-ui/core";
import MemberDesignRatioRows from "./memberDesignRatioRows/MemberDesignRatioRows";

const MemberDesignRatio = () => {

    return (
        <>
            <div style={{
                height: '100%',
                margin: '5% auto 0',
                padding: '15px 15px 0 15px',
                textAlign: 'center'
            }}>
                <Card style={{
                    border: '1px solid black',
                    padding: '5px 0',
                    height: '50%',
                    backgroundColor: '#f2f2f2',
                    width: '100%',
                }}>
                    <p style={{margin: '0px'}}><strong>Design Ratio</strong></p>
                </Card>
                <div style={{
                    display: 'flex',
                    height: '100%',
                    // width: '100%',
                }}>
                    <div style={{
                        padding: '15px 0',
                        width: '11.11%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            // height: '100%',
                            backgroundColor: '#fff',
                        }}>
                            <strong> <sub></sub> Member ID</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '11.11%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            // height: '100%',
                            backgroundColor: '#fff'
                        }}>
                            <strong> <sub></sub> P</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '11.11%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            // height: '100%',
                            backgroundColor: '#fff'
                        }}>
                            <strong>M<sub>x</sub></strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '11.11%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            // height: '100%',
                            backgroundColor: '#fff'
                        }}>
                            <strong>M<sub>y</sub></strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '11.11%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            // height: '100%',
                            backgroundColor: '#fff'
                        }}>
                            <strong>V<sub>x</sub></strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '11.11%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            // height: '100%',
                            backgroundColor: '#fff'
                        }}>
                            <strong>V<sub>y</sub></strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '11.11%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            // height: '100%',
                            backgroundColor: '#fff'
                        }}>
                            <strong> <sub></sub> Combined</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '11.11%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            // height: '100%',
                            backgroundColor: '#fff'
                        }}>
                            <strong> <sub></sub> KL/r</strong>
                        </div>
                    </div>
                    <div style={{
                        padding: '15px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '11.11%',
                    }}>
                        <div style={{
                            marginBottom: '0px',
                            border: '1px solid black',
                            padding: '5px',
                            // height: '100%',
                            backgroundColor: '#fff'
                        }}>
                            <strong> <sub></sub> Status</strong>
                        </div>
                    </div>
                </div>
            </div>
            <MemberDesignRatioRows/>
        </>
    )
}

export default MemberDesignRatio