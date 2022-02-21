import React, {useEffect} from "react";
import Header from "../components/header/Header";
import MenuButtons from "../components/menuButtons/MenuButtons";
import DashboardDropdownContainer from "../components/dashboardDropDowns/dashboardDropdownContainer";
import DashboardInformation from "../components/dashboardInformation/dashboardInformation";
import SheetCalculationNavigation from "../components/sheetCalculationNavigation/sheetCalculationNavigation";
import SheetComponentsHandler from "../components/sheetComponentHandler/sheetComponentsHandler";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import SheetTabs from "../components/sheetTabs/SheetTabs";
import {BrowserRouter, Navigate, Redirect, Route, Routes} from "react-router-dom";
import Details from "../components/sheetCalculationComponents/detailsTab/Details";
import Factors from "../components/sheetCalculationComponents/factorsTab/Factors";
import Members from "../components/sheetCalculationComponents/membersTab/memberFields/MembersField";
import Forces from "../components/sheetCalculationComponents/forcesTab/Forces";
import Results from "../components/sheetCalculationComponents/resultsTab/Results";
import {size} from "lodash/collection";
import EmptySheet from "../components/sheetCalculationComponents/emptySheet/emptySheet";
import Errors from "../components/sheetCalculationComponents/errors/Errors";
import {objectChecker} from "../utilities/utilities";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {
    get2LShapeEnglish,
    get2LShapeMetric,
    getCShapeEnglish,
    getCShapeMetric,
    getDesignMembersEnglish,
    getDesignMembersMetric, getIShapesEnglish, getIShapesMetric,
    getLShapesEnglish,
    getLShapesMetric,
    getPipeShapesEnglish,
    getPipeShapesMetric,
    getRecHsShapesEnglish,
    getRecHsShapesMetric,
    getRoundHsShapesEnglish,
    getRoundHsShapesMetric,
    getSectionDimensionsEnglish,
    getSectionDimensionsMetric, getSectionPropertiesEnglish, getSectionPropertiesMetric,
    getShapes, getSteelTypesEnglishAPI, getSteelTypesMetricAPI,
    getTShapesEnglish,
    getTShapesMetric
} from "../store/actions/sheets/sheets";

const useStyles = makeStyles((theme) => ({
    mainTab: {
        backgroundColor: '#e1e1e1',
        margin: '0',
        boxSizing: 'border-box',
        padding: '1em',
        // height: '100vh'
    },
}))

