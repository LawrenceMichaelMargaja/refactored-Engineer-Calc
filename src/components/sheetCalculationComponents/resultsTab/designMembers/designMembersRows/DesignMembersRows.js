import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";

const DesignMembersRows = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const steelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesMetric'])
    const iShapeData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'iShapesMetric'])
    const steelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesEnglish'])
    const sectionsMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesMetric'])
    const sectionsEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesEnglish'])
    const insertedSectionMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSteelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    const insertedSteelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeEnglishProperties'])

    const hashMetric = useMemo(() => {
        let hash = {}
        for (let i in sectionsMetric) {
            let {
                section_properties_metric_name,
            } = sectionsMetric[i]
            hash[section_properties_metric_name] = sectionsMetric[i]
        }
        return hash
    }, [])

    const hashEnglish = useMemo(() => {
        let hash = {}
        for (let i in steelTypesEnglish) {
            let {
                steel_type_english_name,
            } = steelTypesEnglish[i]
            hash[steel_type_english_name] = steelTypesEnglish[i]
        }
        return hash
    }, [insertedSteelTypesEnglish])

    let memberRows = []

    const renderMemberRowsMetric = () => {



        const returnIShapeValues = () => {
            for(let index in iShapeData) {
                return iShapeData[index].i_shape_metric_name
            }
        }

        for (let index in iShapeData) {

            memberRows.push(
                <div style={{
                    textAlign: 'center'
                }}
                     key={index}
                >
                    <div style={{
                        display: 'flex',
                    }}
                    >
                        <p style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>{parseFloat(index) + 1}</strong>
                        </p>
                        <div style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            {/*{JSON.stringify(sectionsMetric)}*/}
                            <strong>{iShapeData[index].i_shape_metric_name}</strong>
                            {/*section name*/}
                            {/*<strong>{hashMetric['W1100X499']}</strong>*/}
                        </div>
                        <p style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>Overall depth(mm)</strong>
                        </p>
                        <p style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>Weight(kg/m)</strong>
                        </p>
                        <p style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>Critical Design Ratio</strong>
                        </p>
                        <p style={{
                            width: '16.66%',
                            backgroundColor: '#fff',
                            margin: '0',
                            border: '1px solid black',
                            padding: '0.5em'
                        }}>
                            <strong>KL/r value</strong>
                        </p>
                    </div>
                </div>
            )
        }
        return (
            <div style={{marginBottom: '1em'}}>
                {memberRows}
            </div>
        )
    }
    return renderMemberRowsMetric()
}
export default DesignMembersRows
