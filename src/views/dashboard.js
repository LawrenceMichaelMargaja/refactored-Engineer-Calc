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

const useStyles = makeStyles((theme) => ({
    mainTab: {
        backgroundColor: '#e3e3e3',
        margin: '0',
        boxSizing: 'border-box',
        padding: '1em',
        height: '100%'
    },
}))

const Dashboard = () => {
    const classes = useStyles()

    return (
        <div style={{margin: '0', padding: '0', width:'100vw'}}>
            <Header/>
            <MenuButtons/>
            <DashboardDropdownContainer/>
            <DashboardInformation/>
            <div className={classes.mainTab}>
                <SheetTabs/>
                <SheetCalculationNavigation/>
                <SheetComponentsHandler/>
            </div>
        </div>
    )
}
export default Dashboard