const Dashboard = () => {

    const classes = useStyles()
    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const steelTypesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiData', 'steelTypesMetric'])
    const dispatch = useDispatch()

    const fetchShapes = () => {
        axios.get("http://127.0.0.1:8080/shape")
            // .then((response) => response.json())
            .then((response) => dispatch(getShapes(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchDesignMembersMetric = () => {
        axios.get("http://127.0.0.1:8080/designMembersMetric")
            // .then((response) => response.json())
            .then((response) => dispatch(getDesignMembersMetric(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchDesignMembersEnglish = () => {
        axios.get("http://127.0.0.1:8080/designMembersEnglish")
            // .then((response) => response.json())
            .then((response) => dispatch(getDesignMembersEnglish(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchSectionDimensionsMetric = () => {
        axios.get("http://127.0.0.1:8080/sectiondimensionmetric")
            // .then((response) => response.json())
            .then((response) => dispatch(getSectionDimensionsMetric(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchSectionDimensionsEnglish = () => {
        axios.get("http://127.0.0.1:8080/sectiondimensionenglish")
            // .then((response) => response.json())
            .then((response) => dispatch(getSectionDimensionsEnglish(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    /**
     * Start of T-Shape
     */
    const fetchTShapeMetric = () => {
        axios.get("http://127.0.0.1:8080/tshapemetric")
            // .then((response) => response.json())
            .then((response) => dispatch(getTShapesMetric(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchTShapeEnglish = () => {
        axios.get("http://127.0.0.1:8080/tshapeenglish")
            // .then((response) => response.json())
            .then((response) => dispatch(getTShapesEnglish(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }
    /**
     * End of T-Shape
     */

    /**
     * Start of Round HS - Shape
     */
    const fetchRoundHSShapeMetric = () => {
        axios.get("http://127.0.0.1:8080/roundhsshapemetric")
            // .then((response) => response.json())
            .then((response) => dispatch(getRoundHsShapesMetric(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchRoundHSShapeEnglish = () => {
        axios.get("http://127.0.0.1:8080/roundhsshapeenglish")
            // .then((response) => response.json())
            .then((response) => dispatch(getRoundHsShapesEnglish(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchRecHSShapeMetric = () => {
        axios.get("http://127.0.0.1:8080/rechsshapemetric")
            // .then((response) => response.json())
            .then((response) => dispatch(getRecHsShapesMetric(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchRecHSShapeEnglish = () => {
        axios.get("http://127.0.0.1:8080/rechsshapeenglish")
            // .then((response) => response.json())
            .then((response) => dispatch(getRecHsShapesEnglish(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchPipeShapeMetric = () => {
        axios.get("http://127.0.0.1:8080/pipeshapemetric")
            // .then((response) => response.json())
            .then((response) => dispatch(getPipeShapesMetric(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchPipeShapeEnglish = () => {
        axios.get("http://127.0.0.1:8080/pipeshapeenglish")
            // .then((response) => response.json())
            .then((response) => dispatch(getPipeShapesEnglish(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchLShapeMetric = () => {
        axios.get("http://127.0.0.1:8080/lshapemetric")
            // .then((response) => response.json())
            .then((response) => dispatch(getLShapesMetric(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchLShapeEnglish = () => {
        axios.get("http://127.0.0.1:8080/lshapeenglish")
            // .then((response) => response.json())
            .then((response) => dispatch(getLShapesEnglish(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchIShapeMetric = () => {
        axios.get("http://127.0.0.1:8080/ishapemetric")
            // .then((response) => response.json())
            .then((response) => dispatch(getIShapesMetric(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchIShapeEnglish = () => {
        axios.get("http://127.0.0.1:8080/ishapeenglish")
            // .then((response) => response.json())
            .then((response) => dispatch(getIShapesEnglish(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchCShapeMetric = () => {
        axios.get("http://127.0.0.1:8080/cshapemetric")
            // .then((response) => response.json())
            .then((response) => dispatch(getCShapeMetric(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchCShapeEnglish = () => {
        axios.get("http://127.0.0.1:8080/cshapeenglish")
            // .then((response) => response.json())
            .then((response) => dispatch(getCShapeEnglish(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetch2LShapeMetric = () => {
        axios.get("http://127.0.0.1:8080/2lshapemetric")
            // .then((response) => response.json())
            .then((response) => dispatch(get2LShapeMetric(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const fetch2LShapeEnglish = () => {
        axios.get("http://127.0.0.1:8080/2lshapeenglish")
            // .then((response) => response.json())
            .then((response) => dispatch(get2LShapeEnglish(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            })
    }

    const getSteelTypesMetric = () => {
        axios.get("http://127.0.0.1:8080/steeltypesmetric")
            // .then((response) => response.json())
            .then((response) => dispatch(getSteelTypesMetricAPI(response.data, selectedSheet)))
            //     .then((data) => alert(JSON.stringify(data)))
            .catch((error) => {
                console.log(error)
            });
    }

    const getSteelTypesEnglish = () => {
        axios.get("http://127.0.0.1:8080/steeltypesenglish")
            // .then((response) => response.json())
            .then((response) => dispatch(getSteelTypesEnglishAPI(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            });
    }

    const tabState = objectChecker(sheets, ['sheets', selectedSheet, 'tabState'])

    useEffect(() => {
        fetchDesignMembersEnglish()
        fetchDesignMembersMetric()
        fetchSectionDimensionsMetric()
        fetchSectionDimensionsEnglish()
        fetch2LShapeEnglish()
        fetch2LShapeMetric()
        fetchCShapeEnglish()
        fetchCShapeMetric()
        fetchIShapeEnglish()
        fetchIShapeMetric()
        fetchLShapeEnglish()
        fetchLShapeMetric()
        fetchPipeShapeEnglish()
        fetchPipeShapeMetric()
        fetchRecHSShapeEnglish()
        fetchRecHSShapeMetric()
        fetchRoundHSShapeEnglish()
        fetchRoundHSShapeMetric()
        fetchTShapeEnglish()
        fetchTShapeMetric()
        fetchShapes()
        getSteelTypesMetric()
        getSteelTypesEnglish()
    }, [])

    useEffect(() => {
        fetchDesignMembersEnglish()
        fetchDesignMembersMetric()
        fetchSectionDimensionsMetric()
        fetchSectionDimensionsEnglish()
        fetch2LShapeEnglish()
        fetch2LShapeMetric()
        fetchCShapeEnglish()
        fetchCShapeMetric()
        fetchIShapeEnglish()
        fetchIShapeMetric()
        fetchLShapeEnglish()
        fetchLShapeMetric()
        fetchPipeShapeEnglish()
        fetchPipeShapeMetric()
        fetchRecHSShapeEnglish()
        fetchRecHSShapeMetric()
        fetchRoundHSShapeEnglish()
        fetchRoundHSShapeMetric()
        fetchTShapeEnglish()
        fetchTShapeMetric()
        fetchShapes()
        getSteelTypesMetric()
        getSteelTypesEnglish()
    }, [])

    const getMetricSectionProperties = () => {
        axios.get("http://127.0.0.1:8080/sectionpropertiesmetric")
            // .then((response) => response.json())
            .then((response) => dispatch(getSectionPropertiesMetric(response.data, selectedSheet)))
            // .then((data) => console.log(sectionPropertiesMetric))
            .catch((error) => {
                console.log(error)
            });
    }

    const getEnglishSectionProperties = () => {
        axios.get("http://127.0.0.1:8080/sectionpropertiesenglish")
            // .then((response) => response.json())
            .then((response) => dispatch(getSectionPropertiesEnglish(response.data, selectedSheet)))
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        getMetricSectionProperties()
        getEnglishSectionProperties()
    }, [])

    return (
        <Grid style={{margin: '0', padding: '0', backgroundColor: '#e1e1e1', height: '100vh'}}>
            <BrowserRouter>
                <Header/>
                <MenuButtons/>
                <DashboardDropdownContainer/>
                <DashboardInformation/>
                <div className={classes.mainTab}>
                    <SheetTabs/>
                    <SheetCalculationNavigation/>
                    <Routes>
                        <Route path='/no-sheet' element={<EmptySheet/>} />
                        <Route path='/' element={<Details/>} />
                        <Route path='/errors' element={<Errors/>} />
                        <Route path='/details' element={<Details/>} />
                        <Route path='/factors' element={<Factors/>} />
                        <Route path='/members' element={<Members/>} />
                        <Route path='/forces' element={<Forces/>} />
                        <Route path='/results' element={<Results/>}/>
                    </Routes>
                    {/*<SheetComponentsHandler/>*/}
                </div>
            </BrowserRouter>
        </Grid>
    )
}
export default Dashboard
