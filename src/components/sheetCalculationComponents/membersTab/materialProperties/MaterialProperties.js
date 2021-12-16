import {Button, Card, FormControl, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MaterialPropertiesRows from "./materialPropertiesRows/MaterialPropertiesRows";
import {ENGLISH, METRIC} from "../../../../config";
import {useDispatch, useSelector} from "react-redux";
import MaterialPropertiesModal from "../../../modal/materialPropertiesModal/MaterialPropertiesModal";
import MaterialSelectModal from "../../../modal/materialPropertiesModal/MaterialPropertiesModal";
import SpringModal from "../../../modal/materialPropertiesModal/MaterialPropertiesModal";
import NestedModal from "../../../modal/materialPropertiesModal/MaterialPropertiesModal";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {setMethodDropdown} from "../../../../store/actions/dashboardDropdowns/methodDropdown";
import axios from "axios";
import {getMaterialPropertiesData} from "../../../../store/actions/sheets/sheets";
import {Autocomplete} from "@mui/material";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    },
}));

const MaterialProperties = () => {

    const system = useSelector(state => state.systemDropdown.system)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)

    const apiData = useSelector(state => state.sheets.sheets[selectedSheet].apiData.materialProperty)
    const dispatch = useDispatch()

    const unitHandler = () => {
        if(system === 'Metric') {
            return 'MPa'
        } else {
            return 'ksi'
        }
    }

    const ChildModal = () => {

        const classes = useStyles()
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

        return (
            <React.Fragment>
                <Modal
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box className={classes.modal} sx={{ width: 200 }}>
                        <h2 id="child-modal-title">Text in a child modal</h2>
                        <p id="child-modal-description">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        </p>
                        <Button onClick={handleClose}>Close Child Modal</Button>
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }

    const [openNestedModal, setOpenNestedModal] = React.useState(false);
    const getMaterialProperties = () => {
        fetch("http://127.0.0.1:8080/tshapemetric")
            .then((response) => response.json())
            .then((data) => dispatch(getMaterialPropertiesData(data, selectedSheet)))
            //     .then((data) => alert(JSON.stringify(data)))
            .catch((error) => {
                console.log(error)
            });
    }

    const handleOpenNestedModal = () => {
        setOpenNestedModal(true);
    };

    // let materialData = null

    const displayApiData = () => {
        // alert("the api data = " + JSON.stringify(apiData))
        const newOptions = apiData.map((data) => ({value: `${data.t_shape_metric_name}`, label: `${data.t_shape_metric_name}`}))
        return (
            newOptions
        )
    }

    //
    useEffect(() => {
        getMaterialProperties()
        displayApiData()
    }, [])

    const NestedModal = () => {

        const [nestedModalDisabled, setNestedModalDisabled] = useState(true)
        const [customButtonColor, setCustomButtonColor] = useState('primary')
        const [customButtonText, setCustomButtonText] = useState('CUSTOM')

        const handleChange = (event) => {
            dispatch(setMethodDropdown(event.target.value, selectedSheet))
        };

        // const modalOptions = () => {
        //     for(let option in )
        // }

        const steelTypeHandler = () => {
            return (
                <div style={{width: '80%', margin: '0 auto'}}>
                    <p style={{textAlign: 'initial'}}><strong>Steel Type</strong></p>
                    <Input placeholder='Value will be displayed here...'
                           disabled={nestedModalDisabled}
                           style={{width: '100%', margin: '0 auto', color: 'black'}}
                    />
                </div>
            )
        }

        useEffect(() => {
            if(nestedModalDisabled) {
                setCustomButtonColor('primary')
                setCustomButtonText('CUSTOM')
            } else {
                setCustomButtonColor('secondary')
                setCustomButtonText('DISCARD')
            }
        }, [nestedModalDisabled])

        // const newOptions = data.map((user) => ({value: `${user.steel_type_metric_name}`, label: `${user.steel_type_metric_name}`}))

        return (
            <div>
                <Modal
                    open={openNestedModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 1000,
                        height: 600,
                        backgroundColor: '#fff',
                        border: '2px solid #000',
                        boxShadow: 24,
                        pt: 2,
                        px: 4,
                        pb: 3,
                        textAlign: 'center'
                    }}>
                        <h2 style={{padding: '1em 0'}} id="parent-modal-title">SELECT PROPERTIES FOR MATERIAL</h2>
                        <div style={{width: '80%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div style={{width: '30%'}}>
                                <FormControl fullWidth>
                                    {/*<InputLabel id="demo-simple-select-label">Preset Steel Types</InputLabel>*/}
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={displayApiData()}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Preset Steel Types" />}
                                    />
                                </FormControl>
                            </div>
                            <div style={{width: '30%',}}>
                                <Button
                                    style={{
                                        width: '100%'
                                    }}
                                    variant='contained'
                                    onClick={() => setNestedModalDisabled(currVal => !currVal)}
                                    color={customButtonColor}>
                                        {customButtonText}
                                </Button>
                            </div>
                        </div>
                        <div style={{
                            padding: '1em 0'
                        }}>
                            {nestedModalDisabled ? null : steelTypeHandler()}
                            <div style={{width: '80%', margin: '0 auto'}}>
                                <p style={{textAlign: 'initial'}}><strong>E(MPa)</strong></p>
                                <Input placeholder='Value will be displayed here...'
                                       disabled={nestedModalDisabled}
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
                                />
                            </div>
                            <div style={{width: '80%', margin: '0 auto'}}>
                                <p style={{textAlign: 'initial'}}><strong>FyMPa</strong></p>
                                <Input placeholder='Value will be displayed here...'
                                       disabled={nestedModalDisabled}
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
                                />
                            </div>
                            <div style={{width: '80%', margin: '0 auto'}}>
                                <p style={{textAlign: 'initial'}}><strong>FuMPa</strong></p>
                                <Input placeholder='Value will be displayed here...'
                                       disabled={nestedModalDisabled}
                                       style={{width: '100%', margin: '0 auto', color: 'black'}}
                                />
                            </div>
                        </div>
                        <div style={{
                            width: '80%',
                            margin: '0 auto',
                            // padding: '1em',
                        }}>
                            <div style={{
                                margin: '0 auto',
                            }}>
                                <Button
                                    style={{
                                        width: '20%',
                                        // margin: '1em'
                                    }}
                                    variant='contained'
                                    color='primary'>
                                        ADD
                                </Button>
                                <Button
                                    style={{
                                        width: '20%',
                                        margin: '1em'
                                    }}
                                    onClick={() => setOpenNestedModal(false)}
                                    variant='contained'
                                    color='secondary'>
                                        CANCEL
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    }

    const displayModal = () => {
        return (
            <NestedModal/>
        )
    }

    return (
        <div style={{
            width: '60%'
        }}>
            <div style={{
                margin: '0 auto'
            }}>
                <div style={{
                    width: '90%',
                    margin: '0 auto',
                    padding: '15px',
                }}
                >
                    <div>
                        <div
                            style={{
                                textAlign: 'right'
                            }}
                        >
                            <Button
                                style={{
                                    margin: '10px'
                                }}
                                onClick={() => handleOpenNestedModal()}
                                variant='contained' color='primary'>
                                Add Material Property
                            </Button>
                            <Button
                                 variant='contained' color='secondary'>
                                Remove All
                            </Button>
                        </div>
                    </div>
                    <Card style={{
                        marginBottom: '0px',
                        border: '1px solid black',
                        padding: '5px',
                        backgroundColor: '#e2e2e2',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <p style={{margin: '0px'}}><strong>MATERIAL PROPERTIES</strong></p>
                    </Card>
                    <div style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%'
                    }}>
                        <div style={{
                            paddingRight: '0px',
                            width: '20%',
                            textAlign: 'center'
                        }}>
                            <p>
                                <strong>ID</strong>
                            </p>
                        </div>
                        <div style={{
                            paddingRight: '0px',
                            width: '20%',
                            textAlign: 'center'
                        }}>
                            <p>
                                <strong>Steel Type</strong>
                            </p>
                        </div>
                        <div style={{
                            paddingRight: '0px',
                            width: '20%',
                            textAlign: 'center'
                        }}>
                            <p>
                                <strong>E({unitHandler()})</strong>
                            </p>
                        </div>

                        <div style={{
                            paddingRight: '0px',
                            width: '20%',
                            textAlign: 'center'
                        }}>
                            <p>
                                <strong>F<sub>y</sub>({unitHandler()})</strong>
                            </p>
                        </div>
                        <div style={{
                            paddingRight: '0px',
                            width: '20%',
                            textAlign: 'center'
                        }}>
                            <p>
                                <strong>F<sub>u</sub>({unitHandler()})</strong>
                            </p>
                        </div>
                        <div style={{
                            paddingRight: '0px',
                            width: '20%',
                            textAlign: 'center'
                        }}>
                            <p>
                                <strong>Edit</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{margin: '0 auto', width: '100%'}}>
                <MaterialPropertiesRows/>
            </div>
            {
                displayModal()
            }
        </div>
    )
}
export default MaterialProperties
