import React from 'react'
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {setTabState} from "../../store/actions/sheets/sheets";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    sheetNavigation: {
        width: "100%",
        backgroundColor: '#4773bf',
        margin: '0 auto'
    }
}))

const SheetCalculationNavigation = () => {
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <div className={classes.sheetNavigation}>
            <AppBar style={{
                width: '100%',
                borderRadius: '4px',
                margin: '0 auto'
            }} position="static">
                <Tabs
                    indicatorColor="primary"
                    aria-label="disabled tabs example"
                >
                    <Tab
                        onClick={() => {
                            dispatch(setTabState('details', selectedSheet));
                        }}
                        label="Details"
                    />
                    <Tab
                        onClick={() => {
                            dispatch(setTabState('factors', selectedSheet));
                        }}
                        label="Factors"
                    />
                    <Tab
                        onClick={() => {
                            dispatch(setTabState('members', selectedSheet));
                        }}
                        label="Members"
                    />
                    <Tab
                        onClick={() => {
                            dispatch(setTabState('forces', selectedSheet));
                        }}
                        label="Forces"
                    />
                    <Tab
                        onClick={() => {
                            dispatch(setTabState('results', selectedSheet));
                        }}
                        label="Results"
                    />
                </Tabs>
            </AppBar>
        </div>
    )
}

export default SheetCalculationNavigation