import React from "react";
import {Card} from "@material-ui/core";

const SectionDimensions = () => {
    const renderSections = () => {

        // alert("at render line === " + memberIndex)


        const sectionTabs = []


        // for (let sectionIndex in getSectionPerIndex) {
            // const sectionShape = dashboard.sheets[selectedSheet].sections[sectionIndex].sectionShape
            // const sectionName = dashboard.sheets[selectedSheet].sections[sectionIndex].sectionName
            // dispatch(setSelectedSection(i))
            sectionTabs.push(
                <Card style={{
                    height: '60vh',
                    marginBottom: '50px',
                    border: '1px solid black',
                    backgroundColor: '#efefef',
                    paddingTop: '1%',
                    textAlign: 'center'
                }}
                >
                    <Card style={{
                        margin: '20px 20px 0px 20px',
                        padding: '10px',
                        border: '1px solid black',
                        backgroundColor: '#e2e2e2',
                    }}>
                        <strong>Section Dimension</strong>
                    </Card>
                    <div style={{
                        height: '40vh'
                    }}>
                        <p>Add Graph Here</p>
                    </div>
                    <div style={{
                        width: '100%',
                    }}>
                        <div style={{
                            width: '90%',
                            margin: '0 auto',
                            display: 'flex'
                        }}>
                            <div style={{
                                marginBottom: '20px',
                                width: '25%',
                                // display: 'inline-block'
                            }}>
                                <div style={{
                                    margin: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#fff',
                                }}>
                                    <p style={{
                                        margin: '0px'
                                    }}>
                                        <strong>ID</strong>
                                    </p>
                                </div>
                                <div style={{
                                    width: '80%',
                                    margin: '0 auto',
                                    borderBottom: '1px solid black',
                                    position: 'relative',
                                }}>
                                    <p style={{marginBottom: '0px', padding: '5px'}}>{parseFloat("sectionIndex") + 1}</p>
                                </div>
                            </div>
                            <div style={{
                                margin: '0px 0px 20px 0px',
                                width: '25%',
                                // display: 'inline-block'
                            }}>
                                <div style={{
                                    margin: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#fff',
                                }}>
                                    <p style={{
                                        margin: '0px'
                                    }}>
                                        <strong>Names</strong>
                                    </p>
                                </div>
                                <div style={{
                                    width: '80%',
                                    margin: '0 auto',
                                    borderBottom: '1px solid black'
                                }}>
                                    <p style={{marginBottom: '0px', padding: '5px'}}>{"sectionName"}</p>
                                </div>
                            </div>
                            <div style={{
                                margin: '0px 0px 20px 0px',
                                width: '25%',
                                // display: 'inline-block'
                            }}>
                                <div style={{
                                    margin: '0px',
                                    border: '1px solid black',
                                    padding: '5px',
                                    backgroundColor: '#fff',
                                }}>
                                    <p style={{
                                        margin: '0px'
                                    }}>
                                        <strong>d({"areaUnit"})</strong>
                                    </p>
                                </div>
                                <div style={{
                                    width: '80%',
                                    margin: '0 auto',
                                    borderBottom: '1px solid black'
                                }}>
                                    <p style={{marginBottom: '0px', padding: '5px'}}>{"sectionName"}</p>
                                </div>
                            </div>
                            <div style={{
                                margin: '0px 0px 20px 0px',
                                width: '25%',
                                // display: 'inline-block'
                            }}>
                                <div style={{
                                    margin: '0px',
                                    border: '1px solid black',
                                    padding: '5px 0px 2px 0',
                                    backgroundColor: '#fff',
                                }}>
                                    <p style={{
                                        margin: '0px'
                                    }}>
                                        <strong>t<sub>w</sub>({"areaUnit"})</strong>
                                    </p>
                                </div>
                                <div style={{
                                    width: '80%',
                                    margin: '0 auto',
                                    borderBottom: '1px solid black'
                                }}>
                                    <p style={{marginBottom: '0px', padding: '5px'}}>{"sectionName"}</p>
                                </div>
                            </div>
                            <div style={{
                                margin: '0px 0px 20px 0px',
                                width: '25%',
                                // display: 'inline-block'
                            }}>
                                <div style={{
                                    margin: '0px',
                                    border: '1px solid black',
                                    padding: '5px 0px 2px 0',
                                    backgroundColor: '#fff',
                                }}>
                                    <p style={{
                                        margin: '0px'
                                    }}>
                                        <strong><sub></sub>additional</strong>
                                    </p>
                                </div>
                                <div style={{
                                    width: '80%',
                                    margin: '0 auto',
                                    borderBottom: '1px solid black'
                                }}>
                                    <p style={{marginBottom: '0px', padding: '5px'}}>{"sectionName"}</p>
                                </div>
                            </div>
                            <div style={{
                                margin: '0px 0px 20px 0px',
                                width: '25%',
                                // display: 'inline-block'
                            }}>
                                <div style={{
                                    margin: '0px',
                                    border: '1px solid black',
                                    padding: '5px 0px 2px 0',
                                    backgroundColor: '#fff',
                                }}>
                                    <p style={{
                                        margin: '0px'
                                    }}>
                                        <strong><sub></sub>additional</strong>
                                    </p>
                                </div>
                                <div style={{
                                    width: '80%',
                                    margin: '0 auto',
                                    borderBottom: '1px solid black'
                                }}>
                                    <p style={{marginBottom: '0px', padding: '5px'}}>{"sectionName"}</p>
                                </div>
                            </div>
                            <div style={{
                                margin: '0px 0px 20px 0px',
                                width: '25%',
                                // display: 'inline-block'
                            }}>
                                <div style={{
                                    margin: '0px',
                                    border: '1px solid black',
                                    padding: '5px 0px 2px 0',
                                    backgroundColor: '#fff',
                                }}>
                                    <p style={{
                                        margin: '0px'
                                    }}>
                                        <strong><sub></sub>additional</strong>
                                    </p>
                                </div>
                                <div style={{
                                    width: '80%',
                                    margin: '0 auto',
                                    borderBottom: '1px solid black'
                                }}>
                                    <p style={{marginBottom: '0px', padding: '5px'}}>{"sectionName"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </Card>
            )
        return (
            <div style={{marginBottom: '100px'}}>
                {sectionTabs}
            </div>
        )
    }
    return (
        renderSections()
    )
}
export default SectionDimensions;