import React, {useEffect, useState} from 'react'
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {size} from "lodash";
import {Tooltip} from "@mui/material";

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
                <Tooltip title={<p>Click to open file options</p>}>
                    <Button variant='contained' color='primary' className={classes.buttons} disabled={menuButtonState}>FILE</Button>
                </Tooltip>
                <Tooltip title={<p>Click to open Help</p>}>
                    <Button variant='contained' color='secondary' className={classes.buttons} disabled={menuButtonState}>HELP</Button>
                </Tooltip>
                <Tooltip title={<p>Click to open About</p>}>
                    <Button variant='contained' color='primary' className={classes.buttons} disabled={menuButtonState}>ABOUT</Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default MenuButtons
