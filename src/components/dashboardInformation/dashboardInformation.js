import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Card} from "@material-ui/core";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    dashboardInfoContainer: {
      backgroundColor: '#e3e3e3',
      // padding: '1em'
    },
    provisionDisplay: {
        padding: '1em 1em 0em 1em',
        margin: '0',
    },
    dashboardInfoMessage: {
        padding: `0.5em 1em 1em 1em`,
        margin: '0',
    },
    card: {
        width: '70%',
        padding: '1em',
        textAlign: 'center',
        margin: '0 auto'
    }
}))

const DashboardInformation = () => {

    const selectedSheet = useSelector(state => state.sheets.selectedSheet)

    const classes = useStyles()
    const provision = useSelector(state => state.sheets.sheets[selectedSheet].provision)

    const dashboardInformationHandler = () => {
        if(provision === 'ASD') {
            return (
                <>
                    <h3 className={classes.provisionDisplay}>Provision: ASD</h3>
                    <h3 className={classes.dashboardInfoMessage}>This code is used for designing steel numbers in accordance with American Standard AISC 360-16 (15th Ed.) ASD applies a quasi-safety factor approach to evaluating allowable strength.</h3>
                </>
            )
        } else if(provision === 'LRFD') {
            return (
                <>
                    <h3 className={classes.provisionDisplay}>Provision: LRFD</h3>
                    <h3 className={classes.dashboardInfoMessage}>This code is used for designing steel members in accordance with American Standard AISC 360-16 (15th Ed.). Load and Resistance Factor Design (LRFD) is also known as limit state design (LSD) and requires that the structure satisfies the Ultimate Limit State (ULS) and the Serviceability Limit State (SLS).</h3>
                </>
            )
        }
    }

    return (
        <div className={classes.dashboardInfoContainer}>
            {dashboardInformationHandler()}
            <Card className={classes.card}>
                An innovative calculator envision by Daphne Mae M. Abella and her thesis mates.
            </Card>
        </div>
    )
}

export default DashboardInformation