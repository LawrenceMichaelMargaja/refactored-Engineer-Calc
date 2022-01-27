import React from "react";
import HelpIcon from "@material-ui/icons/Help";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import {
    setCurrentEnglishSectionPropertyIndex,
    setCurrentMetricSectionPropertyIndex
} from "../../../../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import CancelIcon from "@material-ui/icons/Cancel";
import {Input} from "@material-ui/core";

const SectionPropertiesRowsDesign = () => {
    return (
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
                }}>
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
export default SectionPropertiesRowsDesign;
