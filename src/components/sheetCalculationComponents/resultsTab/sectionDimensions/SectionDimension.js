import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import SectionDimensionResultsRows from "./sectionDimensionRows/SectionDimensionRows";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../utilities/utilities";
import SectionDimensionGraphs from "./sectionDimensionGraphs/SectionDimensionGraphs";
import DataGridDemo from "../designMembers/designMembersRows/DesignMembersRowsDataGrid";
import SectionPropertiesRowsDataGrid from "../designMembers/designMembersRows/SectionDimensionsRowsDataGrid";
import SectionDimensionsRowsDataGrid from "../designMembers/designMembersRows/SectionDimensionsRowsDataGrid";

const SectionDimensions = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])

    const [unit, setUnit] = useState('')
    const [cardTitle, setCardTitle] = useState('')

    useEffect(() => {
        if(method === 'Investigation') {
            setCardTitle('Section Dimension')
        } else if(method === 'Design') {
            setCardTitle('Section Graphs')
        }
    }, [method])

    useEffect(() => {
        if(system === 'Metric') {
            setUnit('mm')
        } else if(system === 'English') {
            setUnit('inch')
        }
    }, [system])

    const displayRowHeaders = () => {
        if(method === 'Investigation') {
            return (
                <div style={{padding: '0 1em'}}>
                    <SectionDimensionsRowsDataGrid/>
                    {/*<SectionDimensionResultsRows/>*/}
                </div>
            )
        } else if(method === 'Design') {
            return (
                <></>
            )
        }
    }

    return (
        <Card style={{
            // height: '80vh',
            flexGrow: 1,
            padding: '1em 0',
            marginBottom: '50px',
            border: '1px solid black',
            backgroundColor: '#efefef',
            paddingTop: '1%',
            textAlign: 'center',
            overflow: 'scroll'
        }}
        >
            <Card style={{
                margin: '20px 20px 0px 20px',
                padding: '10px',
                border: '1px solid black',
                backgroundColor: '#e2e2e2',
            }}>
                <strong>{cardTitle}</strong>
            </Card>
            <SectionDimensionGraphs/>
            {displayRowHeaders()}
        </Card>
    )
}
export default SectionDimensions;
