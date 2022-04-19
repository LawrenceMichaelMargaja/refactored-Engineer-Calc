import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import SectionPropertiesRows from "../../membersTab/sectionProperties/sectionPropertiesRows/SectionPropertiesRows";
import SectionPropertiesResultsRows from "./sectionPropertiesRows/SectionPropertiesRows";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../utilities/utilities";
import SectionPropertiesRowsDataGrid from "../designMembers/designMembersRows/SectionDimensionsRowsDataGrid";
import SectionDimensionsRowsDataGrid from "./sectionPropertiesRows/SectionPropertiesRowsDataGrid";

const SectionProperties = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])

    const [unit, setUnit] = useState('')

    useEffect(() => {
        if(system === 'Metric') {
            setUnit('mm')
        } else if(system === 'English') {
            setUnit('inch')
        }
    }, [system])

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
                <SectionDimensionsRowsDataGrid/>
            </div>
            {/*<SectionPropertiesResultsRows/>*/}
        </>
    )
}

export default SectionProperties
