import React from "react";
import {Button, Tab, Tabs} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from '@material-ui/icons/Add';
import {useDispatch, useSelector} from "react-redux";
import {size} from "lodash";
import {addNewSheet, setSelectedSheet} from "../../store/actions/sheets/sheets";

const SheetTabs = () => {

    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets.sheets)

    const insertSheet = () => {
        if (size(sheets) === 0) {
            const newSheet = {}
            newSheet[0] = {
                tabState: 'details',
                provision: 'ASD',
                system: "Metric",
                method: "Investigation",
                removedMemberRowArray: [],
                details: {
                    projectUnit: '',
                    projectName: '',
                    projectId: '',
                    projectCompany: '',
                    projectDesigner: '',
                    projectClient: '',
                    projectNotes: ''
                },
                members: {
                    0: {
                        memberId: 1,
                        materialId: 1,
                        sectionId: 1,
                        totalLengthOfMember: 1,
                        yAxisUnbracedLength: 1,
                        yAxisEffectiveLengthFactor: 1,
                        zAxisUnbracedLength: 1,
                        zAxisEffectiveLengthFactor: 1,
                        LLT: '1.0',
                        unbracedLengthLateralTorsional: 1.0,
                        lateralTorsionalModificationFactor: 1.0,
                        slendernessRatioInCompression: 200,
                        LST: 300
                    }
                },
                factors: {
                    safetyFactorForTensile: 1.67,
                    safetyFactorForCompression: 1.67,
                    safetyFactorForFlexure: 1.67,
                    safetyFactorForShear: 1.67
                },
                forces: {
                    bendingMomentAlongXAxis: 0,
                    bendingMomentAlongYAxis: 0,
                    shearAlongXAxis: 0,
                    shearAlongYAxis: 0,
                    axial: 0,
                }
            }
            dispatch(addNewSheet(newSheet))
            dispatch(setSelectedSheet(0))
        } else {
            const newSizeIndex = size(sheets)
            const currentSheets = {...sheets}

            currentSheets[newSizeIndex] = {
                tabState: 'details',
                provision: 'ASD',
                system: "Metric",
                method: "Investigation",
                removedMemberRowArray: [],
                details: {
                    projectUnit: '',
                    projectName: '',
                    projectId: '',
                    projectCompany: '',
                    projectDesigner: '',
                    projectClient: '',
                    projectNotes: ''
                },
                members: {
                    0: {
                        memberId: 1,
                        materialId: 1,
                        sectionId: 1,
                        totalLengthOfMember: 1,
                        yAxisUnbracedLength: 1,
                        yAxisEffectiveLengthFactor: 1,
                        zAxisUnbracedLength: 1,
                        zAxisEffectiveLengthFactor: 1,
                        LLT: '1.0',
                        unbracedLengthLateralTorsional: 1.0,
                        lateralTorsionalModificationFactor: 1.0,
                        slendernessRatioInCompression: 200,
                        LST: 300
                    }
                },
                factors: {
                    safetyFactorForTensile: 1.67,
                    safetyFactorForCompression: 1.67,
                    safetyFactorForFlexure: 1.67,
                    safetyFactorForShear: 1.67
                },
                forces: {
                    bendingMomentAlongXAxis: 0,
                    bendingMomentAlongYAxis: 0,
                    shearAlongXAxis: 0,
                    shearAlongYAxis: 0,
                    axial: 0,
                }
            }
            dispatch(addNewSheet(currentSheets))
            dispatch(setSelectedSheet(newSizeIndex))
        }
    }

    const renderSheets = () => {

        const tabs = []

        for (let currentSheetIndex in sheets) {
            tabs.push(
                <Tab
                    color='primary'
                    style={{
                        backgroundColor: '#fff',
                        fontWeight: 'bold'
                    }}
                    onClick={() => dispatch(setSelectedSheet(currentSheetIndex))}
                    label={
                        <span style={{width: '100%', zIndex: 1}}>
                            SHEET <CancelIcon color='primary' style={{width: '20%', marginRight: '-5px', float: 'right'}}/>
                        </span>
                    }>
                    SHEET
                </Tab>
            )
        }

        return (
            <paper style={{display: 'flex'}}>
                <Tabs style={{backgroundColor: '#d1d1d1'}}>
                    {tabs}
                </Tabs>
            </paper>
        )
    }

    return (
        <div style={{display: 'flex'}}>
            {renderSheets()}
            <div style={{display: 'flex', overflow: 'auto', backgroundColor: '#d1d1d1'}} value={false}>
                <Button style={{marginLeft: '10px'}} onClick={insertSheet}><AddIcon/></Button>
            </div>
        </div>
    )
}
export default SheetTabs