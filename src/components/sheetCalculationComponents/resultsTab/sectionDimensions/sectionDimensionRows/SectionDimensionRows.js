import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";

const SectionDimensionResultsRows = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const sectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesMetric'])
    const sectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesEnglish'])
    const sectionDimensionsMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionDimensionsMetric'])
    const sectionDimensionsEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionDimensionsEnglish'])
    const insertedSectionsMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSectionsEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])

    const hashMetric = useMemo(() => {
        let hash = {}
        for (let i in sectionDimensionsMetric) {
            let {
                section_dimension_metric_name,
            } = sectionDimensionsMetric[i]
            hash[section_dimension_metric_name] = sectionDimensionsMetric[i]
        }
        return hash
    }, [sectionPropertiesMetric])

    const hashEnglish = useMemo(() => {
        let hash = {}
        for (let i in sectionDimensionsEnglish) {
            let {
                section_dimension_english_name,
            } = sectionDimensionsEnglish[i]
            hash[section_dimension_english_name] = sectionDimensionsEnglish[i]
        }
        return hash
    }, [sectionDimensionsEnglish])

    let memberRows = []



    const renderMemberRowsMetric = () => {
        for (let index in insertedSectionsMetric) {

            const sectionNameMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric', index, 'sectionName'])

            const sectionDimensions_name_value = () => {
                if(system === 'Metric') {
                    return insertedSectionsMetric[index].sectionName
                } else if(system === 'English') {
                    return insertedSectionsEnglish[index].sectionName
                }
            }

            const sectionDimensions_d_value = () => {
                if(system === 'Metric') {
                    // alert("here man === " + JSON.stringify(insertedSectionsMetric[index].sectionName))
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_dimension_metric_d
                } else if(system === 'English') {
                    // alert(JSON.stringify(sectionDimensionsEnglish))
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_dimension_english_d
                }
            }

            const sectionDimensions_b_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_dimension_metric_b
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_dimension_english_b
                }
            }

            const sectionDimensions_tw_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_dimension_metric_tw
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_dimension_english_tw
                }
            }

            const sectionDimensions_bf_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_dimension_metric_bf
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_dimension_english_bf
                }
            }

            const sectionDimensions_tf_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_dimension_metric_tf
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_dimension_english_tf
                }
            }

            const sectionDimensions_tb_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_dimension_metric_tb
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_dimension_english_tb
                }
            }

            const sectionDimensions_t_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_dimension_metric_t
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_dimension_english_t
                }
            }

            const sectionDimensions_r_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_dimension_metric_r
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_dimension_english_r
                }
            }

            memberRows.push(

                <div style={{
                    display: 'flex',
                    width: '95%',
                    margin: '0 auto'
                }}
                key={index}
                >
                    <div style={{
                        margin: '0px',
                        border: '1px solid black',
                        padding: '5px',
                        backgroundColor: '#fff',
                        width: '14.28%'
                    }}>
                        <p style={{
                            margin: '0px'
                        }}>
                            {parseFloat(index) + 1}
                        </p>
                    </div>
                    <div style={{
                        margin: '0px',
                        border: '1px solid black',
                        padding: '5px',
                        backgroundColor: '#fff',
                        width: '14.28%'
                    }}>
                        <p style={{
                            margin: '0px'
                        }}>
                            <strong>{sectionDimensions_name_value()}</strong>
                        </p>
                    </div>
                    <div style={{
                        margin: '0px',
                        border: '1px solid black',
                        padding: '5px',
                        backgroundColor: '#fff',
                        width: '14.28%'
                    }}>
                        <p style={{
                            margin: '0px'
                        }}>
                            {sectionDimensions_d_value()}
                        </p>
                    </div>
                    <div style={{
                        margin: '0px',
                        border: '1px solid black',
                        padding: '5px 0px 2px 0',
                        backgroundColor: '#fff',
                        width: '14.28%'
                    }}>
                        <p style={{
                            margin: '0px'
                        }}>
                            {sectionDimensions_b_value()}
                        </p>
                    </div>
                    <div style={{
                        margin: '0px',
                        border: '1px solid black',
                        padding: '5px 0px 2px 0',
                        backgroundColor: '#fff',
                        width: '14.28%'
                    }}>
                        <p style={{
                            margin: '0px'
                        }}>
                            {sectionDimensions_tw_value()}
                        </p>
                    </div>
                    <div style={{
                        margin: '0px',
                        border: '1px solid black',
                        padding: '5px 0px 2px 0',
                        backgroundColor: '#fff',
                        width: '14.28%'
                    }}>
                        <p style={{
                            margin: '0px'
                        }}>
                            {sectionDimensions_bf_value()}
                        </p>
                    </div>
                    <div style={{
                        margin: '0px',
                        border: '1px solid black',
                        padding: '5px 0px 2px 0',
                        backgroundColor: '#fff',
                        width: '14.28%'
                    }}>
                        <p style={{
                            margin: '0px'
                        }}>
                            {sectionDimensions_tf_value()}
                        </p>
                    </div>
                    <div style={{
                        margin: '0px',
                        border: '1px solid black',
                        padding: '5px 0px 2px 0',
                        backgroundColor: '#fff',
                        width: '14.28%'
                    }}>
                        <p style={{
                            margin: '0px'
                        }}>
                            {sectionDimensions_tb_value()}
                        </p>
                    </div>
                    <div style={{
                        margin: '0px',
                        border: '1px solid black',
                        padding: '5px 0px 2px 0',
                        backgroundColor: '#fff',
                        width: '14.28%'
                    }}>
                        <p style={{
                            margin: '0px'
                        }}>
                            {sectionDimensions_t_value()}
                        </p>
                    </div>
                    <div style={{
                        margin: '0px',
                        border: '1px solid black',
                        padding: '5px 0px 2px 0',
                        backgroundColor: '#fff',
                        width: '14.28%'
                    }}>
                        <p style={{
                            margin: '0px'
                        }}>
                            {sectionDimensions_r_value()}
                        </p>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {memberRows}
            </div>
        )
    }

    return renderMemberRowsMetric()
}
export default SectionDimensionResultsRows