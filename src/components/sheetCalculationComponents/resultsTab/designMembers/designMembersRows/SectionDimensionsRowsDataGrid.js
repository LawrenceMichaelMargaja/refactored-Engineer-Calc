import React, {useEffect, useMemo} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";
import {DataGrid} from "@mui/x-data-grid";
import {Stack} from "@mui/material";
import size from "lodash/size";

const SectionDimensionsRowsDataGrid = () => {

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
    }, [sectionDimensionsMetric, selectedSheet])

    const hashEnglish = useMemo(() => {
        let hash = {}
        for (let i in sectionDimensionsEnglish) {
            let {
                section_dimension_english_name,
            } = sectionDimensionsEnglish[i]
            hash[section_dimension_english_name] = sectionDimensionsEnglish[i]
        }
        return hash
    }, [sectionDimensionsEnglish, selectedSheet])

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            // flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            fontWeight: 'bold',
            type: 'number',
            width: 50
        },
        {
            field: 'name',
            headerName: 'Name',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            fontWeight: 'bold',
            type: 'string',
            width: 180,
            // flex: 1,
            // editable: true,
        },
        {
            field: 'd',
            headerName: system === 'Metric' ? 'd(mm)' : 'd(inch)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 200,
            // editable: true,
        },
        {
            field: 'b',
            headerName: system === 'Metric' ? 'b(mm)' : 'b(inch)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 'tw',
            headerName: system === 'Metric' ? 'tw(mm)' : 'tw(inch)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 'bf',
            headerName: system === 'Metric' ? 'bf(mm)' : 'bf(inch)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 'tf',
            headerName: system === 'Metric' ? 'tf(mm)' : 'tf(inch)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 'tb',
            headerName: system === 'Metric' ? 'tb(mm)' : 'tb(inch)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 't',
            headerName: system == 'Metric' ? 't(mm)' : 't(inch)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 175,
            flex: 1,
            // // width: 210,
            // editable: true,
        },
        {
            field: 'r',
            headerName: system === 'Metric' ? 'r(mm)' : 'r(inch)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 160,
            flex: 1,
            // sortable: false,
            // width: 160,
        },
    ];

    const newData = []

    if (system === 'Metric') {
        for (let index in insertedSectionsMetric) {
            newData.push(insertedSectionsMetric[index])
        }
    } else if (system == 'English') {
        for (let index in insertedSectionsEnglish) {
            newData.push(insertedSectionsEnglish[index])
        }
    }

    // useEffect(() => {
    //     if (system === 'Metric') {
    //         for (let index in insertedSectionsMetric) {
    //             newMetricData.push(insertedSectionsMetric[index])
    //         }
    //     } else if (system == 'English') {
    //         for (let index in insertedSectionsEnglish) {
    //             newEnglishData.push(insertedSectionsMetric[index])
    //         }
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     if (system === 'Metric') {
    //         for (let index in insertedSectionsMetric) {
    //             newMetricData.push(insertedSectionsMetric[index])
    //         }
    //     } else if (system == 'English') {
    //         for (let index in insertedSectionsEnglish) {
    //             newEnglishData.push(insertedSectionsMetric[index])
    //         }
    //     }
    // }, [system])

    const displayMetricData = () => {
        const loading = [{
            id: 'Calculating...',
            name: 'Calculating...',
            overallDepth: 'Calculating...',
            weight: 'Calculating...',
            criticalDesignRatio: 'Calculating...',
            klr: 'Calculating...'
        }]
        if(newData.length === 0) {
            return loading
        } else {
            const newOptions = newData.map((data) => ({
                id: data.sectionId,
                name: data.sectionName,
                d: hashMetric[data.sectionName].section_dimension_metric_d === 'null' ? '-' : hashMetric[data.sectionName].section_dimension_metric_d,
                b: hashMetric[data.sectionName].section_dimension_metric_b === 'null' ? '-' : hashMetric[data.sectionName].section_dimension_metric_b,
                tw: hashMetric[data.sectionName].section_dimension_metric_tw === 'null' ? '-' : hashMetric[data.sectionName].section_dimension_metric_tw,
                bf: hashMetric[data.sectionName].section_dimension_metric_bf === 'null' ? '-' : hashMetric[data.sectionName].section_dimension_metric_bf,
                tf: hashMetric[data.sectionName].section_dimension_metric_tf === 'null' ? '-' : hashMetric[data.sectionName].section_dimension_metric_tf,
                tb: hashMetric[data.sectionName].section_dimension_metric_tb === 'null' ? '-' : hashMetric[data.sectionName].section_dimension_metric_tb,
                t: hashMetric[data.sectionName].section_dimension_metric_t === 'null' ? '-' : hashMetric[data.sectionName].section_dimension_metric_t,
                r: hashMetric[data.sectionName].section_dimension_metric_r === 'null' ? '-' : hashMetric[data.sectionName].section_dimension_metric_r
            }))
            return (
                newOptions
            )
        }
    }

    const displayEnglishData = () => {
        const loading = [{
            id: 'Calculating...',
            name: 'Calculating...',
            overallDepth: 'Calculating...',
            weight: 'Calculating...',
            criticalDesignRatio: 'Calculating...',
            klr: 'Calculating...'
        }]
        if(newData.length === 0) {
            return loading
        } else {
            const newOptions = newData.map((data) => ({
                id: data.sectionId,
                name: data.sectionName,
                d: hashEnglish[data.sectionName].section_dimension_english_d === 'null' ? '-' : hashEnglish[data.sectionName].section_dimension_english_d,
                b: hashEnglish[data.sectionName].section_dimension_english_b === 'null' ? '-' : hashEnglish[data.sectionName].section_dimension_english_b,
                tw: hashEnglish[data.sectionName].section_dimension_english_tw === 'null' ? '-' : hashEnglish[data.sectionName].section_dimension_english_tw,
                bf: hashEnglish[data.sectionName].section_dimension_english_bf === 'null' ? '-' : hashEnglish[data.sectionName].section_dimension_english_bf,
                tf: hashEnglish[data.sectionName].section_dimension_english_tf === 'null' ? '-' : hashEnglish[data.sectionName].section_dimension_english_tf,
                tb: hashEnglish[data.sectionName].section_dimension_english_tb === 'null' ? '-' : hashEnglish[data.sectionName].section_dimension_english_tb,
                t: hashEnglish[data.sectionName].section_dimension_english_t === 'null' ? '-' : hashEnglish[data.sectionName].section_dimension_english_t,
                r: hashEnglish[data.sectionName].section_dimension_english_r === 'null' ? '-' : hashEnglish[data.sectionName].section_dimension_english_r
            }))
            return (
                newOptions
            )
        }
    }

    const height = 200

    return (
        <div style={{height: newData.length === 1 ? 200 : (height + (newData.length * 40)), flexGrow: 1, overFlow: 'hidden', margin: '1em 0'}}>
            <DataGrid
                sx={{
                    width: '100%',
                    margin: '0 auto',
                    boxShadow: 2,
                    border: 2,
                    overFlow: 'hidden',
                    color: '#000',
                    justifyContent: 'center',
                    borderColor: 'primary.dark',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                    '& .super-app-theme--header': {
                        backgroundColor: '#184a8c',
                        color: '#fff',
                        justifyContent: 'center',
                    },
                    '& .MuiDataGrid-cell': {
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    },
                    '& .css-1pans1z-MuiDataGrid-virtualScroller': {
                        overflow: 'overlay'
                    },
                    '& .MuiSvgIcon-root': {
                        opacity: 100,
                        fontWeight: 'bold',
                        fill: "#fff" // or whatever you need
                    },
                    '& .MuiDataGrid-row:nth-child(even)': {
                        backgroundColor: '#e1e1e1'
                    },
                    '& .MuiDataGrid-row:nth-child(odd)': {
                        backgroundColor: '#fff'
                    },
                    '& .MuiDataGrid-root': {
                        width: '100%'
                    }
                }}
                components={{
                    NoRowsOverlay: () => (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                            No Data...
                        </Stack>
                    ),
                    // ColumnMenu: CustomColumnMenu
                }}
                disableColumnSelector
                componentsProps={{
                    columnMenu: { background: 'red'},
                }}
                rows={system === 'Metric' ? displayMetricData() : displayEnglishData()}
                // rows={displayMetricData()}
                disableExtendRowFullWidth={true}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}
export default SectionDimensionsRowsDataGrid
