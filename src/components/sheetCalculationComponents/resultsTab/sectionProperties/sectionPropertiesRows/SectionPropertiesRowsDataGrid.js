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
            field: 'a',
            headerName: system === 'Metric' ? 'A(mm⁴)' : 'A(inch⁴)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 200,
            // editable: true,
        },
        {
            field: 'j',
            headerName: system === 'Metric' ? 'J(mm⁴)' : 'J(inch⁴)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 'ixp',
            headerName: system === 'Metric' ? 'Ixp(mm⁴)' : 'Ixp(inch⁴)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 'iyp',
            headerName: system === 'Metric' ? 'Iyp(mm⁴)' : 'Iyp(inch⁴)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 'iw',
            headerName: system === 'Metric' ? 'Iw(mm⁶)' : 'Iw(inch⁶)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 'sxp',
            headerName: system === 'Metric' ? 'Sxp(mm³)' : 'Sxp(inch³)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 'syp',
            headerName: system === 'Metric' ? 'Syp(mm⁴)' : 'Syp(inch⁴)',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 175,
            flex: 1,
            // // width: 210,
            // editable: true,
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

    const displayMetricData = () => {
        const loading = [{
            id: 'Calculating...',
            name: 'Calculating...',
            a: 'Calculating...',
            j: 'Calculating...',
            ixp: 'Calculating...',
            iyp: 'Calculating...',
            iw: 'Calculating...',
            sxp: 'Calculating...',
            syp: 'Calculating...'
        }]
        if(newData.length === 0) {
            return loading
        } else {
            const newOptions = newData.map((data) => ({
                id: data.sectionId,
                name: data.sectionName,
                a: hashMetric[data.sectionName].section_properties_metric_a === 'null' ? '-' : hashMetric[data.sectionName].section_properties_metric_a,
                j: hashMetric[data.sectionName].section_properties_metric_j === 'null' ? '-' : hashMetric[data.sectionName].section_properties_metric_j,
                ixp: hashMetric[data.sectionName].section_properties_metric_ixp === 'null' ? '-' : hashMetric[data.sectionName].section_properties_metric_ixp,
                iyp: hashMetric[data.sectionName].section_properties_metric_iyp === 'null' ? '-' : hashMetric[data.sectionName].section_properties_metric_iyp,
                iw: hashMetric[data.sectionName].section_properties_metric_iw === 'null' ? '-' : hashMetric[data.sectionName].section_properties_metric_iw,
                sxp: hashMetric[data.sectionName].section_properties_metric_sxp === 'null' ? '-' : hashMetric[data.sectionName].section_properties_metric_sxp,
                syp: hashMetric[data.sectionName].section_properties_metric_syp === 'null' ? '-' : hashMetric[data.sectionName].section_properties_metric_syp,
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
            a: 'Calculating...',
            j: 'Calculating...',
            ixp: 'Calculating...',
            iyp: 'Calculating...',
            iw: 'Calculating...',
            sxp: 'Calculating...',
            syp: 'Calculating...'
        }]
        if(newData.length === 0) {
            return loading
        } else {
            const newOptions = newData.map((data) => ({
                id: data.sectionId,
                name: data.sectionName,
                a: hashEnglish[data.sectionName].section_properties_english_a === 'null' ? '-' : hashEnglish[data.sectionName].section_properties_english_a,
                j: hashEnglish[data.sectionName].section_properties_english_j === 'null' ? '-' : hashEnglish[data.sectionName].section_properties_english_j,
                ixp: hashEnglish[data.sectionName].section_properties_english_ixp === 'null' ? '-' : hashEnglish[data.sectionName].section_properties_english_ixp,
                iyp: hashEnglish[data.sectionName].section_properties_english_iyp === 'null' ? '-' : hashEnglish[data.sectionName].section_properties_english_iyp,
                iw: hashEnglish[data.sectionName].section_properties_english_iw === 'null' ? '-' : hashEnglish[data.sectionName].section_properties_english_iw,
                sxp: hashEnglish[data.sectionName].section_properties_english_sxp === 'null' ? '-' : hashEnglish[data.sectionName].section_properties_english_sxp,
                syp: hashEnglish[data.sectionName].section_properties_english_syp === 'null' ? '-' : hashEnglish[data.sectionName].section_properties_english_syp,
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
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: '#fff'
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
