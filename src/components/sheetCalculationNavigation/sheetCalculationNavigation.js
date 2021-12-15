import React from 'react'
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {setTabState} from "../../store/actions/sheets/sheets";
import {makeStyles} from "@material-ui/core/styles";
import {useNavigate} from "react-router";

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
    const navigate = useNavigate()

    const detailsNavigationHandler = () => {
        navigate('/details')
    }

    const factorsNavigationHandler = () => {
        navigate('/factors')
    }

    const membersNavigationHandler = () => {
        navigate('/members')
    }

    const forcesNavigationHandler = () => {
        navigate('/forces')
    }

    const resultsNavigationHandler = () => {
        navigate('/results')
    }

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
                            detailsNavigationHandler()
                            dispatch(setTabState('details', selectedSheet));
                        }}
                        label="Details"
                    />
                    <Tab
                        onClick={() => {
                            factorsNavigationHandler()
                            dispatch(setTabState('factors', selectedSheet));
                        }}
                        label="Factors"
                    />
                    <Tab
                        onClick={() => {
                            membersNavigationHandler()
                            dispatch(setTabState('members', selectedSheet));
                        }}
                        label="Members"
                    />
                    <Tab
                        onClick={() => {
                            forcesNavigationHandler()
                            dispatch(setTabState('forces', selectedSheet));
                        }}
                        label="Forces"
                    />
                    <Tab
                        onClick={() => {
                            resultsNavigationHandler()
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