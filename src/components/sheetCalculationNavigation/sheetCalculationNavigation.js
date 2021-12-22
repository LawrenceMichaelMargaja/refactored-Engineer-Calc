import React, {useEffect, useState} from 'react'
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {setTabState} from "../../store/actions/sheets/sheets";
import {makeStyles} from "@material-ui/core/styles";
import {useNavigate} from "react-router";
import {objectChecker} from "../../utilities/utilities";
import {size} from "lodash";

const useStyles = makeStyles((theme) => ({
    sheetNavigation: {
        width: "100%",
        backgroundColor: '#4773bf',
        margin: '0 auto'
    }
}))


const SheetCalculationNavigation = () => {

    const sheets = useSelector(state => state.sheets)
    const sheetTabs = useSelector(state => state.sheets.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    // const tabState = useSelector(state => state.sheets.sheets[selectedSheet].tabState)
    const tabState = objectChecker(sheets, ['sheets', selectedSheet, 'tabState'])
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [highlighted, setHighlighted] = useState(0)

    const renderSheetCalculationNavigation = () => {
        if(size(sheetTabs) < 1) {
            return null
        } else {
            return (
                <div className={classes.sheetNavigation}>
                    <AppBar style={{
                        width: '100%',
                        borderRadius: '4px',
                        margin: '0 auto'
                    }} position="static">
                        <Tabs
                            value={highlighted}
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
    }

    useEffect(() => {
        if (tabState === 'details') {
            setHighlighted(0)
            navigate('/details')
        }
        if (tabState === 'factors') {
            setHighlighted(1)
            navigate('/factors')
        }
        if (tabState === 'members') {
            setHighlighted(2)
            navigate('/members')
        }
        if (tabState === 'forces') {
            setHighlighted(3)
            navigate('/forces')
        }
        if (tabState === 'results') {
            setHighlighted(4)
            navigate('/results')
        }
    }, [tabState])

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
        renderSheetCalculationNavigation()
    )
}

export default SheetCalculationNavigation