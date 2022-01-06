import React from "react";
import Header from "../components/header/Header";
import MenuButtons from "../components/menuButtons/MenuButtons";
import DashboardDropdownContainer from "../components/dashboardDropDowns/dashboardDropdownContainer";
import DashboardInformation from "../components/dashboardInformation/dashboardInformation";
import SheetCalculationNavigation from "../components/sheetCalculationNavigation/sheetCalculationNavigation";
import SheetComponentsHandler from "../components/sheetComponentHandler/sheetComponentsHandler";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import SheetTabs from "../components/sheetTabs/SheetTabs";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Details from "../components/sheetCalculationComponents/detailsTab/Details";
import Factors from "../components/sheetCalculationComponents/factorsTab/Factors";
import Members from "../components/sheetCalculationComponents/membersTab/memberFields/MembersField";
import Forces from "../components/sheetCalculationComponents/forcesTab/Forces";
import Results from "../components/sheetCalculationComponents/resultsTab/Results";
import {size} from "lodash/collection";
import EmptySheet from "../components/sheetCalculationComponents/emptySheet/emptySheet";
import Errors from "../components/sheetCalculationComponents/errors/Errors";

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
    const sheets = useSelector(state => state.sheets.sheets)

    return (
        <div style={{margin: '0', padding: '0', backgroundColor: '#e1e1e1', height: '100vh'}}>
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
                        <Route path='/results' element={<Results/>} />
                    </Routes>
                    {/*<SheetComponentsHandler/>*/}
                </div>
            </BrowserRouter>
        </div>
    )
}
export default Dashboard