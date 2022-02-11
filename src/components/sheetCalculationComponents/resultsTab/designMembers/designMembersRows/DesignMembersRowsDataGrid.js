import * as React from 'react';
import {DataGrid, GridColumnMenuContainer} from '@mui/x-data-grid';
import {objectChecker} from "../../../../../utilities/utilities";
import {useDispatch, useSelector} from "react-redux";
import {Stack} from "@mui/material";
// import {
//     GridColumnMenuContainer,
//     GridFilterMenuItem,
//     SortGridMenuItems
// } from '@mui/data-grid';

const DataGridDemo = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const system = objectChecker(sheets, ['sheets', selectedSheet, 'system'])
    const calculatedData = objectChecker(sheets, ['sheets', selectedSheet, 'calculatedData'])

    /**
     * Metric Data to be looped
     */
    const iShapeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'iShapesMetric'])
    const cShapeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'cShapesMetric'])
    const anglesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'lShapesMetric'])
    const tShapeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'tShapesMetric'])
    const doubleAnglesMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'twoLShapesMetric'])
    const recHSSMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'recHSShapesMetric'])
    const roundHSSMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'roundHSShapesMetric'])
    const pipeMetricData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'pipeShapesMetric'])

    /**
     * English Data to be looped
     */
    const iShapeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'iShapesEnglish'])
    const cShapeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'cShapesEnglish'])
    const anglesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'lShapesEnglish'])
    const tShapeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'tShapesEnglish'])
    const doubleAnglesEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'twoLShapesEnglish'])
    const recHSSEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'recHSShapesEnglish'])
    const roundHSSEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'roundHSShapesEnglish'])
    const pipeEnglishData = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'pipeShapesEnglish'])

    const steelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesEnglish'])
    const sectionsMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'sectionPropertiesMetric'])
    const insertedSectionMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSectionEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])
    const insertedSteelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeMetricProperties'])
    const insertedSteelTypesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'steelTypeEnglishProperties'])

    const designMembersEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'designMemberEnglish'])

    const currentShape = objectChecker(sheets, ['sheets', selectedSheet, 'currentSheets'])
    const dispatch = useDispatch()

    // useEffect(() => {
    //     for (let index in insertedSectionMetric) {
    //         if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('I-shaped').toUpperCase()) {
    //             alert("What's up man?");
    //             setDataToBeLooped(iShapeMetricData)
    //             // dispatch(setCurrentShape('I-shaped', selectedSheet))
    //             dispatch(setDataToBeLoopedForPostRequest(iShapeMetricData, selectedSheet))
    //         } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('C-shaped').toUpperCase()) {
    //             setDataToBeLooped(cShapeMetricData)
    //             // dispatch(setCurrentShape('C-shaped', selectedSheet))
    //             dispatch(setDataToBeLoopedForPostRequest(cShapeMetricData, selectedSheet))
    //         } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Angles').toUpperCase()) {
    //             setDataToBeLooped(anglesMetricData)
    //             // dispatch(setCurrentShape('Angles', selectedSheet))
    //             dispatch(setDataToBeLoopedForPostRequest(anglesMetricData, selectedSheet))
    //         } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('T-shaped').toUpperCase()) {
    //             setDataToBeLooped(tShapeMetricData)
    //             // dispatch(setCurrentShape('T-shaped', selectedSheet))
    //             dispatch(setDataToBeLoopedForPostRequest(tShapeMetricData, selectedSheet))
    //         } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Double Angles').toUpperCase()) {
    //             setDataToBeLooped(doubleAnglesMetricData)
    //             // dispatch(setCurrentShape('Double Angles', selectedSheet))
    //             dispatch(setDataToBeLoopedForPostRequest(doubleAnglesMetricData, selectedSheet))
    //         } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Rectangular HSS').toUpperCase()) {
    //             setDataToBeLooped(recHSSMetricData)
    //             // dispatch(setCurrentShape('Rectangular HSS', selectedSheet))
    //             dispatch(setDataToBeLoopedForPostRequest(recHSSMetricData, selectedSheet))
    //         } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Round HSS').toUpperCase()) {
    //             setDataToBeLooped(roundHSSMetricData)
    //             // dispatch(setCurrentShape('Round HSS', selectedSheet))
    //             dispatch(setDataToBeLoopedForPostRequest(roundHSSMetricData, selectedSheet))
    //         } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Pipe').toUpperCase()) {
    //             setDataToBeLooped(pipeMetricData)
    //             // dispatch(setCurrentShape('Pipe', selectedSheet))
    //             dispatch(setDataToBeLoopedForPostRequest(pipeMetricData, selectedSheet))
    //         }
    //     }
    // }, [])

    // useEffect(() => {
    //     if(system === 'Metric') {
    //         for (let index in insertedSectionMetric) {
    //             if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('I-shaped').toUpperCase()) {
    //                 alert("Heelo")
    //                 setDataName('i_shape_metric_name')
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('C-shaped').toUpperCase()) {
    //                 setDataName('c_shape_metric_name')
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Angles').toUpperCase()) {
    //                 setDataName('l_shape_metric_name')
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('T-shaped').toUpperCase()) {
    //                 setDataName('t_shape_metric_name')
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Double Angles').toUpperCase()) {
    //                 setDataName('2l_shape_metric_name')
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Rectangular HSS').toUpperCase()) {
    //                 setDataName('rec_hs_shape_metric_name')
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Round HSS').toUpperCase()) {
    //                 setDataName('round_hs_shape_metric_name')
    //             } else if ((insertedSectionMetric[index].sectionShape).toUpperCase() === ('Pipe').toUpperCase()) {
    //                 setDataName('pipe_shape_metric_name')
    //             }
    //         }
    //     } else if(system === 'English') {
    //         for (let index in insertedSectionEnglish) {
    //             if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('I-shaped').toUpperCase()) {
    //                 alert("english hello")
    //                 setDataName('i_shape_metric_name')
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('C-shaped').toUpperCase()) {
    //                 setDataName('c_shape_metric_name')
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Angles').toUpperCase()) {
    //                 setDataName('l_shape_metric_name')
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('T-shaped').toUpperCase()) {
    //                 setDataName('t_shape_metric_name')
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Double Angles').toUpperCase()) {
    //                 setDataName('2l_shape_metric_name')
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Rectangular HSS').toUpperCase()) {
    //                 setDataName('rec_hs_shape_metric_name')
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Round HSS').toUpperCase()) {
    //                 setDataName('round_hs_shape_metric_name')
    //             } else if ((insertedSectionEnglish[index].sectionShape).toUpperCase() === ('Pipe').toUpperCase()) {
    //                 setDataName('pipe_shape_metric_name')
    //             }
    //         }
    //     }
    // }, [])

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            fontWeight: 'bold',
            type: 'number',
            width: 100
        },
        {
            field: 'section',
            headerName: 'Section',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            fontWeight: 'bold',
            type: 'string',
            width: 155
            // width: 155,
            // editable: true,
        },
        {
            field: 'overallDepth',
            headerName: 'Overall Depth',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            width: 155
            // width: 200,
            // editable: true,
        },
        {
            field: 'weight',
            headerName: 'Weight',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            width: 155
            // width: 155,
            // editable: true,
        },
        {
            field: 'criticalDesignRatio',
            headerName: 'Critical Design Ratio',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            width: 175
            // width: 210,
            // editable: true,
        },
        {
            field: 'klr',
            headerName: 'KL/r',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            description: 'This column has a value getter and is not sortable.',
            type: 'number',
            width: 160,
            // sortable: false,
            // width: 160,
        },
    ];

    const displayApiData = () => {
        const loading = [{
            id: 'Calculating...',
            section: 'Calculating...',
            overallDepth: 'Calculating...',
            weight: 'Calculating...',
            criticalDesignRatio: 'Calculating...',
            klr: 'Calculating...'
        }]
        if (calculatedData === null) {
            console.log("The new calculated Data === ", JSON.stringify(calculatedData));
            return loading
        } else {
            let criticalValue = null
            console.log("The new calculated Data === ", JSON.stringify(calculatedData));
            const newOptions = calculatedData.map((data) => ({
                id: `${data.id}`,
                section: `${data.name}`,
                overallDepth: `${data.overall_depth}`,
                weight: `${data.weight}`,
                criticalDesignRatio: (data.pratio > data.mx_ratio && data.pratio > data.my_ratio && data.pratio > data.vx_ratio && data.pratio > data.vy_ratio ? data.pratio : (data.mx_ratio > data.pratio && data.mx_ratio > data.my_ratio && data.mx_ratio > data.vx_ratio && data.mx_ratio > data.vy_ratio ? data.mx_ratio : (data.my_ratio > data.pratio && data.my_ratio > data.mx_ratio && data.my_ratio > data.vx_ratio && data.my_ratio > data.vy_ratio ? data.my_ratio : (data.vx_ratio > data.pratio && data.vx_ratio > data.mx_ratio && data.vx_ratio > data.my_ratio && data.vx_ratio > data.vy_ratio ? data.vx_ratio : data.vy_ratio > data.pratio && data.vy_ratio > data.mx_ratio && data.vy_ratio > data.my_ratio && data.vy_ratio > data.vx_ratio ? data.vy_ratio : data.vy_ratio)))),
                klr: `${(data.k_lr).toFixed(3)}`
            }))
            return (
                newOptions
            )
        }
    }

    return (
        <div style={{height: 800, flexGrow: 1, overFlow: 'hidden', margin: '1em 0'}}>
            <DataGrid
                sx={{
                    width: '50%',
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
                    '.MuiDataGrid-row:nth-child(even)': {
                        backgroundColor: '#e1e1e1'
                    },
                    '.MuiDataGrid-row:nth-child(odd)': {
                        backgroundColor: '#fff'
                    },
                }}
                components={{
                    NoRowsOverlay: () => (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                            Calculating...
                        </Stack>
                    ),
                    // ColumnMenu: CustomColumnMenu
                }}
                disableColumnSelector
                componentsProps={{
                    columnMenu: { background: 'red'},
                }}
                rows={displayApiData()}
                // rows={rows}
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
export default DataGridDemo
