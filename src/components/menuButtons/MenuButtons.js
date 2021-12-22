import React, {useEffect, useState} from 'react'
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {size} from "lodash";

const useStyles = makeStyles((theme) => ({
    buttonsContainer: {
        display: 'flex',
        flexGrow: '1',
        backgroundColor: "#e3e3e3",
        padding: '1em'
    },
    buttons: {
        margin: '5px'
    }
}))

const MenuButtons = () => {

    const classes = useStyles()
    const sheetTabs = useSelector(state => state.sheets.sheets)
    const menuButtonState = useSelector(state => state.sheets.menuButtons)

    return (
        <div>
            <div className={classes.buttonsContainer}>
                <Button variant='contained' color='primary' className={classes.buttons} disabled={menuButtonState}>FILE</Button>
                <Button variant='contained' color='secondary' className={classes.buttons} disabled={menuButtonState}>HELP</Button>
                <Button variant='contained' color='primary' className={classes.buttons} disabled={menuButtonState}>ABOUT</Button>
            </div>
        </div>
    )
}

export default MenuButtons