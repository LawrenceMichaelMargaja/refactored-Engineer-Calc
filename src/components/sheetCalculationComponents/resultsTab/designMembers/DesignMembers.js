import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../utilities/utilities";
import DesignMembersRows from "./designMembersRows/DesignMembersRows";
import DesignMemberRowsEnglish from "./designMembersRows/DesignMemberRowsEnglish";
import DataGridDemo from "./designMembersRows/DesignMembersRowsDataGrid";
import {Card} from "@material-ui/core";

const DesignMembers = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])

    const [unit, setUnit] = useState('')
    const [weight, setWeight] = useState('')

    useEffect(() => {
        if(system === 'Metric') {
            setWeight('kg/m')
        } else {
            setWeight('kg/ft')
        }
    }, [system])

    useEffect(() => {
        if(system === 'Metric') {
            setUnit('(mm)')
        } else if(system === 'English') {
            setUnit('(inch)')
        }
        displayDesignMemberRows()
    }, [system])

    const displayDesignMemberRows = () => {
        if(system === 'Metric') {
            return <DataGridDemo/>
            // return <DesignMembersRows/>
        } else if(system === 'English') {
            return <DataGridDemo/>
            // return <DesignMemberRowsEnglish/>
        }
    }

    return (
        <>
            <Card style={{
                height: '100%',
                marginTop: '1em',
                textAlign: 'center',
                border: '1px solid black',
            }}
            >
                <div style={{
                    marginBottom: '5px',
                    height: '50%',
                    padding: '5px',
                    backgroundColor: '#f2f2f2',
                }}>
                    <p><strong>Design Members</strong></p>
                </div>
            </Card>
            <div style={{
                width: '100%'
            }}>
                {displayDesignMemberRows()}
            </div>
        </>
    )
}

export default DesignMembers
