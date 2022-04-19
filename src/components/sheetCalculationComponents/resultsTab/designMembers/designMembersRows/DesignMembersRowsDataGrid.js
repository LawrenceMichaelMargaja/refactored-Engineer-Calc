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

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            fontWeight: 'bold',
            type: 'number',
            // width: 100
        },
        {
            field: 'section',
            headerName: 'Section',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            fontWeight: 'bold',
            type: 'string',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 'overallDepth',
            headerName: 'Overall Depth',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 200,
            // editable: true,
        },
        {
            field: 'weight',
            headerName: 'Weight',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 155,
            flex: 1,
            // // width: 155,
            // editable: true,
        },
        {
            field: 'criticalDesignRatio',
            headerName: 'Critical Design Ratio',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            type: 'number',
            // width: 175,
            flex: 1,
            // // width: 210,
            // editable: true,
        },
        {
            field: 'klr',
            headerName: 'KL/r',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            description: 'This column has a value getter and is not sortable.',
            type: 'number',
            // width: 160,
            flex: 1,
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
            let id = 1
            const newOptions = calculatedData.map((data) => ({
                id: id++,
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
