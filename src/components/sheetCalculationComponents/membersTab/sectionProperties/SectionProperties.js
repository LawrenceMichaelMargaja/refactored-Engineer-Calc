import {Button, Card} from "@material-ui/core";
import React, {useMemo} from "react";
import MaterialPropertiesRows from "../materialProperties/materialPropertiesRows/metricMaterialPropertiesRows";
import SectionPropertiesRows from "./sectionPropertiesRows/SectionPropertiesRows";
import {useDispatch, useSelector} from "react-redux";
import {addSectionProperty} from "../../../../store/actions/sheets/sheetCalculationComponents/sectionProperties/sectionProperties";
import {size} from "lodash";


const SectionProperties = () => {



    const dispatch = useDispatch()
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)

    const sectionPropertiesMetric = useSelector(state => state.sheets.sheets[selectedSheet].apiData.sectionPropertiesMetric)
    const insertedSectionPropertiesMetric = useSelector(state => state.sheets.sheets[selectedSheet].sectionProperties)

    const hashSectionsMetric = useMemo(() => {
        let hash = {}
        for(let i in sectionPropertiesMetric) {
            let {
                section_properties_metric_name
            } = sectionPropertiesMetric[i]
            hash[section_properties_metric_name] = sectionPropertiesMetric[i]
        }
        return hash
    }, [sectionPropertiesMetric])

    const insertSectionProperty = () => {
        // console.log(sectionPropertiesMetric)
        if(size(insertedSectionPropertiesMetric) === 0) {
            let initialSection = {}
            initialSection[0] = {
                id: 2,
                name: 'test',
                shape: 'test2',
            }
            dispatch(addSectionProperty(initialSection, selectedSheet))
        } else {
            let currentSections = {...insertedSectionPropertiesMetric}
            const newSectionSize = size(insertedSectionPropertiesMetric)
            currentSections[newSectionSize] = {
                id: 3,
                name: 'Hey',
                shape: 'You'
            }
            dispatch(addSectionProperty(currentSections, selectedSheet))
        }
    }


    return (
        <div style={{
            width: '40%',
            margin: '0 auto'
        }}>
            <div style={{
                width: '94.5%',
                padding: '15px',
            }}
            >
                <div>
                    <div
                        style={{
                            textAlign: 'right'
                        }}>
                        <Button
                            style={{
                                margin: '10px'
                            }}
                            variant='contained'
                            color='primary'
                            onClick={() => insertSectionProperty()}
                        >
                            Add Section
                        </Button>
                        <Button
                            variant='contained' color='secondary'>
                            Remove All
                        </Button>
                    </div>
                </div>
                <Card style={{
                    marginBottom: '0px',
                    border: '1px solid black',
                    padding: '5px',
                    backgroundColor: '#e2e2e2',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <p style={{margin: '0px'}}><strong>SECTIONS</strong></p>
                </Card>
                <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%'
                }}>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>ID</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>Shape</strong>
                        </p>
                    </div>

                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>Name</strong>
                        </p>
                    </div>
                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>View</strong>
                        </p>
                    </div>

                    <div style={{
                        paddingRight: '0px',
                        width: '20%',
                        textAlign: 'center'
                    }}>
                        <p>
                            <strong>Edit</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div style={{margin: '0 auto', width: '100%'}}>
                <SectionPropertiesRows/>
            </div>
        </div>
    )
}
export default SectionProperties;
