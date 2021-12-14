import Grid from "@material-ui/core/Grid";
import {Button, Card} from "@material-ui/core";
import React from "react";
import MaterialProperties from "../materialProperties/MaterialProperties";
import SectionProperties from "../sectionProperties/SectionProperties";
import MemberFieldRows from "./memberFieldRows/MemberFieldRows";
import {useSelector} from "react-redux";
import {ENGLISH, METRIC} from "../../../../config";


const Members = () => {

    const system = useSelector(state => state.systemDropdown.system)

    const unitHandler = () => {
        return system === 'Metric' ? METRIC : ENGLISH
    }

    return (
            <Grid style={{
                margin: '0 auto',
            }}>
                <div style={{
                    height: '10%',
                    backgroundColor: '#fff',
                    textAlign: 'right',
                }}>
                    <Button style={{margin: '5px'}} variant='contained' color='primary'>ADD MEMBER</Button>
                    <Button style={{margin: '5px'}} variant='contained' color='secondary'>REMOVE ALL</Button>
                </div>
                <Card style={{
                    backgroundColor: '#efefef',
                    border: '1px solid black',
                }}>
                    <div style={{
                        padding: '1em'
                    }}>
                        <div style={{
                            display: 'flex',
                        }}>
                            <div style={{
                                paddingRight: '0px',
                                width: '7.14%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <p>
                                        <strong>Member ID <sub></sub></strong>
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: '0px',
                                paddingLeft: '0px',
                                width: '7.14%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <p>
                                        <strong>Material ID <sub></sub></strong>
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: '0px',
                                paddingLeft: '0px',
                                width: '7.14%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <p>
                                        <strong>Section ID <sub></sub></strong>
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: '0px',
                                paddingLeft: '0px',
                                width: '7.14%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <p>
                                        <strong>L({unitHandler()}) <sub></sub></strong>
                                    </p>
                                </div>
                            </div>


                            <div style={{
                                paddingRight: '0px',
                                paddingLeft: '0px',
                                width: '14.28%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <div style={{
                                        borderBottom: '1px solid black',
                                        padding: '4px'
                                    }}>
                                        <p style={{margin: '0px 0 0 0', padding: 0, wordBreak: 'break-word'}}>
                                            <strong style={{verticalAlign: 'sub'}}>Buckling about X-axis <sub></sub></strong>
                                        </p>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        padding: '2.5px'
                                    }}>
                                        <div style={{
                                            width: '50%',
                                        }}>
                                            <p style={{margin: 0, padding: '0px', borderRight: '1px solid black'}}>
                                                <strong>L<sub>X</sub>({unitHandler()}) <sub></sub></strong>
                                            </p>
                                        </div>
                                        <div style={{
                                            width: '50%'
                                        }}>
                                            <p style={{margin: 0, padding: '0px'}}>
                                                <strong>K<sub>X</sub> <sub></sub></strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: '0px',
                                paddingLeft: '0px',
                                width: '14.28%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <div style={{
                                        borderBottom: '1px solid black',
                                        padding: '4px'
                                    }}>
                                        <p style={{margin: '0px 0 0 0', padding: 0, wordBreak: 'break-word'}}>
                                            <strong style={{verticalAlign: 'sub'}}>Buckling about Y-axis <sub></sub></strong>
                                        </p>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        padding: '2.5px'
                                    }}>
                                        <div style={{
                                            width: '50%',
                                        }}>
                                            <p style={{margin: 0, padding: '0px', borderRight: '1px solid black'}}>
                                                <strong>L<sub>y</sub>({unitHandler()}) <sub></sub></strong>
                                            </p>
                                        </div>
                                        <div style={{
                                            width: '50%'
                                        }}>
                                            <p style={{margin: 0, padding: '0px'}}>
                                                <strong>K<sub>y</sub> <sub></sub></strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: '0px',
                                paddingLeft: '0px',
                                width: '7.14%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <p>
                                        <strong>LLT <sub></sub></strong>
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: '0px',
                                paddingLeft: '0px',
                                width: '7.14%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <p>
                                        <strong>C<sub>bx </sub></strong>
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: '0px',
                                paddingLeft: '0px',
                                width: '7.14%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <p>
                                        <strong>C<sub>by></sub></strong>
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: '0px',
                                paddingLeft: '0px',
                                width: '7.14%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <p>
                                        <strong>LSC <sub></sub></strong>
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: '0px',
                                paddingLeft: '0px',
                                width: '7.14%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <p>
                                        <strong>LST <sub></sub></strong>
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                paddingLeft: '0px',
                                width: '7.14%',
                            }}>
                                <div style={{
                                    marginBottom: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#e2e2e2',
                                    textAlign: 'center'
                                }}>
                                    <p><strong>DELETE <sub></sub></strong></p>
                                </div>
                            </div>
                        </div>
                        <MemberFieldRows/>
                    </div>

                    <div style={{
                        display: 'flex',
                    }}>
                        <MaterialProperties/>
                        <SectionProperties/>
                    </div>
                </Card>
            </Grid>
    )
}
export default Members;
