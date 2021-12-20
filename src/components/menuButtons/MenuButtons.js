import React from 'react'
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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
    return (
        <div>
            <div className={classes.buttonsContainer}>
                <Button variant='contained' color='primary' className={classes.buttons}>FILE</Button>
                <Button variant='contained' color='secondary' className={classes.buttons}>HELP</Button>
                <Button variant='contained' color='primary' className={classes.buttons}>ABOUT</Button>
            </div>
        </div>
    )
}

export default MenuButtons