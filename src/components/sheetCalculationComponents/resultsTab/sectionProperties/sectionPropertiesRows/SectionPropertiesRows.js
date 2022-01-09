import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";
import size from 'lodash/size'

const SectionPropertiesResultsRows = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const sectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesMetric'])
    const sectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesEnglish'])
    const insertedSectionsMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSectionsEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])

    const hashMetric = useMemo(() => {
        let hash = {}
        if (size(sectionPropertiesMetric) === 0) {
            return hash
        }
        for (let i in sectionPropertiesMetric) {
            let {
                section_properties_metric_name,
            } = sectionPropertiesMetric[i]
            hash[section_properties_metric_name] = sectionPropertiesMetric[i]
        }
        return hash
    }, [sectionPropertiesMetric])

    const hashEnglish = useMemo(() => {
        let hash = {}
        if (size(sectionPropertiesEnglish) === 0) {
            return hash
        }

        for (let i in sectionPropertiesEnglish) {
            let {
                section_properties_english_name,
            } = sectionPropertiesEnglish[i]
            hash[section_properties_english_name] = sectionPropertiesEnglish[i]
        }
        return hash
    }, [sectionPropertiesMetric])

    let memberRows = []



    const renderMemberRowsMetric = () => {
        if (size(hashMetric) === 0) {
            return null
        }

        for (let index in insertedSectionsMetric) {

            const sectionProperties_a_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_a
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_a
                }
            }

            const sectionProperties_j_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_j
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_j
                }
            }

            const sectionProperties_ixp_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_ixp
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_ixp
                }
            }

            const sectionProperties_iyp_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_iyp
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_iyp
                }
            }

            const sectionProperties_iw_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_iw
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_iw
                }
            }

            const sectionProperties_sxp_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_sxp
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_sxp
                }
            }

            const sectionProperties_syp_value = () => {
                if(system === 'Metric') {
                    return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_syp
                } else if(system === 'English') {
                    return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_syp
                }
            }

            memberRows.push(
                <div style={{
                    textAlign: 'center',
                }}
                     key={index}
                >
                    <div style={{
                        display: 'flex',
                        padding: '0 15px 0 15px',
                    }}
                    >
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{parseFloat(index) + 1}</strong>
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{insertedSectionsMetric[index].sectionName}</strong>
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {sectionProperties_a_value()}
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {sectionProperties_j_value()}
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {sectionProperties_ixp_value()}
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {sectionProperties_iyp_value()}
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {sectionProperties_iw_value()}
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {sectionProperties_sxp_value()}
                        </p>
                        <p style={{
                            width: '14.28%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {sectionProperties_syp_value()}
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
export default SectionPropertiesResultsRows
