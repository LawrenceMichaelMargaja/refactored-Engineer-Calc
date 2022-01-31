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
import SectionDimensions from "./sectionDimensions/SectionDimension";
import {objectChecker} from "../../../utilities/utilities";
import {useSelector} from "react-redux";
import size from 'lodash/size'
import DesignMembers from "./designMembers/DesignMembers";

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
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])
    const steelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesMetric'])
    const calculatedData = objectChecker(sheets, ['sheets', selectedSheet, 'calculatedData'])

    let Pt = null
    let Pc = null
    let Mcx = null
    let Mcy = null
    let Vcx = null
    let Vcy = null
    let Pratio = null
    let MxRatio = null
    let MyRatio = null
    let VxRatio = null
    let VyRatio = null
    let Combined = null
    let KLr = null

    const mapCalculatedData = () => {
        calculatedData.map((data) => {

        })
    }

    const renderResultDisplay = () => {
        if (size(steelTypesMetric) === 0) {
            return null
        }

        if(method === 'Investigation') {
            return (
                <>
                    <DesignMaterials/>
                    <SectionDimensions/>
                    <SectionProperties/>
                    <MemberTabProperties/>
                    <MemberDesignCapacity/>
                    <MemberDesignRatio/>
                </>
            )
        } else if(method === 'Design') {
            return (
                <>
                    <DesignMaterials/>
                    <SectionDimensions/>
                    <MemberTabProperties/>
                    <DesignMembers/>
                    <MemberDesignRatio/>
                    {/*<SectionProperties/>*/}
                    {/*<MemberDesignCapacity/>*/}
                </>
            )
        }
    }

    return (
                <Card style={{
                    height: '100%',
                    backgroundColor: '#e1e1e1',
                    padding: '2em'
                }}>
                    <DesignFactors/>
                    <div style={{
                        height: '100%',
                    }}>
                        <div style={{
                            height: '100%'
                        }}>
                            {renderResultDisplay()}
                                <div style={{
                                    height: '100%',
                                    backgroundColor: '#e2e2e2',
                                    margin: '2em auto',
                                    textAlign: 'center'
                                }}>
                                        <Card style={{
                                            border: '1px solid black',
                                            padding: '5px 0',
                                            height: '50%',
                                            backgroundColor: '#f2f2f2',
                                            width: '100%',
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
