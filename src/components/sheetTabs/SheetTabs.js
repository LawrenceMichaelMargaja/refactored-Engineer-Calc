import React from "react";
import {Button, Tab, Tabs} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from '@material-ui/icons/Add';
import {useDispatch, useSelector} from "react-redux";
import {size} from "lodash";
import {addNewSheet, setRouteUrl, setSelectedSheet, setTabState} from "../../store/actions/sheets/sheets";
import {useNavigate} from "react-router";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    indicator: {
        backgroundColor: '#f1f1f1',
        // transition: 'linear',
        height: '100%',
        zIndex: 0,
        opacity: 0.8
    },
    inactiveTabs: {
        backgroundColor: '#4d4d4d',
        // transition: 'linear',
        height: '100%',
        zIndex: 0,
        opacity: 0.7
    }
}));

const SheetTabs = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const sheets = useSelector(state => state.sheets.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const tabState = useSelector(state => state.sheets.sheets[selectedSheet].tabState)

    const navigate = useNavigate()

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
                materialProperties: {
                    0: {
                        materialPropertiesId: 1,
                        materialPropertiesEMPA: 'Sugar',
                        materialPropertiesFYMPA: 'Pestle',
                        materialPropertiesFUMPA: 'Bowl',
                        materialPropertiesSelectedMaterial: 'Cabbage'
                    }
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
                materialProperties: {
                    0: {
                        materialPropertiesId: 1,
                        materialPropertiesEMPA: 'Sugar',
                        materialPropertiesFYMPA: 'Pestle',
                        materialPropertiesFUMPA: 'Bowl',
                        materialPropertiesSelectedMaterial: 'Cabbage'
                    }
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

        const activeTabHandler = () => {
            if(tabState === 'details') {
                navigate('/details')
            } else if(tabState === 'factors') {
                navigate('/factors')
            } else if(tabState === 'members') {
                navigate('/members')
            } else if(tabState === 'forces') {
                navigate('/forces')
            } else if(tabState === 'results') {
                navigate('/results')
            }
        }

        const tabs = []

        for (let currentSheetIndex in sheets) {
            tabs.push(
                <Tab
                    style={{
                        borderRight: '1px solid grey',
                        backgroundColor: '#fff',
                        fontWeight: 'bold'
                    }}
                    onClick={() => {
                        activeTabHandler()
                        dispatch(setSelectedSheet(currentSheetIndex))
                    }}
                    label={
                        <span style={{width: '100%', zIndex: 1}}>
                            SHEET <CancelIcon color='primary' style={{width: '20%', marginRight: '-5px', float: 'right'}}/>
                        </span>
                    }>
                </Tab>
            )
        }

        return (
            <paper style={{display: 'flex', backgroundColor: '#d3d3d3'}}>
                <Tabs className={classes.indicator} aria-label="disabled tabs example" >
                    {tabs}
                </Tabs>
            </paper>
        )
    }

    return (
        <div style={{display: 'flex'}}>
            {renderSheets()}
            <Button onClick={insertSheet}>
                <AddIcon/>
            </Button>
        </div>
    )
}
export default SheetTabs