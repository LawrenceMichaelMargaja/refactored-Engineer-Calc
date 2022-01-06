import React from "react";
import {Card} from "@material-ui/core";
import SectionPropertiesRows from "../../membersTab/sectionProperties/sectionPropertiesRows/SectionPropertiesRows";
import SectionPropertiesResultsRows from "./sectionPropertiesRows/SectionPropertiesRows";

const SectionProperties = () => {

    return (
        <>
            <div style={{
                margin: '0 auto',
                padding: '15px',
                textAlign: 'center'
            }}
            >
                <Card style={{
                    marginBottom: '0px',
                    border: '1px solid black',
                    padding: '5px',
                    height: '50%',
                    backgroundColor: '#f2f2f2',
                }}>
                    <p style={{margin: '0px'}}><strong>Section Properties</strong></p>
                </Card>
                <div style={{
                    display: 'flex',
                    height: '100%',
                }}>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>ID</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>Name</strong>
                        </p>
                    </div>

                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>A(mm<sup>4</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>J(mm<sup>4</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>I<sub>xp</sub>(mm<sup>4</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>I<sub>yp</sub>(mm<sup>4</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>I<sub>w</sub>(mm<sup>6</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>S<sub>xp</sub>(mm<sup>3</sup>)</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                    }}>
                        <p>
                            <strong>S<sub>yp</sub>(mm<sup>4</sup>)</strong>
                        </p>
                    </div>
                </div>
            </div>
            <SectionPropertiesResultsRows/>
        </>
    )
}

export default SectionProperties