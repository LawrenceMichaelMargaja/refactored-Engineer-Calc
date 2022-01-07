import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";

const SectionDimensionResultsRows = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const sectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesMetric'])
    const sectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesEnglish'])
    const insertedSectionsMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSectionsEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])

    const hashMetric = useMemo(() => {
        let hash = {}
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
        for (let index in insertedSectionsMetric) {

            const sectionNameMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric', index, 'sectionName'])

            // const sectionProperties_a_value = () => {
            //     if(system === 'Metric') {
            //         return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_a
            //     } else if(system === 'English') {
            //         return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_a
            //     }
            // }
            //
            // const sectionProperties_j_value = () => {
            //     if(system === 'Metric') {
            //         return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_j
            //     } else if(system === 'English') {
            //         return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_j
            //     }
            // }
            //
            // const sectionProperties_ixp_value = () => {
            //     if(system === 'Metric') {
            //         return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_ixp
            //     } else if(system === 'English') {
            //         return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_ixp
            //     }
            // }
            //
            // const sectionProperties_iyp_value = () => {
            //     if(system === 'Metric') {
            //         return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_iyp
            //     } else if(system === 'English') {
            //         return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_iyp
            //     }
            // }
            //
            // const sectionProperties_iw_value = () => {
            //     if(system === 'Metric') {
            //         return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_iw
            //     } else if(system === 'English') {
            //         return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_iw
            //     }
            // }
            //
            // const sectionProperties_sxp_value = () => {
            //     if(system === 'Metric') {
            //         return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_sxp
            //     } else if(system === 'English') {
            //         return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_sxp
            //     }
            // }
            //
            // const sectionProperties_syp_value = () => {
            //     if(system === 'Metric') {
            //         return hashMetric[insertedSectionsMetric[index].sectionName].section_properties_metric_syp
            //     } else if(system === 'English') {
            //         return hashEnglish[insertedSectionsEnglish[index].sectionName].section_properties_english_syp
            //     }
            // }

            memberRows.push(

                <div style={{
                    display: 'flex',
                    width: '90%',
                    margin: '0 auto'
                }}>
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
                            <strong>{parseFloat(index) + 1}</strong>
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
                            <strong>{sectionNameMetric}</strong>
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
                            <strong>d({"areaUnit"})</strong>
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
                            <strong>t<sub>w</sub>({"areaUnit"})</strong>
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
                            <strong><sub></sub>additional</strong>
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
                            <strong><sub></sub>additional</strong>
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
                            <strong><sub></sub>additional</strong>
                        </p>
                    </div>
                </div>

                // <div style={{
                //     width: '90%',
                //     margin: '0 auto',
                //     marginBottom: '20px',
                // }}>
                //     <div style={{
                //         margin: '0 auto',
                //         display: 'flex'
                //     }}>
                //         <div style={{
                //             width: '14.28%',
                //             border: '1px solid black',
                //         }}>
                //             {/*<div style={{*/}
                //             {/*    border: '1px solid black',*/}
                //             {/*}}>*/}
                //                 <p>{parseFloat(index) + 1}</p>
                //             {/*</div>*/}
                //         </div>
                //         <div style={{
                //             width: '14.28%',
                //         }}>
                //             <div style={{
                //                 border: '1px solid black'
                //             }}>
                //                 <p>{"sectionName"}</p>
                //             </div>
                //         </div>
                //         <div style={{
                //             width: '14.28%',
                //         }}>
                //             <div style={{
                //                 border: '1px solid black'
                //             }}>
                //                 <p>{"sectionName"}</p>
                //             </div>
                //         </div>
                //         <div style={{
                //             width: '14.28%',
                //         }}>
                //             <div style={{
                //                 border: '1px solid black'
                //             }}>
                //                 <p>{"sectionName"}</p>
                //             </div>
                //         </div>
                //         <div style={{
                //             width: '14.28%',
                //         }}>
                //             <div style={{
                //                 border: '1px solid black'
                //             }}>
                //                 <p>{"sectionName"}</p>
                //             </div>
                //         </div>
                //         <div style={{
                //             width: '14.28%',
                //         }}>
                //             <div style={{
                //                 border: '1px solid black'
                //             }}>
                //                 <p>{"sectionName"}</p>
                //             </div>
                //         </div>
                //         <div style={{
                //             width: '14.28%',
                //         }}>
                //             <div style={{
                //                 border: '1px solid black'
                //             }}>
                //                 <p>{"sectionName"}</p>
                //             </div>
                //         </div>
                //     </div>
                // </div>
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