import React from "react";
import HelpIcon from "@material-ui/icons/Help";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import {
    setCurrentEnglishSectionPropertyIndex,
    setCurrentMetricSectionPropertyIndex
} from "../../../../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import CancelIcon from "@material-ui/icons/Cancel";
import {Input} from "@material-ui/core";
import {objectChecker} from "../../../../../utilities/utilities";
import {useDispatch, useSelector} from "react-redux";
import {setSectionShapeDesign} from "../../../../../store/actions/sheets/sheets";

const SectionPropertiesRowsDesign = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])

    const insertedSectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSection = useSelector(state => state.sheets.sheets[selectedSheet].apiMap.sectionPropertiesMetric)
    const insertedSectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])

    const dispatch = useDispatch()

    const sectionDesignTabs = []

    const NameValueHandler = () => {
        if (system === 'Metric') {
            return insertedSectionPropertiesMetric[0].sectionName
            // return hashMetric[insertedSectionPropertiesMetric[sectionIndex].sectionName].section_properties_metric_name
        } else if (system === 'English') {
            return insertedSectionPropertiesEnglish[0].sectionName
            // return hashEnglish[insertedSectionPropertiesMetric[sectionIndex].sectionName].section_properties_english_name
        }
    }

    const ShapeValueHandler = (sectionIndex) => {
        if (system === 'Metric') {
            // alert("insertedSectionPropertiesMetric[0].sectionShape == " + insertedSectionPropertiesMetric[0].sectionShape)
            return insertedSectionPropertiesMetric[sectionIndex].sectionShape
            // return hashMetric[insertedSectionPropertiesMetric[sectionIndex].sectionShape].section_properties_metric_shape
        } else if (system === 'English') {
            return insertedSectionPropertiesEnglish[sectionIndex].sectionShape
            // return hashEnglish[insertedSectionPropertiesMetric[sectionIndex].sectionShape].section_properties_english_shape
        }
    }

    const ShapeValueChanger = (event, sectionIndex) => {
        dispatch(setSectionShapeDesign(event.target.value, selectedSheet, sectionIndex))
    }

    console.log("insertedSectionPropertiesMetric == ", insertedSection);
    // alert("insertedSectionPropertiesMetric == " + JSON.stringify(insertedSectionPropertiesMetric))

    for(let sectionIndex in insertedSectionPropertiesMetric) {
        sectionDesignTabs.push(
            <div style={{
                display: 'flex',
                width: '100%',
                margin: '0 auto',
            }}>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '20%',
                    // height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '5%',
                    }}>
                        Test
                    </p>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '25%',
                    // height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <Input style={{
                        margin: '0%',
                        padding: '5%',
                        textAlign: 'center'
                    }}
                        inputProps={{style: {textAlign: 'center'}}}
                        onChange={(event) => {ShapeValueChanger(event, sectionIndex)}}
                        value={ShapeValueHandler(sectionIndex)}
                        // value={insertedSectionPropertiesMetric[1].sectionShape}
                    >
                        Shape
                    </Input>
                </div>
                <div style={{
                    border: '1px solid black',
                    margin: '0px',
                    width: '25%',
                    // height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0%',
                        padding: '5%',
                    }}>
                        N/A
                    </p>
                </div>
                <div style={{
                    margin: '0px',
                    width: '10%',
                    // height: '100%'
                }}>
                    <div style={{
                        margin: '0%',
                        // height: '100%'
                        textAlign: 'center'
                    }}>
                        <p style={{
                            margin: '7px 0px 2px',
                        }}
                           aria-disabled={true}
                        >
                            <HelpIcon
                                variant='contained'
                                disabled={true}
                                aria-disabled={true}
                            >
                            </HelpIcon>
                        </p>
                    </div>
                </div>
                <div style={{margin: '1px', width: '20%'}}>
                    <div style={{display: 'column'}}
                         disabled={true}
                    >
                        <p style={{
                            margin: '7px 0px 2px',
                            textAlign: 'center'
                        }}>
                            <BorderColorIcon
                                style={{marginRight: '5px'}}
                                color='#fff'
                                // onClick={() => {
                                //     dispatch(setCurrentMetricSectionPropertyIndex(sectionIndex, selectedSheet))
                                //     dispatch(setCurrentEnglishSectionPropertyIndex(sectionIndex, selectedSheet))
                                //     handleOpenNestedModal()
                                //     setTheCurrentSectionIndex(sectionIndex)
                                // }}
                            />
                            <CancelIcon
                                // color='secondary'
                                // onClick={() => removeSection(selectedSheet, sectionIndex)}
                            />
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {sectionDesignTabs}
        </div>
    )
}
export default SectionPropertiesRowsDesign;
