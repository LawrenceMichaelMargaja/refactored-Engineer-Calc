import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import {Card, Tab, Tabs} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import DesignFactors from "./designFactors/DesignFactors";
import DesignMaterials from "./designMaterials/DesignMaterials";
import SectionProperties from "./sectionProperties/SectionProperties";
import MemberTabProperties from "./memberTabProperties/MemberTabProperties";
import MemberDesignCapacity from "./memberDesignCapacity/MemberDesignCapacity";
import MemberDesignRatio from "./memberDesignRatio/MemberDesignRatio";
import Legend from "./legend/Legend";

const useStyles = makeStyles((theme) => ({
    textField: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        width: '20rem'
    }
}));


const ResultsTab = () => {
    const classes = useStyles()

    return (
                <Card style={{
                    height: '100%',
                    backgroundColor: '#e1e1e1',
                }}>
                    <DesignFactors/>
                    <div style={{
                        height: '100%',
                    }}>
                        <div style={{
                            height: '100%'
                        }}>
                            <DesignMaterials/>
                            <SectionProperties/>
                            <MemberTabProperties/>
                            <MemberDesignCapacity/>
                            <MemberDesignRatio/>
                                <div style={{
                                    height: '100%',
                                    backgroundColor: '#e2e2e2',
                                    margin: '2em auto'
                                }}>
                                        <Card style={{
                                            border: '1px solid black',
                                            // padding: '5px 0',
                                            height: '50%',
                                            backgroundColor: '#fff',
                                            textAlign: 'center'
                                        }}>
                                            <strong>Legend</strong>
                                        </Card>
                                        <Legend/>
                                </div>
                        </div>
                    </div>
                </Card>
    )
}
export default ResultsTab;
